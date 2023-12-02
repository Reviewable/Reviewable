// The function below applies the designated reviewers set by your condition (or automatically
// inferred from CODEOWNERS) to set:
//   1. Each file revision's `reviewed` flag, based on whether every designation scope has at least
//      one reviewer for the revision (including the default unnamed scope).
//   2. Each file designation scope's `fulfilled` flag, based on whether that scope has at least one
//      reviewer in the file's last revision.
// You should invoke the function with the `files` structure you'll be returning from your condition
// (likely `review.files`) after you're done setting all the files' `designatedReviewers`.  The
// function will fail if the condition executor was unable to resolve all review participants' team
// memberships; if so, make sure that you've connected the repository and authorized the `read:org`
// OAuth scope for the connector (and ideally any other repository admins).

// dependencies: lodash4

function applyDesignatedReviewers(files) {
  _.forEach(files, file => {
    // Skip the file if no designatedReviewers set.
    if (!file.designatedReviewers) return;

    // Check that team memberships were successfully resolved for every reviewer.
    if (_.some(file.designatedReviewers, 'team') &&
      !_(file.revisions).flatMap('reviewers').map('teams').every()) {
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
    let reviewerUsernamesDiscountingBaseChanges = [];
    let reviewerTeamsDiscountingBaseChanges = [];

    _.forEach(file.revisions, rev => {
      // Reset previous reviewers if this revision had non-base changes.
      if (!rev.baseChangesOnly) {
        reviewerUsernamesDiscountingBaseChanges = [];
        reviewerTeamsDiscountingBaseChanges = [];
      }

      // Check every designation subject against the list of reviewers, and against previous
      // reviewers if the subject is authorized to omit base changes, collecting a list of fulfilled
      // scopes as we go.
      const reviewerUsernames = _(rev.reviewers).map('username').map(_.toLower).value();
      const reviewerTeams = _(rev.reviewers)
        .flatMap('teams').map(_.toLower).flatMap(team => [team, team.replace(/.*?\//, '')]).value();
      fulfilledScopes = _(designationsByScope).keys().filter(scope => {
        const subjects = designationsByScope[scope];
        return _.some(subjects, subject =>
          subject.builtin === 'anyone' && reviewerUsernames.length ||
          _.includes(reviewerUsernames, _.toLower(subject.username)) ||
          _.includes(reviewerTeams, _.toLower(subject.team)) ||
          subject.omitBaseChanges && (
            subject.builtin === 'anyone' && reviewerUsernamesDiscountingBaseChanges.length ||
            _.includes(reviewerUsernamesDiscountingBaseChanges, _.toLower(subject.username)) ||
            _.includes(reviewerTeamsDiscountingBaseChanges, _.toLower(subject.team)))
        );
      }).value();

      // Mark a revision as reviewed if every designation scope was fulfilled.
      rev.reviewed = fulfilledScopes.length === _.size(designationsByScope);

      // Track previous reviewers (duplicates are fine).
      reviewerUsernamesDiscountingBaseChanges.push(...reviewerUsernames);
      reviewerTeamsDiscountingBaseChanges.push(...reviewerTeams);
    });

    // Add fulfilled markers for scopes fulfilled at the file's last revision.
    _.forEach(fulfilledScopes, scope => {
      if (scope) file.designatedReviewers.push({builtin: 'fulfilled', scope});
    });
  });
}
