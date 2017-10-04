'use strict';

// подключаем компоненты gulp
var gulp = require('gulp');
var browserify = require('gulp-browserify');

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

// задача для компиляции скриптов
gulp.task('scripts', function () {
  gulp.src(components.scripts.source)
    .pipe(browserify(components.scripts.options))
    .pipe(gulp.dest(components.scripts.dest));
});

// задача для слежения за изменениями в скриптах
gulp.task('watch:scripts', ['scripts'], function () {
  // если отслеживаемые файлы изменились, запускаем задачу компиляции скриптов
  gulp.watch(components.scripts.watch, ['scripts']);
});

gulp.task('default', ['scripts']);
gulp.task('watch', ['watch:scripts']);