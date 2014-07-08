var gulp = require('gulp'),
    inherit = require('rework-inherit'),
    connect = require('gulp-connect'),
    $ = require('gulp-load-plugins')();

gulp.task('css', function () {
  return gulp.src('src/grid.css')
    .pipe($.myth())
    .pipe($.rework(inherit))
    .pipe(gulp.dest('example'))
    .pipe($.csso())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['css', 'connect'], function () {
  gulp.watch('src/grid.css', ['css']);
  gulp.watch('example/**/*', function (event) {
    return gulp.src(event.path)
      .pipe(connect.reload());
  });
});

gulp.task('connect', function () {
  connect.server({
    root: ['example'],
    port: 1880,
    livereload: {
      port: 2880
    }
  })
});

gulp.task('default', ['css']);