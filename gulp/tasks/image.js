let imagemin = require("gulp-imagemin"),
  imageminJpegRecompress = require("imagemin-jpeg-recompress"),
  pngquant = require("imagemin-pngquant"),
  cache = require("gulp-cache"),
  imgPATH = {
    input: [
      "./src/assets/images/**/*.{png,jpg,gif,svg,mp4,mkv,mov}",
      "!./src/assets/images/svg/*",
    ],
    output: "./assets/images/",
  };

module.exports = function () {
  $.gulp.task("img:dev", () => {
    return $.gulp.src(imgPATH.input).pipe($.gulp.dest(imgPATH.output));
  });

  $.gulp.task("img:build", () => {
    return $.gulp
      .src(imgPATH.input)
      .pipe(
        imagemin(
          [
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imageminJpegRecompress({
              loops: 4,
              min: 90,
              max: 95,
              quality: "high",
            }),
            imagemin.svgo(),
            imagemin.optipng({ optimizationLevel: 3 }),
            pngquant({ quality: "100", speed: 5 }),
          ],
          {
            verbose: true,
          }
        )
      )
      .pipe($.gulp.dest(imgPATH.output));
  });
};
