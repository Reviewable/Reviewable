// This code will check that the pull request has been approved via LGTM (Looks Good To Me) emojis
// by a minimum number of reviewers and by all assignees.
//
// Approval is granted via the :lgtm: and :lgtm_strong: emojis, and can be withdrawn with
// :lgtm_cancel:.  An :lgtm: is only good for the last non-provisional revision at the time the
// comment is sent, so any new commits will require another approval.  An :lgtm_strong: is good for
// all revisions unless canceled.

// dependencies: lodash4

// The number of LGTMs required to merge.
let numApprovalsRequired = 1;

// Approval by username: true if current LGTM, false if stale, missing if not given or canceled.
const approvals = {};

// Timestamp of the currently latest revision.
const lastRevisionTimestamp = _(review.revisions).reject('obsolete').last().snapshotTimestamp;

_.forEach(review.sentiments, sentiment => {
  const emojis = _.keyBy(sentiment.emojis);
  if (emojis.lgtm_cancel) {
    delete approvals[sentiment.username];
  } else if (emojis.lgtm_strong) {
    approvals[sentiment.username] = true;
  } else if (emojis.lgtm && !approvals[sentiment.username]) {
    approvals[sentiment.username] = sentiment.timestamp >= lastRevisionTimestamp;
  }
});

const numApprovals = _.countBy(approvals);
let numGranted = numApprovals.true || 0;
let pendingReviewers = [];

const required = _.map(review.pullRequest.assignees, 'username');
if (required.length) {
  numApprovalsRequired = _.max([required.length, numApprovalsRequired]);
  numGranted =
    (_(approvals).pick(required).countBy().value().true || 0) +
    _.min([numGranted, numApprovalsRequired - required.length]);
  pendingReviewers = _(required)
    .reject(username => approvals[username])
    .map(username => ({username}))
    .value();
}

let description = `${numGranted} of ${numApprovalsRequired} LGTMs obtained`;
let shortDescription = `${numGranted}/${numApprovalsRequired} LGTMs`;
if (numApprovals.false) {
  description += `, and ${numApprovals.false} stale`;
  shortDescription += `, ${numApprovals.false} stale`;
}

return {
  completed: numGranted >= numApprovalsRequired,
  description, shortDescription, pendingReviewers,
  debug: approvals
};
