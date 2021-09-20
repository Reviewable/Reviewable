// This code will check that the pull request has been approved via GitHub review approval by a
// minimum number of reviewers and by all assignees, and that no changes were requested by any
// reviewers.  Only reviewers with write access to the repository are considered.
//
// This is very similar to GitHub's built-in branch protection option to require pull request
// reviews before merging, but allows for much more flexibility and customization.

// dependencies: lodash4

// The number of approvals required to merge.
let numApprovalsRequired = 1;

const approvals = review.pullRequest.approvals;

let numApprovals = _.filter(approvals, 'approved').length;
const numRejections = _.filter(approvals, 'changes_requested').length;

const discussionBlockers = _(review.discussions)
  .filter({resolved: false})
  .flatMap('participants')
  .filter({resolved: false})
  .map(user => _.pick(user, 'username'))
  .value();

let pendingReviewers = _(discussionBlockers)
  .map(user => _.pick(user, 'username'))
  .concat(review.pullRequest.requestedReviewers)
  .value();

const required = _.map(review.pullRequest.assignees, 'username');
_.pull(required, review.pullRequest.author.username);
if (required.length) {
  numApprovalsRequired = _.max([required.length, numApprovalsRequired]);
  numApprovals =
    (_(approvals).pick(required).filter('approved').size()) +
    _.min([numApprovals, numApprovalsRequired - required.length]);
  pendingReviewers = _(required)
    .reject(username => approvals[username] === 'approved')
    .reject(username => pendingReviewers.length && approvals[username])
    .map(username => ({username}))
    .concat(pendingReviewers)
    .value();
}

pendingReviewers = _.uniqBy(pendingReviewers, 'username');

const description =
  (numRejections ? `${numRejections} change requests, ` : '') +
  `${numApprovals} of ${numApprovalsRequired} approvals obtained`;
const shortDescription =
  (numRejections ? `${numRejections} ✗, ` : '') + `${numApprovals} of ${numApprovalsRequired} ✓`;

return {
  completed: numApprovals >= numApprovalsRequired,
  description, shortDescription, pendingReviewers
};
