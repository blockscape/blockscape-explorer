const gulp = require('gulp');
const spawn = require('child_process').spawn;
const del = require('del');

gulp.task('clean', () => {
    del(['dist']);
});

gulp.task('copy', () => {
    gulp.src(['lib/**/*'], {base: '.'})
        .pipe(gulp.dest('dist'));
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

gulp.task('build', ['copy', 'webpack']);

gulp.task('default', ['build']);