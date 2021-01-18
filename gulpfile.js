'use strict';

// Set modules
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const beautify = require('gulp-beautify');
const concat = require('gulp-concat');
const babel = require("gulp-babel");
const del = require('del');
const autoprefixer = require('autoprefixer');

const dataFeatured = require('./src/data/featured.json');

sass.compiler = require('sass');

// Delete existing content before build
function clean() {
  return del('public/*');
}

// Create HTML pages from Pug, use .php ext
function pages() {
  return gulp.src('src/pages/*.pug')
    .pipe(pug({
        locals: {
          featured: dataFeatured
        }
      })
    )
    .pipe(beautify.html({
      indent_size: 4,
      indent_inner_html: true,
      inline: [],
      extra_liners: []
    }))
    .pipe(rename({
      extname: '.php'
    }))
    .pipe(gulp.dest('public'));
}

// Create style sheet from Sass
function styles() {
  return gulp.src('src/styles/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(beautify.css({
      indent_size: 4
    }))
    .pipe(rename({
      basename: 'style'
    }))
    .pipe(gulp.dest('public'));
}

// Merge js into single script
function scripts() {
  return gulp.src('src/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({
      comments: false,
      minified: true
    }))
    .pipe(beautify.js({
      indent_size: 4
    }))
    .pipe(gulp.dest('public'));
}

// Copy action and data handlers
function php() {
  return gulp.src('src/actions/*.php')
    .pipe(gulp.dest('public'));
}

// Copy images
function images() {
  return gulp.src([
      'src/assets/images/*',
      'src/assets/icons/*'
    ])
    .pipe(gulp.dest('public'));
}

// Copy favicon
function fav() {
  return gulp.src('assets/icons/fav/*.ico')
    .pipe(gulp.dest('public'));
}

// Use clean build as default script
exports.default = gulp.series(
  clean,
  gulp.parallel(
    pages, styles, scripts, php, images, fav
  )
);

// Watch for file updates
gulp.watch('src/**/*.pug', pages);
gulp.watch('src/**/*.sass', styles);
gulp.watch('src/**/*.js', scripts);
gulp.watch('src/**/*.php', php);
