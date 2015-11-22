var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var minifyCSS   = require('gulp-minify-css');
var rename      = require('gulp-rename');

// Move font file
gulp.task('font', function () {
    return gulp.src('src/font/*')
        .pipe(gulp.dest('build/font'));
});

// Build src and css js files
gulp.task('compress', function() {
    gulp.src(['src/*.js'])
        .pipe(uglify())
        .pipe(rename('APlayer.min.js'))
        .pipe(gulp.dest('build'));
    gulp.src('src/*.scss')
        .pipe(sass())
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(minifyCSS())
        .pipe(rename('APlayer.min.css'))
        .pipe(gulp.dest('build'));
});

// Watch js and scss files for changes & recompile
gulp.task('watch', function () {
    gulp.watch(['src/*.js', 'src/*.scss'], ['compress']);
});

// Default task, running just `gulp` will move font, compress js and scss and watch files.
gulp.task('default', ['font', 'compress', 'watch']);