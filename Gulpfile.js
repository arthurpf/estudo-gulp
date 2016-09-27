'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('delete');
var $ = plugins;
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

var folder = {
  dist:'dist',
  html:{
    main:"src/pages/**/*.html",
    includes:"src/templates",
  },
  styles:{
    src:"src/assets/sass/**/*.scss",
    dist:"dist/assets/css",
  }

}

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(folder.styles.src)
      .pipe($.sass().on('error', $.sass.logError))
      .pipe(gulp.dest(folder.styles.dist))
      .pipe(browserSync.stream());
});

gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src(folder.html.main)
  // Renders template with nunjucks
  .pipe($.nunjucksRender({
      path: [folder.html.includes]
    }))
  // output files in app folder
  .pipe(gulp.dest(folder.dist))
});

// Clear folder before do the magic
gulp.task('clean',function(){
  return del(folder.dist);
});


gulp.task('serve', ['clean','sass','nunjucks'], function() {

      gulp.watch(folder.styles.src, ['sass']).on('change', reload);
      gulp.watch([folder.html.main,folder.html.includes],['nunjucks']).on('change', reload);

      browserSync.init({
          server: "./"+folder.dist
      });

});
