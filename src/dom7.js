import $ from './$';
import Utils from './utils';
import * as Ajax from './ajax';
import Scroll from './scroll';
import Methods from './methods';
import * as Animate from './animate';

// Utils & Helpers
Object.keys(Utils).forEach((key) => {
  $[key] = Utils[key];
});

// Methods
Object.keys(Methods).forEach((key) => {
  $.fn[key] = Methods[key];
});

// Scroll
Object.keys(Scroll).forEach((key) => {
  $.fn[key] = Scroll[key];
});

// Animate
Object.keys(Animate).forEach((key) => {
  $.fn[key] = Animate[key];
});

// Ajax
Object.keys(Ajax).forEach((key) => {
  $[key] = Ajax[key];
});

export default $;
