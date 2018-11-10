'use strict'
const fs = require('fs')
const gulp = require('gulp')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const info = JSON.parse(fs.readFileSync('./build.json'))
const files = info.files
const replace = require('gulp-replace')

gulp.task('build', function() {
  return gulp
    .src(files)
    .pipe(replace('/* @echo EXPORT */', 'export '))
    .pipe(sourcemaps.init())
    .pipe(concat('black-es6-module.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch-build', ['build'], function() {
  gulp.watch(['./src/**/*.js'], ['build'])
})

// INTERNAL TASKS
gulp.task('copy-examples', ['build-es6'], function() {
  return gulp
    .src('./dist/black-es6*.*')
    .pipe(gulp.dest('../Blacksmith-Docs/node_modules/black/dist/'))
})

gulp.task('examples', ['build-es6', 'copy-examples'], function() {
  gulp.watch(['./src/**/*.js'], ['copy-examples'])
})

gulp.task('copy-template', ['build-es6-module'], function() {
  return gulp
    .src('./dist/black-es6-module.js')
    .pipe(gulp.dest('../Black-Template/node_modules/black/dist/'))
})

gulp.task('template', ['build-es6-module', 'copy-template'], function() {
  gulp.watch(['./src/**/*.js'], ['copy-template'])
})
