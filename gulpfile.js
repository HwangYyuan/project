var gulp=require("gulp");
var sass=require('gulp-sass');
var browserSync=require("browser-sync");
gulp.task('sass',function(){
    gulp.src("./src/sass/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css/'))
})
gulp.task("server",function(){
    browserSync({
        proxy:"localhost:256",
        port:256,
        files:["./src/sass/*.scss","./src/html/*.html"]
    })
    gulp.watch("./src/sass/*.scss",["sass"]);
})
gulp.task("default",["sass","server"]);