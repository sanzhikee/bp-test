'use strict';

// подключаем jquery для наглядности
var $ = require('jquery');

// подключаем модель
var model = require('core/components/woman');

// создаем экземпляр модели
var woman = new model(function (type, message) {
  $('.js-wall').append('[' + type + '] ' + message + "\n");
});

// событие - полочка повешена
$('.js-neutralize-women').click(function (e) {
  e.preventDefault();
  e.stopPropagation();
  clearInterval(interval);

  $(this).off().remove();

  woman.shout('Сколько можн...');
  woman.say('Вот почему сразу нельзя было сделать?');
});

// начинаем шуметь
woman.shout('Когда ты прикрутишь эту полочку?');
var interval = setInterval(function () {
  woman.shout('Сколько можно тебя просить?');
}, 1000);