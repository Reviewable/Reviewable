// This example shows how to implement a multi-stage pull request review/approval process similar to
// the ones you can set up on Pull Approve.

// dependencies: lodash4
/* global review */


// These global variables track the teams whose review or approval is still needed (given the
// current stage), and the teams whose review needs to be requested or unrequested.  These may
// differ, since we try not to request a team's attention if enough members are already
// participating in the review.
const requiredTeams = [], requestedTeams = [], unrequestedTeams = [];

// A special marker that you can append to a stage name in a workflow indicating that, once reached,
// the logic gates between this stage and the previous one should be bypassed in the future.  In
// other words, once the review reaches this stage it "latches" and doesn't need to evaluate the
// immediately preceding conditions again.  Note that it's still possible to go "backwards" to an
// non-latching stage if its conditions stop being true, in which case all subsequent latches will
// be reset.
const latch = ' [latch]';


// You can use the functions to establish a series of stages and gates between them like so; REPLACE
// THIS with your own workflow.  Note that if a file is covered by multiple conditions then they
// will _all_ have to pass for the file to be considered as reviewed.  Each condition returns a
// pass/fail boolean, and may modify the global variables above as appropriate.
return applyWorkflow(
  '1. Draft',
  () => reviewStarted(),
  '2. General review',
  () => reviewed(),
  '3. Specialized review' + latch,  // once stage is reached, gate above is no longer evaluated
  () => [  // all of the following must be satisfied, and are evaluated concurrently
    reviewed({targetScore: 2, team: {'graphql-admin': 2, 'graphql-dev': 1}, paths: 'backend/*.graphql', coauthor: true}),
    reviewed({team: 'native-packages', paths: ['native/ios/*', 'native/android/*']}),
    reviewed({team: 'localization', paths: '*/languages/*', notPaths: '*/languages/en/*'}),
  ],
  () => reviewed(),  // also needed to reach the next stage, but only evaluated if gate above passes
  '4. Release approval',
  () => approved({team: 'release-managers', label: 'costly migration', author: false}),
  '5. Ready to merge'
);


/**
 * This function applies a staged workflow to the review.  You pass it a list of stage names and
 * logic gates that it evaluates in order, stopping at the first gate that evaluates to a falsy
 * value.  The result can be returned directly as part of your completion condition, or massaged
 * further.
 */
function applyWorkflow(...steps) {
  checkTeamsExpanded(review);
  const gates = parseSteps(steps);

  let completed = true, stage;
  for (const key in gates) {
    const gate = gates[key];
    const satisfied =
      gate.latched || _.every(gate.conditions, cond => _([cond()]).flatten().every());
    if (!satisfied) {
      completed = false;
      break;
    }
    stage = key;
  }

  const slugs = _(requiredTeams).sortBy(_.toLower).sortedUniqBy(_.toLower).value();
  const description =
    (stage || '') + (stage && slugs.length ? ': ' : '') +
    (slugs.length ? `needs approval${slugs.length === 1 ? '' : 's'} from ${slugs.join(', ')}` : '');

  const pendingReviewers = review.pendingReviewers.length > 1 ?
    _.reject(review.pendingReviewers, {fallback: true}) : review.pendingReviewers;

  for (const file of review.files) {
    if (file.designatedReviewers) {
      file.designatedReviewers = _.uniqWith(file.designatedReviewers, _.isEqual);
    }
  }

  return {
    completed,
    description,
    stage,
    requestedTeams: combineRequestedTeams(),
    pendingReviewers,
    files: review.files
  };
}

/**
 * Helper function to restructure workflow steps into an object organized by stage.  Note that the
 * ordering of keys in this object matters!
 */
