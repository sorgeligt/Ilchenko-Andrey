const gulp = require('gulp');
const concat = require('gulp-concat');
const less = require('gulp-less');
const inject = require('gulp-inject');
const image = require('gulp-image');
const modifyCssUrls = require('gulp-modify-css-urls');
const browserify = require("browserify");
const tsify = require("tsify");
const source = require('vinyl-source-stream');

const assetsPath = 'src/assets/*.{svg,png,jpeg,gif}';
const fontsPath = 'src/assets/fonts/*.{ttf,woff,woff2}';
const stylesPath = './src/styles/**/*.scss';
const typeScriptPath = "src/scripts/*.ts";
const htmlPath = './src/index.html';
const distPath = './dist/';
const styleDistPath = 'dist/style.css'

const imageOptimizingSettings = {
    pngquant: true,
    optipng: true,
    zopflipng: true,
    mozjpeg: true,
    gifsicle: true,
    svgo: true,
    concurrent: 10,
};

gulp.task('scripts', function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/scripts/app.ts', 'src/scripts/interfaces.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest("dist"));
});

gulp.task('css', () => {
    return gulp.src(stylesPath)
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(distPath));
});

gulp.task('watch', function (done) {
    gulp.watch(stylesPath, gulp.series(['css', 'modifyUrls']));
    gulp.watch(typeScriptPath, gulp.series('scripts'));
    gulp.watch(htmlPath, gulp.series('html'));
    done();
});

gulp.task('assets', function () {
    return gulp.src(assetsPath)
        .pipe(image(imageOptimizingSettings))
        .pipe(gulp.dest(`${distPath}/assets/`));
});

gulp.task('fonts', function () {
    return gulp.src(fontsPath)
        .pipe(gulp.dest(`${distPath}/assets/fonts`));
});

gulp.task('modifyUrls', () =>
    gulp.src(styleDistPath)
        .pipe(modifyCssUrls({
            modify(url) {
                return url.substr(3);
            },
        }))
        .pipe(gulp.dest(distPath))
);

gulp.task('html', function () {
    const target = gulp.src(htmlPath);
    const sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], {read: false});
    return target.pipe(inject(sources, {ignorePath: '../dist', relative: true, addPrefix: '.'}))
        .pipe(gulp.dest(distPath));
});

gulp.task('default', gulp.series('scripts', 'css', 'assets', 'fonts', 'modifyUrls', 'html', 'watch'));
gulp.task('build', gulp.series('scripts', 'css', 'assets', 'fonts', 'modifyUrls', 'html'));