/*var gulp = require('gulp'),
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload');


gulp.task('watch', function () {
    livereload.listen();//这里需要注意！旧版使用var server = livereload();已经失效
    gulp.watch(['index.html','404.html'], function(event){
        livereload.changed(event.path);
    });
});*/


var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['index.html','_config.yml'], function(event){
        livereload.changed(event.path);
    });
});