const gulp = require('gulp'),
      pug = require('gulp-pug'),
      scss = require('gulp-sass'),
      clean = require('gulp-clean'),
      rename = require('gulp-rename');

gulp.task('scss', ['clean'], () => {
    return gulp.src('./src/scss/main.scss')
        .pipe(scss().on('error', scss.logError))
        .pipe(rename((path) => {
            path.basename = 'style'
        }))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('pug', ['clean'], () => {
    return gulp.src('./src/pug/main.pug')
        .pipe(pug({
            pretty: true,
        }))
        .pipe(rename((path) => {
            path.basename = 'index'
        }))
        .pipe(gulp.dest('./src/'));
});

gulp.task('clean', () => {
    return gulp.src(['./src/*.html', './src/css/*.css'])
        .pipe(clean());
});

gulp.task('watch', () => {
    return gulp.watch(['./src/pug/*.pug', './src/scss/*.scss'], ['pug', 'scss']);
});

gulp.task('default', ['watch']);