//use strict because:
//Block-scoped declarations (let, const, function, class) not yet
//supported outside strict mode
"use strict";
const icons = require("grunticon-lib");
const globby = require("globby");

let files = globby.sync('src/icons/*');
let options = {};

let icon = new icons(files, 'dist/icons', options);

icon.process();
