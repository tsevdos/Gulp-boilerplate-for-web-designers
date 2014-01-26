"use strict";

/*
Grunt installation:
-------------------
npm install -g gulp
npm install --save-dev gulp gulp-util

Project Dependencies:
---------------------
npm install gulp --save-dev

Simple Dependency Install:
--------------------------
npm install (from the same root directory as the `package.json` file)

*/

var gulp         = require('gulp');
var sass         = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename       = require('gulp-rename');
var minifycss    = require('gulp-minify-css');
var clean        = require('gulp-clean');
var livereload   = require('gulp-livereload');
var lr           = require('tiny-lr');
var server       = lr();
var coffeelint   = require('gulp-coffeelint');
var coffee       = require('gulp-coffee');
var jshint       = require('gulp-jshint');
var concat       = require('gulp-concat');
var imagemin     = require('gulp-imagemin');
var uglify       = require('gulp-uglify');
var cache        = require('gulp-cache');

var paths = {
	app  : './app',
	dest : './public'
};

// Loads plugins 
// var gulpLoadPlugins = require("gulp-load-plugins");
// var plugins = gulpLoadPlugins();

gulp.task('markup', function(){
	return gulp.src(paths.app + '/js/**/*.coffee')
		.pipe(coffeelint())
		.pipe(coffee({bare: true}))
		.pipe(gulp.dest( paths.app + '/js'));

});

gulp.task('styles', function(){
	return gulp.src([
			paths.app + '/scss/**/*.scss',
			'!' + paths.app + '/scss/**/_*.scss'
			])
		.pipe(sass({ 
			style     : 'expanded',
			compass   : true
		}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest( paths.app + '/css'))
		.pipe(livereload(server))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest( paths.dest + '/css'));

});

gulp.task('coffee', function(){
	return gulp.src(paths.app + '/js/**/*.coffee')
		.pipe(coffeelint())
		.pipe(coffee({bare: true}))
		.pipe(gulp.dest( paths.app + '/js'));

});

gulp.task('lintscripts', ['coffee'], function(){
	return gulp.src([
			'gulpfile.js',
			paths.app + '/js/**/*.js',
			'!' + paths.app + '/js/vendor/*'
		])
		.pipe(jshint('.jshintrc')) // Edit the .jshintrc file to change the options
		.pipe(jshint.reporter('jshint-stylish'));

});


var sripts = [
	// setup script sequence
	paths.app + '/js/vendor/jquery-2.1.0.js',
	paths.app + '/js/vendor/jquery.cycle2.js',
	paths.app + '/js/coffee.js'
];

gulp.task('scripts', ['coffee' , 'lintscripts'], function(){
	return gulp.src(sripts)
		.pipe(concat('main.js'))
		.pipe(gulp.dest( paths.app + '/js'))
		.pipe(livereload(server))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest( paths.dest + '/js'));

});

gulp.task('images', function(){
	return gulp.src([
			paths.app + '/img/**/*.png',
			paths.app + '/img/**/*.jpg',
			paths.app + '/img/**/*.gif'
		])
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(livereload(server))
		.pipe(gulp.dest( paths.dest + '/img'));

});

gulp.task('clean', function(){
	return gulp.src( paths.dest + '/' , {read: false})
		.pipe(clean());
});


gulp.task('default', ['clean'] , function(){
	gulp.run('styles', 'scripts', 'images');
});

gulp.task('serve', function() {

	// Listen on port 35729
	server.listen(35729, function (err) {
		
		if (err) return console.log(err);

		// Watch .scss files
		gulp.watch([
				paths.app + '/scss/**/*.scss'
			], function(event) {
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
			gulp.run('styles');
		});

		// Watch .js files
		gulp.watch([
				paths.app + '/js/**/*.js',
				paths.app + '/js/**/*.coffee',
			], function(event) {
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
			gulp.run('scripts');
		});

	});

});