'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    cmq = require('gulp-combine-media-queries'),
    uncss = require('gulp-uncss'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


// settings
var settings = {
  build: 'build',
  source: 'src'
};


// lint js
gulp.task('lint', function() {
  'use strict';

  gulp.src(settings.source + '/js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});


// minify js
gulp.task('js', function() {
  return browserify(settings.source + '/js/app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(settings.build + '/assets/js'));
});


// minify css
gulp.task('css', function() {
    gulp.src(settings.source + '/scss/**/*.scss')
    .pipe(sass({
        precision: 6,
        includePaths: [
            './bower_components/bootstrap-sass/assets/stylesheets',
            './bower_components/normalize-scss'
        ]
    }).on('error', gutil.log))
    .pipe(autoprefixer('last 2 version', 'ie 11', 'ios 8'))
    .pipe(cmq({log: true}))
    .pipe(cssnano())
    .pipe(gulp.dest(settings.build + '/assets/css'))
    .pipe(reload({stream: true}));
});


// minify images
gulp.task('images', function() {
  return gulp.src('src/images/**')
    .pipe(imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).on('error', gutil.log)
    .pipe(gulp.dest('build/assets/images'));
});


// reload function
gulp.task('bs-reload', function() {
    browserSync.reload();
});


// browsersync
gulp.task('browser-sync', function() {
    browserSync.init([settings.build + 'css/*.css', settings.build + 'js/*.js'], {
        server: {baseDir: 'build'}
    });
});


gulp.task('default', ['build', 'browser-sync'], function() {
    gulp.watch([settings.source + '/js/**/*.js'], ['lint', 'js']);
    gulp.watch([settings.source + '/scss/**/*.scss', settings.source + '/css/**/*.css'], ['css'], reload);
    gulp.watch([settings.build + '/**/*.html'], ['bs-reload']);
});

gulp.task('build', ['lint', 'js', 'css', 'browser-sync']);
