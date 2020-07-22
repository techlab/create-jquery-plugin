// Include the required tools used on tasks
var gulp          = require('gulp'),
    jshint        = require('gulp-jshint'),
    rename        = require('gulp-rename'),
    uglify        = require('gulp-uglify'),
    saveLicense   = require('uglify-save-license'),
    babel         = require("gulp-babel"),
    postcss       = require('gulp-postcss'),
    cleanCSS      = require('gulp-clean-css'),
    cssbeautify   = require('gulp-cssbeautify'),
    autoprefixer  = require('autoprefixer'),
    del           = require('del');

var Server        = require('karma').Server;
var browserSync   = require('browser-sync').create();

// Specify the Source files
var SRC_JS        = 'src/js/*.js';
var SRC_CSS       = 'src/css/*.css';

// Specify the Destination folders
var DEST_JS       = 'dist/js';
var DEST_CSS      = 'dist/css';

// Example pages
var EXAMPLE_HTML  = 'examples/*.html';

// BUILD JS
function build_js(cb) {
  gulp.src(SRC_JS)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(DEST_JS))
        .pipe(uglify({
            output: {
                comments: saveLicense
            }
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(DEST_JS));

  cb();
}

// BUILD CSS
function build_css(cb) {
  gulp.src(SRC_CSS)
        .pipe(postcss( [autoprefixer()] ))
        .pipe(cssbeautify({ autosemicolon: true }))
        .pipe(gulp.dest(DEST_CSS))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(DEST_CSS));

  cb();
}

// LINT
function lint_js(cb) {
  gulp.src(SRC_JS)
      .pipe(jshint({ "esversion": 8 }))
      .pipe(jshint.reporter('default'));

  cb();
}

// CLEAN
function clean_js(cb) {
  del.sync([DEST_JS]);

  cb();
}

function clean_css(cb) {
  del.sync([DEST_CSS]);

  cb();
}

// WATCH
function watch(cb) {
  gulp.watch(SRC_JS, build_js);
  gulp.watch(SRC_CSS, build_css);

  cb();
}

// SERVE
function serve(cb) {
  // Serve files from the root of this project
  browserSync.init({
      server: {
          baseDir: ["examples", "dist"],
          index: "index.html"
      }
  });

  gulp.watch(SRC_JS, build_js);
  gulp.watch(SRC_CSS, build_css);

  gulp.watch([DEST_JS, DEST_CSS, EXAMPLE_HTML]).on("change", browserSync.reload);

  cb();
}

// TEST
function test(cb) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();

  cb();
}

// EXPORT methods
exports.clean   = gulp.parallel(clean_js, clean_css);
exports.build   = gulp.parallel(gulp.series(clean_js, lint_js, build_js), gulp.series(clean_css, build_css));
exports.lint    = lint_js;
exports.watch   = watch;
exports.test    = test;
exports.serve   = serve;
exports.default = serve;
