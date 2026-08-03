// Require every file revision to be marked by somebody acting as the pull request author as well
// as by at least one normal reviewer.  Author agents count as authors for this purpose.

// dependencies: lodash4

const files = [...review.files, ...review.systemFiles];
_.forEach(files, file => {
  _.forEach(file.revisions, revision => {
    revision.reviewed =
      _.some(revision.reviewers, 'author') &&
      _.some(revision.reviewers, reviewer => !reviewer.author);
  });
});

if (review.pullRequest.state !== 'open') return {files, pendingReviewers: []};

// Track the two required roles separately so that only the missing role is woken.
let hasUnclaimedFiles = false;
const fileBlockers = _(review.files)
  .flatMap(file => {
    const latestRevision = _.last(file.revisions);
    const blockers = [];

    if (!_.some(latestRevision.reviewers, 'author')) {
      const lastAuthorRevision = _.findLast(file.revisions,
        revision => _.some(revision.reviewers, 'author'));
      if (lastAuthorRevision) {
        blockers.push(..._.filter(lastAuthorRevision.reviewers, 'author'));
      } else {
        hasUnclaimedFiles = true;
      }
    }

    if (!_.some(latestRevision.reviewers, reviewer => !reviewer.author)) {
      const lastReviewerRevision = _.findLast(file.revisions,
        revision => _.some(revision.reviewers, reviewer => !reviewer.author));
      if (lastReviewerRevision) {
        blockers.push(..._.reject(lastReviewerRevision.reviewers, 'author'));
      } else {
        hasUnclaimedFiles = true;
      }
    }

    return blockers;
  })
  .value();

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
