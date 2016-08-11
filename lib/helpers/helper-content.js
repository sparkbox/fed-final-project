
'use strict';

module.exports.register = function(Handlebars) {
  Handlebars.registerHelper('content', function(context, key) {
    return context[key];
  });
};
