let uglify = require('gulp-uglifyes'),
    concat = require('gulp-concat'),
    scriptsPATH = {
        "input": "./src/assets/js/",
        "output": "./assets/js/"
    };

module.exports = function () {
    $.gulp.task('libsJS:dev', () => {
        return $.gulp.src([
            //'src/assets/js/libs/jquery.mobile-1.5.0-alpha.1.min.js',
            'node_modules/svg4everybody/dist/svg4everybody.min.js',
            //'node_modules/@microsoft/signalr/dist/webworker/signalr.js',
            //тут указывать пути src/assets/js/libs/*.js для сбора в единый файл
        ])
            .pipe(concat('libs.min.js'))
            .pipe(uglify())
            .pipe($.gulp.dest(scriptsPATH.output));
    });

    $.gulp.task('libsJS:build', () => {
        return $.gulp.src([
            //'src/assets/js/libs/jquery.mobile-1.5.0-alpha.1.min.js',
            //'node_modules/svg4everybody/dist/svg4everybody.min.js',
            //'node_modules/@microsoft/signalr/dist/webworker/signalr.js',
            //тут указывать пути src/assets/js/libs/*.js для сбора в единый файл
        ])
            .pipe(concat('libs.min.js'))
            .pipe(uglify())
            .pipe($.gulp.dest(scriptsPATH.output));
    });

    $.gulp.task('copyJS', () => {
        return $.gulp.src(scriptsPATH.input + '/copy/*.{js,map}')
            .pipe($.gulp.dest(scriptsPATH.output));
    });

    $.gulp.task('js:dev', () => {
        return $.gulp.src([scriptsPATH.input + '*.js',
            '!' + scriptsPATH.input + 'libs.min.js'])
            .pipe(concat('main.min.js'))
            .pipe(uglify())
            .pipe($.gulp.dest(scriptsPATH.output))
    });

    $.gulp.task('js:build', () => {
        return $.gulp.src([scriptsPATH.input + '*.js',
            '!' + scriptsPATH.input + 'libs.min.js'])
            .pipe($.gulp.dest(scriptsPATH.output))
    });

    $.gulp.task('js:build-min', () => {
        return $.gulp.src([scriptsPATH.input + '*.js',
            '!' + scriptsPATH.input + 'libs.min.js'])
            .pipe(concat('main.min.js'))
            .pipe(uglify())
            .pipe($.gulp.dest(scriptsPATH.output))
    });
};
