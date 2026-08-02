// Require every file revision to be marked by somebody acting as the pull request author as well
// as by at least one normal reviewer.  Author agents count as authors for this purpose.

// dependencies: lodash4

const files = [...review.files, ...review.systemFiles];
_.forEach(files, file => {
  _.forEach(file.revisions, revision => {
    revision.reviewed =
      _.some(revision.reviewers, 'author') &&
      _.some(revision.reviewers, reviewer => !reviewer.author);
  });
});

return {files};
