'use strict';

// Include modules
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
const sizeOf = require('image-size');
const mysql = require('mysql');
const sqlConnection = require('./sql-connection.json');
const sqlData = {
  media: []
};

// Choose Sass compiler
sass.compiler = require('sass');

// Get dimensions of images
function imagesSizes(images) {
  let imgDims = null;
  images.forEach((image) => {
    imgDims = sizeOf(`./src/assets/images/${image.file}`);
    image.width = imgDims.width;
    image.height = imgDims.height;
  });
  return images;
}

// Get featured images from database
function sqlQuery(callbackFn) {
  const connection = mysql.createConnection(sqlConnection);
  connection.connect();
  connection.query('SELECT type, file, caption FROM project_media', (error, results, fields) => {
    sqlData.media[0] = imagesSizes(results);
  });
  connection.query('SELECT type, file, caption FROM project_media', (error, results, fields) => {
    sqlData.media[1] = imagesSizes(results);
  });
  connection.end(callbackFn);
}

// Delete existing content before build
function clean() {
  return del('public/*');
}

// Create HTML pages from Pug, use .php ext
function pages() {
  return gulp.src('src/pages/index.pug')
    .pipe(pug({
        locals: {
          hero: sqlData
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

exports.default = gulp.series(
  sqlQuery,
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
