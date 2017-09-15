/*const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |


elixir((mix) => {
    mix.sass('app.scss')
       .webpack('app.js');
});
*/

var xml = require('xml');

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var postcss = require('gulp-postcss');
 var autoprefixer = require('autoprefixer');

gulp.task('default', function() {
    return gulp.src('public/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/css/dist'));
}) ;

gulp.task('minify-css', function() {
  return gulp.src('styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('/dist'));
});

gulp.task('css', function () {
 return gulp.src('public/css/*.css')
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest('public/css/dist'));
});

var concat = require('gulp-concat');

gulp.task('scripts', function() {
  return gulp.src('public/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('public/js'))
});

var uglify = require('gulp-uglify');

gulp.task('minify', function () {
    gulp.src('public/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/js/min'));
});
