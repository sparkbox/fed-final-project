'use strict';

var dump = require('../../helpers/helper-json'),
    Handlebars = require('handlebars');

dump.register(Handlebars, {});

describe('JSON dump handlebars test', function() {
  var html, data;

  it('will return valid JSON when given a reference', function() {
    var template, result;

    data = { product: "test information" };
    html = "{{#json product}}{{/json}}";
    template = Handlebars.compile(html);
    result = template(data);

    expect(result).toEqual(JSON.stringify(data.product));
  });

  it('will return valid JSON when given modifier lookup', function() {
    var template, result;

    data = {
      'product': "test information",
      'product_mod-test': "test mod"
    };
    html = "{{#json product modifier='mod-test'}}{{/json}}";
    template = Handlebars.compile(html);
    result = template(data);

    expect(result).toEqual(JSON.stringify(data['product_mod-test']));
  });

  it('should return JSON when given valid JSON', function() {
    var template, result;

    data = {
      product: {
        dataStuff: "test mod"
      }
    };
    html = "{{#json 'product' print=true}}{{/json}}";
    template = Handlebars.compile(html);
    result = template(data);

    expect(result).toEqual(JSON.stringify(data.product));
  });
});
