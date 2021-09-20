// This is the built-in review completion condition that Reviewable uses by default.

// It checks that all files have been reviewed by at least one user and that all discussions have
// been resolved.  All the information about the current review is supplied in a predefined `review`
// variable.

// dependencies: lodash4

let reasons = [];  // pieces of the status description
let shortReasons = [];  // pieces of the short status desc.
const summary = review.summary;  // shortcut to review summary

// The commits file is a system file Reviewable synthesizes for reviewing commit messages.
const commitsFileReviewed = summary.commitsFileReviewed;
const numFiles = summary.numFiles;
const numUnresolvedDiscussions = summary.numUnresolvedDiscussions;
const numUnreviewedFiles = summary.numUnreviewedFiles;

const completed = !numUnresolvedDiscussions && !numUnreviewedFiles && commitsFileReviewed;

reasons.push(
  (numUnreviewedFiles ? `${numFiles - numUnreviewedFiles} of ${numFiles}` : 'all') +
  ' files reviewed');
if (!numUnreviewedFiles && !commitsFileReviewed) reasons[0] += ' (commit messages unreviewed)'
if (numUnreviewedFiles) shortReasons.push(plural(numUnreviewedFiles, 'file'));

reasons.push(numUnresolvedDiscussions ?
  plural(numUnresolvedDiscussions, 'unresolved discussion') : 'all discussions resolved');
if (numUnresolvedDiscussions) shortReasons.push(plural(numUnresolvedDiscussions, 'discussion'));

let shortDescription;
if (completed) {
  shortDescription = plural(numFiles, 'file') + ' reviewed';
} else if (!numUnreviewedFiles && !numUnresolvedDiscussions && !commitsFileReviewed) {
  shortDescription = 'commits unreviewed';
} else {
  shortDescription = shortReasons.join(', ') + ' left';
}

return {
  completed,
  description: reasons.join(', '),
  shortDescription,
  pendingReviewers: review.pendingReviewers
};

function plural(n, item) {
  return `${n} ${item}${n === 1 ? '' : 's'}`;
}
