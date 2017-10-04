'use strict';

// подключаем компоненты
var argv = require('yargs').argv;

// подключаем компоненты gulp
var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var livereload = require('gulp-livereload');

// настройки путей к файлам
var rootDir = '.';
var sourceDir = rootDir + '/assets'; // здесь хранятся все исходники
var destDir = rootDir + '/web/assets'; // здесь хранится все на выходе

// блок с настройками компонентов
// здесь я храню настройки для задач
// удалил отсюда все кроме scripts для наглядности
var components = {
  scripts: {
    source: sourceDir + '/core/application.js',
    dest: destDir,
    watch: sourceDir + '/core/**/*.js',
    options: {
      paths: ['./node_modules', sourceDir],
      debug: false,
      fullPaths: true
    }
  }
};

/**
 * Обработчик ошибок.
 * @param e
 */
var error = function (e) {
  console.error('Error in plugin "' + e.plugin + '"');
  console.error('   "' + e.message + '"');
  console.error('   In file "' + e.fileName + '", line "' + e.lineNumber + '".');
  console.log('--------------------------------------');
  console.log(e);
};

// задача для компиляции скриптов
gulp.task('scripts', function () {
  gulp.src(components.scripts.source)
    .pipe(browserify(components.scripts.options).on('error', error))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest(components.scripts.dest))
    .pipe(livereload());
});

// задача для слежения за изменениями в скриптах
gulp.task('watch:scripts', ['scripts'], function () {
  // запускаем сервер
  livereload.listen();

  // если отслеживаемые файлы изменились, запускаем задачу компиляции скриптов
  gulp.watch(components.scripts.watch, ['scripts']);
});

gulp.task('default', ['scripts']);
gulp.task('watch', ['watch:scripts']);