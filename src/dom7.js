import Dom7 from './dom7-class';
import $ from './$';
import Utils from './utils';
import Ajax from './ajax';
import Scroll from './scroll';
import Methods from './methods';
import { Animate, Stop } from './animate';

function dom7() {
  // Utils & Helpers
  Object.keys(Utils).forEach((key) => {
    $[key] = Utils[key];
  });

  // Methods
  Object.keys(Methods).forEach((key) => {
    Dom7.prototype[key] = Methods[key];
  });

  // Scroll
  Object.keys(Scroll).forEach((key) => {
    Dom7.prototype[key] = Scroll[key];
  });

  // Animate
  Dom7.prototype.animate = Animate;
  Dom7.prototype.stop = Stop;

  // Ajax
  $.ajax = Ajax;

  // Ajax Shrotcuts
  ('get post getJSON').split(' ').forEach((method) => {
    $[method] = function ajax(...args) {
      let url;
      let data;
      let success;
      let error;
      let dataType;
      if (typeof args[1] === 'function') {
        [url, success, error, dataType] = args;
      } else {
        [url, data, success, error, dataType] = args;
      }
      [success, error].forEach((callback) => {
        if (typeof callback === 'string') {
          dataType = callback;
          if (callback === success) success = undefined;
          else error = undefined;
        }
      });
      dataType = dataType || (method === 'getJSON' ? 'json' : undefined);
      return $.ajax({
        url,
        method: method === 'post' ? 'POST' : 'GET',
        data,
        success,
        error,
        dataType,
      });
    };
  });

  // Link to prototype
  $.fn = Dom7.prototype;

  return $;
}
export default dom7();
