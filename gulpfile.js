"use strict";

/*
External Dependencies:
You need to install SASS and compass as ruby gems. To do that make sure you have ruby installed and thentype the below commands:
`gem update --system`
`gem install sass`
`gem install compass`

Gulp installation:
`npm install -g gulp`

Gulp Plugins:
`npm install` (from the same root directory as the `package.json` file)
*/

// Loads gulp and plugins
var gulp = require('gulp');
var del = require('del'); // TODO: del plugin doesn't loads correctly with plugins.del
var plugins = require('gulp-load-plugins')();

// Paths
var paths = {
	app : './app',
	dest : './public'
};

gulp.task('styles', function () {
	return plugins.rubySass([
			paths.app + '/scss/**/*.scss',
			'!' + paths.app + '/scss/**/_*.scss'
		], {
			compass : true,
			style : 'expanded'
		})
		.pipe(plugins.autoprefixer({
			browsers: [
				'> 1%',
				'last 2 versions',
				'firefox >= 4',
				'safari 7',
				'safari 8',
				'IE 8',
				'IE 9',
				'IE 10',
				'IE 11'
			],
			cascade: false
		}))
		.pipe(gulp.dest(paths.app + '/css'))
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(plugins.minifyCss())
		.pipe(gulp.dest(paths.dest + '/css'));
});

gulp.task('coffee', function () {
	return gulp.src(paths.app + '/js/**/*.coffee')
		.pipe(plugins.coffeelint())
		.pipe(plugins.coffee({bare: true}))
		.pipe(gulp.dest(paths.app + '/js'));
});

gulp.task('lintscripts', ['coffee'], function () {
	return gulp.src([
			'gulpfile.js',
			paths.app + '/js/**/*.js',
			'!' + paths.app + '/js/vendor/*'
		])
		.pipe(plugins.jshint('.jshintrc')) // Edit the .jshintrc file to change the options
		.pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', ['coffee', 'lintscripts'], function () {
	return gulp.src([
			// setup script sequence
			paths.app + '/js/vendor/jquery-2.1.0.js',
			paths.app + '/js/coffee.js'
		])
		.pipe(plugins.concat('main.js'))
		.pipe(gulp.dest(paths.app + '/js'))
		.pipe(plugins.uglify())
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(gulp.dest( paths.dest + '/js'));
});

gulp.task('images', function(){
	return gulp.src([
			paths.app + '/img/**/*.png',
			paths.app + '/img/**/*.jpg',
			paths.app + '/img/**/*.gif'
		])
		.pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest( paths.dest + '/img'));
});

gulp.task('jade', function(){
	return gulp.src(paths.app + '/**/*.jade')
		.pipe(plugins.jade({
			pretty: true
		}))
		.pipe(gulp.dest(paths.dest));
});

gulp.task('markup', ['jade'], function() {
	return gulp.src(paths.app + '/**/*.html')
		.pipe(plugins.htmlPrettify({
			indent_char: ' ',
			indent_size: 2
		}))
		.pipe(gulp.dest(paths.dest));
});

gulp.task('clean', function () {
	del([paths.dest]);
});

gulp.task('default', ['clean', 'markup', 'styles', 'scripts', 'images']);

gulp.task('watch', function() {
	gulp.watch(paths.app + '/**/*.html', ['markup']);
	gulp.watch([paths.app + '/**/*.scss', paths.app + '/**/*.css'], ['styles']);
	gulp.watch([paths.app + '/**/*.coffee', paths.app + '/**/*.js'], ['scripts']);
	gulp.watch([paths.app + '/**/*.jpg', paths.app + '/**/*.png', paths.app + '/**/*.gif'], ['images']);
});
