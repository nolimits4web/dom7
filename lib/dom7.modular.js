"use strict";

exports.__esModule = true;
var _exportNames = {
  $: true
};
exports["default"] = void 0;

var _$ = _interopRequireDefault(require("./$"));

exports.$ = _$["default"];

var _methods = require("./methods");

Object.keys(_methods).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _methods[key];
});

var _scroll = require("./scroll");

Object.keys(_scroll).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _scroll[key];
});

var _animate = require("./animate");

Object.keys(_animate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _animate[key];
});

var _shortcuts = require("./shortcuts");

Object.keys(_shortcuts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _shortcuts[key];
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _$["default"];
exports["default"] = _default;