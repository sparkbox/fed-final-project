(function() {
  var _ = require("lodash"),
        build,
        fm = require("front-matter"),
        fs = require("fs-extra"),
        globby = require("globby"),
        Handlebars = require("handlebars"),
        helpers = require('handlebars-helpers'),
        layoutPicker,
        layouts,
        path = require("path"),
        renderPage,
        renderTemplate,
        requireDir = require("require-dir");

  layouts = {
    'default': './src/layout/default.hbs'
  };

  /**
   * renderTemplate
   * @param {string} templatePath Path to the template being rendered
   * @return {string} Compiled Handlebars HTML
   */

  renderTemplate = function(templatePath) {
    var context,
          file,
          frontMatter,
          template;
    file = fs.readFileSync(templatePath, 'utf8');
    console.log('working on: ', templatePath);
    frontMatter = fm(file);
    context = frontMatter.attributes;
    template = Handlebars.compile(frontMatter.body);
    return template(context);
  };


  /**
   * renderPage
   * @param {string} template Template HTML as rendered by Handlbars
   * @return {string} HTML of the page rendered
   */

  renderPage = function(template, layoutPath) {
    var assetPath = '',
          context,
          file,
          i,
          noOfParentDirectory,
          page;

    file = fs.readFileSync(layoutPath, 'utf8');
    page = Handlebars.compile(file);


    context = _.assign({
      body: template
    });
    return page(context);
  };


  /*
   * layoutPicker
   * Returns layout based on url pattern object.
   * @param {url pattern} res layout path
   */

  layoutPicker = function(pattern) {
    var key;
    key = void 0;
    for (key in layouts) {
      key = key;
      if (pattern.indexOf(key) > -1) {
        return path.resolve(layouts[key]);
      }
    }
    return path.resolve(layouts['default']);
  };

  registerPartials = function() {
    _.each(globby.sync('src/partials/**/*.hbs'), function(file, i) {
      var fileName = path.basename(file, '.hbs');
      var fileOutput = fs.readFileSync(file, 'utf8');
      Handlebars.registerPartial(fileName, fileOutput);
    });

  };

  build = function() {
    var hbsPatterns;
    hbsPatterns = globby.sync('src/pages/**/*.hbs');
    registerPartials();
    return _.each(hbsPatterns, function(file, i) {
      var fileName, layoutPath, page, template;
      fileName = path.basename(file, '.hbs');
      layoutPath = layoutPicker(fileName);
      template = renderTemplate(file);
      page = renderPage(template, layoutPath);
      return fs.outputFileSync("dist/" + fileName + ".html", page, 'utf8');
    });
  };

  build();

}).call(this);
