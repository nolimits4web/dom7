"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _$ = _interopRequireDefault(require("./$"));

var methods = _interopRequireWildcard(require("./methods"));

var scroll = _interopRequireWildcard(require("./scroll"));

var animate = _interopRequireWildcard(require("./animate"));

var shortcuts = _interopRequireWildcard(require("./shortcuts"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

[methods, scroll, animate, shortcuts].forEach(function (group) {
  Object.keys(group).forEach(function (methodName) {
    _$["default"].fn[methodName] = group[methodName];
  });
});
var _default = _$["default"];
exports["default"] = _default;