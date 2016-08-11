var stringConcat = require('../../helpers/helper-string-concat'),
  Handlebars = require('handlebars');

stringConcat.register(Handlebars);
describe('stringConcat helper', function() {
  it('should concat string args', function() {
    var source = '{{stringConcat "string1" "string2" "string3"}}',
      template = Handlebars.compile(source);
    expect(template()).toEqual('string1string2string3');
  });

  it('should throw error for non-string args', function() {
    var source = '{{stringConcat 1}}',
      template = Handlebars.compile(source);
    expect(template).toThrow('Cannot concat 1 because it is not a string');
  });
});
