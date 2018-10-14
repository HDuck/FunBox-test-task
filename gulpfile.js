const gulp = require('gulp'),
      pug = require('gulp-pug'),
      scss = require('gulp-sass'),
      clean = require('gulp-clean'),
      concat = require('gulp-concat'),
      copy = require('gulp-copy'),
      cssMinify = require('gulp-csso'),
      rename = require('gulp-rename');

gulp.task('scss', () => {
    gulp.src('./src/scss/main.scss')
        .pipe(scss().on('error', scss.logError))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('pug', () => {
    return gulp.src('./src/pug/main.pug')
        .pipe(pug({
            pretty: false,
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

gulp.task('clean', () => {
    return gulp.src('./docs')
        .pipe(clean({force: true}));
});

gulp.task('html2docs', () => {
    return gulp.src('./src/index.html')
    .pipe(copy('./docs', {prefix: 1}))
    .pipe(gulp.dest('./docs'));
});

gulp.task('css2docs', () => {
    return gulp.src('./src/css/styles.css')
    .pipe(cssMinify())
    .pipe(copy('./docs', {prefix: 1}))
    .pipe(gulp.dest('./docs'));
});

gulp.task('img2docs', () => {
    return gulp.src('./src/img/*.png')
        .pipe(copy('./docs', {prefix: 1}))
        .pipe(gulp.dest('./docs'));
});

gulp.task('font2docs', () => {
    return gulp.src('./src/fonts/*.otf')
        .pipe(copy('./docs', {prefix: 1}))
        .pipe(gulp.dest('./docs'));
});

gulp.task('js2docs', () => {
    return gulp.src('./src/js/*.js')
        .pipe(copy('./docs', {prefix: 1}))
        .pipe(gulp.dest('./docs'));
});

gulp.task('build', ['pug', 'html2docs', 'scss', 'concat:css', 'css2docs', 'img2docs', 'font2docs', 'js2docs']);