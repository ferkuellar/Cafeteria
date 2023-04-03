const {src, dest} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function css(done) {
    // compilar sass
    // pasos: 1 - Identificar, 2 - Compilar, 3 - Guardar el .css

    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(dest('build/css'))
    done();
}

exports.css = css;
