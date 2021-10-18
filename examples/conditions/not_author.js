// This code will check that all discussions have been resolved, and all files reviewed at the
// latest revision by all the assignees, and by at least the required number of people, while
// ignoring the pull request's author.

// dependencies: lodash4

const numReviewersRequired = 1;
let completed = true;
let reasons = [];  // pieces of the status description
let shortReasons = [];  // pieces of the short status desc.
let fileBlockers = [];  // users who still need to review files

const required = _(review.pullRequest.assignees)
  .map('username')
  .without(review.pullRequest.author.username)
  .value();

const lastRevisionIndex = _.parseInt(review.summary.lastRevision.slice(1));
let numUnreviewedFiles = 0;
_.forEach(review.files, file => {
  const lastRev =
    _.findLast(file.revisions, rev => _.parseInt(rev.key.slice(1)) <= lastRevisionIndex);
  const reviewers = _(lastRev.reviewers)
    .map('username')
    .without(review.pullRequest.author.username)
    .value();
  const missingReviewers = _.difference(required, reviewers);
  if (reviewers.length >= numReviewersRequired && _.isEmpty(missingReviewers)) return;
  numUnreviewedFiles++;
  const lastReviewedRev = _(file.revisions).findLast(rev => !_.isEmpty(rev.reviewers));
  fileBlockers = fileBlockers.concat(
    _.map(missingReviewers, username => ({username})),
    lastReviewedRev ? lastReviewedRev.reviewers : []
  );
});

if (numUnreviewedFiles) {
  completed = false;
  reasons.push(
    `${review.summary.numFiles - numUnreviewedFiles} of ${review.summary.numFiles} files reviewed`);
  shortReasons.push(plural(numUnreviewedFiles, 'file'));
} else {
  reasons.push('all files reviewed');
}

if (review.summary.numUnresolvedDiscussions) {
  completed = false;
  reasons.push(plural(review.summary.numUnresolvedDiscussions, 'unresolved discussion'));
  shortReasons.push(plural(review.summary.numUnresolvedDiscussions, 'discussion'));
} else {
  reasons.push('all discussions resolved');
}

let discussionBlockers = _(review.discussions)
  .filter({resolved: false})
  .flatMap('participants')
  .filter({resolved: false})
  .map(user => _.pick(user, 'username'))
  .value();

let shortDescription;
if (completed) {
  shortDescription = plural(review.summary.numFiles, 'file');
} else {
  shortDescription = shortReasons.join(', ') + ' left';
}

return {
  completed,
  description: reasons.join(', '),
  shortDescription,
  pendingReviewers: _.uniqBy(fileBlockers.concat(discussionBlockers), 'username')
};

function plural(n, item) {
  return `${n} ${item}${n === 1 ? '' : 's'}`;
}
