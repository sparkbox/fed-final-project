'use strict';

module.exports.register = function(Handlebars) {
  Handlebars.registerHelper('includes', function(value, test, options) {
    var values = test.split(',').map(function(item) {
          return item.trim();
        });

    if (values.indexOf(value) >= 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
};
