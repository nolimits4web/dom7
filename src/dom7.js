import Dom7 from './dom7-class';
import $ from './$';
import Utils from './utils';
import Ajax from './ajax';
import Scroll from './scroll';
import Methods from './methods';

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
