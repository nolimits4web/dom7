/**
 * Dom7 2.1.3
 * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
 * http://framework7.io/docs/dom.html
 *
 * Copyright 2020, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: May 6, 2020
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Dom7 = factory());
}(this, (function () { 'use strict';

  /**
   * SSR Window 1.0.1
   * Better handling for window object in SSR environment
   * https://github.com/nolimits4web/ssr-window
   *
   * Copyright 2018, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: July 18, 2018
   */
  var doc = (typeof document === 'undefined') ? {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: '',
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {},
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        },
      };
    },
    location: { hash: '' },
  } : document; // eslint-disable-line

  var win = (typeof window === 'undefined') ? {
    document: doc,
    navigator: {
      userAgent: '',
    },
    location: {},
    history: {},
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return '';
        },
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {},
  } : window; // eslint-disable-line

  var Dom7 = /*@__PURE__*/(function (Array) {
    function Dom7(items) {
      Array.apply(this, items);
    }

    if ( Array ) Dom7.__proto__ = Array;
    Dom7.prototype = Object.create( Array && Array.prototype );
    Dom7.prototype.constructor = Dom7;

    return Dom7;
  }(Array));

  function arrayFlat(arr) {
    if ( arr === void 0 ) arr = [];

    var res = [];
    arr.forEach(function (el) {
      if (Array.isArray(el)) {
        res.push.apply(res, arrayFlat(el));
      } else {
        res.push(el);
      }
    });
    return res;
  }
  function arrayFilter(arr, callback) {
    return Array.prototype.filter.call(arr, callback);
  }
  function arrayUnique(arr) {
    var uniqueArray = [];
    for (var i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
    }
    return uniqueArray;
  }
  function toCamelCase(string) {
    return string
      .toLowerCase()
      .replace(/-(.)/g, function (match, group) { return group.toUpperCase(); });
  }

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
    if (!context && selector instanceof Dom7) {
      return selector;
    }
    if (!selector) {
      return new Dom7(arr);
    }
    if (typeof selector === 'string') {
      var html = selector.trim();
      if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
        var toCreate = 'div';
        if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
        if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0)
          { toCreate = 'tr'; }
        if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
        if (html.indexOf('<option') === 0) { toCreate = 'select'; }
        var tempParent = doc.createElement(toCreate);
        tempParent.innerHTML = html;
        for (var i = 0; i < tempParent.childNodes.length; i += 1) {
          arr.push(tempParent.childNodes[i]);
        }
      } else {
        arr = qsa(selector.trim(), context || doc);
      }
      // arr = qsa(selector, document);
    } else if (
      selector.nodeType ||
      selector === win ||
      selector === doc
    ) {
      arr.push(selector);
    } else if (Array.isArray(selector)) {
      if (selector instanceof Dom7) { return selector; }
      arr = selector;
    }
    return new Dom7(arrayUnique(arr));
  }

  $.fn = Dom7.prototype;

  function addClass() {
    var classes = [], len = arguments.length;
    while ( len-- ) classes[ len ] = arguments[ len ];

    var classNames = arrayFlat(classes.map(function (c) { return c.split(' '); }));
    this.forEach(function (el) {
      var ref;

      (ref = el.classList).add.apply(ref, classNames);
    });
    return this;
  }
  function removeClass() {
    var classes = [], len = arguments.length;
    while ( len-- ) classes[ len ] = arguments[ len ];

    var classNames = arrayFlat(classes.map(function (c) { return c.split(' '); }));
    this.forEach(function (el) {
      var ref;

      (ref = el.classList).remove.apply(ref, classNames);
    });
    return this;
  }
  function toggleClass() {
    var classes = [], len = arguments.length;
    while ( len-- ) classes[ len ] = arguments[ len ];

    var classNames = arrayFlat(classes.map(function (c) { return c.split(' '); }));
    this.forEach(function (el) {
      classNames.forEach(function (className) {
        el.classList.toggle(className);
      });
    });
  }
  function hasClass() {
    var classes = [], len = arguments.length;
    while ( len-- ) classes[ len ] = arguments[ len ];

    var classNames = arrayFlat(classes.map(function (c) { return c.split(' '); }));
    return (
      arrayFilter(this, function (el) {
        return (
          classNames.filter(function (className) { return el.classList.contains(className); })
            .length > 0
        );
      }).length > 0
    );
  }
  function attr(attrs, value) {
    var arguments$1 = arguments;

    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) { return this[0].getAttribute(attrs); }
      return undefined;
    }

    // Set attrs
    for (var i = 0; i < this.length; i += 1) {
      if (arguments$1.length === 2) {
        // String
        this[i].setAttribute(attrs, value);
      } else {
        // Object
        for (var attrName in attrs) {
          this[i][attrName] = attrs[attrName];
          this[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    return this;
  }
  function removeAttr(attr) {
    for (var i = 0; i < this.length; i += 1) {
      this[i].removeAttribute(attr);
    }
    return this;
  }
  function prop(props, value) {
    var arguments$1 = arguments;

    if (arguments.length === 1 && typeof props === 'string') {
      // Get prop
      if (this[0]) { return this[0][props]; }
    } else {
      // Set props
      for (var i = 0; i < this.length; i += 1) {
        if (arguments$1.length === 2) {
          // String
          this[i][props] = value;
        } else {
          // Object
          for (var propName in props) {
            this[i][propName] = props[propName];
          }
        }
      }
      return this;
    }
    return this;
  }
  function data(key, value) {
    var el;
    if (typeof value === 'undefined') {
      el = this[0];
      if (!el) { return undefined; }
      // Get value
      if (el.dom7ElementDataStorage && key in el.dom7ElementDataStorage) {
        return el.dom7ElementDataStorage[key];
      }

      var dataKey = el.getAttribute(("data-" + key));
      if (dataKey) {
        return dataKey;
      }
      return undefined;
    }

    // Set value
    for (var i = 0; i < this.length; i += 1) {
      el = this[i];
      if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
      el.dom7ElementDataStorage[key] = value;
    }
    return this;
  }
  function removeData(key) {
    for (var i = 0; i < this.length; i += 1) {
      var el = this[i];
      if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
        el.dom7ElementDataStorage[key] = null;
        delete el.dom7ElementDataStorage[key];
      }
    }
  }
  function dataset() {
    var el = this[0];
    if (!el) { return undefined; }
    var dataset = {}; // eslint-disable-line
    if (el.dataset) {
      for (var dataKey in el.dataset) {
        dataset[dataKey] = el.dataset[dataKey];
      }
    } else {
      for (var i = 0; i < el.attributes.length; i += 1) {
        var attr = el.attributes[i];
        if (attr.name.indexOf('data-') >= 0) {
          dataset[toCamelCase(attr.name.split('data-')[1])] = attr.value;
        }
      }
    }
    for (var key in dataset) {
      if (dataset[key] === 'false') { dataset[key] = false; }
      else if (dataset[key] === 'true') { dataset[key] = true; }
      else if (parseFloat(dataset[key]) === dataset[key] * 1) { dataset[key] *= 1; }
    }
    return dataset;
  }
  function val(value) {
    if (typeof value === 'undefined') {
      // get value
      var el = this[0];
      if (!el) { return undefined; }
      if (el.multiple && el.nodeName.toLowerCase() === 'select') {
        var values = [];
        for (var i = 0; i < el.selectedOptions.length; i += 1) {
          values.push(el.selectedOptions[i].value);
        }
        return values;
      }
      return el.value;
    }

    // set value
    for (var i$1 = 0; i$1 < this.length; i$1 += 1) {
      var el$1 = this[i$1];
      if (
        Array.isArray(value) &&
        el$1.multiple &&
        el$1.nodeName.toLowerCase() === 'select'
      ) {
        for (var j = 0; j < el$1.options.length; j += 1) {
          el$1.options[j].selected = value.indexOf(el$1.options[j].value) >= 0;
        }
      } else {
        el$1.value = value;
      }
    }
    return this;
  }
  function value(value) {
    return this.val(value);
  }
  function transform(transform) {
    for (var i = 0; i < this.length; i += 1) {
      this[i].style.transform = transform;
    }
    return this;
  }
  function transition(duration) {
    for (var i = 0; i < this.length; i += 1) {
      this[i].style.transition =
        typeof duration !== 'string' ? (duration + "ms") : duration;
    }
    return this;
  }
  function on() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];
    if (typeof args[1] === 'function') {
      (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
      targetSelector = undefined;
    }
    if (!capture) { capture = false; }

    function handleLiveEvent(e) {
      var target = e.target;
      if (!target) { return; }
      var eventData = e.target.dom7EventData || [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      if ($(target).is(targetSelector)) { listener.apply(target, eventData); }
      else {
        var parents = $(target).parents(); // eslint-disable-line
        for (var k = 0; k < parents.length; k += 1) {
          if ($(parents[k]).is(targetSelector))
            { listener.apply(parents[k], eventData); }
        }
      }
    }
    function handleEvent(e) {
      var eventData = e && e.target ? e.target.dom7EventData || [] : [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      listener.apply(this, eventData);
    }
    var events = eventType.split(' ');
    var j;
    for (var i = 0; i < this.length; i += 1) {
      var el = this[i];
      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          var event = events[j];
          if (!el.dom7Listeners) { el.dom7Listeners = {}; }
          if (!el.dom7Listeners[event]) { el.dom7Listeners[event] = []; }
          el.dom7Listeners[event].push({
            listener: listener,
            proxyListener: handleEvent,
          });
          el.addEventListener(event, handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          var event$1 = events[j];
          if (!el.dom7LiveListeners) { el.dom7LiveListeners = {}; }
          if (!el.dom7LiveListeners[event$1]) { el.dom7LiveListeners[event$1] = []; }
          el.dom7LiveListeners[event$1].push({
            listener: listener,
            proxyListener: handleLiveEvent,
          });
          el.addEventListener(event$1, handleLiveEvent, capture);
        }
      }
    }
    return this;
  }
  function off() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];
    if (typeof args[1] === 'function') {
      (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
      targetSelector = undefined;
    }
    if (!capture) { capture = false; }

    var events = eventType.split(' ');
    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];
      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];
        var handlers = (void 0);
        if (!targetSelector && el.dom7Listeners) {
          handlers = el.dom7Listeners[event];
        } else if (targetSelector && el.dom7LiveListeners) {
          handlers = el.dom7LiveListeners[event];
        }
        if (handlers && handlers.length) {
          for (var k = handlers.length - 1; k >= 0; k -= 1) {
            var handler = handlers[k];
            if (listener && handler.listener === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (
              listener &&
              handler.listener &&
              handler.listener.dom7proxy &&
              handler.listener.dom7proxy === listener
            ) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (!listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            }
          }
        }
      }
    }
    return this;
  }
  function once() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var dom = this;
    var eventName = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];
    if (typeof args[1] === 'function') {
      (assign = args, eventName = assign[0], listener = assign[1], capture = assign[2]);
      targetSelector = undefined;
    }
    function onceHandler() {
      var eventArgs = [], len = arguments.length;
      while ( len-- ) eventArgs[ len ] = arguments[ len ];

      listener.apply(this, eventArgs);
      dom.off(eventName, targetSelector, onceHandler, capture);
      if (onceHandler.dom7proxy) {
        delete onceHandler.dom7proxy;
      }
    }
    onceHandler.dom7proxy = listener;
    return dom.on(eventName, targetSelector, onceHandler, capture);
  }
  function trigger() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var events = args[0].split(' ');
    var eventData = args[1];
    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];
      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];
        var evt = new win.CustomEvent(event, {
          detail: eventData,
          bubbles: true,
          cancelable: true,
        });
        el.dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
        el.dispatchEvent(evt);
        el.dom7EventData = [];
        delete el.dom7EventData;
      }
    }
    return this;
  }
  function transitionEnd(callback) {
    var dom = this;
    function fireCallBack(e) {
      if (e.target !== this) { return; }
      callback.call(this, e);
      dom.off('transitionend', fireCallBack);
    }
    if (callback) {
      dom.on('transitionend', fireCallBack);
    }
    return this;
  }
  function animationEnd(callback) {
    var dom = this;
    function fireCallBack(e) {
      if (e.target !== this) { return; }
      callback.call(this, e);
      dom.off('animationend', fireCallBack);
    }
    if (callback) {
      dom.on('animationend', fireCallBack);
    }
    return this;
  }
  function width() {
    if (this[0] === win) {
      return win.innerWidth;
    }

    if (this.length > 0) {
      return parseFloat(this.css('width'));
    }

    return null;
  }
  function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        var styles = this.styles();
        return (
          this[0].offsetWidth +
          parseFloat(styles.getPropertyValue('margin-right')) +
          parseFloat(styles.getPropertyValue('margin-left'))
        );
      }
      return this[0].offsetWidth;
    }
    return null;
  }
  function height() {
    if (this[0] === win) {
      return win.innerHeight;
    }

    if (this.length > 0) {
      return parseFloat(this.css('height'));
    }

    return null;
  }
  function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        var styles = this.styles();
        return (
          this[0].offsetHeight +
          parseFloat(styles.getPropertyValue('margin-top')) +
          parseFloat(styles.getPropertyValue('margin-bottom'))
        );
      }
      return this[0].offsetHeight;
    }
    return null;
  }
  function offset() {
    if (this.length > 0) {
      var el = this[0];
      var box = el.getBoundingClientRect();
      var body = doc.body;
      var clientTop = el.clientTop || body.clientTop || 0;
      var clientLeft = el.clientLeft || body.clientLeft || 0;
      var scrollTop = el === win ? win.scrollY : el.scrollTop;
      var scrollLeft = el === win ? win.scrollX : el.scrollLeft;
      return {
        top: box.top + scrollTop - clientTop,
        left: box.left + scrollLeft - clientLeft,
      };
    }

    return null;
  }
  function hide() {
    for (var i = 0; i < this.length; i += 1) {
      this[i].style.display = 'none';
    }
    return this;
  }
  function show() {
    for (var i = 0; i < this.length; i += 1) {
      var el = this[i];
      if (el.style.display === 'none') {
        el.style.display = '';
      }
      if (
        win.getComputedStyle(el, null).getPropertyValue('display') === 'none'
      ) {
        // Still not visible
        el.style.display = 'block';
      }
    }
    return this;
  }
  function styles() {
    if (this[0]) { return win.getComputedStyle(this[0], null); }
    return {};
  }
  function css(props, value) {
    var i;
    if (arguments.length === 1) {
      if (typeof props === 'string') {
        // .css('width')
        if (this[0])
          { return win.getComputedStyle(this[0], null).getPropertyValue(props); }
      } else {
        // .css({ width: '100px' })
        for (i = 0; i < this.length; i += 1) {
          for (var prop in props) {
            this[i].style[prop] = props[prop];
          }
        }
        return this;
      }
    }
    if (arguments.length === 2 && typeof props === 'string') {
      // .css('width', '100px')
      for (i = 0; i < this.length; i += 1) {
        this[i].style[props] = value;
      }
      return this;
    }
    return this;
  }
  function each(callback) {
    this.forEach(callback);
    return this;
  }
  function filter(callback) {
    var result = arrayFilter(this, callback);
    return $(result);
  }
  function html(html) {
    if (typeof html === 'undefined') {
      return this[0] ? this[0].innerHTML : null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].innerHTML = html;
    }
    return this;
  }
  function text(text) {
    if (typeof text === 'undefined') {
      return this[0] ? this[0].textContent.trim() : null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].textContent = text;
    }
    return this;
  }
  function is(selector) {
    var el = this[0];
    var compareWith;
    var i;
    if (!el || typeof selector === 'undefined') { return false; }
    if (typeof selector === 'string') {
      if (el.matches) { return el.matches(selector); }
      if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
      if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

      compareWith = $(selector);
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    }
    if (selector === doc) {
      return el === doc;
    }
    if (selector === win) {
      return el === win;
    }

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    }
    return false;
  }
  function eq(index) {
    if (typeof index === 'undefined') { return this; }
    var length = this.length;
    if (index > length - 1) {
      return $([]);
    }
    if (index < 0) {
      var returnIndex = length + index;
      if (returnIndex < 0) { return $([]); }
      return $([this[returnIndex]]);
    }
    return $([this[index]]);
  }
  function append() {
    var els = [], len = arguments.length;
    while ( len-- ) els[ len ] = arguments[ len ];

    var newChild;

    for (var k = 0; k < els.length; k += 1) {
      newChild = els[k];
      for (var i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = doc.createElement('div');
          tempDiv.innerHTML = newChild;
          while (tempDiv.firstChild) {
            this[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (var j = 0; j < newChild.length; j += 1) {
            this[i].appendChild(newChild[j]);
          }
        } else {
          this[i].appendChild(newChild);
        }
      }
    }

    return this;
  }
  function appendTo(parent) {
    $(parent).append(this);
    return this;
  }
  function prepend(newChild) {
    var i;
    var j;
    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = doc.createElement('div');
        tempDiv.innerHTML = newChild;
        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this[i].insertBefore(newChild[j], this[i].childNodes[0]);
        }
      } else {
        this[i].insertBefore(newChild, this[i].childNodes[0]);
      }
    }
    return this;
  }
  function prependTo(parent) {
    $(parent).prepend(this);
    return this;
  }
  function insertBefore(selector) {
    var before = $(selector);
    for (var i = 0; i < this.length; i += 1) {
      if (before.length === 1) {
        before[0].parentNode.insertBefore(this[i], before[0]);
      } else if (before.length > 1) {
        for (var j = 0; j < before.length; j += 1) {
          before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
        }
      }
    }
  }
  function insertAfter(selector) {
    var after = $(selector);
    for (var i = 0; i < this.length; i += 1) {
      if (after.length === 1) {
        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
      } else if (after.length > 1) {
        for (var j = 0; j < after.length; j += 1) {
          after[j].parentNode.insertBefore(
            this[i].cloneNode(true),
            after[j].nextSibling
          );
        }
      }
    }
  }
  function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (
          this[0].nextElementSibling &&
          $(this[0].nextElementSibling).is(selector)
        ) {
          return $([this[0].nextElementSibling]);
        }
        return $([]);
      }

      if (this[0].nextElementSibling) { return $([this[0].nextElementSibling]); }
      return $([]);
    }
    return $([]);
  }
  function nextAll(selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) { return $([]); }
    while (el.nextElementSibling) {
      var next = el.nextElementSibling; // eslint-disable-line
      if (selector) {
        if ($(next).is(selector)) { nextEls.push(next); }
      } else { nextEls.push(next); }
      el = next;
    }
    return $(nextEls);
  }
  function prev(selector) {
    if (this.length > 0) {
      var el = this[0];
      if (selector) {
        if (
          el.previousElementSibling &&
          $(el.previousElementSibling).is(selector)
        ) {
          return $([el.previousElementSibling]);
        }
        return $([]);
      }

      if (el.previousElementSibling) { return $([el.previousElementSibling]); }
      return $([]);
    }
    return $([]);
  }
  function prevAll(selector) {
    var prevEls = [];
    var el = this[0];
    if (!el) { return $([]); }
    while (el.previousElementSibling) {
      var prev = el.previousElementSibling; // eslint-disable-line
      if (selector) {
        if ($(prev).is(selector)) { prevEls.push(prev); }
      } else { prevEls.push(prev); }
      el = prev;
    }
    return $(prevEls);
  }
  function siblings(selector) {
    return this.nextAll(selector).add(this.prevAll(selector));
  }
  function parent(selector) {
    var parents = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode !== null) {
        if (selector) {
          if ($(this[i].parentNode).is(selector))
            { parents.push(this[i].parentNode); }
        } else {
          parents.push(this[i].parentNode);
        }
      }
    }
    return $(parents);
  }
  function parents(selector) {
    var parents = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      var parent = this[i].parentNode; // eslint-disable-line
      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) { parents.push(parent); }
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return $(parents);
  }
  function closest(selector) {
    var closest = this; // eslint-disable-line
    if (typeof selector === 'undefined') {
      return $([]);
    }
    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }
    return closest;
  }
  function find(selector) {
    var foundElements = [];
    for (var i = 0; i < this.length; i += 1) {
      var found = this[i].querySelectorAll(selector);
      for (var j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }
    return $(foundElements);
  }
  function children(selector) {
    var children = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      var childNodes = this[i].children;

      for (var j = 0; j < childNodes.length; j += 1) {
        if (!selector || $(childNodes[j]).is(selector)) {
          children.push(childNodes[j]);
        }
      }
    }
    return $(children);
  }
  function remove() {
    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode) { this[i].parentNode.removeChild(this[i]); }
    }
    return this;
  }
  function detach() {
    return this.remove();
  }
  function add() {
    var els = [], len = arguments.length;
    while ( len-- ) els[ len ] = arguments[ len ];

    var dom = this;
    dom.push.apply(dom, els);
    return dom;
  }
  function empty() {
    for (var i = 0; i < this.length; i += 1) {
      var el = this[i];
      if (el.nodeType === 1) {
        for (var j = 0; j < el.childNodes.length; j += 1) {
          if (el.childNodes[j].parentNode) {
            el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
          }
        }
        el.textContent = '';
      }
    }
    return this;
  }

  var methods = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    hasClass: hasClass,
    attr: attr,
    removeAttr: removeAttr,
    prop: prop,
    data: data,
    removeData: removeData,
    dataset: dataset,
    val: val,
    value: value,
    transform: transform,
    transition: transition,
    on: on,
    off: off,
    once: once,
    trigger: trigger,
    transitionEnd: transitionEnd,
    animationEnd: animationEnd,
    width: width,
    outerWidth: outerWidth,
    height: height,
    outerHeight: outerHeight,
    offset: offset,
    hide: hide,
    show: show,
    styles: styles,
    css: css,
    each: each,
    filter: filter,
    html: html,
    text: text,
    is: is,
    eq: eq,
    append: append,
    appendTo: appendTo,
    prepend: prepend,
    prependTo: prependTo,
    insertBefore: insertBefore,
    insertAfter: insertAfter,
    next: next,
    nextAll: nextAll,
    prev: prev,
    prevAll: prevAll,
    siblings: siblings,
    parent: parent,
    parents: parents,
    closest: closest,
    find: find,
    children: children,
    remove: remove,
    detach: detach,
    add: add,
    empty: empty
  });

  function scrollTo() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var left = args[0];
    var top = args[1];
    var duration = args[2];
    var easing = args[3];
    var callback = args[4];
    if (args.length === 4 && typeof easing === 'function') {
      callback = easing;
      (assign = args, left = assign[0], top = assign[1], duration = assign[2], callback = assign[3], easing = assign[4]);
    }
    if (typeof easing === 'undefined') { easing = 'swing'; }

    return this.each(function animate() {
      var el = this;
      var currentTop;
      var currentLeft;
      var maxTop;
      var maxLeft;
      var newTop;
      var newLeft;
      var scrollTop; // eslint-disable-line
      var scrollLeft; // eslint-disable-line
      var animateTop = top > 0 || top === 0;
      var animateLeft = left > 0 || left === 0;
      if (typeof easing === 'undefined') {
        easing = 'swing';
      }
      if (animateTop) {
        currentTop = el.scrollTop;
        if (!duration) {
          el.scrollTop = top;
        }
      }
      if (animateLeft) {
        currentLeft = el.scrollLeft;
        if (!duration) {
          el.scrollLeft = left;
        }
      }
      if (!duration) { return; }
      if (animateTop) {
        maxTop = el.scrollHeight - el.offsetHeight;
        newTop = Math.max(Math.min(top, maxTop), 0);
      }
      if (animateLeft) {
        maxLeft = el.scrollWidth - el.offsetWidth;
        newLeft = Math.max(Math.min(left, maxLeft), 0);
      }
      var startTime = null;
      if (animateTop && newTop === currentTop) { animateTop = false; }
      if (animateLeft && newLeft === currentLeft) { animateLeft = false; }
      function render(time) {
        if ( time === void 0 ) time = new Date().getTime();

        if (startTime === null) {
          startTime = time;
        }
        var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
        var easeProgress =
          easing === 'linear' ? progress : 0.5 - Math.cos(progress * Math.PI) / 2;
        var done;
        if (animateTop)
          { scrollTop = currentTop + easeProgress * (newTop - currentTop); }
        if (animateLeft)
          { scrollLeft = currentLeft + easeProgress * (newLeft - currentLeft); }
        if (animateTop && newTop > currentTop && scrollTop >= newTop) {
          el.scrollTop = newTop;
          done = true;
        }
        if (animateTop && newTop < currentTop && scrollTop <= newTop) {
          el.scrollTop = newTop;
          done = true;
        }
        if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft) {
          el.scrollLeft = newLeft;
          done = true;
        }
        if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft) {
          el.scrollLeft = newLeft;
          done = true;
        }

        if (done) {
          if (callback) { callback(); }
          return;
        }
        if (animateTop) { el.scrollTop = scrollTop; }
        if (animateLeft) { el.scrollLeft = scrollLeft; }
        win.requestAnimationFrame(render);
      }
      win.requestAnimationFrame(render);
    });
  }
  // scrollTop(top, duration, easing, callback) {
  function scrollTop() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var top = args[0];
    var duration = args[1];
    var easing = args[2];
    var callback = args[3];
    if (args.length === 3 && typeof easing === 'function') {
      (assign = args, top = assign[0], duration = assign[1], callback = assign[2], easing = assign[3]);
    }
    var dom = this;
    if (typeof top === 'undefined') {
      if (dom.length > 0) { return dom[0].scrollTop; }
      return null;
    }
    return dom.scrollTo(undefined, top, duration, easing, callback);
  }
  function scrollLeft() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var left = args[0];
    var duration = args[1];
    var easing = args[2];
    var callback = args[3];
    if (args.length === 3 && typeof easing === 'function') {
      (assign = args, left = assign[0], duration = assign[1], callback = assign[2], easing = assign[3]);
    }
    var dom = this;
    if (typeof left === 'undefined') {
      if (dom.length > 0) { return dom[0].scrollLeft; }
      return null;
    }
    return dom.scrollTo(left, undefined, duration, easing, callback);
  }

  var scroll = /*#__PURE__*/Object.freeze({
    __proto__: null,
    scrollTo: scrollTo,
    scrollTop: scrollTop,
    scrollLeft: scrollLeft
  });

  function animate(initialProps, initialParams) {
    var els = this;
    var a = {
      props: Object.assign({}, initialProps),
      params: Object.assign(
        {
          duration: 300,
          easing: 'swing', // or 'linear'
          /* Callbacks
          begin(elements)
          complete(elements)
          progress(elements, complete, remaining, start, tweenValue)
          */
        },
        initialParams
      ),

      elements: els,
      animating: false,
      que: [],

      easingProgress: function easingProgress(easing, progress) {
        if (easing === 'swing') {
          return 0.5 - Math.cos(progress * Math.PI) / 2;
        }
        if (typeof easing === 'function') {
          return easing(progress);
        }
        return progress;
      },
      stop: function stop() {
        if (a.frameId) {
          win.cancelAnimationFrame(a.frameId);
        }
        a.animating = false;
        a.elements.each(function (index, el) {
          var element = el;
          delete element.dom7AnimateInstance;
        });
        a.que = [];
      },
      done: function done(complete) {
        a.animating = false;
        a.elements.each(function (index, el) {
          var element = el;
          delete element.dom7AnimateInstance;
        });
        if (complete) { complete(els); }
        if (a.que.length > 0) {
          var que = a.que.shift();
          a.animate(que[0], que[1]);
        }
      },
      animate: function animate(props, params) {
        if (a.animating) {
          a.que.push([props, params]);
          return a;
        }
        var elements = [];

        // Define & Cache Initials & Units
        a.elements.each(function (index, el) {
          var initialFullValue;
          var initialValue;
          var unit;
          var finalValue;
          var finalFullValue;

          if (!el.dom7AnimateInstance) { a.elements[index].dom7AnimateInstance = a; }

          elements[index] = {
            container: el,
          };
          Object.keys(props).forEach(function (prop) {
            initialFullValue = win
              .getComputedStyle(el, null)
              .getPropertyValue(prop)
              .replace(',', '.');
            initialValue = parseFloat(initialFullValue);
            unit = initialFullValue.replace(initialValue, '');
            finalValue = parseFloat(props[prop]);
            finalFullValue = props[prop] + unit;
            elements[index][prop] = {
              initialFullValue: initialFullValue,
              initialValue: initialValue,
              unit: unit,
              finalValue: finalValue,
              finalFullValue: finalFullValue,
              currentValue: initialValue,
            };
          });
        });

        var startTime = null;
        var time;
        var elementsDone = 0;
        var propsDone = 0;
        var done;
        var began = false;

        a.animating = true;

        function render() {
          time = new Date().getTime();
          var progress;
          var easeProgress;
          // let el;
          if (!began) {
            began = true;
            if (params.begin) { params.begin(els); }
          }
          if (startTime === null) {
            startTime = time;
          }
          if (params.progress) {
            // eslint-disable-next-line
            params.progress(
              els,
              Math.max(Math.min((time - startTime) / params.duration, 1), 0),
              startTime + params.duration - time < 0
                ? 0
                : startTime + params.duration - time,
              startTime
            );
          }

          elements.forEach(function (element) {
            var el = element;
            if (done || el.done) { return; }
            Object.keys(props).forEach(function (prop) {
              if (done || el.done) { return; }
              progress = Math.max(
                Math.min((time - startTime) / params.duration, 1),
                0
              );
              easeProgress = a.easingProgress(params.easing, progress);
              var ref = el[prop];
              var initialValue = ref.initialValue;
              var finalValue = ref.finalValue;
              var unit = ref.unit;
              el[prop].currentValue =
                initialValue + easeProgress * (finalValue - initialValue);
              var currentValue = el[prop].currentValue;

              if (
                (finalValue > initialValue && currentValue >= finalValue) ||
                (finalValue < initialValue && currentValue <= finalValue)
              ) {
                el.container.style[prop] = finalValue + unit;
                propsDone += 1;
                if (propsDone === Object.keys(props).length) {
                  el.done = true;
                  elementsDone += 1;
                }
                if (elementsDone === elements.length) {
                  done = true;
                }
              }
              if (done) {
                a.done(params.complete);
                return;
              }
              el.container.style[prop] = currentValue + unit;
            });
          });
          if (done) { return; }
          // Then call
          a.frameId = win.requestAnimationFrame(render);
        }
        a.frameId = win.requestAnimationFrame(render);
        return a;
      },
    };

    if (a.elements.length === 0) {
      return els;
    }

    var animateInstance;
    for (var i = 0; i < a.elements.length; i += 1) {
      if (a.elements[i].dom7AnimateInstance) {
        animateInstance = a.elements[i].dom7AnimateInstance;
      } else { a.elements[i].dom7AnimateInstance = a; }
    }
    if (!animateInstance) {
      animateInstance = a;
    }

    if (initialProps === 'stop') {
      animateInstance.stop();
    } else {
      animateInstance.animate(a.props, a.params);
    }

    return els;
  }

  function stop() {
    var els = this;
    for (var i = 0; i < els.length; i += 1) {
      if (els[i].dom7AnimateInstance) {
        els[i].dom7AnimateInstance.stop();
      }
    }
  }

  var animate$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    animate: animate,
    stop: stop
  });

  var noTrigger = 'resize scroll'.split(' ');
  function shortcut(name) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
    if (typeof args[0] === 'undefined') {
      for (var i = 0; i < this.length; i += 1) {
        if (noTrigger.indexOf(name) < 0) {
          if (name in this[i]) { this[i][name](); }
          else {
            $(this[i]).trigger(name);
          }
        }
      }
      return this;
    }
    return (ref = this).on.apply(ref, [ name ].concat( args ));
  }
  var shortcuts = {};
  [
    'click',
    'blur',
    'focus',
    'focusin',
    'focusout',
    'keyup',
    'keydown',
    'keypress',
    'submit',
    'change',
    'mousedown',
    'mousemove',
    'mouseup',
    'mouseenter',
    'mouseleave',
    'mouseout',
    'mouseover',
    'touchstart',
    'touchend',
    'touchmove',
    'resize',
    'scroll' ].forEach(function (name) {
    shortcuts[name] = function eventHandler() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return shortcut.bind(this).apply(void 0, [ name ].concat( args ));
    };
  });

  [methods, scroll, animate$1, shortcuts].forEach(function (group) {
    Object.keys(group).forEach(function (methodName) {
      $.fn[methodName] = group[methodName];
    });
  });

  return $;

})));
