'use strict';

var gulp              = require('gulp'),
    sass              = require('gulp-sass'),
    autoprefixer      = require('gulp-autoprefixer'),
    cleanCSS          = require('gulp-clean-css'),
    watch             = require('gulp-watch'),
    sourcemaps        = require('gulp-sourcemaps'),
    browserSync       = require('browser-sync').create(),
    mainBowerFiles    = require('main-bower-files'),
    imagemin          = require('gulp-imagemin'),
    fontmin           = require('gulp-fontmin'),
    flatten           = require('gulp-flatten');

            //browsersync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./frontend/stylesheets/**/*.scss', ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

            // sass
gulp.task('sass', function () {
    return gulp.src('./frontend/stylesheets/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});
            //font: watch/build/
gulp.task('font:watch', ['font:build'], function () {
    return watch('./frontend/fonts/**/*.ttf', function () {
        gulp.src('./frontend/fonts/**/*.ttf')
            .pipe(fontmin())
            .pipe(gulp.dest('./public/fonts'));
    });
});

gulp.task('font:build', function () {
    gulp.src('./frontend/fonts/**/*.ttf')
        .pipe(fontmin())
        .pipe(gulp.dest('./public/fonts'));
});
            //image: watch/build/min
gulp.task('image:watch', ['image:build'], function () {
    return watch(['./frontend/images/**/*.jpg', './frontend/images/**/*.png', './frontend/images/**/*.svg', './frontend/images/**/*.gif'], function () {
        gulp.src(['./frontend/images/**/*.jpg', './frontend/images/**/*.png', './frontend/images/**/*.svg', './frontend/images/**/*.gif'])
            .pipe(imagemin())
            .pipe(gulp.dest('./public/images'));
    });
});

gulp.task('image:build', function () {
    gulp.src(['./frontend/images/**/*.jpg', './frontend/images/**/*.png', './frontend/images/**/*.svg', './frontend/images/**/*.gif'])
            .pipe(imagemin())
            .pipe(gulp.dest('./public/images'));
});
            //js: watch/build
gulp.task('js:watch', ['js:build'], function () {
    return watch('./frontend/javascript/**/*.js', function () {
        gulp.src('./frontend/javascript/**/*.js')
            .pipe(gulp.dest('./public/js'));
    });
});

gulp.task('js:build', function () {
    gulp.src('./frontend/javascript/**/*.js')
        .pipe(gulp.dest('./public/js'));
});
            //bower files: CSS
gulp.task('main-css', function () {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(gulp.dest('./public/css'));
});
            //bower files: JS
gulp.task('main-js', function () {
    return gulp.src(mainBowerFiles('**/*.js'))
        .pipe(gulp.dest('./public/js'));
});
gulp.task('default', ['sass', 'browser-sync',  'font:watch', 'image:watch', 'main-css', 'main-js', 'js:watch']);
