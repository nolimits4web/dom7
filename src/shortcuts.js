import $ from './$';

const noTrigger = 'resize scroll'.split(' ');
function shortcut(name, ...args) {
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
const shortcuts = {};
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
  'scroll',
].forEach((name) => {
  shortcuts[name] = function eventHandler(...args) {
    return shortcut.bind(this)(name, ...args);
  };
});

export default shortcuts;
