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

// Delete existing content before build
function clean() {
  return del('public/**/*');
}

// Create HTML pages from Pug, use .php ext
function pages() {
  return gulp.src('src/*.pug')
    .pipe(pug())
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

// Create style sheet from SCSS
function styles() {
  return gulp.src('src/*.scss')
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(beautify.css({
      indent_size: 4
    }))
    .pipe(gulp.dest('public'))
}

// Merge js into single script
function scripts() {
  return gulp.src('src/*.js')
    .pipe(concat('scripts.js'))
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
  return gulp.src('src/*.php')
    .pipe(gulp.dest('public'));
}

// Copy images
function images() {
  return gulp.src([
      'assets/**/*.jpg',
      'assets/**/*.png',
      'assets/**/*.svg'
    ])
    .pipe(gulp.dest('public/img'));
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
gulp.watch('src/*.pug', pages);
gulp.watch('src/*.scss', styles);
gulp.watch('src/*.js', scripts);
gulp.watch('src/*.php', php);
