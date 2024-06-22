// This snippet checks for the existence of a directory called `third_party` used 
// to store vendored files. The regular expression can be changed to match  
// any directory where vendored files are placed. 
// When the `third_party` directory is found, the snippet below will mark
// all files in this directory as reviewed. 

// dependencies: lodash4

_.forEach(review.files, (file) => {

  if (/^third_party$/i.test(file.path)) {
    _.forEach(file.revisions, (rev) => {
      rev.reviewed = true;
    });
  }

});

return {
  files: review.files,
};