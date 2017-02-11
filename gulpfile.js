/* eslint-disable */
var jade = require('gulp-jade');
var gulp = require('gulp');
var cors = require('cors');
var nodemon = require('gulp-nodemon');

gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src(['./src/web/**/*.js'])
    .pipe(gulp.dest('./public'));

  gulp.src(['./src/web/**/*.jade'])
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./public'))
});

gulp.task('nodemon', function runNodemon(cb) {
  var started = false;
  return nodemon({
    script: './src/server/index.js',
    tasks : ['templates'],
    ignore: ['/public/**'],
    watch : ['/src/'],
    ext : "js jade"
  }).on('start', function start() {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('default', ['templates', 'nodemon']);
