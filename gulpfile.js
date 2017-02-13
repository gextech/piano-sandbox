/* eslint-disable */
var fs = require('fs');
var jade = require('gulp-jade');
var gulp = require('gulp');
var refresh = require('gulp-refresh');
var nodemon = require('gulp-nodemon');
var yargs = require('yargs');
var argv = require('yargs').argv;

// Cli flags
var options = {
  https: (typeof argv.https === 'undefined'),
  reload: (typeof argv.reload === 'undefined'),
}

gulp.task('templates', function() {
  var LOCALS = {
    // Read content in src/web/pages
    pages: function() {
      var pages = fs.readdirSync('src/web/pages');
      return pages.map(function (page) {
        return 'pages/' + page;
      });
    }
  }

  gulp.src(['src/web/**/*.js'])
    .pipe(gulp.dest('public'));

  gulp.src(['src/web/**/*.jade', '!src/web/header.jade'])
    .pipe(jade({
      pretty: true,
      locals: LOCALS
    }))
    .pipe(gulp.dest('public'))
});

gulp.task('nodemon', function runNodemon(cb) {
  var started = false;

  var httpsKeys = (!options.https) ? {} :  {
    key: fs.readFileSync('./piano-gex.pem'),
    cert: fs.readFileSync('./piano-gex-cert.pem')
  }
  refresh.listen(httpsKeys);
  return nodemon({
    script: 'src/server/index.js',
    args: ['--https=' + options.https],
    tasks : ['templates'],
    ignore: ['public/**'],
    watch : ['src/'],
    ext : "js jade"
  }).on('start', function start() {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  }).on('restart', function () { 
    if (options.reload) {
      setTimeout(refresh.reload, 1000)
    }
  });
});

gulp.task('default', ['templates', 'nodemon']);
