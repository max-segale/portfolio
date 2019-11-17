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
  return gulp.src('src/data/**')
    .pipe(gulp.dest('public/data'));
}

function actions() {
  return gulp.src('src/actions/**')
    .pipe(gulp.dest('public/actions'));
}

function img() {
  return gulp.src([
      'assets/**/*.jpg',
      'assets/**/*.png',
      'assets/**/*.svg'
    ])
    .pipe(gulp.dest('public/img'));
}

function fav() {
  return gulp.src('assets/icons/fav/*.ico')
    .pipe(gulp.dest('public'));
}

exports.default = gulp.parallel(views, style, scripts, data, actions, img, fav);

gulp.watch(['src/*.pug'], views);
gulp.watch(['src/*.scss'], style);
gulp.watch('src/*.js', scripts);
