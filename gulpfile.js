var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');

gulp.task('watch', function() {
    // Watch html files
    gulp.watch('www/app/views/**/*.html', ['template:cache']);
});

gulp.task('template:cache', function () {
  return gulp.src('www/app/views/**/*.html')
    .pipe(templateCache({
    	root: 'app/views/',
    	module: 'yogiApp'
    }))
    .pipe(gulp.dest('www'));
});