function parseSteps(steps) {
  const gates = {};
  let conditions = [];
  for (const step of steps) {
    if (_.isString(step)) {
      const latching = _.endsWith(step, latch);
      const stage = latching ? step.slice(0, -latch.length) : step;
      gates[stage] = {conditions, latching};
      conditions = [];
    } else if (_.isFunction(step)) {
      conditions.push(step);
    } else {
      throw new Error('Invalid workflow step: ' + step);
    }
  }
  if (review.stage && gates[review.stage]) {
    for (const stage in gates) {
      const gate = gates[stage];
      if (gate.latching) gate.latched = true;
      if (stage === review.stage) break;
    }
  }
  return gates;
}

/**
 * Cleans up `requestedTeams` and `unrequestedTeams` and combines them with the pull request's
 * currently requested teams to obtain a list that can be output from the completion condition to
 * make the desired changes.
 */
function combineRequestedTeams() {
  const cleanRequestedTeams = _(requestedTeams).map(_.toLower).uniq().value();
  const cleanUnrequestedTeams =
    _(unrequestedTeams).map(_.toLower).uniq().difference(cleanRequestedTeams).value();
  return _(review.pullRequest.requestedTeams)
    .map('slug')
    .map(_.toLower)
    .concat(cleanRequestedTeams)
    .without(...cleanUnrequestedTeams)
    .uniq()
    .map(slug => ({slug}))
    .value();
}



/**
 * Determines whether the review has been started or not.  Draft reviews are never considered
 * started (even if some review work was already done), and non-draft reviews are started once they
 * have any reviews, reviewers, or requested reviewers.
 */
function reviewStarted() {
  const pr = review.pullRequest;
  return !pr.draft && (
    pr.requestedReviewers.length || pr.requestedTeams.length || pr.sanctions.length ||
    pr.reviewers.length
  );
}


/**
 * Determines whether the review's approvals satisfy the given parameters.
 * - `targetScore`: the approval score required (defaults to 1); there also can't be any changes
 *   requested by users who are eligible to furnish an approval; by default, each approval of the
 *   review counts as one point
 * - `team`: a team or teams whose members need to furnish the required approvals (optional); if a
 *   single team slug is provided then approvals by members will contribute a default score of 1,
 *   but you can also provide an object with approval scores keyed by team slug
 * - `request`: whether to request the given team if not enough members are already participating in
 *   the review (defaults to true)
 * - `author`: whether to automatically count the pull request's author towards the required number
 *   of approvals if they're a member of the given team (defaults to true)
 * - `coauthors`: whether to automatically count the pull request's co-authors towards the required
 *   number of approvals if they're a member of the given team (defaults to false); explicit
 *   co-author approvals are always disregarded
 * - `paths`: one or more simple globs (as a string or array of string), where at least one must
 *   match for this requirement to apply (no path restrictions by default); patterns must match the
 *   full path, and `*` will match anything, including multiple levels of directories
 * - `notPaths`: one or more simple globs that, if matched, negate a match with `paths` (none by
 *   default)
 * - `label`: a label that must be present on the pull request for this requirement to apply
 *   (optional)
 */
