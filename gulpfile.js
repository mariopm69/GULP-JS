//Compilar y minificar codigo sass
// Añadir prefijos.
//Renombrar el archivo.
//Actualizamos el navegador automaticamente.
var gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass");
    browsersync = require("browser-sync").create();
    imagemin = require("gulp-imagemin");
    beautify = require("gulp-beautify");

//Aqui  tratamos nuestras hojas de estilo

function estilos(done) {
  gulp
    .src("./assets/scss/style.scss")
    .pipe(
      sass({
        outputStyle: "nested"
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 4 versions"],
        flexbox: true,
        grid: true
      })
    )

    .pipe(
      rename({
        basename: "style"
        // suffix: ".min"
      })
    )
    .pipe(gulp.dest("./"));

  done();
}

//Recargar el navegador
function recargar(done) {
  browsersync.reload();
  done();
}
//Servir el contenido
function servir(done) {
  browsersync.init({
    proxy: "http://mpc.local/",
    // proxy: 'http://127.0.0.1:5500/home.html' ,
    open: true
  });
  done();
}
//Observar
function observar(done) {
  gulp.watch(`./assets/scss/*.scss`, gulp.series(estilos, recargar));
  gulp.watch("./**/*.php", recargar);
  gulp.watch(`./assets/css/*.css`, recargar);
  done();
}

gulp.task("default", gulp.series(estilos, servir, observar));

gulp.task("compri", function(done) {
  gulp
    .src("assets/img/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest("images"));
  done();
});
