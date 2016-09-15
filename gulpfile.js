var gulp = require('gulp');
var through = require('through');
var flatten = require('gulp-flatten');
var concat = require('gulp-concat');
var image = require('gulp-image');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch'); gulp.watch = watch;
var autoprefixer = require('gulp-autoprefixer');
var rigger = require('gulp-rigger');


gulp.task('watch', function() {
    livereload.listen();
});

// Images

gulp.task('blocks.images', function() {
    gulp.src(['app/blocks/**/**/img/*'])
        .pipe(image())
        .pipe(flatten())
        .pipe(gulp.dest('dist/img'))
        .pipe(livereload());
});

// Scripts

gulp.task('blocks.block-scripts', function() {
    gulp.src(['app/blocks/**/b-**/js/*.js', 'app/blocks/**/l-**/js/*.js', 'app/blocks/**/b-**/js/*.js.map', 'app/blocks/**/l-**/js/*.js.map'])
        .pipe(concat('blocks.common.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

gulp.task('blocks.widget-scripts', function() {
    gulp.src(['app/blocks/**/w-**/js/*.js', 'app/blocks/**/w-**/js/*.js.map'])
        .pipe(flatten())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

// Blocks Styles

replace_css_path = function(data) {
    data.path = data.path.replace('/scss/', '/css/');
    this.push(data);
    return data;
}

gulp.task('blocks.styles', function() {
    gulp.src(['app/blocks/common/**/scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie10' }))
        .pipe(through(replace_css_path))
        .pipe(gulp.dest('./', { 'cwd': 'app/blocks/common' }))
        .on('end', function() {
            gulp.src(['app/blocks/common/**/css/*.css'])
                .pipe(concat('blocks.common.css'))
                .pipe(autoprefixer({
                    browsers: ['> 1%'],
                    cascade: false
                }))
                .pipe(gulp.dest('dist/css'))
                .pipe(livereload());
        });
});

// Fonts

gulp.task('fonts', function() {
    gulp.src(['app/fonts/*.*'])
        .pipe(gulp.dest('dist/fonts'))
        .pipe(livereload());
});


// Scripts

gulp.task('scripts', function() {
    gulp.src(['app/js/*.*'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

// Images

gulp.task('images', function() {
    gulp.src(['app/img/*.*'])
        .pipe(image())
        .pipe(gulp.dest('dist/img'))
        .pipe(livereload());
});

// Styles

gulp.task('styles', function() {
    gulp.src(['app/scss/libs.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie10' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
    gulp.src(['app/scss/main.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie10' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

// Tempaltes

gulp.task('templates', function() {
    gulp.src(['app/*.html'])
        .pipe(rigger())
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});


gulp.task('default', function() {
    gulp.run('blocks.block-scripts', 'blocks.widget-scripts', 'blocks.styles', 'blocks.images', 'fonts', 'scripts', 'images', 'styles', 'templates');

    livereload.listen();

    /* Blocks */

    gulp.watch('app/blocks/**/b-**/js/*.js', function(event) {
        gulp.run('blocks.block-scripts');
    });

    gulp.watch('app/blocks/**/l-**/js/*.js', function(event) {
        gulp.run('blocks.block-scripts');
    });

    gulp.watch('app/blocks/**/w-**/js/*.js', function(event) {
        gulp.run('blocks.widget-scripts');
    });

    gulp.watch('app/blocks/**/**/scss/*.scss', function(event) {
        gulp.run('blocks.styles');
    });

    gulp.watch('app/blocks/**/**/img/*.*', function(event) {
        gulp.run('blocks.images');
    });

    /* Fonts */

    gulp.watch('app/fonts/*.*', function(event) {
        gulp.run('fonts');
    });

    /* Scripts */

    gulp.watch('app/js/*.*', function(event) {
        gulp.run('scripts');
    });

    /* Images */

    gulp.watch('app/img/*.*', function(event) {
        gulp.run('images');
    });

    /* Styles */

    gulp.watch('app/scss/*.scss', function(event) {
        gulp.run('styles');
    });

    /* Tempaltes */

    gulp.watch(['app/*.html', 'app/blocks/**/**/*.html'], function(event) {
        gulp.run('templates');
    });

});
