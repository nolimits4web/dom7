import Dom7 from './dom7-class';
import $ from './$';
import { toCamelCase, unique } from './utils';

const Methods = {
  // Classes and attributes
  addClass(className) {
    if (typeof className === 'undefined') {
      return this;
    }
    const classes = className.split(' ');
    for (let i = 0; i < classes.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        if (typeof this[j].classList !== 'undefined') this[j].classList.add(classes[i]);
      }
    }
    return this;
  },
  removeClass(className) {
    const classes = className.split(' ');
    for (let i = 0; i < classes.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        if (typeof this[j].classList !== 'undefined') this[j].classList.remove(classes[i]);
      }
    }
    return this;
  },
  hasClass(className) {
    if (!this[0]) return false;
    return this[0].classList.contains(className);
  },
  toggleClass(className) {
    const classes = className.split(' ');
    for (let i = 0; i < classes.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        if (typeof this[j].classList !== 'undefined') this[j].classList.toggle(classes[i]);
      }
    }
    return this;
  },
  attr(attrs, value) {
    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) return this[0].getAttribute(attrs);
      return undefined;
    }

    // Set attrs
    for (let i = 0; i < this.length; i += 1) {
      if (arguments.length === 2) {
        // String
        this[i].setAttribute(attrs, value);
      } else {
        // Object
        for (const attrName in attrs) {
          this[i][attrName] = attrs[attrName];
          this[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    return this;
  },
  removeAttr(attr) {
    for (let i = 0; i < this.length; i += 1) {
      this[i].removeAttribute(attr);
    }
    return this;
  },
  prop(props, value) {
    if (arguments.length === 1 && typeof props === 'string') {
      // Get prop
      if (this[0]) return this[0][props];
    } else {
      // Set props
      for (let i = 0; i < this.length; i += 1) {
        if (arguments.length === 2) {
          // String
          this[i][props] = value;
        } else {
          // Object
          for (const propName in props) {
            this[i][propName] = props[propName];
          }
        }
      }
      return this;
    }
  },
  data(key, value) {
    let el;
    if (typeof value === 'undefined') {
      el = this[0];
      // Get value
      if (el) {
        if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
          return el.dom7ElementDataStorage[key];
        }

        const dataKey = el.getAttribute(`data-${key}`);
        if (dataKey) {
          return dataKey;
        }
        return undefined;
      }
      return undefined;
    }

    // Set value
    for (let i = 0; i < this.length; i += 1) {
      el = this[i];
      if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
      el.dom7ElementDataStorage[key] = value;
    }
    return this;
  },
  removeData(key) {
    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];
      if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
        el.dom7ElementDataStorage[key] = null;
        delete el.dom7ElementDataStorage[key];
      }
    }
  },
  dataset() {
    const el = this[0];
    if (!el) return undefined;
    const dataset = {};
    if (el.dataset) {
      for (const dataKey in el.dataset) {
        dataset[dataKey] = el.dataset[dataKey];
      }
    } else {
      for (let i = 0; i < el.attributes.length; i += 1) {
        const attr = el.attributes[i];
        if (attr.name.indexOf('data-') >= 0) {
          dataset[toCamelCase(attr.name.split('data-')[1])] = attr.value;
        }
      }
    }
    for (const key in dataset) {
      if (dataset[key] === 'false') dataset[key] = false;
      else if (dataset[key] === 'true') dataset[key] = true;
      else if (parseFloat(dataset[key]) === dataset[key] * 1) dataset[key] *= 1;
    }
    return dataset;
  },
  val(value) {
    if (typeof value === 'undefined') {
      if (this[0]) {
        if (this[0].multiple && this[0].nodeName.toLowerCase() === 'select') {
          const values = [];
          for (let i = 0; i < this[0].selectedOptions.length; i += 1) {
            values.push(this[0].selectedOptions[i].value);
          }
          return values;
        }
        return this[0].value;
      }
      return undefined;
    }

    for (let i = 0; i < this.length; i += 1) {
      this[i].value = value;
    }
    return this;
  },
  // Transforms
  transform(transform) {
    for (let i = 0; i < this.length; i += 1) {
      const elStyle = this[i].style;
      elStyle.webkitTransform = transform;
      elStyle.transform = transform;
    }
    return this;
  },
  transition(duration) {
    if (typeof duration !== 'string') {
      duration = `${duration}ms`;
    }
    for (let i = 0; i < this.length; i += 1) {
      const elStyle = this[i].style;
      elStyle.webkitTransitionDuration = duration;
      elStyle.transitionDuration = duration;
    }
    return this;
  },
  // Events
  on(...args) {
    const eventType = args[0];
    let targetSelector;
    let listener;
    let capture = false;
    if (typeof args[1] === 'function') {
      targetSelector = false;
      listener = args[1];
      capture = args[2];
    } else {
      targetSelector = args[1];
      listener = args[2];
      capture = args[3];
    }
    function handleLiveEvent(e) {
      const target = e.target;
      if (!target) return;
      const eventData = e.target.dom7EventData || [];
      eventData.unshift(e);
      if ($(target).is(targetSelector)) listener.apply(target, eventData);
      else {
        const parents = $(target).parents();
        for (let k = 0; k < parents.length; k += 1) {
          if ($(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
        }
      }
    }
    function handleEvent(e) {
      const eventData = e && e.target ? e.target.dom7EventData || [] : [];
      eventData.unshift(e);
      listener.apply(this, eventData);
    }
    const events = eventType.split(' ');
    let j;
    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];
      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          if (!el.dom7Listeners) el.dom7Listeners = [];
          el.dom7Listeners.push({
            type: eventType,
            listener,
            proxyListener: handleEvent,
          });
          el.addEventListener(events[j], handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          if (!el.dom7LiveListeners) el.dom7LiveListeners = [];
          el.dom7LiveListeners.push({
            type: eventType,
            listener,
            proxyListener: handleLiveEvent,
          });
          el.addEventListener(events[j], handleLiveEvent, capture);
        }
      }
    }
    return this;
  },
  off(...args) {
    const eventType = args[0];
    let targetSelector;
    let listener;
    let capture = false;
    if (typeof args[1] === 'function') {
      targetSelector = false;
      listener = args[1];
      capture = args[2];
    } else {
      targetSelector = args[1];
      listener = args[2];
      capture = args[3];
    }
    const events = eventType.split(' ');
    for (let i = 0; i < events.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        const el = this[j];
        if (!targetSelector) {
          if (el.dom7Listeners) {
            for (let k = 0; k < el.dom7Listeners.length; k += 1) {
              if (listener) {
                if (el.dom7Listeners[k].listener === listener) {
                  el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
                }
              } else if (el.dom7Listeners[k].type === events[i]) {
                el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
              }
            }
          }
        } else if (el.dom7LiveListeners) {
          for (let k = 0; k < el.dom7LiveListeners.length; k += 1) {
            if (listener) {
              if (el.dom7LiveListeners[k].listener === listener) {
                el.removeEventListener(events[i], el.dom7LiveListeners[k].proxyListener, capture);
              }
            } else if (el.dom7LiveListeners[k].type === events[i]) {
              el.removeEventListener(events[i], el.dom7LiveListeners[k].proxyListener, capture);
            }
          }
        }
      }
    }
    return this;
  },
  once(eventName, targetSelector, listener, capture) {
    const dom = this;
    if (typeof targetSelector === 'function') {
      listener = arguments[1];
      capture = arguments[2];
      targetSelector = false;
    }
    function proxy(e) {
      const eventData = e.target.dom7EventData || [];
      listener.apply(this, eventData);
      dom.off(eventName, targetSelector, proxy, capture);
    }
    return dom.on(eventName, targetSelector, proxy, capture);
  },
  trigger(...args) {
    const events = args[0].split(' ');
    const eventData = args[1];
    for (let i = 0; i < events.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        let evt;
        try {
          evt = new window.CustomEvent(events[i], { detail: eventData, bubbles: true, cancelable: true });
        } catch (e) {
          evt = document.createEvent('Event');
          evt.initEvent(events[i], true, true);
          evt.detail = eventData;
        }
        this[j].dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
        this[j].dispatchEvent(evt);
        this[j].dom7EventData = [];
        delete this[j].dom7EventData;
      }
    }
    return this;
  },
  transitionEnd(callback) {
    const events = ['webkitTransitionEnd', 'transitionend'];
    const dom = this;
    let i;
    function fireCallBack(e) {
      /* jshint validthis:true */
      if (e.target !== this) return;
      callback.call(this, e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  },
  animationEnd(callback) {
    const events = ['webkitAnimationEnd', 'animationend'];
    const dom = this;
    let i;
    function fireCallBack(e) {
      if (e.target !== this) return;
      callback.call(this, e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  },
  // Sizing/Styles
  width() {
    if (this[0] === window) {
      return window.innerWidth;
    }

    if (this.length > 0) {
      return parseFloat(this.css('width'));
    }

    return null;
  },
  outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        const styles = this.styles();
        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
      }
      return this[0].offsetWidth;
    }
    return null;
  },
  height() {
    if (this[0] === window) {
      return window.innerHeight;
    }

    if (this.length > 0) {
      return parseFloat(this.css('height'));
    }

    return null;
  },
  outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        const styles = this.styles();
        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
      }
      return this[0].offsetHeight;
    }
    return null;
  },
  offset() {
    if (this.length > 0) {
      const el = this[0];
      const box = el.getBoundingClientRect();
      const body = document.body;
      const clientTop = el.clientTop || body.clientTop || 0;
      const clientLeft = el.clientLeft || body.clientLeft || 0;
      const scrollTop = el === window ? window.scrollY : el.scrollTop;
      const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
      return {
        top: (box.top + scrollTop) - clientTop,
        left: (box.left + scrollLeft) - clientLeft,
      };
    }

    return null;
  },
  hide() {
    for (let i = 0; i < this.length; i += 1) {
      this[i].style.display = 'none';
    }
    return this;
  },
  show() {
    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];
      if (el.style.display === 'none') {
        el.style.display = '';
      }
      if (window.getComputedStyle(el, null).getPropertyValue('display') === 'none') {
        // Still not visible
        el.style.display = 'block';
      }
    }
    return this;
  },
  styles() {
    if (this[0]) return window.getComputedStyle(this[0], null);
    return {};
  },
  css(props, value) {
    let i;
    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
      } else {
        for (i = 0; i < this.length; i += 1) {
          for (let prop in props) {
            this[i].style[prop] = props[prop];
          }
        }
        return this;
      }
    }
    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this[i].style[props] = value;
      }
      return this;
    }
    return this;
  },

  // Dom manipulation
  toArray() {
    const arr = [];
    for (let i = 0; i < this.length; i += 1) {
      arr.push(this[i]);
    }
    return arr;
  },
  // Iterate over the collection passing elements to `callback`
  each(callback) {
    // Don't bother continuing without a callback
    if (!callback) return this;
    // Iterate over the current collection
    for (let i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this[i], i, this[i]) === false) {
        // End the loop early
        return this;
      }
    }
    // Return `this` to allow chained DOM operations
    return this;
  },
  forEach(callback) {
    // Don't bother continuing without a callback
    if (!callback) return this;
    // Iterate over the current collection
    for (let i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this[i], this[i], i) === false) {
        // End the loop early
        return this;
      }
    }
    // Return `this` to allow chained DOM operations
    return this;
  },
  filter(callback) {
    const matchedItems = [];
    const dom = this;
    for (let i = 0; i < dom.length; i += 1) {
      if (callback.call(dom[i], i, dom[i])) matchedItems.push(dom[i]);
    }
    return new Dom7(matchedItems);
  },
  map(callback) {
    const modifiedItems = [];
    const dom = this;
    for (let i = 0; i < dom.length; i += 1) {
      modifiedItems.push(callback.call(dom[i], i, dom[i]));
    }
    return new Dom7(modifiedItems);
  },
  html(html) {
    if (typeof html === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined;
    }

    for (let i = 0; i < this.length; i += 1) {
      this[i].innerHTML = html;
    }
    return this;
  },
  text(text) {
    if (typeof text === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim();
      }
      return null;
    }

    for (let i = 0; i < this.length; i += 1) {
      this[i].textContent = text;
    }
    return this;
  },
  is(selector) {
    const el = this[0];
    let compareWith;
    let i;
    if (!el || typeof selector === 'undefined') return false;
    if (typeof selector === 'string') {
      if (el.matches) return el.matches(selector);
      else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
      else if (el.msMatchesSelector) return el.msMatchesSelector(selector);

      compareWith = $(selector);
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true;
      }
      return false;
    } else if (selector === document) return el === document;
    else if (selector === window) return el === window;

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) return true;
      }
      return false;
    }
    return false;
  },
  indexOf(el) {
    for (let i = 0; i < this.length; i += 1) {
      if (this[i] === el) return i;
    }
  },
  index() {
    let child = this[0];
    let i;
    if (child) {
      i = 0;
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) i += 1;
      }
      return i;
    }
  },
  eq(index) {
    if (typeof index === 'undefined') return this;
    const length = this.length;
    let returnIndex;
    if (index > length - 1) {
      return new Dom7([]);
    }
    if (index < 0) {
      returnIndex = length + index;
      if (returnIndex < 0) return new Dom7([]);
      return new Dom7([this[returnIndex]]);
    }
    return new Dom7([this[index]]);
  },
  append(...args) {
    let newChild;

    for (let k = 0; k < args.length; k += 1) {
      newChild = args[k];
      for (let i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;
          while (tempDiv.firstChild) {
            this[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (let j = 0; j < newChild.length; j += 1) {
            this[i].appendChild(newChild[j]);
          }
        } else {
          this[i].appendChild(newChild);
        }
      }
    }

    return this;
  },
  appendTo(parent) {
    $(parent).append(this);
    return this;
  },
  prepend(newChild) {
    let i;
    let j;
    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        const tempDiv = document.createElement('div');
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
  },
  prependTo(parent) {
    $(parent).prepend(this);
    return this;
  },
  insertBefore(selector) {
    const before = $(selector);
    for (let i = 0; i < this.length; i += 1) {
      if (before.length === 1) {
        before[0].parentNode.insertBefore(this[i], before[0]);
      } else if (before.length > 1) {
        for (let j = 0; j < before.length; j += 1) {
          before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
        }
      }
    }
  },
  insertAfter(selector) {
    const after = $(selector);
    for (let i = 0; i < this.length; i += 1) {
      if (after.length === 1) {
        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
      } else if (after.length > 1) {
        for (let j = 0; j < after.length; j += 1) {
          after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
        }
      }
    }
  },
  next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
        return new Dom7([]);
      }

      if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
      return new Dom7([]);
    }
    return new Dom7([]);
  },
  nextAll(selector) {
    const nextEls = [];
    let el = this[0];
    if (!el) return new Dom7([]);
    while (el.nextElementSibling) {
      const next = el.nextElementSibling;
      if (selector) {
        if ($(next).is(selector)) nextEls.push(next);
      } else nextEls.push(next);
      el = next;
    }
    return new Dom7(nextEls);
  },
  prev(selector) {
    if (this.length > 0) {
      const el = this[0];
      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) return new Dom7([el.previousElementSibling]);
        return new Dom7([]);
      }

      if (el.previousElementSibling) return new Dom7([el.previousElementSibling]);
      return new Dom7([]);
    }
    return new Dom7([]);
  },
  prevAll(selector) {
    const prevEls = [];
    let el = this[0];
    if (!el) return new Dom7([]);
    while (el.previousElementSibling) {
      const prev = el.previousElementSibling;
      if (selector) {
        if ($(prev).is(selector)) prevEls.push(prev);
      } else prevEls.push(prev);
      el = prev;
    }
    return new Dom7(prevEls);
  },
  siblings(selector) {
    return this.nextAll(selector).add(this.prevAll(selector));
  },
  parent(selector) {
    const parents = [];
    for (let i = 0; i < this.length; i += 1) {
      if (this[i].parentNode !== null) {
        if (selector) {
          if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
        } else {
          parents.push(this[i].parentNode);
        }
      }
    }
    return $(unique(parents));
  },
  parents(selector) {
    const parents = [];
    for (let i = 0; i < this.length; i += 1) {
      let parent = this[i].parentNode;
      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) parents.push(parent);
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return $(unique(parents));
  },
  closest(selector) {
    let closest = this;
    if (typeof selector === 'undefined') {
      return new Dom7([]);
    }
    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }
    return closest;
  },
  find(selector) {
    const foundElements = [];
    for (let i = 0; i < this.length; i += 1) {
      const found = this[i].querySelectorAll(selector);
      for (let j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }
    return new Dom7(foundElements);
  },
  children(selector) {
    const children = [];
    for (let i = 0; i < this.length; i += 1) {
      const childNodes = this[i].childNodes;

      for (let j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
        } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
      }
    }
    return new Dom7(unique(children));
  },
  remove() {
    for (let i = 0; i < this.length; i += 1) {
      if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
    }
    return this;
  },
  detach() {
    return this.remove();
  },
  add(...args) {
    const dom = this;
    let i;
    let j;
    for (i = 0; i < args.length; i += 1) {
      const toAdd = $(args[i]);
      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }
    return dom;
  },
  empty() {
    for (let i = 0; i < this.length; i += 1) {
      const el = this[i];
      if (el.nodeType === 1) {
        for (let j = 0; j < el.childNodes.length; j += 1) {
          if (el.childNodes[j].parentNode) {
            el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
          }
        }
        el.textContent = '';
      }
    }
    return this;
  },
};

// Shortcuts
const shortcuts = ('click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll').split(' ');
const notTrigger = ('resize scroll').split(' ');
function createMethod(name) {
  Methods[name] = function eventShortcut(targetSelector, listener, capture) {
    if (typeof targetSelector === 'undefined') {
      for (let i = 0; i < this.length; i += 1) {
        if (notTrigger.indexOf(name) < 0) {
          if (name in this[i]) this[i][name]();
          else {
            $(this[i]).trigger(name);
          }
        }
      }
      return this;
    }
    return this.on(name, targetSelector, listener, capture);
  };
}
for (let i = 0; i < shortcuts.length; i += 1) {
  createMethod(shortcuts[i]);
}

export default Methods;
