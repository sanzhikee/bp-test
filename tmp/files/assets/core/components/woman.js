'use strict';

module.exports = function (callback) {
  var that = this;

  // настраиваем коллбек вывода сообщений
  that.interface = callback;

  /**
   * Метод имитирует спокойный тон.
   * @param {string} message
   */
  that.say = function (message) {
    that.interface('info', message);
  };

  /**
   * Метод имитирует крик.
   * @param {string} message
   */
  that.shout = function (message) {
    that.interface('warning', message);
  };

  return that;
};