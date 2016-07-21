'use strict';

const config = require('../../app/config');
const browserSync = require('browser-sync').create(config.get('app:title'));
const nodemon = require('gulp-nodemon');
const Path = require('path');
const prefix = require('./prefix');

const NODEMON_BOOT_WAIT_TIME = config.get('NODEMON_BOOT_WAIT_TIME');


const nodemonTask = (cb) => {
  let script = Path.join(__dirname, '..', '..', 'dev.js')
  let called = false;

  return nodemon({
    script: script,
    watch: [script],
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ],
    env: { 'NODE_ENV': 'development' }
  })
  .on('readable', () => {
    console.log('app is readable')
  })
  .on('start', () => {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!called) {
      setTimeout(() => {
        called = true;
        cb();
      }, NODEMON_BOOT_WAIT_TIME);
    }
  })
  .on('crash',()  => {
    console.log('nodemon.crash');
  })
  .on('restart', () => {
    setTimeout(() => {
      browserSync.reload({ stream: false });
    }, 1000);
  })
  .once('quit', () => {
    // handle ctrl+c without crying
    process.exit();
  });
}

const browserSyncTask = () => {
  browserSync.init({
    proxy: `http://localhost:${config.get('PORT')}`,
    files: [
      "app/static/**/*.*",
      "ui/**/*.*",
    ],
    browser: ['google chrome'],
    port: config.get('proxy'),
    notify: true,
    open: 'local',
  }, () => {
    console.log('Browserify booted');
  });
}


module.exports = (gulp) => {
  gulp.task(prefix('server'), [prefix('browser-sync')], () => {});
  gulp.task(prefix('browser-sync'), [prefix('nodemon')], browserSyncTask);
  gulp.task(prefix('nodemon'), nodemonTask);
}
