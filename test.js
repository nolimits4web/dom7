const { document } = require('ssr-window');
const { $, addClass, width } = require('./lib/dom7.modular');

$.fn.addClass = addClass;
$.fn.width = width;

console.log($(document.body).addClass('test'));
