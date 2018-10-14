const gulp = require('gulp'),
      pug = require('gulp-pug'),
      scss = require('gulp-sass'),
      clean = require('gulp-clean'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename');

gulp.task('scss', () => {
    gulp.src('./src/scss/main.scss')
        .pipe(scss().on('error', scss.logError))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('pug', () => {
    return gulp.src('./src/pug/main.pug')
        .pipe(pug({
            pretty: true,
        }))
        .pipe(rename((path) => {
            path.basename = 'index'
        }))
        .pipe(gulp.dest('./src/'));
});

gulp.task('concat:css', () => {
    return gulp.src(['./src/css/normalize.css', './src/css/main.css'])
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', () => {
    return gulp.watch(['./src/pug/*.pug', './src/scss/*.scss'], ['pug', 'scss']);
});

gulp.task('default', ['watch']);