function approved({
  targetScore = 1, team, request = true, author, coauthors, paths, notPaths, label
} = {}) {
  const pr = review.pullRequest;
  team = normalizeTeam(team);
  if (team && author === undefined) author = true;

  const selectedFiles = selectFiles({paths, notPaths});
  if (paths && !selectedFiles.length) return true;

  if (label && !_.some(review.labels, reviewLabel => _.toLower(reviewLabel) === _.toLower(label))) {
    return true;
  }

  let approvedScore = 0, involvedScore = 0;

  if (team) {
    let implicitScore = 0;
    if (author) implicitScore += findMaxTeamScore(pr.author.teams, team);
    if (coauthors) {
      for (const user of pr.coauthors) implicitScore += findMaxTeamScore(user.teams, team);
    }
    involvedScore += implicitScore;
    approvedScore += implicitScore;
  }

  const relevantSanctions = _(pr.sanctions)
    .reject({username: pr.author.username})
    .reject(sanction => _.some(pr.coauthors, {username: sanction.username}))
    .filter(sanction => !team || findMaxTeamScore(sanction.teams, team) > 0)
    .value();
  const changesRequested = _.some(relevantSanctions, {state: 'changes_requested'});
  involvedScore += relevantSanctions.length;
  if (!changesRequested) {
    approvedScore += _(relevantSanctions)
      .filter({state: 'approved'})
      .map(sanction => team ? findMaxTeamScore(sanction.teams, team) : 1)
      .sum();
  }

  const satisfied = approvedScore >= targetScore;
  if (team) {
    if (!satisfied) {
      requiredTeams.push(..._.keys(team));
      if (request && involvedScore < targetScore) requestedTeams.push(..._.keys(team));
      if (involvedScore) {
        review.pendingReviewers.push(
          ..._(relevantSanctions)
            .reject({state: 'approved'})
            .map(sanction => _.pick(sanction, 'username', 'teams'))
            .value()
        );
      }
    }
    for (const file of selectedFiles) {
      file.designatedReviewers = file.designatedReviewers ?? [];
      file.designatedReviewers.push(..._.map(team, (unused, key) => ({team: key, scope: key})));
      if (satisfied) {
        file.designatedReviewers.push(
          ..._.map(team, (unused, key) => ({builtin: 'fulfilled', scope: key})));
      }
      const rev = _.last(file.revisions);
      if (rev.reviewed !== false) rev.reviewed = satisfied;
    }
  }
  return satisfied;
}


/**
 * Determines whether Reviewable reviews satisfy the given requirements.  A reviewer's marks count
 * as a review if and only if any discussions they're involved in are either resolved or their
 * disposition is in favor of resolution.
 * - `targetScore`: the review score required (defaults to 1); by default, each review of the file
 *   by a distinct user counts as one point
 * - `team`: a team or teams whose members need to furnish the required reviews (optional); if a
 *   single team slug is provided then reviews by members will contribute a default score of 1, but
 *   you can also provide an object with approval scores keyed by team slug
 * - `request`: whether to request the given team if not enough members are already participating in
 *   the review (defaults to true)
 * - `unrequest`: whether to remove a requested team once enough members are participating in the
 *   review, even if they haven't approved or requested changes (defaults to true)
 * - `author`: whether to automatically count the pull request's author towards the required number
 *   of reviews (for any file) if they're a member of the given team (defaults to true); actual
 *   review marks made by the author are always disregarded
 * - `coauthors`: whether to count the pull request's co-authors towards the required number of
 *   reviews (for any file) if they're a member of the given team (defaults to false); actual review
 *   marks made by co-authors always disregarded
 * - `paths`: one or more simple globs (as a string or array of string), where at least one must
 *   match for this requirement to apply (no path restrictions by default); patterns must match the
 *   full path, and `*` will match anything, including multiple levels of directories
 * - `notPaths`: one or more simple globs that, if matched, negate a match with `paths` (none by
 *   default)
 * - `label`: a label that must be present on the pull request for this requirement to apply
 *   (optional)
 * - `omitBaseChanges`: whether to accept review marks from past revisions if the target revision
 *   and all intermediate ones only have base diffs (defaults to true); this is useful to avoid
 *   having to re-review after a no-conflict merge or rebase, for example
 */
