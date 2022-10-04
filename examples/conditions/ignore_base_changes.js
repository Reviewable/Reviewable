// This code will check that all files are reviewed at the last revision that had more than just
// base changes, and that all discussions are resolved.

let completed = true;
let reasons = [];  // pieces of the status description
let shortReasons = [];  // pieces of the short status description

const lastRevisionIndex = _.parseInt(review.summary.lastRevision.slice(1));
let numUnreviewedFiles = 0;
_.forEach(review.files, file => {
  // Find the last file revision that 1) is not past the review's last revision and 2) doesn't have
  // only changes traceable to edits in the base branch.  Note that this revision might itself be
  // obsolete if, for example, the author force pushed a last (clean) rebase after the previous
  // revision was reviewed, but it's still the right one to look at for reviewers.
  const lastRev = _(file.revisions)
    // This drops any trailing obsolete revisions in case the branch was reverted to an earlier
    // state.
    .reject(rev => _.parseInt(rev.key.slice(1)) > lastRevisionIndex)
    .findLast({baseChangesOnly: false});
  // If there's no last revision that satisfies the criteria, then the file is no longer part of the
  // pull request and can be ignored.
  if (lastRev && _.isEmpty(lastRev.reviewers)) numUnreviewedFiles++;
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
