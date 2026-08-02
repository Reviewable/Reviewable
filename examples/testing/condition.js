// This is an old version of the built-in review completion condition that Reviewable uses by
// default.  It's here solely as a placeholder to show how to test conditions and is not generally
// kept up to date.  For current examples of completion conditions see ../conditions.

'use strict';
/* globals review: false, _: false */

let reasons = [];  // pieces of the status description
let shortReasons = [];  // pieces of the short status desc.
const summary = review.summary;  // shortcut to summary

const completed =
  !summary.numUnresolvedDiscussions &&
  !summary.numUnreviewedFiles;

if (summary.numUnreviewedFiles) {
  reasons.push(
    (summary.numFiles - summary.numUnreviewedFiles) +
    ' of ' + summary.numFiles + ' files reviewed');
  shortReasons.push(
    summary.numUnreviewedFiles + ' file' +
    (summary.numUnreviewedFiles > 1 ? 's' : '')
  );
} else {
  reasons.push('all files reviewed');
}

if (summary.numUnresolvedDiscussions) {
  reasons.push(
    summary.numUnresolvedDiscussions +
    ' unresolved discussion' +
    (summary.numUnresolvedDiscussions > 1 ? 's' : ''));
  shortReasons.push(
    summary.numUnresolvedDiscussions + ' discussion' +
    (summary.numUnresolvedDiscussions > 1 ? 's' : '')
  );
} else {
  reasons.push('all discussions resolved');
}

let discussionBlockers = _(review.discussions)
    .where({resolved: false})
    .pluck('participants')
    .flatten()
    .where({resolved: false})
    .map(user => _.pick(user, 'username'))
    .value();

let fileBlockers = _(review.files)
    .filter(file => _.isEmpty(_.last(file.revisions).reviewers))
    .map(file => _(file.revisions).findLast(
      rev => !_.isEmpty(rev.reviewers)))
    .compact()
    .pluck('reviewers')
    .flatten()
    .value();

if (!completed && _.some(fileBlockers, user => !user)) {
  fileBlockers =
    fileBlockers.concat(review.pullRequest.assignees);
}

let shortDescription;
if (completed) {
  shortDescription =
    summary.numFiles + ' file' +
    (summary.numFiles > 1 ? 's' : '') + ' reviewed';
} else {
  shortDescription = shortReasons.join(', ') + ' left';
}

return {
  completed,
  description: reasons.join(', '),
  shortDescription,
  pendingReviewers:
    _.uniq(fileBlockers.concat(discussionBlockers), 'username')
};
