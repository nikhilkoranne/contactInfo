var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();
var karma = require('gulp-karma');

var allFiles = [
  './src/**/*.spec.js'
];

gulp.task('test', function (coverage) {
  gulp.src(allFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function (err) {
      throw err;
    });
});

gulp.task('vendor', function () {
  gulp.src([
    './node_modules/angular/angular.min.js',
    './node_modules/angular-route/angular-route.min.js',
    './node_modules/angular-messages/angular-messages.min.js',
  ])
    .pipe(gulp.dest('./vendor/angular'))

  gulp.src([
    './node_modules/bootstrap/dist/**/*',
    '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
    '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
  ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  gulp.src([
    './node_modules/font-awesome/**/*',
    '!./node_modules/font-awesome/{less,less/*}',
    '!./node_modules/font-awesome/{scss,scss/*}',
    '!./node_modules/font-awesome/.*',
    '!./node_modules/font-awesome/*.{txt,json,md}'
  ])
    .pipe(gulp.dest('./vendor/font-awesome'))
});

gulp.task('css:compile', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});

gulp.task('css:minify', ['css:compile'], function () {
  return gulp.src([
    './css/*.css',
    '!./css/*.min.css'
  ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('css', ['css:compile', 'css:minify']);

gulp.task('js:minify', function () {
  return gulp.src([
    './src/**/*.js',
  ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('js', ['js:minify']);

gulp.task('default', ['css', 'js', 'vendor']);

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('serve', ['css', 'js', 'browserSync', 'test'], function () {
  gulp.watch('./scss/**/*.scss', ['css', browserSync.reload]);
  gulp.watch('./src/**/*.js', ['js', browserSync.reload]);
  gulp.watch('./**/*.html', browserSync.reload);
});