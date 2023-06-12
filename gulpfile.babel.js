import gulp from 'gulp';
import babel from 'gulp-babel';
import GulpUglify from 'gulp-uglify';
const concat = require('gulp-concat')
const routes = {
  js: {
    src: 'src/js/**/*.js',
    dest: 'build/all',
    destPart : 'build/part'
  }
};

gulp.task('transpile-minify-all',function() {
  return gulp
  .src(routes.js.src)
  .pipe(babel())
  .pipe(concat('hncokLib.js'))
  .pipe(GulpUglify())
  .pipe(gulp.dest(routes.js.dest))
});

gulp.task('transpile-minify-part',function() {
  return gulp
  .src(routes.js.src)
  .pipe(babel())  
  .pipe(GulpUglify())
  .pipe(gulp.dest(routes.js.destPart))
});

gulp.task('build',gulp.series(['transpile-minify-all','transpile-minify-part']));
