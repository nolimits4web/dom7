# Change Log

# [4.0.6](https://github.com/nolimits4web/dom7/compare/v4.0.5...v4.0.6) (2023-02-02)

### Bug Fixes

- **types:** fix multiple class definitions on class manipulation methods ([#66](https://github.com/nolimits4web/dom7/issues/66)) ([47ee3c3](https://github.com/nolimits4web/dom7/commit/47ee3c3283851f9725032672a672c1aa3b89a845)), closes [#67](https://github.com/nolimits4web/dom7/issues/67)

# [4.0.5](https://github.com/nolimits4web/dom7/compare/v4.0.4...v4.0.5) (2023-02-02)

### Features

- add "transitionStart" event method ([#62](https://github.com/nolimits4web/dom7/issues/62)) ([795375f](https://github.com/nolimits4web/dom7/commit/795375f897105dc61e69af167a3e9c5c09821a9d))

# [4.0.4](https://github.com/nolimits4web/dom7/compare/v4.0.3...v4.0.4) (2022-01-11)

- fixed issue with `new Array(number)` use case

# [4.0.3](https://github.com/nolimits4web/dom7/compare/v4.0.2...v4.0.3) (2022-01-11)

- fixed issue with `new Array(number)` use case

# [4.0.2](https://github.com/nolimits4web/dom7/compare/v4.0.1...v4.0.2) (2021-12-13)

### Features

- export package.json ([#52](https://github.com/nolimits4web/dom7/issues/52)) ([63bc770](https://github.com/nolimits4web/dom7/commit/63bc7705de8c959edca7063bc77ae8ad520ab173))

# [4.0.1](https://github.com/nolimits4web/dom7/compare/v4.0.0...v4.0.1) (2021-10-27)

### Features

- add "main" and "module" package.json fields ([2dfefb7](https://github.com/nolimits4web/dom7/commit/2dfefb7d8ee8f206b7e36602c066d71efaa2700c))

## 4.0.0 - Released on August 25, 2021

- Increase build target to `es6`
- Now it uses only ES module exports in package

## 4.0.0-beta.2 - Released on August 4, 2021

- Increase build target to `es6`

## 4.0.0-beta.1 - Released on July 22, 2021

- Now it uses only ES module exports in package

## 3.0.0 - Released on November 9, 2020

- New modular export. Now it exports only main Dom7 `$` function and all methods. No bundle ESM/CJS version
- Now Dom7 instances is the extension of Array, e.g. `class Dom7 extends Array`
  - Which means it has all Array instance methods and properties
- Iteration methods (like `.each`, `.forEach`, `.map`) now receive `(el, index)` arguments instead of `(index, el)` like in v2
- Improved TypeScript typings

## 2.1.5 - Released on May 15, 2020

- Updated to latest `ssr-window`

## 2.1.3 - Released on February 11, 2019

- Fixed issue when `.once` bound event could still be there after unbinding it with `.off`

## 2.1.2 - Released on September 13, 2018

- Small tweaks for TypeScript definitions

## 2.1.1 - Released on September 6, 2018

- Small tweaks for TypeScript definitions

## 2.1.0 - Released on August 31, 2018

- Added TypeScript definitions

## 2.0.7 - Released on June 14, 2018

- Fixed issue with undefined elements in classList access (#13)

## 2.0.6 - Released on May 27, 2018

- Fixed issue with remove event listeners when they was not added

## 2.0.5 - Released on April 20, 2018

- Support for setting array value on multiple select
- Improved internal events proxies logic for better memory management

## 2.0.3 - Released on February 21, 2018

- Fixed issue with not found `$.extend` in `.animate`

## 2.0.2 - Released on February 10, 2018

- Added `ssr-window` dependency to throw less errors in SSR environment

## 2.0.1 - Released on October 2, 2017

- Modular version `dom7.modular.js` is more modular now and exports every method separately.

## 2.0.0 - Released on September 11, 2017

- Removed XHR (Ajax) functionality
- Removed `$.` utilities, including `$.parseUrlQuery`, `$.isArray`, `$.each`, `$.unique`, `$.serializeObject`, `$.dataset`, `$.extend`

## 1.7.2 - Released on September 7, 2017

- Fixed issue when calling `.show()` always set `display: block` not respecting actual display property

## 1.7.1 - Released on September 2, 2017

- Removed `$.getTranslate` method
- Improved logic of `$.extend` method
- New `dom7.modular.js` version for custom es imports, e.g. `import { $, Methods, Ajax } from 'dom7.modular.js'`

## 1.7.0 - Released on August 30, 2017

- New `.forEach((element, index))` method
- New `.map((index, element))` method
- New `.toArray()` method that converts Dom7 collection to simple array
- `$.supportTouch` and `$.removeDiacritics` helpers removed
- Fixed issue with detaching live event listener without listener function

## 1.6.4 - Released on August 2, 2017

- Fixed issue with handling events without target (e.g. Cordova "resume" event)
- Fixed issue with Ajax post method throwing error with "multipart/form-data" content type

## 1.6.3 - Released on May 30, 2017

- Added shortcut methods `click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll`

## 1.6.2 - Released on May 12, 2017

- Proxified events. Now all events are being added/removed using proxy functions. This allows to pass additional arguments to events handlers and detach all assigned event listener by calling e.g. `$$(document).off('someEvent');`

## 1.6.1 - Released on April 19, 2017

- New `Dom7.extend(obj1, obj2, ...)` method
- Added `.animate(props, params)` and `.stop()` animation methods
- Added ES2015 module build
