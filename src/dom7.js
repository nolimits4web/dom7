import $ from './$';
import * as methods from './methods';
import * as scroll from './scroll';
import * as animate from './animate';
import * as shortcuts from './shortcuts';

[methods, scroll, animate, shortcuts].forEach((group) => {
  Object.keys(group).forEach((methodName) => {
    $.fn[methodName] = group[methodName];
  });
});

export default $;
