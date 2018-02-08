var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require("gulp-nodemon");

gulp.task('develop', ['build'], function () {
    var stream = nodemon({ 
        script: 'app.js',
        ext: "css",
        ignore: ['public/*'],
        tasks: ['build'] })

    })

gulp.task('css', function(){
    return gulp.src('./src/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'))
});

gulp.task("build", [ "css"]);

gulp.task('default', [ 'build' ]);