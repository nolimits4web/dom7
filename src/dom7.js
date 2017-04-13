import Ajax from './ajax';
import { scrollTo, scrollTop, scrollLeft } from './scroll';

function dom7() {
  class Dom7 {
    constructor(arr) {
      const self = this;
      // Create array-like object
      for (let i = 0; i < arr.length; i += 1) {
        self[i] = arr[i];
      }
      self.length = arr.length;
      // Return collection with methods
      return this;
    }
  }
  function $(selector, context) {
    const arr = [];
    let i = 0;
    if (selector && !context) {
      if (selector instanceof Dom7) {
        return selector;
      }
    }
    if (selector) {
        // String
      if (typeof selector === 'string') {
        let els;
        let tempParent;
        const html = selector.trim();
        if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
          let toCreate = 'div';
          if (html.indexOf('<li') === 0) toCreate = 'ul';
          if (html.indexOf('<tr') === 0) toCreate = 'tbody';
          if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
          if (html.indexOf('<tbody') === 0) toCreate = 'table';
          if (html.indexOf('<option') === 0) toCreate = 'select';
          tempParent = document.createElement(toCreate);
          tempParent.innerHTML = html;
          for (i = 0; i < tempParent.childNodes.length; i++) {
            arr.push(tempParent.childNodes[i]);
          }
        } else {
          if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
            // Pure ID selector
            els = [document.getElementById(selector.trim().split('#')[1])];
          } else {
            // Other selectors
            els = (context || document).querySelectorAll(selector.trim());
          }
          for (i = 0; i < els.length; i += 1) {
            if (els[i]) arr.push(els[i]);
          }
        }
      } else if (selector.nodeType || selector === window || selector === document) {
        // Node/element
        arr.push(selector);
      } else if (selector.length > 0 && selector[0].nodeType) {
        // Array of elements or instance of Dom
        for (i = 0; i < selector.length; i += 1) {
          arr.push(selector[i]);
        }
      }
    }
    return new Dom7(arr);
  }

  // Methods

  // Scroll
  Dom7.prototype.scrollTo = scrollTo;
  Dom7.prototype.scrollTop = scrollTop;
  Dom7.prototype.scrollLeft = scrollLeft;

  // Utils & Helpers

  // Global Ajax Setup
  $.globalAjaxOptions = {};
  $.ajaxSetup = function ajaxSetup(options) {
    if (options.type && !options.method) options.method = options.type;
    $.each(options, (optionName, optionValue) => {
      $.globalAjaxOptions[optionName] = optionValue;
    });
  };

  // Ajax
  $.ajax = Ajax;

  // Ajax Shrotcuts
  ('get post getJSON').split(' ').forEach((method) => {
    $[method] = function ajax(url, data, success, error) {
      return $.ajax({
        url,
        method: method === 'post' ? 'POST' : 'GET',
        data: typeof data === 'function' ? undefined : data,
        success: typeof data === 'function' ? data : success,
        error: typeof data === 'function' ? success : error,
        dataType: method === 'getJSON' ? 'json' : undefined,
      });
    };
  });

  // Link to prototype
  $.fn = Dom7.prototype;

  return $;
}
export default dom7();
