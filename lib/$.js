"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _ssrWindow = require("ssr-window");

var _dom7Class = _interopRequireDefault(require("./dom7-class"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function qsa(selector, context) {
  if (typeof selector !== 'string') {
    return [selector];
  }

  var a = [];
  var res = context.querySelectorAll(selector);

  for (var i = 0; i < res.length; i += 1) {
    a.push(res[i]);
  }

  return a;
}

function $(selector, context) {
  var arr = [];

  if (!context && selector instanceof _dom7Class["default"]) {
    return selector;
  }

  if (!selector) {
    return new _dom7Class["default"](arr);
  }

  if (typeof selector === 'string') {
    var html = selector.trim();

    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
      var toCreate = 'div';
      if (html.indexOf('<li') === 0) toCreate = 'ul';
      if (html.indexOf('<tr') === 0) toCreate = 'tbody';
      if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
      if (html.indexOf('<tbody') === 0) toCreate = 'table';
      if (html.indexOf('<option') === 0) toCreate = 'select';

      var tempParent = _ssrWindow.document.createElement(toCreate);

      tempParent.innerHTML = html;

      for (var i = 0; i < tempParent.childNodes.length; i += 1) {
        arr.push(tempParent.childNodes[i]);
      }
    } else {
      arr = qsa(selector.trim(), context || _ssrWindow.document);
    } // arr = qsa(selector, document);

  } else if (selector.nodeType || selector === _ssrWindow.window || selector === _ssrWindow.document) {
    arr.push(selector);
  } else if (Array.isArray(selector)) {
    if (selector instanceof _dom7Class["default"]) return selector;
    arr = selector;
  }

  return new _dom7Class["default"]((0, _utils.arrayUnique)(arr));
}

$.fn = _dom7Class["default"].prototype;
var _default = $;
exports["default"] = _default;