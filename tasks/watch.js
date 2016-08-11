//use strict because:
//Block-scoped declarations (let, const, function, class) not yet
//supported outside strict mode
"use strict";

const chokidar = require( "chokidar");
const path = require( "path");
const shell = require( "shelljs");
const tinylr = require( "tiny-lr");
const exit = require( "exit-hook");
const options = {
  ignoreDotFiles: true
};
let tinyServer = tinylr();

const watcher = chokidar.watch(['src/scss', 'src/pages', 'src/layout', 'src/partials', 'src/icons', 'src/public', 'src/js', 'dist/css'], {
  ignored: /[\/\\]\./,
  ignoreInitial: true
});

tinylr().listen(35729, function() {
  console.log('livereload up...');
});

watcher.on("change", f => checkTypeOfEvent(f));
watcher.on("add", f => checkTypeOfEvent(f));

/**
 * Does some checking on the file that changed
 *
 * @param f - file path that changed
 */
const checkTypeOfEvent = (f) => {
  const type = path.extname(f).split('.')[1];

  if (type === "scss") {
    buildSass();
  } else if (type === 'css') {
    tinylr.changed(f);
  } else if (type === 'js') {
    taskReload(f, 'npm run scripts', '🐍  new javascript');
  } else if (type === 'hbs') {
    taskReload(f, 'npm run html', '🦁  new html');
  } else if (f.search(/public/) != -1) {
    taskReload(f, 'npm run copy', '🐶  new file in public');
  } else if (type === 'svg') {
    taskReload(f, 'npm run icons', '🦄  new icon');
  }
}

/**
 * Wrapper for running tasks and reloading the browser when task is complete
 *
 * @param f - object of file that has changed
 * @param task - string of task to execute
 * @param message - string of message to show when task is complete
 */
const taskReload = (f, task, message) => {
  shell.exec(task, function(code, output){
    console.log(`${message}... \n🐼  reloading browser...`);
    tinylr.changed(f);
  });
}

const buildSass = () => {
  shell.exec('npm run sass', function(code, output){
    console.log('🐭  build new sass...');
  });
}

exit(function () {
  console.log('🐷  cleaning up...');
  watcher.close();
  tinyServer.close();
});
