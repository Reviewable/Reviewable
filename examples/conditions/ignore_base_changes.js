// This code will check that all files are reviewed at the last revision that had more than just
// base changes, and that all discussions are resolved.

let completed = true;
let reasons = [];  // pieces of the status description
let shortReasons = [];  // pieces of the short status description

const lastRevisionNumber = _.parseInt(review.summary.lastRevision.slice(1));
let numUnreviewedFiles = 0;
_.forEach(review.files, file => {
  // Look at all file revisions between the last one that has changes not traceable solely to edits
  // in the base branch and the review's last revision.  Note that some of these revisions might be
  // obsolete if, for example, the author force pushed a last (clean) rebase after the previous
  // revision was reviewed, but it's still OK to look at these for reviewers.
  const lastMeaningfulChangeRevIndex = _.findLastIndex(file.revisions, {baseChangesOnly: false});
  const lastRevIndex =
    _.findLastIndex(file.revisions, rev => _.parseInt(rev.key.slice(1)) <= lastRevisionNumber);
  // If there are no revisions that satisfy the criteria, then the file is no longer part of the
  // pull request and can be ignored.
  if (lastMeaningfulChangeRevIndex > lastRevIndex) return;
  const reviewed = _(file.revisions)
    .slice(lastMeaningfulChangeRevIndex, lastRevIndex + 1)
    .some(rev => !_.isEmpty(rev.reviewers));
  if (!reviewed) numUnreviewedFiles++;
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

let shortDescription;
if (completed) {
  shortDescription = plural(review.summary.numFiles, 'file');
} else {
  shortDescription = shortReasons.join(', ') + ' left';
}

return {
  completed,
  description: reasons.join(', '),
  shortDescription
};

function plural(n, item) {
  return `${n} ${item}${n === 1 ? '' : 's'}`;
}
