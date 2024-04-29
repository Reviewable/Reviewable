// This example shows how to implement a multi-stage pull request review/approval process similar to
// the ones you can set up on Pull Approve.  To simplify things, it assumes that any given files
// needs at most one teams's specialized review; if this assumption is broken, the last evaluated
// requirement will trump all previous ones.  You can use the functions to establish a series of
// stages and gates between them like so:

// return applyWorkflow(
//   '1. Draft',
//   () => reviewStarted(),
//   '2. General review [latch]',
//   () => reviewed(),
//   '3. Specialized review',
//   () => _.every([
//     reviewed(),
//     reviewed({team: 'graphql-schema',  paths: 'backend/*.graphql', coauthor: true}),
//     reviewed({team: 'native-packages', paths: ['native/ios/*', 'native/android/*']}),
//     reviewed({team: 'localization',    paths: '*/languages/*', notPaths: '*/languages/en/*'}),
//   ]),
//   '4. Release approval',
//   () => approved({team: 'release-managers', label: 'costly migration', author: false}),
//   '5. Ready to merge'
// );

// dependencies: lodash4


// These global variables track the teams whose review or approval is still needed (given the
// current stage), and the teams who review needs to be requested.  The latter may differ, since we
// try not to request a team's attention if enough members are already participating in the review.
const requiredTeamSlugs = [];
const requestedTeams = _.clone(review.pullRequest.requestedTeams);

// This function applies a staged workflow to the review.  You pass it a list of stage names and
// logic gates that it evaluates in order, stopping at the first gate that evaluates to a falsy
// value.  The result can be returned directly as part of your completion condition, or massaged
// further.
function applyWorkflow(...gates) {
  requireTeams();
  let completed = false;
  let stage;

  for (const gate of gates) {
    if (_.isString(gate)) {
      stage = gate;
    } else if (_.isFunction(gate)) {
      if (!gate()) break;
    } else {
      throw new Error('Invalid workflow item: ' + gate);
    }
    if (gate === _.last(gates)) completed = true;
  }

  const description =
    (stage || '') + (stage && requiredTeamSlugs.length ? ': ' : '') +
    (requiredTeamSlugs.length ?
      `needs approval${plural(requiredTeamSlugs)} from ${requiredTeamSlugs.join(', ')}` : '');

  return {
    completed,
    description,
    requestedTeams,
    files: review.files
  };
}


// Determines whether the review has been started or not.  Draft reviews are never considered
// started (even if some review work was already done), and non-draft reviews are started once they
// have any reviews, reviewers, or requested reviewers.
function reviewStarted() {
  const pr = review.pullRequest;
  return !pr.draft && (
    pr.requestedReviewers.length || pr.requestedTeams.length || pr.sanctions.length ||
    pr.reviewers.length
  );
}


// Determines whether the review's approvals satisfy the given parameters:
// - `approvals`: the number of approvals required (defaults to 1); there also can't be any changes
//    requested by users who are eligible to furnish an approval
// - `team`: a team whose members need to furnish the required approvals (optional)
// - `request`: whether to request the given team if not enough members are already participating in
//    the review (defaults to true)
// - `author`: whether to count the pull request's author as implicitly approving the review if
//    they're a member of the given team (defaults to true)
// - `coauthors`: whether to count the pull request's co-authors as implicitly approving the review
//    if they're a member of the given team (default to false); explicit co-author approvals are
//    always disregarded
// - `paths`: one or more simple globs (as a string or array of string), where at least one must
//    match for this requirement to apply (no path restrictions by default); patterns must match the
//    full path, and `*` will match anything, including multiple levels of directories
// - `notPaths`: one or more simple globs that, if matched, negate a match with `paths` (none by
//    default)
// - `label`: a label that must be present on the pull request for this requirement to apply
//    (optional)
function approved({
  approvals = 1, team, request = true, author = true, coauthors, paths, notPaths, label
} = {}) {
  const pr = review.pullRequest;
  const fullTeam = _.toLower(`maintainx/${team}`);

  const selectedFiles = selectFiles({paths, notPaths});
  if (paths && !selectedFiles.length) return true;

  if (label && !_.some(review.labels, reviewLabel => _.toLower(reviewLabel) === _.toLower(label))) {
    return true;
  }

  let numApproved = 0, numInvolved = 0;

  if (team) {
    const numImplicitApprovals = _([])
      .concat(author ? pr.author : null)
      .concat(coauthors ? pr.coauthors : null)
      .compact()
      .filter(user => _(user.teams).map('slug').map(_.toLower).includes(fullTeam))
      .size();
    numInvolved += numImplicitApprovals;
    numApproved += numImplicitApprovals;
  }

  const relevantSanctions = _(pr.sanctions)
    .reject({username: pr.author.username})
    .reject(sanction => _.some(pr.coauthors, {username: sanction.username}))
    .filter(sanction => !team || _(sanction.teams).map('slug').map(_.toLower).includes(fullTeam))
    .value();
  const changesRequested = _.some(relevantSanctions, {state: 'changes_requested'});
  numInvolved += relevantSanctions.length;
  if (!changesRequested) numApproved += _.filter(relevantSanctions, {state: 'approved'});

  const satisfied = numApproved >= approvals;
  if (team) {
    if (!satisfied) {
      requiredTeamSlugs.push(team);
      if (request && numInvolved < approvals) requestedTeams.push({slug: team});
    }
    for (const file of selectedFiles) {
      file.designatedReviewers = file.designatedReviewers ?? [];
      file.designatedReviewers.push({team: fullTeam, scope: team});
      if (satisfied) file.designatedReviewers.push({builtin: 'fulfilled', scope: team});
      _.last(file.revisions).reviewed = satisfied;
    }
  }
  return satisfied;
}


