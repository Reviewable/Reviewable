// This shows how Reviewable computes the default pendingReviewers, in case you want to tweak the
// algorithm.

// dependencies: lodash4

if (review.pullRequest.state !== 'open') return {pendingReviewers: []};

const discussionBlockers = _(review.discussions)
  .reject('resolved')
  .flatMap('participants')
  .reject('resolved')
  .map(user => _.pick(user, 'username', 'teams'))
  .value();

const lastReviewedRevisionsOfUnreviewedFiles = _(review.files)
  .filter(file => _.isEmpty(_.last(file.revisions).reviewers))
  .map(file => _.findLast(file.revisions, rev => !_.isEmpty(rev.reviewers)))
  .value();

const fileBlockers = _(lastReviewedRevisionsOfUnreviewedFiles)
  .compact()
  .flatMap('reviewers')
  .value();

const hasUnclaimedItems =
  _.some(lastReviewedRevisionsOfUnreviewedFiles, rev => !rev) ||
  _(review.discussions)
    .reject('resolved')
    .map('participants')
    .some(participants =>
      _.every(participants, 'resolved') &&
      !_.some(participants, {disposition: 'mentioned'}));

let missingReviewers = review.pullRequest.requestedReviewers;
if (_.isEmpty(missingReviewers)) {
  missingReviewers = review.pullRequest.assignees;
  if (_.isEmpty(missingReviewers)) missingReviewers = review.pullRequest.reviewers;
  if (!hasUnclaimedItems) missingReviewers = _.reject(missingReviewers, 'participating');
}

const unresolvedMentions = _(review.discussions)
  .reject('resolved')
  .flatMap('participants')
  .filter({disposition: 'mentioned'})
  .value();

const deferringReviewers = _.map(review.deferringReviewers, 'username');

const pendingReviewers = _(fileBlockers)
  .concat(discussionBlockers)
  .concat(unresolvedMentions)
  .concat(missingReviewers)
  .map(user => _.pick(user, 'username', 'teams'))
  .uniqBy('username')
  .reject(reviewer => _.includes(deferringReviewers, reviewer.username))
  .value();

if (_.isEmpty(pendingReviewers) && !hasUnclaimedItems) {
  pendingReviewers.push({...review.pullRequest.author, fallback: true});
}

return {
  pendingReviewers
};
