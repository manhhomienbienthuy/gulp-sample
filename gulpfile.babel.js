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
var sourcemaps = require('gulp-sourcemaps');
var shorthand = require('gulp-shorthand');
var babel = require('gulp-babel');

var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var production = !!argv.production; // --production

gulp.task('stylesheet', () => {
    return gulp
        .src('src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(shorthand())
        .pipe(gulpif(production, cssmin()))
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('javascript', () => {
    return gulp
        .src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(eslint('.eslintrc.json'))
        .pipe(eslint.format())
        .pipe(babel())
        .pipe(gulpif(production, uglify()))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('imagemin', () => {
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

gulp.task('automate', () => {
    gulp.watch('src/scss/*.scss', ['stylesheet']);
    gulp.watch('src/js/*.js', ['javascript']);
});


gulp.task('default', ['stylesheet', 'javascript', 'imagemin']);
