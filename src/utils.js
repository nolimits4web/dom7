import Dom7 from './dom7-class';
import $ from './$';

function parseUrlQuery(url) {
  const query = {};
  let urlToParse = url || window.location.href;
  let i;
  let params;
  let param;
  let length;
  if (typeof urlToParse === 'string' && urlToParse.length) {
    urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
    params = urlToParse.split('&').filter(paramsPart => paramsPart !== '');
    length = params.length;

    for (i = 0; i < length; i += 1) {
      param = params[i].replace(/#\S+/g, '').split('=');
      query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
    }
  }
  return query;
}
function isArray(arr) {
  return Array.isArray(arr);
}
function each(obj, callback) {
  // Check it's iterable
  // TODO: Should probably raise a value error here
  if (typeof obj !== 'object') return;
  // Don't bother continuing without a callback
  if (!callback) return;
  if (Array.isArray(obj) || obj instanceof Dom7) {
    // Array
    for (let i = 0; i < obj.length; i += 1) {
      // If callback returns false
      if (callback(i, obj[i]) === false) {
        // Break out of the loop
        return;
      }
    }
  } else {
    // Object
    for (let prop in obj) {
      // Check the propertie belongs to the object
      // not it's prototype
      if (obj.hasOwnProperty(prop)) {
        // If the callback returns false
        if (callback(prop, obj[prop]) === false) {
          // Break out of the loop;
          return;
        }
      }
    }
  }
}
function unique(arr) {
  const uniqueArray = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
  }
  return uniqueArray;
}
function serializeObject(obj, parents = []) {
  if (typeof obj === 'string') return obj;
  const resultArray = [];
  const separator = '&';
  let newParents;
  function varName(name) {
    if (parents.length > 0) {
      let parentParts = '';
      for (let j = 0; j < parents.length; j += 1) {
        if (j === 0) parentParts += parents[j];
        else parentParts += `[${encodeURIComponent(parents[j])}]`;
      }
      return `${parentParts}[${encodeURIComponent(name)}]`;
    }
    return encodeURIComponent(name);
  }
  function varValue(value) {
    return encodeURIComponent(value);
  }
  Object.keys(obj).forEach((prop) => {
    let toPush;
    if (Array.isArray(obj[prop])) {
      toPush = [];
      for (let i = 0; i < obj[prop].length; i += 1) {
        if (!Array.isArray(obj[prop][i]) && typeof obj[prop][i] === 'object') {
          newParents = parents.slice();
          newParents.push(prop);
          newParents.push(String(i));
          toPush.push(serializeObject(obj[prop][i], newParents));
        } else {
          toPush.push(`${varName(prop)}[]=${varValue(obj[prop][i])}`);
        }
      }
      if (toPush.length > 0) resultArray.push(toPush.join(separator));
    } else if (obj[prop] === null || obj[prop] === '') {
      resultArray.push(`${varName(prop)}=`);
    } else if (typeof obj[prop] === 'object') {
      // Object, convert to named array
      newParents = parents.slice();
      newParents.push(prop);
      toPush = serializeObject(obj[prop], newParents);
      if (toPush !== '') resultArray.push(toPush);
    } else if (typeof obj[prop] !== 'undefined' && obj[prop] !== '') {
      // Should be string or plain value
      resultArray.push(`${varName(prop)}=${varValue(obj[prop])}`);
    } else if (obj[prop] === '') resultArray.push(varName(prop));
  });
  return resultArray.join(separator);
}
function toCamelCase(string) {
  return string.toLowerCase().replace(/-(.)/g, (match, group1) => group1.toUpperCase());
}
function dataset(el) {
  return $(el).dataset();
}
function requestAnimationFrame(callback) {
  if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
  else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
  return window.setTimeout(callback, 1000 / 60);
}
function cancelAnimationFrame(id) {
  if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
  else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
  return window.clearTimeout(id);
}
function isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
}
function extend(...args) {
  const to = Object(args[0]);
  for (let i = 1; i < args.length; i += 1) {
    const nextSource = args[i];
    if (nextSource !== undefined && nextSource !== null) {
      const keysArray = Object.keys(Object(nextSource));
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            extend(to[nextKey], nextSource[nextKey]);
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            extend(to[nextKey], nextSource[nextKey]);
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
const Utils = {
  __utils: true,
  parseUrlQuery,
  parseQuery: parseUrlQuery,
  isArray,
  each,
  unique,
  serializeObject,
  param: serializeObject,
  toCamelCase,
  dataset,
  requestAnimationFrame,
  cancelAnimationFrame,
  extend,
};

export {
  parseUrlQuery,
  isArray,
  each,
  unique,
  serializeObject,
  toCamelCase,
  dataset,
  requestAnimationFrame,
  cancelAnimationFrame,
  extend,
};
export default Utils;
