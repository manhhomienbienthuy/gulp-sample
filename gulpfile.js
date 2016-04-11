var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cssmin = require('gulp-clean-css');
var csslint = require('gulp-csslint');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('stylesheet', function() {
    return gulp
        .src('src/scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(cssmin())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('javascript', function() {
    return gulp
        .src('src/js/*.js')
        .pipe(concat('app.min.js'))
        .pipe(eslint('.eslintrc.json'))
        .pipe(eslint.format())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('imagemin', function() {
    var config = {
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    };
    return gulp
        .src('src/images/*.{jpg,jpeg,png,gif,ico}')
        .pipe(imagemin(config))
        .pipe(gulp.dest('dist/images'));
});


gulp.task('default', ['stylesheet', 'javascript', 'imagemin']);
