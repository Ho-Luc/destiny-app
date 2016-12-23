'use strict'

const gulp = require('gulp');
const webpack = require('webpack-stream');

let paths = {
  css: ['app/css/*.css'],
  html: ['app/index.html'],
  scripts: ['./entry.js']
}

gulp.task('static-html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest('./build'));
});

gulp.task('static-css', function() {
  return gulp.src(paths.css)
    .pipe(gulp.dest('./build/css'));
});

gulp.task('webpack:build', () => {
  return gulp.src(paths.scripts)
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [{
          test: /\.css$/,
          loaders: ['style', 'css']
        }]
      }
    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.html, ['static-html']);
  gulp.watch(paths.css, ['static-css']);
  gulp.watch(paths.scripts, ['webpack:build']);
});

gulp.task('default', ['watch' ,'static-html', 'static-css', 'webpack:build']);
