'use strict';
var _ = require('lodash');
/**
 * This is a handlebars helper to concatenate an arbitrary number of strings. Used like this..
 *          {{concat 'string1' 'string2' 'string3'}}
 */

var stringConcatHelper = function() {

  // Remove the context from the argument list
  var args = _.slice(arguments, 0, -1);

  return args.reduce(function(prev, curr) {
    if (typeof curr !== 'string') {
      throw 'Cannot concat ' + curr + ' because it is not a string';
    }
    return prev + curr;
  }, '');

};

var register = function(Handlebars) {
  Handlebars.registerHelper('stringConcat', stringConcatHelper);
};

module.exports = {
  register: register
};
