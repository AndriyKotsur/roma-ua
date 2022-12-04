var gulp = require('gulp')
sass = require('gulp-sass')
svgSprite = require('gulp-svg-sprite')
mediaGroup = require('gulp-group-css-media-queries')
mediaQueriesSplitter = require('gulp-media-queries-splitter')
autoprefixer = require('gulp-autoprefixer')
cleanCSS = require('gulp-clean-css')
foreach = require('gulp-foreach')
rename = require("gulp-rename")
cache = require('gulp-cached')
debug = require('gulp-debug')
dependents = require('gulp-dependents')

fs = require('fs-extra')
path = require('path');

/* ------------- SPRITE TASK ------------- */
gulp.task('svgSprite', function (done) {
    var result = []
    const svgRootFolder = './source/svg';
    fs.readdir(svgRootFolder, (err, files) => {
        files.forEach(file => {
            var item = gulp.src(svgRootFolder + '/*.svg') // svg files for sprite
                .pipe(svgSprite({
                    mode: {
                        stack: {
                            sprite: "../sprite.svg" //sprite file name
                        }
                    },
                }))
                .pipe(gulp.dest('./public/icons/'))
            result.push(item)
        });
    });
    done();
    return result
});
/* ------------- SPRITE TASK END ------------- */


gulp.task('sass-dev', function (done) {
    return gulp.src('./source/scss/**/*.page.scss')
        .pipe(foreach(function (stream, file) {
            var filePathArr = file.path.split(/\/|\\/);
            var rootFolder = filePathArr[filePathArr.findIndex(el => el == 'scss') + 1];

            return stream
                .pipe(sass().on('error', sass.logError))
                .pipe(cache('sasscache'))
                .pipe(dependents())

                .pipe(mediaGroup())
                .pipe(autoprefixer({
                    cascade: false,
                }))

                .pipe(rename(function (file) {
                    file.dirname = '';
                }))
                .pipe(gulp.dest('./public/css/'))
        }))

});

gulp.task('watch', function () {
    gulp.watch([
        './source/scss/**/*.scss',
        './source/scss/**.scss'
    ], gulp.series('sass-dev'))
    gulp.watch([
        './source/svg/**/*.svg'
    ], gulp.series('svgSprite'))
});


//////////////////////// PROD

gulp.task('build-prod', function () {
    return gulp.src('./source/scss/pages/**/*.page.scss')
        .pipe(foreach(function (stream, file) {
            var filePathArr = file.path.split('/')
            var rootFolder = filePathArr[filePathArr.findIndex(el => el == 'scss') + 1];
            var pageFolder = path.basename(file.path).split('.')[0]

            return stream
                .pipe(sass({
                    outputStyle: 'compressed'
                }).on('error', sass.logError))
                .pipe(autoprefixer({
                    overrideBrowserslist: ['last 5 versions'],
                    cascade: true
                }))
                .pipe(mediaGroup())
                .pipe(cleanCSS({
                    compatibility: 'ie8'
                }))
                .pipe(rename(function (file) {
                    file.dirname = '';
                }))
                .pipe(gulp.dest('./public/css/'))
        }))
});
gulp.task('build', gulp.series('build-prod'))