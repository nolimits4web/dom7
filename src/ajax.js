import $ from './$';
import { each, serializeObject } from './utils';

// Global Ajax Setup
const globalAjaxOptions = {};
function ajaxSetup(options) {
  if (options.type && !options.method) options.method = options.type;
  each(options, (optionName, optionValue) => {
    globalAjaxOptions[optionName] = optionValue;
  });
};

// JSONP Requests
let jsonpRequests = 0;

// Ajax
function ajax(options) {
  const defaults = {
    method: 'GET',
    data: false,
    async: true,
    cache: true,
    user: '',
    password: '',
    headers: {},
    xhrFields: {},
    statusCode: {},
    processData: true,
    dataType: 'text',
    contentType: 'application/x-www-form-urlencoded',
    timeout: 0,
  };
  const callbacks = ['beforeSend', 'error', 'complete', 'success', 'statusCode'];

  // For jQuery guys
  if (options.type) options.method = options.type;

  // Global options
  const globals = globalAjaxOptions;

  // Merge global and defaults
  each(globals, (globalOptionName, globalOptionValue) => {
    if (callbacks.indexOf(globalOptionName) < 0) defaults[globalOptionName] = globalOptionValue;
  });

  // Function to run XHR callbacks and events
  function fireAjaxCallback(eventName, eventData, callbackName) {
    const a = arguments;
    if (eventName) $(document).trigger(eventName, eventData);
    if (callbackName) {
      // Global callback
      if (callbackName in globals) globals[callbackName](a[3], a[4], a[5], a[6]);
      // Options callback
      if (options[callbackName]) options[callbackName](a[3], a[4], a[5], a[6]);
    }
  }

  // Merge options and defaults
  each(defaults, (prop, defaultValue) => {
    if (!(prop in options)) options[prop] = defaultValue;
  });

  // Default URL
  if (!options.url) {
    options.url = window.location.toString();
  }
  // Parameters Prefix
  let paramsPrefix = options.url.indexOf('?') >= 0 ? '&' : '?';

  // UC method
  const method = options.method.toUpperCase();

  // Data to modify GET URL
  if ((method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'DELETE') && options.data) {
    let stringData;
    if (typeof options.data === 'string') {
      // Should be key=value string
      if (options.data.indexOf('?') >= 0) stringData = options.data.split('?')[1];
      else stringData = options.data;
    } else {
      // Should be key=value object
      stringData = serializeObject(options.data);
    }
    if (stringData.length) {
      options.url += paramsPrefix + stringData;
      if (paramsPrefix === '?') paramsPrefix = '&';
    }
  }
  // JSONP
  if (options.dataType === 'json' && options.url.indexOf('callback=') >= 0) {
    const callbackName = `f7jsonp_${Date.now() + ((jsonpRequests += 1))}`;
    let abortTimeout;
    const callbackSplit = options.url.split('callback=');
    let requestUrl = `${callbackSplit[0]}callback=${callbackName}`;
    if (callbackSplit[1].indexOf('&') >= 0) {
      const addVars = callbackSplit[1].split('&').filter((el) => el.indexOf('=') > 0).join('&');
      if (addVars.length > 0) requestUrl += `&${addVars}`;
    }

    // Create script
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.onerror = function onerror() {
      clearTimeout(abortTimeout);
      fireAjaxCallback(undefined, undefined, 'error', null, 'scripterror');
      fireAjaxCallback('ajaxComplete ajax:complete', { scripterror: true }, 'complete', null, 'scripterror');
    };
    script.src = requestUrl;

    // Handler
    window[callbackName] = function jsonpCallback(data) {
      clearTimeout(abortTimeout);
      fireAjaxCallback(undefined, undefined, 'success', data);
      script.parentNode.removeChild(script);
      script = null;
      delete window[callbackName];
    };
    document.querySelector('head').appendChild(script);

    if (options.timeout > 0) {
      abortTimeout = setTimeout(() => {
        script.parentNode.removeChild(script);
        script = null;
        fireAjaxCallback(undefined, undefined, 'error', null, 'timeout');
      }, options.timeout);
    }

    return;
  }

  // Cache for GET/HEAD requests
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'DELETE') {
    if (options.cache === false) {
      options.url += `${paramsPrefix}_nocache${Date.now()}`;
    }
  }

  // Create XHR
  const xhr = new XMLHttpRequest();

  // Save Request URL
  xhr.requestUrl = options.url;
  xhr.requestParameters = options;

  // Open XHR
  xhr.open(method, options.url, options.async, options.user, options.password);

  // Create POST Data
  let postData = null;

  if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && options.data) {
    if (options.processData) {
      const postDataInstances = [ArrayBuffer, Blob, Document, FormData];
      // Post Data
      if (postDataInstances.indexOf(options.data.constructor) >= 0) {
        postData = options.data;
      } else {
        // POST Headers
        let boundary = `---------------------------${Date.now().toString(16)}`;

        if (options.contentType === 'multipart/form-data') {
          xhr.setRequestHeader('Content-Type', `multipart/form-data; boundary=${boundary}`);
        } else {
          xhr.setRequestHeader('Content-Type', options.contentType);
        }
        postData = '';
        let data = serializeObject(options.data);
        if (options.contentType === 'multipart/form-data') {
          data = data.split('&');
          const newData = [];
          for (let i = 0; i < data.length; i += 1) {
            newData.push(`Content-Disposition: form-data; name="${data[i].split('=')[0]}"\r\n\r\n${data[i].split('=')[1]}\r\n`);
          }
          postData = `--${boundary}\r\n${newData.join(`--${boundary}\r\n`)}--${boundary}--\r\n`;
        } else {
          postData = data;
        }
      }
    } else {
      postData = options.data;
    }
  }

  // Additional headers
  if (options.headers) {
    each(options.headers, (headerName, headerCallback) => {
      xhr.setRequestHeader(headerName, headerCallback);
    });
  }

  // Check for crossDomain
  if (typeof options.crossDomain === 'undefined') {
    options.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== window.location.host;
  }

  if (!options.crossDomain) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  if (options.xhrFields) {
    each(options.xhrFields, (fieldName, fieldValue) => {
      xhr[fieldName] = fieldValue;
    });
  }

  let xhrTimeout;
  // Handle XHR
  xhr.onload = function onload() {
    if (xhrTimeout) clearTimeout(xhrTimeout);
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
      let responseData;
      if (options.dataType === 'json') {
        try {
          responseData = JSON.parse(xhr.responseText);
          fireAjaxCallback('ajaxSuccess ajax:success', { xhr }, 'success', responseData, xhr.status, xhr);
        } catch (err) {
          fireAjaxCallback('ajaxError ajax:error', { xhr, parseerror: true }, 'error', xhr, 'parseerror');
        }
      } else {
        responseData = xhr.responseType === 'text' || xhr.responseType === '' ? xhr.responseText : xhr.response;
        fireAjaxCallback('ajaxSuccess ajax:success', { xhr }, 'success', responseData, xhr.status, xhr);
      }
    } else {
      fireAjaxCallback('ajaxError ajax:error', { xhr }, 'error', xhr, xhr.status);
    }
    if (options.statusCode) {
      if (globals.statusCode && globals.statusCode[xhr.status]) globals.statusCode[xhr.status](xhr);
      if (options.statusCode[xhr.status]) options.statusCode[xhr.status](xhr);
    }
    fireAjaxCallback('ajaxComplete ajax:complete', { xhr }, 'complete', xhr, xhr.status);
  };

  xhr.onerror = function onerror() {
    if (xhrTimeout) clearTimeout(xhrTimeout);
    fireAjaxCallback('ajaxError ajax:error', { xhr }, 'error', xhr, xhr.status);
    fireAjaxCallback('ajaxComplete ajax:complete', { xhr, error: true }, 'complete', xhr, 'error');
  };

  // Ajax start callback
  fireAjaxCallback('ajaxStart ajax:start', { xhr }, 'start', xhr);
  fireAjaxCallback(undefined, undefined, 'beforeSend', xhr);

  // Timeout
  if (options.timeout > 0) {
    xhr.onabort = function onabort() {
      if (xhrTimeout) clearTimeout(xhrTimeout);
    };
    xhrTimeout = setTimeout(() => {
      xhr.abort();
      fireAjaxCallback('ajaxError ajax:error', { xhr, timeout: true }, 'error', xhr, 'timeout');
      fireAjaxCallback('ajaxComplete ajax:complete', { xhr, timeout: true }, 'complete', xhr, 'timeout');
    }, options.timeout);
  }

  // Send XHR
  xhr.send(postData);

  // Return XHR object
  return xhr;
}

function ajaxShortcut(method, ...args) {
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
  return ajax({
    url,
    method: method === 'post' ? 'POST' : 'GET',
    data,
    success,
    error,
    dataType,
  });
}

function get(...args) {
  args.unshift('get');
  return ajaxShortcut.apply(this, args);
}
function post(...args) {
  args.unshift('post');
  return ajaxShortcut.apply(this, args);
}
function getJSON(...args) {
  args.unshift('getJSON');
  return ajaxShortcut.apply(this, args);
}

const Ajax = {
  __utils: true,
  ajaxSetup,
  ajax,
  get,
  post,
  getJSON,
};

export { ajaxSetup, ajax, get, post, getJSON };
export default Ajax;
