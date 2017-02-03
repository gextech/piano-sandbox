var jade = require('gulp-jade');
var gulp = require('gulp');
var connect = require('gulp-connect');
var cors = require('cors');

gulp.task('connect', function() {
  connect.server({
    root: './src/main/web',
    middleware: function() {
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
        return [cors()];
    }
  });
});

var nodemon = require('gulp-nodemon');

gulp.task('templates', function() {
  var YOUR_LOCALS = {};


  gulp.src(['./src/main/web/js/*.js','./src/main/web/js/**/*.js'], {base: './src/main/web/js/'})
    .pipe(gulp.dest('./public/js'));

  gulp.src(['./src/main/web/*.jade', './src/main/web/**/*.jade'])
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./public/'))
});



gulp.task('nodemon', function runNodemon(cb) {
  var started = false;

  return nodemon({
    script: './src/main/js/index.js',
    tasks : ['templates'],
    ignore: ['/public/**'],
    watch : ['/src/main/js/', '/src/main/web/'],
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
