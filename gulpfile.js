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
const localData = {
  hero: {
    media: []
  }
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

// Compose SQL statements
function sqlStatement(mediaStatus, orderDir) {
  return `
    SELECT project_media.type, project_media.file, project_media.caption
    FROM project_media
      RIGHT JOIN hero_media ON project_media.id = hero_media.project_media_id
    WHERE hero_media.status = '${mediaStatus}'
    ORDER BY hero_media.order ${orderDir}
  `;
}

// Add results to local data, double the length
function sqlResult(rowResults, rowNum) {
  let row = imagesSizes(rowResults);
  row = row.concat(row);
  localData.hero.media[rowNum] = row;
}

// Get featured media from database
function sqlData(cb) {
  const connection = mysql.createConnection(sqlConnection);
  connection.connect();
  connection.query(sqlStatement('ROW_1', 'ASC'), (error, results, fields) => {
    sqlResult(results, 0);
  });
  connection.query(sqlStatement('ROW_2', 'DESC'), (error, results, fields) => {
    sqlResult(results, 1);
  });
  connection.end(cb);
}

// Delete existing content before build
function clean() {
  return del('public/*');
}

// Create HTML pages from Pug, use .php ext
function views() {
  return gulp.src('src/views/index.pug')
    .pipe(pug({
        locals: localData
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

// Copy actions and handlers
function actions() {
  return gulp.src('src/actions/*.php')
    .pipe(gulp.dest('public'));
}

// Copy image assets
function assets() {
  return gulp.src([
      'src/assets/icons/*',
      'src/assets/images/*'
    ])
    .pipe(gulp.dest('public'));
}

// Copy apache files
function apache() {
  return gulp.src([
      'src/apache/.htaccess'
    ])
    .pipe(gulp.dest('public'));
}

exports.default = gulp.series(
  sqlData,
  clean,
  gulp.parallel(
    views, styles, scripts, actions, assets, apache
  )
);

// Watch for file updates
gulp.watch('src/**/*.pug', views);
gulp.watch('src/**/*.sass', styles);
gulp.watch('src/**/*.js', scripts);
