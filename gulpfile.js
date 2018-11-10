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
    .pipe(concat('es6-module.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('build:watch', ['build'], function() {
  gulp.watch(['./src/**/*.js'], ['build'])
})
