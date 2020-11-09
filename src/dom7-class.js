/* eslint-disable no-proto */
function makeReactive(obj) {
  const proto = obj.__proto__;
  Object.defineProperty(obj, '__proto__', {
    get() {
      return proto;
    },
    set(value) {
      proto.__proto__ = value;
    },
  });
}
class Dom7 extends Array {
  constructor(items) {
    super(...items);

    makeReactive(this);
  }
}
export default Dom7;