function reviewed({
  targetScore = 1, team, request = true, unrequest = true, author, coauthors, paths, notPaths, label,
  omitBaseChanges = true
} = {}) {
  const pr = review.pullRequest;
  team = normalizeTeam(team);
  if (team && author === undefined) author = true;

  const selectedFiles = paths ? selectFiles({paths, notPaths}) : review.files;
  if (!selectedFiles.length) return true;

  if (label && !_.some(review.labels, reviewLabel => _.toLower(reviewLabel) === _.toLower(label))) {
    return true;
  }

  const implicitScore = team ?
    (author ? findMaxTeamScore(pr.author.teams, team) : 0) +
    (coauthors ? _(pr.coauthors).map(user => findMaxTeamScore(user.teams, team)).sum() : 0) : 0;

  let allSatisfied = true;
  for (const file of selectedFiles) {
    let satisfied;
    let reviewersDiscountingBaseChanges = [];
    for (const rev of file.revisions) {
      if (!rev.baseChangesOnly) reviewersDiscountingBaseChanges = [];
      const score =
        implicitScore +
        _(rev.reviewers)
          .concat(omitBaseChanges ? reviewersDiscountingBaseChanges : [])
          .reject(reviewer => reviewer.username === pr.author.username)
          .reject(reviewer => _(pr.coauthors).map('username').includes(reviewer.username))
          .filter(reviewer =>
            _(review.discussions)
              .reject('resolved')
              .flatMap('participants')
              .filter({username: reviewer.username})
              .map('disposition')
              .without('following', 'mentioned', 'dismissed', 'withdrawn', 'satisfied', 'informing')
              .isEmpty())
          .uniqBy('username')
          .map(reviewer => team ? findMaxTeamScore(reviewer.teams, team) : 1)
          .sum();
      satisfied = score >= targetScore;
      if (rev.reviewed !== false) rev.reviewed = satisfied;
      reviewersDiscountingBaseChanges.push(...rev.reviewers);
    }

    allSatisfied = allSatisfied && satisfied;
    file.designatedReviewers = file.designatedReviewers ?? [];
    if (team) {
      file.designatedReviewers.push(
        ..._.map(team, (unused, key) => ({team: key, scope: key, omitBaseChanges})));
      if (satisfied) {
        file.designatedReviewers.push(
          ..._.map(team, (unused, key) => ({builtin: 'fulfilled', scope: key})));
        if (unrequest) unrequestedTeams.push(..._.keys(team));
      } else {
        requiredTeams.push(..._.keys(team));
        if (request && !_.some(file.revisions, 'reviewed')) requestedTeams.push(..._.keys(team));
      }
    } else {
      file.designatedReviewers.push({builtin: 'anyone', omitBaseChanges});
      if (satisfied) file.designatedReviewers.push({builtin: 'fulfilled'});
    }
  }

  return allSatisfied;
}


/**
 * Selects all files matched by the globs in `paths`, unless they're matched by the globs in
 * `notPaths`.  Both values can be undefined, a string, or an array of string.  Each glob must match
 * the entire path (with no leading `/`), and a `*` or `?` wildcard will also match `/`.
 */
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


/**
 * Transforms a simple glob into a regex; only `?` and `*` wildcards are supported.
 */
function fileGlobsToRegex(globs) {
  if (!globs) return;
  if (!_.isArray(globs)) globs = [globs];
  return new RegExp(
    '^(' + _.map(globs, glob =>
      glob.replace(/\./g, '\\.').replace(/\?/g, '.').replace(/\*/g, '.*')
    ).join('|') + ')$'
  );
}


/**
 * Checks that all user objects in the input structure have their teams expanded, so that we can
 * accurately evaluate workflow conditions.
 */
function checkTeamsExpanded(o) {
  if (o && o.username && !o.teams) {
    throw new Error('Unable to resolve user teams; please authorize the read:org scope');
  }
  if (_.isArray(o)) {
    for (const value of o) checkTeamsExpanded(value);
  } else if (_.isPlainObject(o)) {
    _.forEach(o, value => checkTeamsExpanded(value));
  }
}


/**
 * Normalizes the `team` argument to conditions into a slug -> score object.
 */
function normalizeTeam(team) {
  if (!team) return;
  if (_.isString(team)) team = {[team]: 1};
  return _.mapKeys(team, (unused, key) => _.toLower(key.replace(/.*\//, '')));
}

/**
 * Given a list of team slugs, finds the one with the highest score in the given team table and
 * returns that score, or 0 if no match found.
 */
function findMaxTeamScore(teams, teamTable) {
  let maxScore = 0;
  for (const team of teams) {
    const value = teamTable[_.toLower(team.replace(/.*\//, ''))];
    if (value) maxScore = Math.max(maxScore, value);
  }
  return maxScore;
}

