const { getDocument } = require('ssr-window');
const { $, addClass, width } = require('../package/dom7.cjs');

const document = getDocument();

$.fn.addClass = addClass;
$.fn.width = width;

$(document.body).addClass('test');
