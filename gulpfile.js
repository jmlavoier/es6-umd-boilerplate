'use strict';
 
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var sass = require('gulp-sass');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var sprity = require('sprity');
var uglify = require('gulp-uglifyjs');

gulp.task('uglify', ['webpack'] ,function() {
  gulp.src('js/bundle.js')
    .pipe(uglify('bundle.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('js'))
});

gulp.task('sass', function () {
  	 return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task("webpack", function(callback) {
    
    var myConfig = Object.create(webpackConfig);

    webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});
 
gulp.task('sprites', function () {
	gutil.log('sprity: spriting..');

	return  sprity.create({
				src: './src/img/sprites/*.png',
				out: './img/',
				template: './src/scss/sprity.hbs',
				cssPath: '../img/',
				style: '../../css/sprites.css',
				prefix: 's'
			}, function () {
				gutil.log('sprity: success!');
		  	});

});

gulp.task('watchers', function (){
	watch('./src/img/sprites/**/*.png', batch(function (events, done) {
        gulp.start('sprites', done);
    }));

    watch('./src/scss/**/*.scss', batch(function (events, done) {
    	gulp.start('sass', done);
    }));

    watch('./src/js/**/*.js', batch(function (events, done) {
    	gulp.start('webpack', done);
    }));
});

gulp.task('build', ['sass', 'uglify']);

gulp.task('default', ['watchers']);


