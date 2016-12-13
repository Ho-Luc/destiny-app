'use strict'

const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('static-html', function() {
  return gulp.src(['app/*.html', 'app/**/*.html'])
    .pipe(gulp.dest('./build'));
});

gulp.task('static-css', function() {
  return gulp.src(['app/**/*.jpg', 'app/css/*.css'])
    .pipe(gulp.dest('./build/css'));
});

gulp.task('webpack:build', () => {
  return gulp.src('./entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      watch: true,
      module: {
        loaders: [{
          test: /\.css$/,
          loaders: ['style', 'css']
        }]
      }
    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['static-html', 'static-css', 'webpack:build']);