// Determines whether Reviewable reviews satisfy the given requirements.  A reviewer's marks count
// as a review if and only if any discussions they're involved in are either resolved or their
// disposition is in favor of resolution.
// - `reviews`: the number of reviews required (defaults to 1)
// - `team`: a team whose members need to furnish the required reviews (optional)
// - `request`: whether to request the given team if not enough members are already participating in
//    the review (defaults to true)
// - `author`: whether to count the pull request's author as an implicit reviewer if they're a
//    member of the given team (defaults to true); explicit reviews are always disregarded
// - `coauthors`: whether to count the pull request's co-authors as implicitly approving the review
//    if they're a member of the given team (default to false); explicit reviews are always
//    disregarded
// - `paths`: one or more simple globs (as a string or array of string), where at least one must
//    match for this requirement to apply (no path restrictions by default); patterns must match the
//    full path, and `*` will match anything, including multiple levels of directories
// - `notPaths`: one or more simple globs that, if matched, negate a match with `paths` (none by
//    default)
// - `label`: a label that must be present on the pull request for this requirement to apply
//    (optional)
// - `omitBaseChanges`: whether to accept review marks from past revisions if the target revision
//    and all intermediate ones only have base diffs (defaults to true); this is useful to avoid
//    having to re-review after a no-conflict merge or rebase, for example

function reviewed({
  reviews = 1, team, request = true, author, coauthor, paths, notPaths, label,
  omitBaseChanges = true
} = {}) {
  const pr = review.pullRequest;
  const fullTeam = team && _.toLower(`maintainx/${team}`);
  if (team && author === undefined) author = true;

  const selectedFiles = paths ? selectFiles({paths, notPaths}) : review.files;
  if (!selectedFiles.length) return true;

  if (label && !_.some(review.labels, reviewLabel => _.toLower(reviewLabel) === _.toLower(label))) {
    return true;
  }

  const numImplicitReviewers =
    (author && (!team || _(pr.author.teams).map('slug').map(_.toLower).includes(fullTeam)) ? 1 : 0)
    +
    _(pr.coauthors).filter(
      user => coauthor && (!team || _(user.teams).map('slug').map(_.toLower).includes(fullTeam))
    ).size();

  for (const file of selectedFiles) {
    file.designatedReviewers = file.designatedReviewers ?? [];
    file.designatedReviewers.push(
      team ? {team: fullTeam, scope: team, omitBaseChanges} : {builtin: 'anyone', omitBaseChanges});

    let reviewersDiscountingBaseChanges = [];
    for (const rev of file.revisions) {
      if (!rev.baseChangesOnly) reviewersDiscountingBaseChanges = [];
      const numReviewers =
        numImplicitReviewers +
        _(rev.reviewers)
          .concat(omitBaseChanges ? reviewersDiscountingBaseChanges : [])
          .reject(reviewer => reviewer.username === pr.author.username)
          .reject(reviewer => _(pr.coauthors).map('username').includes(reviewer.username))
          .filter(reviewer =>
            !team || _(reviewer.teams).map('slug').map(_.toLower).includes(fullTeam))
          .filter(reviewer =>
            _(review.discussions)
              .reject('resolved')
              .flatMap('participants')
              .filter({username: reviewer.username})
              .map('disposition')
              .without('following', 'mentioned', 'dismissed', 'withdrawn', 'satisfied', 'informing')
              .isEmpty())
          .map('username').uniq().size();
      rev.reviewed = numReviewers >= reviews;
      reviewersDiscountingBaseChanges.push(...rev.reviewers);
    }

    if (_.last(file.revisions).reviewed) {
      if (team) file.designatedReviewers.push({builtin: 'fulfilled', scope: team});
    } else if (team) {
      requiredTeamSlugs.push(team);
      if (request && !_.some(file.revisions, 'reviewed')) requestedTeams.push({slug: fullTeam});
    }
  }

  return _.every(selectedFiles, file => _.last(file.revisions).reviewed);
}


// Selects all files matched by the globs in `paths`, unless they're matched by the globs in
// `notPaths`.  Both values can be undefined, a string, or an array of string.  Each glob must match
// the entire path (with no leading `/`), and a `*` or `?` wildcard will also match `/`.
function selectFiles({paths, notPaths}) {
  const relevantFiles = [];
  if (paths) {
    const pathsRegex = fileGlobsToRegex(paths);
    const notPathsRegex = fileGlobsToRegex(notPaths);
    for (const file of review.files) {
      if (pathsRegex?.test(file.path) && !notPathsRegex?.test(file.path)) relevantFiles.push(file);
    }
  }
  return relevantFiles;
}


// Transforms a simple glob into a regex; only `?` and `*` wildcards are supported.
function fileGlobsToRegex(globs) {
  if (!globs) return;
  if (!Array.isArray(globs)) globs = [globs];
  return new RegExp(
    '^(' + _.map(globs, glob =>
      glob.replace(/\./g, '\\.').replace(/\?/g, '.').replace(/\*/g, '.*')
    ).join('|') + ')$'
  );
}


function plural(array) {
  return array.length === 1 ? '' : 's';
}


function requireTeams(o) {
  o = o ?? review;
  if (o && o.username && !o.teams) {
    throw new Error(
      'Unable to resolve user teams; please connect the repository and authorize the read:org scope'
    );
  }
  if (_.isArray(o)) {
    for (const value of o) requireTeams(value);
  } else if (_.isPlainObject(o)) {
    _.forEach(o, value => requireTeams(value));
  }
}

