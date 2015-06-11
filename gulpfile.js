var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha  = require('gulp-mocha');
var runSequence = require('run-sequence');


gulp.task('lint', function() {
    return gulp
        .src('*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
    return gulp
        .src(['tests/*.js'])
        .pipe(mocha());
});

gulp.task('watch', function() {
    gulp.watch(['*.js', '**/*.js'], function() {
        runSequence('lint', 'test');
    });
});

gulp.task('default', function() {
    runSequence('lint', 'test');
});
