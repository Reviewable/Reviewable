// Restore the pre-self-review semantics where a review mark from anyone, including the pull request
// author or an agent acting as the author, is sufficient to review a file revision.  Note that this
// won't affect how self-review marks look in the UI.

// dependencies: lodash4

const files = [...review.files, ...review.systemFiles];
_.forEach(files, file => {
  _.forEach(file.revisions, revision => {
    revision.reviewed = !_.isEmpty(revision.reviewers);
  });
});

return {files};
