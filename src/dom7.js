import Dom7 from './dom7-class';
import $ from './$';
import Utils from './utils';
import { ajax, get, post, getJSON } from './ajax';
import Scroll from './scroll';
import Methods from './methods';
import { animate, stop } from './animate';

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
  Dom7.prototype.animate = animate;
  Dom7.prototype.stop = stop;

  // Ajax
  $.ajax = ajax;
  $.get = get;
  $.post = post;
  $.getJSON = getJSON;

  // Link to prototype
  $.fn = Dom7.prototype;

  return $;
}
export default dom7();
