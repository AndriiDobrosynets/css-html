'use strict'
const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const wait = require('gulp-wait');
const plumber = require('gulp-plumber');

gulp.task('css:build', function () {
    gulp.src('sass/main.scss')
        .pipe(plumber())
		.pipe(wait(200)) // only for visual code
		.pipe(sass())
		.pipe(gulp.dest('./css'))
		.pipe(reload({ stream: true }));
});

gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: './'
		},
		notify: false
	});
});
gulp.task('build', [
	'css:build',
]);
gulp.task('watch', function () {
	watch('./sass/**/*.scss', function () {
		gulp.start('css:build');
	});
	watch('./*.html', reload );
});
gulp.task('default', ['build', 'watch', 'server']);