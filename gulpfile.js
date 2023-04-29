const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

function css(done) {
    // compilar sass
    // pasos: 1 - Identificar, 2 - Compilar, 3 - Guardar el .css

    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'))
    done();
}

function dev() {
    watch('src/scss/app.scss', css);
}


exports.css = css;
exports.dev = dev;
exports.default = series(css, dev);
// exports.default = parallel(css, dev);

// series- ejecuta la primer tarea y una vez que la completa se va a la siguente tarea
// parallel - todas inician al mismo tiempo