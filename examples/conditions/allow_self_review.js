// Restore the pre-self-review semantics where a review mark from anyone, including the pull request
// author or an agent acting as the author, is sufficient to review a file revision.  Note that this
// won't affect how self-review marks look in the UI.

// dependencies: lodash4

const files = [...review.files, ...review.systemFiles];
_.forEach(files, file => {
  _.forEach(file.revisions, revision => {
    revision.reviewed = !_.isEmpty(revision.reviewers);
  });
});

if (review.pullRequest.state !== 'open') return {files, pendingReviewers: []};

// Match the reviewed-file policy when deciding who should be woken for a new revision.
const lastReviewedRevisionsOfUnreviewedFiles = _(files)
  .reject(file => _.last(file.revisions).reviewed)
  .map(file => _.findLast(file.revisions, 'reviewed'))
  .value();

const fileBlockers = _(lastReviewedRevisionsOfUnreviewedFiles)
  .compact()
  .flatMap('reviewers')
  .value();

const hasUnclaimedFiles = _.some(lastReviewedRevisionsOfUnreviewedFiles, revision => !revision);

return {files, pendingReviewers: computePendingReviewers(fileBlockers, hasUnclaimedFiles)};

function computePendingReviewers(fileBlockers, hasUnclaimedFiles) {
  const discussionBlockers = _(review.discussions)
    .reject('resolved')
    .flatMap('participants')
    .reject('resolved')
    .value();

  const hasUnclaimedItems = hasUnclaimedFiles || _(review.discussions)
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
    .reject('bot')
    .map(user => _.pick(user, 'username', 'teams'))
    .uniqBy('username')
    .reject(reviewer => _.includes(deferringReviewers, reviewer.username))
    .value();

  if (_.isEmpty(pendingReviewers) && !hasUnclaimedItems) {
    pendingReviewers.push({...review.pullRequest.author, fallback: true});
  }
  return pendingReviewers;
}
