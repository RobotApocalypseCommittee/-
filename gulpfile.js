var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');


gulp.task('css', function(){
    return gulp.src('./src/**/*.css')
        .pipe(postcss([ autoprefixer() ]))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public'))
});

gulp.task('default', [ 'css' ]);