/**
 * Handlebars Helpers for Pattern Lab
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */
'use strict';

var path = require('path');

module.exports.register = function (Handlebars, options, params) {

  Handlebars.registerHelper('json', function(context, options) {
    var dataDump;
    if(!!options.hash.modifier) {
      var key = '';
      for(var item in this) {
        if(this[item] === context) {
          key = item;
          break;
        }
      }
      key = key + '_' + options.hash.modifier;
      dataDump = this[key];
    } else if(!!options.hash.print) {
      // Allows for printing out JSON from
      // a string lookup
      dataDump = this[context];
    } else {
      dataDump = context;
    }

    return JSON.stringify(dataDump);
  });
};
