'use strict';

exports.api = {
  _: require('lodash'),
  require: function(path) {
    if (['http', 'https'].includes(path)) return require(path);
    throw new Error('Module not whitelisted: ' + path);
  }
};
