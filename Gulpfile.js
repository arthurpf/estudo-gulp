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
    main:"src/*.html",
    includes:"src/**/*.html",
  },
  styles:{
    src:"src/assets/sass/*.scss",
    dist:"dist/assets/css",
  }

}

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(folder.styles.src)
      .pipe($.sass())
      .pipe(gulp.dest(folder.styles.dist))
      .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function() {

    del(folder.dist+'/*');
    gulp.src(folder.html.main).pipe($.copy('dist',{prefix:1}));
    gulp.watch(folder.styles.src, ['sass']);
    gulp.watch([folder.html.main,folder.html.includes]).on('change', browserSync.reload);

    browserSync.init({
        server: "./"+folder.dist
    });

});
