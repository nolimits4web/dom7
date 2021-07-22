// eslint-disable-next-line
import { getDocument } from 'ssr-window';
// eslint-disable-next-line
import { $, addClass, width } from '../package/dom7.esm.js';

const document = getDocument();

$.fn.addClass = addClass;
$.fn.width = width;

$(document.body).addClass('test');
