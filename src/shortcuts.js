import $ from './$';

const noTrigger = 'resize scroll'.split(' ');
function shortcut(name) {
  function eventHandler(...args) {
    if (typeof args[0] === 'undefined') {
      for (let i = 0; i < this.length; i += 1) {
        if (noTrigger.indexOf(name) < 0) {
          if (name in this[i]) this[i][name]();
          else {
            $(this[i]).trigger(name);
          }
        }
      }
      return this;
    }
    return this.on(name, ...args);
  }
  return eventHandler;
}
export const click = shortcut('click');
export const blur = shortcut('blur');
export const focus = shortcut('focus');
export const focusin = shortcut('focusin');
export const focusout = shortcut('focusout');
export const keyup = shortcut('keyup');
export const keydown = shortcut('keydown');
export const keypress = shortcut('keypress');
export const submit = shortcut('submit');
export const change = shortcut('change');
export const mousedown = shortcut('mousedown');
export const mousemove = shortcut('mousemove');
export const mouseup = shortcut('mouseup');
export const mouseenter = shortcut('mouseenter');
export const mouseleave = shortcut('mouseleave');
export const mouseout = shortcut('mouseout');
export const mouseover = shortcut('mouseover');
export const touchstart = shortcut('touchstart');
export const touchend = shortcut('touchend');
export const touchmove = shortcut('touchmove');
export const resize = shortcut('resize');
export const scroll = shortcut('scroll');
