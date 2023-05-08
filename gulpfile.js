const {src, dest, watch, series, parallel} = require('gulp');

// dependencias CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');

// Imagenes

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    // compilar sass
    // pasos: 1 - Identificar, 2 - Compilar, 3 - Guardar el .css

    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))        
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
    done();
}

function imagenes(done){
    src('src/img/**/*')
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'));
    done();
}

function versionWebp(done) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg,jpeg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
    done();
}

function versionAvif(done){
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg,jpeg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'));
done();
}


function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);
// exports.default = parallel(css, dev);

// series- ejecuta la primer tarea y una vez que la completa se va a la siguente tarea
// parallel - todas inician al mismo tiempo