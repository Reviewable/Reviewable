// This code will check that the pull request has been approved via GitHub review approval by a
// minimum number of reviewers and by all assignees, and that no changes were requested by any
// reviewers.  Only reviewers with write access to the repository are considered.
//
// This is very similar to GitHub's built-in branch protection option to require pull request
// reviews before merging, but allows for much more flexibility and customization.

// dependencies: lodash4

// The number of approvals required to merge.
let numApprovalsRequired = 1;

const sanctions = review.pullRequest.sanctions;
const sanctionsByUsername = _.keyBy(sanctions, 'username');

let numApprovals = _.filter(sanctions, {state: 'approved'}).length;
const numRejections = _.filter(sanctions, {state: 'changes_requested'}).length;

const discussionBlockers = _(review.discussions)
  .filter({resolved: false})
  .flatMap('participants')
  .filter({resolved: false})
  .map(user => ({..._.pick(user, 'username'), reason: 'unreplied discussions'}))
  .value();

let pendingReviewers = _(discussionBlockers)
  .concat(_.map(review.pullRequest.requestedReviewers, user => ({
    ..._.pick(user, 'username', 'teams'), reason: 'review requested'
  })))
  .value();

const required = _.map(review.pullRequest.assignees, 'username');
_.pull(required, review.pullRequest.author.username);
if (required.length) {
  numApprovalsRequired = _.max([required.length, numApprovalsRequired]);
  const numRequiredApprovals = _(required)
    .filter(username => sanctionsByUsername[username]?.state === 'approved')
    .size();
  const numOtherApprovals = _(sanctions)
    .filter({state: 'approved'})
    .reject(sanction => _.includes(required, sanction.username))
    .size();
  numApprovals =
    numRequiredApprovals +
    _.min([numOtherApprovals, numApprovalsRequired - required.length]);
  pendingReviewers = _(required)
    .reject(username => sanctionsByUsername[username]?.state === 'approved')
    .reject(username => pendingReviewers.length && sanctionsByUsername[username])
    .map(username => ({username, reason: 'approval required'}))
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
  completed: !numRejections && numApprovals >= numApprovalsRequired,
  description, shortDescription, pendingReviewers
};
