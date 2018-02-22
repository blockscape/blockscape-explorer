const gulp = require('gulp');
const spawn = require('child_process').spawn;
const del = require('del');

gulp.task('clean', () => {
    del(['dist']);
});

gulp.task('copy', () => {
    gulp.src(['lib/**/*'], {base: '.'})
        .pipe(gulp.dest('dist'));

    gulp.src(['/lib/tsconfig.json'])
        .pipe(gulp.dest('dist/tsconfig.json'));
});

gulp.task('webpack', (callback) => {
    const s = spawn('webpack')
        .on('close', callback);

        s.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        s.stderr.on('err', (data) => {
            console.error(`stderr: ${data}`);
        })
});

gulp.task('post-webpack', ['webpack'], () => {
    gulp.src('client/manifest.json')
        .pipe(gulp.dest('dist/client/assets'));
});

gulp.task('build', ['copy', 'post-webpack']);

gulp.task('default', ['build']);