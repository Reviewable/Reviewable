// The function below applies the designated reviewers set by your condition (or automatically
// inferred from CODEOWNERS) to set:
//   1. Each file revision's `reviewed` flag, based on whether every designation scope has at least
//      one reviewer for the revision (including the default unnamed scope).
//   2. Each file designation scope's `fulfilled` flag, based on whether that scope has at least one
//      reviewer in the file's last revision.
//   3. The pending reviewers, based on the people in the latest revision with reviewers who could
//      help fulfill any scopes that are now unfulfilled.
// You should invoke the function with the `files` structure you'll be returning from your condition
// (likely `review.files`) after you're done setting all the files' `designatedReviewers`.  The
// function returns a completion condition result containing the files and pending reviewers.  The
// function will fail if the condition executor was unable to resolve all review participants' team
// memberships; if so, make sure that you've connected the repository and authorized the `read:org`
// OAuth scope for the connector (and ideally any other repository admins).

// dependencies: lodash4

function applyDesignatedReviewers(files) {
  const fileBlockers = [];
  let hasUnclaimedFiles = false;

  _.forEach(files, file => {
    // Fall back to the normal reviewed-file policy if no designatedReviewers are set.
    if (!file.designatedReviewers) {
      if (!revisionIsReviewed(_.last(file.revisions))) {
        const lastReviewedRevision = _.findLast(file.revisions, revisionIsReviewed);
        if (lastReviewedRevision) {
          fileBlockers.push(..._.reject(lastReviewedRevision.reviewers, 'author'));
        } else {
          hasUnclaimedFiles = true;
        }
      }
      return;
    }

    // Check that team memberships were successfully resolved for every reviewer.
    const teamDesignations = _.filter(file.designatedReviewers, 'team');
    const authorCanSatisfyTeam = _.some(teamDesignations, 'includeAuthor');
    const teamReviewerRecords = _(file.revisions)
      .flatMap('reviewers')
      .filter(reviewer => !reviewer.author || authorCanSatisfyTeam);
    if (teamDesignations.length && !teamReviewerRecords.map('teams').every()) {
      throw new Error(
        'Unable to resolve designated teams; ' +
        'please connect the repository and authorize the read:org scope');
    }

    // Group designations by scope, omitting any that are already marked as fulfilled.
    const designationsByScope = _.groupBy(file.designatedReviewers, entry => entry.scope ?? '');
    _.forEach(designationsByScope, (subjects, scope) => {
      if (_.some(subjects, subject => subject.builtin === 'fulfilled')) {
        delete designationsByScope[scope];
      }
    });

    // Keep track of the last processed revision's fulfilled scopes as we go.
    let fulfilledScopes = [];
    // Also keep track of previous reviewers across baseChangesOnly revisions.
    let reviewersDiscountingBaseChanges = [];

    _.forEach(file.revisions, rev => {
      // Reset previous reviewers if this revision had non-base changes.
      if (!rev.baseChangesOnly) {
        reviewersDiscountingBaseChanges = [];
      }

      // Check every designation subject against the list of reviewers, and against previous
      // reviewers if the subject is authorized to omit base changes, collecting the satisfying
      // reviewers for each scope as we go.
      const satisfyingReviewersByScope = _(designationsByScope).mapValues(subjects =>
        _(subjects).flatMap(subject =>
          _(rev.reviewers)
            .filter(reviewer => reviewerMatches(reviewer, subject))
            .concat(subject.omitBaseChanges ?
              _.filter(
                reviewersDiscountingBaseChanges,
                reviewer => reviewerMatches(reviewer, subject)
              ) : [])
            .value()
        ).uniqBy('username').value()
      ).pickBy('length').value();
      fulfilledScopes = _.keys(satisfyingReviewersByScope);

      // Mark a revision as reviewed if every designation scope was fulfilled.
      rev.reviewed = fulfilledScopes.length === _.size(designationsByScope);

      // Track previous reviewers (duplicates are fine).
      reviewersDiscountingBaseChanges.push(...rev.reviewers);
    });

    // Add fulfilled markers for scopes fulfilled at the file's last revision.
    _.forEach(fulfilledScopes, scope => {
      if (scope) file.designatedReviewers.push({builtin: 'fulfilled', scope});
    });

    // For each unfulfilled scope, wake the matching reviewers from the latest revision where any
    // appeared.  Designations only identify potential reviewers, so if nobody matching a scope has
    // reviewed the file yet, leave it unclaimed for the normal requested-reviewer fallback.
    _(designationsByScope).keys().difference(fulfilledScopes).forEach(scope => {
      const subjects = designationsByScope[scope];
      const lastMatchingRevision = _.findLast(file.revisions, rev =>
        _.some(rev.reviewers, reviewer =>
          _.some(subjects, subject => reviewerMatches(reviewer, subject))
        ));
      const lastMatchingReviewers = _.filter(
        lastMatchingRevision?.reviewers,
        reviewer => _.some(subjects, subject => reviewerMatches(reviewer, subject)));
      if (lastMatchingReviewers.length) {
        fileBlockers.push(...lastMatchingReviewers);
      } else {
        hasUnclaimedFiles = true;
      }
    });
  });

  return {files, pendingReviewers: computePendingReviewers(fileBlockers, hasUnclaimedFiles)};

  function revisionIsReviewed(revision) {
    if (revision.reviewed === false) return false;
    return revision.reviewed || _.some(revision.reviewers, reviewer => !reviewer.author);
  }

  function reviewerMatches(reviewer, subject) {
    if (reviewer.author &&
        !subject.username &&
        !(subject.includeAuthor && (subject.team || subject.builtin === 'anyone'))) {
      return false;
    }
    if (subject.builtin === 'anyone') return true;
    if (subject.username) {
      return _.toLower(reviewer.username) === _.toLower(subject.username);
    }
    const reviewerTeams = _(reviewer.teams)
      .map(_.toLower)
      .flatMap(team => [team, team.replace(/.*?\//, '')])
      .value();
    return _.includes(reviewerTeams, _.toLower(subject.team));
  }

  function computePendingReviewers(fileBlockers, hasUnclaimedFiles) {
    if (review.pullRequest.state !== 'open') return [];

    const discussionBlockers = _(review.discussions)
      .reject('resolved')
      .flatMap('participants')
      .reject('resolved')
      .value();

    const hasUnclaimedDiscussions = _(review.discussions)
      .reject('resolved')
      .map('participants')
      .some(participants =>
        _.every(participants, 'resolved') &&
        !_.some(participants, {disposition: 'mentioned'}));

    const hasUnclaimedItems = hasUnclaimedFiles || hasUnclaimedDiscussions;

    let missingReviewers = review.pullRequest.requestedReviewers;
    if (_.isEmpty(missingReviewers)) {
      missingReviewers = review.pullRequest.assignees;
      if (_.isEmpty(missingReviewers)) missingReviewers = review.pullRequest.reviewers;
      if (!hasUnclaimedItems) missingReviewers = _.reject(missingReviewers, 'participating');
    }

    const unresolvedMentions = _(review.discussions)
      .reject('resolved')
      .flatMap('participants')
      .filter({disposition: 'mentioned'})
      .value();

    const deferringReviewers = _.map(review.deferringReviewers, 'username');
    const pendingReviewers = _(fileBlockers)
      .concat(discussionBlockers)
      .concat(unresolvedMentions)
      .concat(missingReviewers)
      .reject('bot')
      .map(user => _.pick(user, 'username', 'teams'))
      .uniqBy('username')
      .reject(reviewer => _.includes(deferringReviewers, reviewer.username))
      .value();

    if (_.isEmpty(pendingReviewers) && !hasUnclaimedItems) {
      pendingReviewers.push({...review.pullRequest.author, fallback: true});
    }
    return pendingReviewers;
  }
}
