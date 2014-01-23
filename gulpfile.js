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
var notify       = require('gulp-notify');
var clean        = require('gulp-clean');

var paths = {
	app  : './app',
	dest : './public'
}

// Loads plugins 
// var gulpLoadPlugins = require("gulp-load-plugins");
// var plugins = gulpLoadPlugins();

gulp.task('styles', function(){
	var stream = gulp.src(paths.app + '/scss/**/*.scss')
		.pipe(sass({ 
			style     : 'expanded',
			compass   : true,
			debugInfo : true
		}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest( paths.app + '/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest( paths.dest + '/css'))
		.pipe(notify({ message: 'Styles task complete!' }));;


		// Remove after testing.
		stream.on('error', function(err) {
			console.warn(err.message)
		});

	return stream;

});

gulp.task('clean', function(){
	return gulp.src([ paths.app + '/css' , paths.dest + '/css'], {read: false})
    .pipe(clean());
});


gulp.task('default', function(){



});