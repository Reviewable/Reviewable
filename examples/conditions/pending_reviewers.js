// This shows how Reviewable computes the default pendingReviewers, in case you want to tweak the
// algorithm.

// dependencies: lodash4

if (review.pullRequest.state !== 'open') return {pendingReviewers: []};

const discussionBlockers = _(review.discussions)
  .reject('resolved')
  .flatMap('participants')
  .reject('resolved')
  .map(user => ({..._.pick(user, 'username', 'teams', 'bot'), reason: 'unreplied discussions'}))
  .value();

function isFileRevisionReviewed(revision) {
  if (revision.reviewed === false) return false;
  return revision.reviewed || _.some(revision.reviewers, reviewer => !reviewer.author);
}

const lastReviewedRevisionsOfUnreviewedFiles = _(review.files)
  .reject(file => isFileRevisionReviewed(_.last(file.revisions)))
  .map(file => _.findLast(file.revisions, rev => isFileRevisionReviewed(rev)))
  .value();

const fileBlockers = _(lastReviewedRevisionsOfUnreviewedFiles)
  .compact()
  .flatMap('reviewers')
  .reject('author')
  .map(user => ({..._.pick(user, 'username', 'teams', 'bot'), reason: 'files to review'}))
  .value();

const hasUnclaimedItems =
  _.some(lastReviewedRevisionsOfUnreviewedFiles, rev => !rev) ||
  _(review.discussions)
    .reject('resolved')
    .map('participants')
    .some(participants =>
      _.every(participants, 'resolved') &&
      !_.some(participants, {disposition: 'mentioned'}));

let missingReviewerReason = 'review requested';
let missingReviewers = review.pullRequest.requestedReviewers;
if (_.isEmpty(missingReviewers)) {
  missingReviewerReason = 'assigned review';
  missingReviewers = review.pullRequest.assignees;
  if (_.isEmpty(missingReviewers)) {
    missingReviewerReason = 'previous reviewer';
    missingReviewers = review.pullRequest.reviewers;
  }
  if (!hasUnclaimedItems) missingReviewers = _.reject(missingReviewers, 'participating');
}
missingReviewers = _.map(missingReviewers, user => ({
  ..._.pick(user, 'username', 'teams', 'bot'), reason: missingReviewerReason
}));

const unresolvedMentions = _(review.discussions)
  .reject('resolved')
  .flatMap('participants')
  .filter({disposition: 'mentioned'})
  .map(user => ({..._.pick(user, 'username', 'teams', 'bot'), reason: 'unresolved mentions'}))
  .value();

const deferringReviewers = _.map(review.deferringReviewers, 'username');

const pendingReviewers = _(fileBlockers)
  .concat(discussionBlockers)
  .concat(unresolvedMentions)
  .concat(missingReviewers)
  .reject('bot')
  .map(user => _.pick(user, 'username', 'teams', 'bot', 'reason'))
  .groupBy(user => _.toLower(user.username))
  .map(users => {
    const reason = _(users).map('reason').compact().uniq().join(', ');
    return {...users[0], ...reason && {reason}};
  })
  .reject(reviewer => _.includes(deferringReviewers, reviewer.username))
  .value();

if (_.isEmpty(pendingReviewers) && !hasUnclaimedItems) {
  pendingReviewers.push({
    ...review.pullRequest.author, fallback: true, reason: 'review needs attention'
  });
}

return {
  pendingReviewers
};
