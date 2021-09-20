// This code simply puts all files with the word 'test' anywhere in their path into their own
// 'Tests' group in the file matrix. All other review completion semantics are inherited from
// Reviewable's defaults.

// dependencies: lodash4

_.forEach(review.files, file => {
  if (/test/i.test(file.path)) file.group = 'Tests';
});

return {
  files: review.files
};
