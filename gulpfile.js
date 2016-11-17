'use strict'

const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('static', function() {
  return gulp.src(['app/*.html', 'app/**/*.html', 'app/**/*.jpg', 'app/**/*.png'])
    .pipe(gulp.dest('build'));
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

gulp.task('default', ['static', 'webpack:build']);
