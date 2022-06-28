const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const purgeCSS = require("gulp-purgecss");

function compileSass() {
  return src("src/**/*.scss")
    .pipe(
      sass({
        includePaths: ["src/**/*.scss"],
        outputStyle: "compressed",
      }).on("error", sass.logError)
    ).pipe(purgeCSS({
        content: ["*.html"],
    }))
    .pipe(dest("dist/css"));
}

function watchSass() {
  watch(["src/**/*.scss","*.html"], compileSass);
}

exports.default = series(compileSass, watchSass);
