let plumber = require('gulp-plumber'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    csscomb = require('gulp-csscomb'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    stylesPATH = {
        "input": "./src/assets/styles/",
        "output": "./assets/css/"
    };

module.exports = function () {
    $.gulp.task('styles:dev', () => {
        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(scss())
            .pipe(autoprefixer({
                 overrideBrowserslist:  ['last 3 versions']
            }))
            .pipe(sourcemaps.write())
            .pipe(rename('styles.min.css'))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe($.gulp.dest(stylesPATH.output))
            .on('end', $.browserSync.reload);
    });
    $.gulp.task('styles:before', () => {
        return $.gulp.src(stylesPATH.input + 'before.scss')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(scss())
            .pipe(autoprefixer({
                overrideBrowserslist:  ['last 3 versions']
            }))
            .pipe(sourcemaps.write())
            .pipe(rename('before.min.css'))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe($.gulp.dest(stylesPATH.output))
            .on('end', $.browserSync.reload);
    });
    $.gulp.task('styles:build', () => {
        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(scss())
            .pipe(autoprefixer({
                 overrideBrowserslist:  ['last 3 versions']
            }))
            .pipe(csscomb())
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe($.gulp.dest(stylesPATH.output))
    });
    $.gulp.task('styles:build-min', () => {
        return $.gulp.src(stylesPATH.input + 'styles.scss')
            .pipe(scss())
            .pipe(autoprefixer({
                 overrideBrowserslist:  ['last 3 versions']
            }))
            .pipe(csscomb())
            .pipe(csso())
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.output))
    });
};
