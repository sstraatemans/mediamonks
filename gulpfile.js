var gulp = require('gulp');
var sync    = require('run-sequence');
var uglify = require('gulp-uglify');
var sass     = require('gulp-sass');
var sync    = require('run-sequence');
var browser = require('browser-sync');
var webpack = require('webpack-stream');
var sourcemaps = require('gulp-sourcemaps');


/*
map of paths for using with the tasks below
 */
var paths = {
  entry: 'assets/ts/app.ts',
  sass: ['assets/scss/**/*'],
  toCopy: ['index.html', 'assets/image/**/*', 'assets/font/**/*'],
  dest: 'dist',
  cssdest: 'dist/css',
  jsdest: 'dist/js'
};

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssdest));
});



gulp.task('build', function() {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.jsdest));
});


gulp.task('copy', function() {
  gulp.src('index.html')
  .pipe(gulp.dest('dist/'))
    gulp.src('assets/image/**/*')
    .pipe(gulp.dest('dist/image'))
    gulp.src('assets/font/**/*')
    .pipe(gulp.dest('dist/font'))
    ;
});


gulp.task('serve', function() {
  browser({
    port: process.env.PORT || 4500,
    open: false,
    ghostMode: false,
    server: {
      baseDir: 'dist'
    }
  });
});


/*
task to watch files for changes and call build and copy tasks
 */
 /*
 task to watch files for changes and call build and copy tasks
  */
 gulp.task('watch', function() {
   gulp.watch(paths.toCopy, ['copy', browser.reload]);
   gulp.watch(paths.sass, ['sass', browser.reload]);
   gulp.watch(paths.entry, ['build', browser.reload]);
 });

gulp.task('default', function() {
  sync('sass', 'build', 'copy', 'serve', 'watch');
});
