const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const beautify = require('gulp-beautify');
const concat = require('gulp-concat');

function views() {
  return gulp.src('src/*.pug')
    .pipe(pug())
    .pipe(beautify.html({
      indent_size: 2,
      indent_inner_html: true,
      inline: [],
      extra_liners: []
    }))
    .pipe(rename({
      extname: '.php'
    }))
    .pipe(gulp.dest('public'));
}

function style() {
  return gulp.src('src/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public'));
}

function scripts() {
  return gulp.src('src/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('public'));
}

function data() {
  return gulp.src('src/sql/**')
    .pipe(gulp.dest('public/data'));
}

function actions() {
  return gulp.src('src/actions/**')
    .pipe(gulp.dest('public/actions'));
}

function img() {
  return gulp.src('assets/**')
    .pipe(gulp.dest('public/img'));
}

exports.default = gulp.parallel(views, style, scripts, data, actions, img);

gulp.watch(['src/*.pug'], views);
gulp.watch(['src/*.scss'], style);
gulp.watch('src/*.js', scripts);
gulp.watch('assets/**', img)
