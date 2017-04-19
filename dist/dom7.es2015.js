/**
 * Dom7 1.6.1
 * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
 * http://framework7.io/docs/dom.html
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: April 19, 2017
 */
var Dom7$1 = function Dom7(arr) {
  var self = this;
  // Create array-like object
  for (var i = 0; i < arr.length; i += 1) {
    self[i] = arr[i];
  }
  self.length = arr.length;
  // Return collection with methods
  return this;
};

function $(selector, context) {
  var arr = [];
  var i = 0;
  if (selector && !context) {
    if (selector instanceof Dom7$1) {
      return selector;
    }
  }
  if (selector) {
      // String
    if (typeof selector === 'string') {
      var els;
      var tempParent;
      var html = selector.trim();
      if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
        var toCreate = 'div';
        if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
        if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) { toCreate = 'tr'; }
        if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
        if (html.indexOf('<option') === 0) { toCreate = 'select'; }
        tempParent = document.createElement(toCreate);
        tempParent.innerHTML = html;
        for (i = 0; i < tempParent.childNodes.length; i += 1) {
          arr.push(tempParent.childNodes[i]);
        }
      } else {
        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
          // Pure ID selector
          els = [document.getElementById(selector.trim().split('#')[1])];
        } else {
          // Other selectors
          els = (context || document).querySelectorAll(selector.trim());
        }
        for (i = 0; i < els.length; i += 1) {
          if (els[i]) { arr.push(els[i]); }
        }
      }
    } else if (selector.nodeType || selector === window || selector === document) {
      // Node/element
      arr.push(selector);
    } else if (selector.length > 0 && selector[0].nodeType) {
      // Array of elements or instance of Dom
      for (i = 0; i < selector.length; i += 1) {
        arr.push(selector[i]);
      }
    }
  }
  return new Dom7$1(arr);
}

// Remove Diacritics
var defaultDiacriticsRemovalap = [
  { base: 'A', letters: '\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F' },
  { base: 'AA', letters: '\uA732' },
  { base: 'AE', letters: '\u00C6\u01FC\u01E2' },
  { base: 'AO', letters: '\uA734' },
  { base: 'AU', letters: '\uA736' },
  { base: 'AV', letters: '\uA738\uA73A' },
  { base: 'AY', letters: '\uA73C' },
  { base: 'B', letters: '\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181' },
  { base: 'C', letters: '\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E' },
  { base: 'D', letters: '\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779' },
  { base: 'DZ', letters: '\u01F1\u01C4' },
  { base: 'Dz', letters: '\u01F2\u01C5' },
  { base: 'E', letters: '\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E' },
  { base: 'F', letters: '\u0046\u24BB\uFF26\u1E1E\u0191\uA77B' },
  { base: 'G', letters: '\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E' },
  { base: 'H', letters: '\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D' },
  { base: 'I', letters: '\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197' },
  { base: 'J', letters: '\u004A\u24BF\uFF2A\u0134\u0248' },
  { base: 'K', letters: '\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2' },
  { base: 'L', letters: '\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780' },
  { base: 'LJ', letters: '\u01C7' },
  { base: 'Lj', letters: '\u01C8' },
  { base: 'M', letters: '\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C' },
  { base: 'N', letters: '\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4' },
  { base: 'NJ', letters: '\u01CA' },
  { base: 'Nj', letters: '\u01CB' },
  { base: 'O', letters: '\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C' },
  { base: 'OI', letters: '\u01A2' },
  { base: 'OO', letters: '\uA74E' },
  { base: 'OU', letters: '\u0222' },
  { base: 'OE', letters: '\u008C\u0152' },
  { base: 'oe', letters: '\u009C\u0153' },
  { base: 'P', letters: '\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754' },
  { base: 'Q', letters: '\u0051\u24C6\uFF31\uA756\uA758\u024A' },
  { base: 'R', letters: '\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782' },
  { base: 'S', letters: '\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784' },
  { base: 'T', letters: '\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786' },
  { base: 'TZ', letters: '\uA728' },
  { base: 'U', letters: '\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244' },
  { base: 'V', letters: '\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245' },
  { base: 'VY', letters: '\uA760' },
  { base: 'W', letters: '\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72' },
  { base: 'X', letters: '\u0058\u24CD\uFF38\u1E8A\u1E8C' },
  { base: 'Y', letters: '\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE' },
  { base: 'Z', letters: '\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762' },
  { base: 'a', letters: '\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250' },
  { base: 'aa', letters: '\uA733' },
  { base: 'ae', letters: '\u00E6\u01FD\u01E3' },
  { base: 'ao', letters: '\uA735' },
  { base: 'au', letters: '\uA737' },
  { base: 'av', letters: '\uA739\uA73B' },
  { base: 'ay', letters: '\uA73D' },
  { base: 'b', letters: '\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253' },
  { base: 'c', letters: '\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184' },
  { base: 'd', letters: '\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A' },
  { base: 'dz', letters: '\u01F3\u01C6' },
  { base: 'e', letters: '\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD' },
  { base: 'f', letters: '\u0066\u24D5\uFF46\u1E1F\u0192\uA77C' },
  { base: 'g', letters: '\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F' },
  { base: 'h', letters: '\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265' },
  { base: 'hv', letters: '\u0195' },
  { base: 'i', letters: '\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131' },
  { base: 'j', letters: '\u006A\u24D9\uFF4A\u0135\u01F0\u0249' },
  { base: 'k', letters: '\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3' },
  { base: 'l', letters: '\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747' },
  { base: 'lj', letters: '\u01C9' },
  { base: 'm', letters: '\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F' },
  { base: 'n', letters: '\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5' },
  { base: 'nj', letters: '\u01CC' },
  { base: 'o', letters: '\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275' },
  { base: 'oi', letters: '\u01A3' },
  { base: 'ou', letters: '\u0223' },
  { base: 'oo', letters: '\uA74F' },
  { base: 'p', letters: '\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755' },
  { base: 'q', letters: '\u0071\u24E0\uFF51\u024B\uA757\uA759' },
  { base: 'r', letters: '\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783' },
  { base: 's', letters: '\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B' },
  { base: 't', letters: '\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787' },
  { base: 'tz', letters: '\uA729' },
  { base: 'u', letters: '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289' },
  { base: 'v', letters: '\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C' },
  { base: 'vy', letters: '\uA761' },
  { base: 'w', letters: '\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73' },
  { base: 'x', letters: '\u0078\u24E7\uFF58\u1E8B\u1E8D' },
  { base: 'y', letters: '\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF' },
  { base: 'z', letters: '\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763' } ];

var diacriticsMap = {};
for (var i = 0; i < defaultDiacriticsRemovalap.length; i += 1) {
  var letters = defaultDiacriticsRemovalap[i].letters;
  for (var j = 0; j < letters.length; j += 1) {
    diacriticsMap[letters[j]] = defaultDiacriticsRemovalap[i].base;
  }
}

var Utils = {
  parseUrlQuery: function parseUrlQuery(url) {
    var query = {};
    var urlToParse = url || window.location.href;
    var i;
    var params;
    var param;
    var length;
    if (typeof urlToParse === 'string' && urlToParse.length) {
      urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
      params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
      length = params.length;

      for (i = 0; i < length; i += 1) {
        param = params[i].replace(/#\S+/g, '').split('=');
        query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
      }
    }
    return query;
  },
  isArray: function isArray(arr) {
    return Array.isArray(arr);
  },
  each: function each(obj, callback) {
      // Check it's iterable
      // TODO: Should probably raise a value error here
    if (typeof obj !== 'object') { return; }
    // Don't bother continuing without a callback
    if (!callback) { return; }
    if (Array.isArray(obj) || obj instanceof Dom7) {
      // Array
      for (var i = 0; i < obj.length; i++) {
        // If callback returns false
        if (callback(i, obj[i]) === false) {
          // Break out of the loop
          return;
        }
      }
    } else {
      // Object
      for (var prop in obj) {
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
  },
  unique: function unique(arr) {
    var uniqueArray = [];
    for (var i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
    }
    return uniqueArray;
  },
  serializeObject: function serializeObject(obj, parents) {
    if ( parents === void 0 ) parents = [];

    if (typeof obj === 'string') { return obj; }
    var resultArray = [];
    var separator = '&';
    var newParents;
    function varName(name) {
      if (parents.length > 0) {
        var parentParts = '';
        for (var j = 0; j < parents.length; j += 1) {
          if (j === 0) { parentParts += parents[j]; }
          else { parentParts += "[" + (encodeURIComponent(parents[j])) + "]"; }
        }
        return (parentParts + "[" + (encodeURIComponent(name)) + "]");
      }
      return encodeURIComponent(name);
    }
    function varValue(value) {
      return encodeURIComponent(value);
    }
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        var toPush = (void 0);
        if (Array.isArray(obj[prop])) {
          toPush = [];
          for (var i = 0; i < obj[prop].length; i += 1) {
            if (!Array.isArray(obj[prop][i]) && typeof obj[prop][i] === 'object') {
              newParents = parents.slice();
              newParents.push(prop);
              newParents.push(String(i));
              toPush.push(Utils.serializeObject(obj[prop][i], newParents));
            } else {
              toPush.push(((varName(prop)) + "[]=" + (varValue(obj[prop][i]))));
            }
          }
          if (toPush.length > 0) { resultArray.push(toPush.join(separator)); }
        } else if (obj[prop] === null || obj[prop] === '') {
          resultArray.push(((varName(prop)) + "="));
        } else if (typeof obj[prop] === 'object') {
          // Object, convert to named array
          newParents = parents.slice();
          newParents.push(prop);
          toPush = Utils.serializeObject(obj[prop], newParents);
          if (toPush !== '') { resultArray.push(toPush); }
        } else if (typeof obj[prop] !== 'undefined' && obj[prop] !== '') {
          // Should be string or plain value
          resultArray.push(((varName(prop)) + "=" + (varValue(obj[prop]))));
        } else if (obj[prop] === '') { resultArray.push(varName(prop)); }
      }
    }
    return resultArray.join(separator);
  },
  toCamelCase: function toCamelCase(string) {
    return string.toLowerCase().replace(/-(.)/g, function (match, group1) { return group1.toUpperCase(); });
  },
  dataset: function dataset(el) {
    return $(el).dataset();
  },
  getTranslate: function getTranslate(el, axis) {
    if ( axis === void 0 ) axis = 'x';

    var curStyle = window.getComputedStyle(el, null);
    var matrix;
    var curTransform;
    var transformMatrix;

    if (window.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(',').length > 6) {
        curTransform = curTransform.split(', ').map(function map(a) {
          return a.replace(',', '.');
        }).join(', ');
      }
      // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case
      transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
    } else {
      transformMatrix = curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
      matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[4]); }
    }
    if (axis === 'y') {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[5]); }
    }

    return curTransform || 0;
  },
  requestAnimationFrame: function requestAnimationFrame(callback) {
    if (window.requestAnimationFrame) { return window.requestAnimationFrame(callback); }
    else if (window.webkitRequestAnimationFrame) { return window.webkitRequestAnimationFrame(callback); }
    return window.setTimeout(callback, 1000 / 60);
  },
  cancelAnimationFrame: function cancelAnimationFrame(id) {
    if (window.cancelAnimationFrame) { return window.cancelAnimationFrame(id); }
    else if (window.webkitCancelAnimationFrame) { return window.webkitCancelAnimationFrame(id); }
    return window.clearTimeout(id);
  },
  supportTouch: !!(('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch)),
  removeDiacritics: function removeDiacritics(str) {
    return str.replace(/[^\u0000-\u007E]/g, function (a) { return diacriticsMap[a] || a; });
  },
  extend: function extend() {
    var args = [], len$1 = arguments.length;
    while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

    var to = Object(args[0]);
    for (var i = 1; i < args.length; i += 1) {
      var nextSource = args[i];
      if (nextSource !== undefined && nextSource !== null) {
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            if (typeof to[nextKey] === 'object' && typeof nextSource[nextKey] === 'object') {
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  },
};

// Aliases
Utils.parseQuery = Utils.parseUrlQuery;
Utils.param = Utils.serializeObject;

// Global Ajax Setup
var globalAjaxOptions = {};
$.ajaxSetup = function ajaxSetup(options) {
  if (options.type && !options.method) { options.method = options.type; }
  Utils.each(options, function (optionName, optionValue) {
    globalAjaxOptions[optionName] = optionValue;
  });
};

// JSONP Requests
var jsonpRequests = 0;

// Ajax
function Ajax(options) {
  var defaults = {
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
  var callbacks = ['beforeSend', 'error', 'complete', 'success', 'statusCode'];

  // For jQuery guys
  if (options.type) { options.method = options.type; }

  // Global options
  var globals = globalAjaxOptions;

  // Merge global and defaults
  Utils.each(globals, function (globalOptionName, globalOptionValue) {
    if (callbacks.indexOf(globalOptionName) < 0) { defaults[globalOptionName] = globalOptionValue; }
  });

  // Function to run XHR callbacks and events
  function fireAjaxCallback(eventName, eventData, callbackName) {
    var a = arguments;
    if (eventName) { $(document).trigger(eventName, eventData); }
    if (callbackName) {
      // Global callback
      if (callbackName in globals) { globals[callbackName](a[3], a[4], a[5], a[6]); }
      // Options callback
      if (options[callbackName]) { options[callbackName](a[3], a[4], a[5], a[6]); }
    }
  }

  // Merge options and defaults
  Utils.each(defaults, function (prop, defaultValue) {
    if (!(prop in options)) { options[prop] = defaultValue; }
  });

  // Default URL
  if (!options.url) {
    options.url = window.location.toString();
  }
  // Parameters Prefix
  var paramsPrefix = options.url.indexOf('?') >= 0 ? '&' : '?';

  // UC method
  var method = options.method.toUpperCase();

  // Data to modify GET URL
  if ((method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'DELETE') && options.data) {
    var stringData;
    if (typeof options.data === 'string') {
      // Should be key=value string
      if (options.data.indexOf('?') >= 0) { stringData = options.data.split('?')[1]; }
      else { stringData = options.data; }
    } else {
      // Should be key=value object
      stringData = Utils.serializeObject(options.data);
    }
    if (stringData.length) {
      options.url += paramsPrefix + stringData;
      if (paramsPrefix === '?') { paramsPrefix = '&'; }
    }
  }
  // JSONP
  if (options.dataType === 'json' && options.url.indexOf('callback=') >= 0) {
    var callbackName = "f7jsonp_" + (Date.now() + ((jsonpRequests += 1)));
    var abortTimeout;
    var callbackSplit = options.url.split('callback=');
    var requestUrl = (callbackSplit[0]) + "callback=" + callbackName;
    if (callbackSplit[1].indexOf('&') >= 0) {
      var addVars = callbackSplit[1].split('&').filter(function (el) { return el.indexOf('=') > 0; }).join('&');
      if (addVars.length > 0) { requestUrl += "&" + addVars; }
    }

    // Create script
    var script = document.createElement('script');
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
      abortTimeout = setTimeout(function () {
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
      options.url += paramsPrefix + "_nocache" + (Date.now());
    }
  }

  // Create XHR
  var xhr = new XMLHttpRequest();

  // Save Request URL
  xhr.requestUrl = options.url;
  xhr.requestParameters = options;

  // Open XHR
  xhr.open(method, options.url, options.async, options.user, options.password);

  // Create POST Data
  var postData = null;

  if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && options.data) {
    if (options.processData) {
      var postDataInstances = [ArrayBuffer, Blob, Document, FormData];
      // Post Data
      if (postDataInstances.indexOf(options.data.constructor) >= 0) {
        postData = options.data;
      } else {
        // POST Headers
        var boundary = "---------------------------" + (Date.now().toString(16));

        if (options.contentType === 'multipart\/form-data') {
          xhr.setRequestHeader('Content-Type', ("multipart/form-data; boundary=" + boundary));
        } else {
          xhr.setRequestHeader('Content-Type', options.contentType);
        }
        postData = '';
        var data = Utils.serializeObject(options.data);
        if (options.contentType === 'multipart\/form-data') {
          boundary = "---------------------------" + (Date.now().toString(16));
          data = data.split('&');
          var newData = [];
          for (var i = 0; i < data.length; i += 1) {
            newData.push('Content-Disposition: form-data; name="' + _data[i].split('=')[0] + '"\r\n\r\n' + _data[i].split('=')[1] + '\r\n');
          }
          postData = "--" + boundary + "\r\n" + (newData.join(("--" + boundary + "\r\n"))) + "--" + boundary + "--\r\n";
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
    Utils.each(options.headers, function (headerName, headerCallback) {
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
    Utils.each(options.xhrFields, function (fieldName, fieldValue) {
      xhr[fieldName] = fieldValue;
    });
  }

  var xhrTimeout;
  // Handle XHR
  xhr.onload = function onload(e) {
    if (xhrTimeout) { clearTimeout(xhrTimeout); }
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
      var responseData;
      if (options.dataType === 'json') {
        try {
          responseData = JSON.parse(xhr.responseText);
          fireAjaxCallback('ajaxSuccess ajax:success', { xhr: xhr }, 'success', responseData, xhr.status, xhr);
        } catch (err) {
          fireAjaxCallback('ajaxError ajax:error', { xhr: xhr, parseerror: true }, 'error', xhr, 'parseerror');
        }
      } else {
        responseData = xhr.responseType === 'text' || xhr.responseType === '' ? xhr.responseText : xhr.response;
        fireAjaxCallback('ajaxSuccess ajax:success', { xhr: xhr }, 'success', responseData, xhr.status, xhr);
      }
    } else {
      fireAjaxCallback('ajaxError ajax:error', { xhr: xhr }, 'error', xhr, xhr.status);
    }
    if (options.statusCode) {
      if (globals.statusCode && globals.statusCode[xhr.status]) { globals.statusCode[xhr.status](xhr); }
      if (options.statusCode[xhr.status]) { options.statusCode[xhr.status](xhr); }
    }
    fireAjaxCallback('ajaxComplete ajax:complete', { xhr: xhr }, 'complete', xhr, xhr.status);
  };

  xhr.onerror = function onerror(e) {
    if (xhrTimeout) { clearTimeout(xhrTimeout); }
    fireAjaxCallback('ajaxError ajax:error', { xhr: xhr }, 'error', xhr, xhr.status);
    fireAjaxCallback('ajaxComplete ajax:complete', { xhr: xhr, error: true }, 'complete', xhr, 'error');
  };

  // Ajax start callback
  fireAjaxCallback('ajaxStart ajax:start', { xhr: xhr }, 'start', xhr);
  fireAjaxCallback(undefined, undefined, 'beforeSend', xhr);

  // Timeout
  if (options.timeout > 0) {
    xhr.onabort = function onabort() {
      if (xhrTimeout) { clearTimeout(xhrTimeout); }
    };
    xhrTimeout = setTimeout(function () {
      xhr.abort();
      fireAjaxCallback('ajaxError ajax:error', { xhr: xhr, timeout: true }, 'error', xhr, 'timeout');
      fireAjaxCallback('ajaxComplete ajax:complete', { xhr: xhr, timeout: true }, 'complete', xhr, 'timeout');
    }, options.timeout);
  }

  // Send XHR
  xhr.send(postData);

  // Return XHR object
  return xhr;
}

var Scroll = {
  scrollTo: function scrollTo(left, top, duration, easing, callback) {
    if ( easing === void 0 ) easing = 'swing';

    if (arguments.length === 4 && typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }
    return this.each(function animate() {
      var el = this;
      var currentTop;
      var currentLeft;
      var maxTop;
      var maxLeft;
      var newTop;
      var newLeft;
      var scrollTop;
      var scrollLeft;
      var animateTop = top > 0 || top === 0;
      var animateLeft = left > 0 || left === 0;
      if (typeof easing === 'undefined') {
        easing = 'swing';
      }
      if (animateTop) {
        currentTop = el.scrollTop;
        if (!duration) {
          el.scrollTop = top;
        }
      }
      if (animateLeft) {
        currentLeft = el.scrollLeft;
        if (!duration) {
          el.scrollLeft = left;
        }
      }
      if (!duration) { return; }
      if (animateTop) {
        maxTop = el.scrollHeight - el.offsetHeight;
        newTop = Math.max(Math.min(top, maxTop), 0);
      }
      if (animateLeft) {
        maxLeft = el.scrollWidth - el.offsetWidth;
        newLeft = Math.max(Math.min(left, maxLeft), 0);
      }
      var startTime = null;
      if (animateTop && newTop === currentTop) { animateTop = false; }
      if (animateLeft && newLeft === currentLeft) { animateLeft = false; }
      function render(time) {
        if ( time === void 0 ) time = new Date().getTime();

        if (startTime === null) {
          startTime = time;
        }
        var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
        var easeProgress = easing === 'linear' ? progress : (0.5 - (Math.cos(progress * Math.PI) / 2));
        var done;
        if (animateTop) { scrollTop = currentTop + (easeProgress * (newTop - currentTop)); }
        if (animateLeft) { scrollLeft = currentLeft + (easeProgress * (newLeft - currentLeft)); }
        if (animateTop && newTop > currentTop && scrollTop >= newTop) {
          el.scrollTop = newTop;
          done = true;
        }
        if (animateTop && newTop < currentTop && scrollTop <= newTop) {
          el.scrollTop = newTop;
          done = true;
        }
        if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft) {
          el.scrollLeft = newLeft;
          done = true;
        }
        if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft) {
          el.scrollLeft = newLeft;
          done = true;
        }

        if (done) {
          if (callback) { callback(); }
          return;
        }
        if (animateTop) { el.scrollTop = scrollTop; }
        if (animateLeft) { el.scrollLeft = scrollLeft; }
        Utils.requestAnimationFrame(render);
      }
      Utils.requestAnimationFrame(render);
    });
  },
  scrollTop: function scrollTop(top, duration, easing, callback) {
    if (arguments.length === 3 && typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }
    var dom = this;
    if (typeof top === 'undefined') {
      if (dom.length > 0) { return dom[0].scrollTop; }
      return null;
    }
    return dom.scrollTo(undefined, top, duration, easing, callback);
  },
  scrollLeft: function scrollLeft(left, duration, easing, callback) {
    if (arguments.length === 3 && typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }
    var dom = this;
    if (typeof left === 'undefined') {
      if (dom.length > 0) { return dom[0].scrollLeft; }
      return null;
    }
    return dom.scrollTo(left, undefined, duration, easing, callback);
  },
};

var Methods = {
  // Classes and attributes
  addClass: function addClass(className) {
    var this$1 = this;

    if (typeof className === 'undefined') {
      return this;
    }
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.add(classes[i]); }
      }
    }
    return this;
  },
  removeClass: function removeClass(className) {
    var this$1 = this;

    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.remove(classes[i]); }
      }
    }
    return this;
  },
  hasClass: function hasClass(className) {
    if (!this[0]) { return false; }
    return this[0].classList.contains(className);
  },
  toggleClass: function toggleClass(className) {
    var this$1 = this;

    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.toggle(classes[i]); }
      }
    }
    return this;
  },
  attr: function attr(attrs, value) {
    var arguments$1 = arguments;
    var this$1 = this;

    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) { return this[0].getAttribute(attrs); }
      return undefined;
    }

    // Set attrs
    for (var i = 0; i < this.length; i += 1) {
      if (arguments$1.length === 2) {
        // String
        this$1[i].setAttribute(attrs, value);
      } else {
        // Object
        for (var attrName in attrs) {
          this$1[i][attrName] = attrs[attrName];
          this$1[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    return this;
  },
  removeAttr: function removeAttr(attr) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].removeAttribute(attr);
    }
    return this;
  },
  prop: function prop(props, value) {
    var arguments$1 = arguments;
    var this$1 = this;

    if (arguments.length === 1 && typeof props === 'string') {
      // Get prop
      if (this[0]) { return this[0][props]; }
    } else {
      // Set props
      for (var i = 0; i < this.length; i += 1) {
        if (arguments$1.length === 2) {
          // String
          this$1[i][props] = value;
        } else {
          // Object
          for (var propName in props) {
            this$1[i][propName] = props[propName];
          }
        }
      }
      return this;
    }
  },
  data: function data(key, value) {
    var this$1 = this;

    var el;
    if (typeof value === 'undefined') {
      el = this[0];
      // Get value
      if (el) {
        if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
          return el.dom7ElementDataStorage[key];
        }

        var dataKey = el.getAttribute(("data-" + key));
        if (dataKey) {
          return dataKey;
        }
        return undefined;
      }
      return undefined;
    }

    // Set value
    for (var i = 0; i < this.length; i += 1) {
      el = this$1[i];
      if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
      el.dom7ElementDataStorage[key] = value;
    }
    return this;
  },
  removeData: function removeData(key) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      var el = this$1[i];
      if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
        el.dom7ElementDataStorage[key] = null;
        delete el.dom7ElementDataStorage[key];
      }
    }
  },
  dataset: function dataset() {
    var el = this[0];
    if (!el) { return undefined; }
    var dataset = {};
    if (el.dataset) {
      for (var dataKey in el.dataset) {
        dataset[dataKey] = el.dataset[dataKey];
      }
    } else {
      for (var i = 0; i < el.attributes.length; i += 1) {
        var attr = el.attributes[i];
        if (attr.name.indexOf('data-') >= 0) {
          dataset[Utils.toCamelCase(attr.name.split('data-')[1])] = attr.value;
        }
      }
    }
    for (var key in dataset) {
      if (dataset[key] === 'false') { dataset[key] = false; }
      else if (dataset[key] === 'true') { dataset[key] = true; }
      else if (parseFloat(dataset[key]) === dataset[key] * 1) { dataset[key] *= 1; }
    }
    return dataset;
  },
  val: function val(value) {
    var this$1 = this;

    if (typeof value === 'undefined') {
      if (this[0]) {
        if (this[0].multiple && this[0].nodeName.toLowerCase() === 'select') {
          var values = [];
          for (var i = 0; i < this[0].selectedOptions.length; i += 1) {
            values.push(this$1[0].selectedOptions[i].value);
          }
          return values;
        }
        return this[0].value;
      }
      return undefined;
    }

    for (var i$1 = 0; i$1 < this.length; i$1 += 1) {
      this$1[i$1].value = value;
    }
    return this;
  },
  // Transforms
  transform: function transform(transform$1) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this$1[i].style;
      elStyle.webkitTransform = transform$1;
      elStyle.transform = transform$1;
    }
    return this;
  },
  transition: function transition(duration) {
    var this$1 = this;

    if (typeof duration !== 'string') {
      duration = duration + "ms";
    }
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this$1[i].style;
      elStyle.webkitTransitionDuration = duration;
      elStyle.transitionDuration = duration;
    }
    return this;
  },
  // Events
  on: function on(eventName, targetSelector, listener, capture) {
    var arguments$1 = arguments;
    var this$1 = this;

    function handleLiveEvent(e) {
      var target = e.target;
      if ($(target).is(targetSelector)) { listener.call(target, e); }
      else {
        var parents = $(target).parents();
        for (var k = 0; k < parents.length; k += 1) {
          if ($(parents[k]).is(targetSelector)) { listener.call(parents[k], e); }
        }
      }
    }
    var events = eventName.split(' ');
    var j;
    for (var i = 0; i < this.length; i += 1) {
      if (typeof targetSelector === 'function' || targetSelector === false) {
        // Usual events
        if (typeof targetSelector === 'function') {
          listener = arguments$1[1];
          capture = arguments$1[2] || false;
        }
        for (j = 0; j < events.length; j += 1) {
          this$1[i].addEventListener(events[j], listener, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          if (!this$1[i].dom7LiveListeners) { this$1[i].dom7LiveListeners = []; }
          this$1[i].dom7LiveListeners.push({ listener: listener, liveListener: handleLiveEvent });
          this$1[i].addEventListener(events[j], handleLiveEvent, capture);
        }
      }
    }

    return this;
  },
  off: function off(eventName, targetSelector, listener, capture) {
    var arguments$1 = arguments;
    var this$1 = this;

    var events = eventName.split(' ');
    for (var i = 0; i < events.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof targetSelector === 'function' || targetSelector === false) {
          // Usual events
          if (typeof targetSelector === 'function') {
            listener = arguments$1[1];
            capture = arguments$1[2] || false;
          }
          this$1[j].removeEventListener(events[i], listener, capture);
        } else if (this$1[j].dom7LiveListeners) {
          for (var k = 0; k < this[j].dom7LiveListeners.length; k += 1) {
            if (this$1[j].dom7LiveListeners[k].listener === listener) {
              this$1[j].removeEventListener(events[i], this$1[j].dom7LiveListeners[k].liveListener, capture);
            }
          }
        }
      }
    }
    return this;
  },
  once: function once(eventName, targetSelector, listener, capture) {
    var dom = this;
    if (typeof targetSelector === 'function') {
      listener = arguments[1];
      capture = arguments[2];
      targetSelector = false;
    }
    function proxy(e) {
      listener.call(e.target, e);
      dom.off(eventName, targetSelector, proxy, capture);
    }
    return dom.on(eventName, targetSelector, proxy, capture);
  },
  trigger: function trigger(eventName, eventData) {
    var this$1 = this;

    var events = eventName.split(' ');
    for (var i = 0; i < events.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        var evt = (void 0);
        try {
          evt = new CustomEvent(events[i], { detail: eventData, bubbles: true, cancelable: true });
        } catch (e) {
          evt = document.createEvent('Event');
          evt.initEvent(events[i], true, true);
          evt.detail = eventData;
        }
        this$1[j].dispatchEvent(evt);
      }
    }
    return this;
  },
  transitionEnd: function transitionEnd(callback) {
    var events = ['webkitTransitionEnd', 'transitionend'];
    var dom = this;
    var i;
    function fireCallBack(e) {
          /* jshint validthis:true */
      if (e.target !== this) { return; }
      callback.call(this, e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  },
  animationEnd: function animationEnd(callback) {
    var events = ['webkitAnimationEnd', 'animationend'];
    var dom = this;
    var i;
    function fireCallBack(e) {
      callback(e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  },
  // Sizing/Styles
  width: function width() {
    if (this[0] === window) {
      return window.innerWidth;
    }

    if (this.length > 0) {
      return parseFloat(this.css('width'));
    }

    return null;
  },
  outerWidth: function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        var styles = this.styles();
        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
      }
      return this[0].offsetWidth;
    }
    return null;
  },
  height: function height() {
    if (this[0] === window) {
      return window.innerHeight;
    }

    if (this.length > 0) {
      return parseFloat(this.css('height'));
    }

    return null;
  },
  outerHeight: function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        var styles = this.styles();
        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
      }
      return this[0].offsetHeight;
    }
    return null;
  },
  offset: function offset() {
    if (this.length > 0) {
      var el = this[0];
      var box = el.getBoundingClientRect();
      var body = document.body;
      var clientTop = el.clientTop || body.clientTop || 0;
      var clientLeft = el.clientLeft || body.clientLeft || 0;
      var scrollTop = el === window ? window.scrollY : el.scrollTop;
      var scrollLeft = el === window ? window.scrollX : el.scrollLeft;
      return {
        top: (box.top + scrollTop) - clientTop,
        left: (box.left + scrollLeft) - clientLeft,
      };
    }

    return null;
  },
  hide: function hide() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].style.display = 'none';
    }
    return this;
  },
  show: function show() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].style.display = 'block';
    }
    return this;
  },
  styles: function styles() {
    if (this[0]) { return window.getComputedStyle(this[0], null); }
  },
  css: function css(props, value) {
    var this$1 = this;

    var i;
    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) { return window.getComputedStyle(this[0], null).getPropertyValue(props); }
      } else {
        for (i = 0; i < this.length; i += 1) {
          for (var prop in props) {
            this$1[i].style[prop] = props[prop];
          }
        }
        return this;
      }
    }
    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this$1[i].style[props] = value;
      }
      return this;
    }
    return this;
  },

  // Dom manipulation
  // Iterate over the collection passing elements to `callback`
  each: function each(callback) {
    var this$1 = this;

    // Don't bother continuing without a callback
    if (!callback) { return this; }
    // Iterate over the current collection
    for (var i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this$1[i], i, this$1[i]) === false) {
        // End the loop early
        return this$1;
      }
    }
    // Return `this` to allow chained DOM operations
    return this;
  },
  filter: function filter(callback) {
    var matchedItems = [];
    var dom = this;
    for (var i = 0; i < dom.length; i += 1) {
      if (callback.call(dom[i], i, dom[i])) { matchedItems.push(dom[i]); }
    }
    return new Dom7$1(matchedItems);
  },
  html: function html(html$1) {
    var this$1 = this;

    if (typeof html$1 === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined;
    }

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].innerHTML = html$1;
    }
    return this;
  },
  text: function text(text$1) {
    var this$1 = this;

    if (typeof text$1 === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim();
      }
      return null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].textContent = text$1;
    }
    return this;
  },
  is: function is(selector) {
    var el = this[0];
    var compareWith;
    var i;
    if (!el || typeof selector === 'undefined') { return false; }
    if (typeof selector === 'string') {
      if (el.matches) { return el.matches(selector); }
      else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
      else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

      compareWith = $(selector);
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    } else if (selector === document) { return el === document; }
    else if (selector === window) { return el === window; }

    if (selector.nodeType || selector instanceof Dom7$1) {
      compareWith = selector.nodeType ? [selector] : selector;
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    }
    return false;
  },
  indexOf: function indexOf(el) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i] === el) { return i; }
    }
  },
  index: function index() {
    var child = this[0];
    var i;
    if (child) {
      i = 0;
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) { i += 1; }
      }
      return i;
    }
  },
  eq: function eq(index) {
    if (typeof index === 'undefined') { return this; }
    var length = this.length;
    var returnIndex;
    if (index > length - 1) {
      return new Dom7$1([]);
    }
    if (index < 0) {
      returnIndex = length + index;
      if (returnIndex < 0) { return new Dom7$1([]); }
      return new Dom7$1([this[returnIndex]]);
    }
    return new Dom7$1([this[index]]);
  },
  append: function append() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var newChild;

    for (var k = 0; k < args.length; k += 1) {
      newChild = args[k];
      for (var i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;
          while (tempDiv.firstChild) {
            this$1[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7$1) {
          for (var j = 0; j < newChild.length; j += 1) {
            this$1[i].appendChild(newChild[j]);
          }
        } else {
          this$1[i].appendChild(newChild);
        }
      }
    }

    return this;
  },
  appendTo: function appendTo(parent) {
    $(parent).append(this);
    return this;
  },
  prepend: function prepend(newChild) {
    var this$1 = this;

    var i;
    var j;
    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = newChild;
        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this$1[i].insertBefore(tempDiv.childNodes[j], this$1[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7$1) {
        for (j = 0; j < newChild.length; j += 1) {
          this$1[i].insertBefore(newChild[j], this$1[i].childNodes[0]);
        }
      } else {
        this$1[i].insertBefore(newChild, this$1[i].childNodes[0]);
      }
    }
    return this;
  },
  prependTo: function prependTo(parent) {
    $(parent).prepend(this);
    return this;
  },
  insertBefore: function insertBefore(selector) {
    var this$1 = this;

    var before = $(selector);
    for (var i = 0; i < this.length; i += 1) {
      if (before.length === 1) {
        before[0].parentNode.insertBefore(this$1[i], before[0]);
      } else if (before.length > 1) {
        for (var j = 0; j < before.length; j += 1) {
          before[j].parentNode.insertBefore(this$1[i].cloneNode(true), before[j]);
        }
      }
    }
  },
  insertAfter: function insertAfter(selector) {
    var this$1 = this;

    var after = $(selector);
    for (var i = 0; i < this.length; i += 1) {
      if (after.length === 1) {
        after[0].parentNode.insertBefore(this$1[i], after[0].nextSibling);
      } else if (after.length > 1) {
        for (var j = 0; j < after.length; j += 1) {
          after[j].parentNode.insertBefore(this$1[i].cloneNode(true), after[j].nextSibling);
        }
      }
    }
  },
  next: function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) { return new Dom7$1([this[0].nextElementSibling]); }
        return new Dom7$1([]);
      }

      if (this[0].nextElementSibling) { return new Dom7$1([this[0].nextElementSibling]); }
      return new Dom7$1([]);
    }
    return new Dom7$1([]);
  },
  nextAll: function nextAll(selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) { return new Dom7$1([]); }
    while (el.nextElementSibling) {
      var next = el.nextElementSibling;
      if (selector) {
        if ($(next).is(selector)) { nextEls.push(next); }
      } else { nextEls.push(next); }
      el = next;
    }
    return new Dom7$1(nextEls);
  },
  prev: function prev(selector) {
    if (this.length > 0) {
      var el = this[0];
      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) { return new Dom7$1([el.previousElementSibling]); }
        return new Dom7$1([]);
      }

      if (el.previousElementSibling) { return new Dom7$1([el.previousElementSibling]); }
      return new Dom7$1([]);
    }
    return new Dom7$1([]);
  },
  prevAll: function prevAll(selector) {
    var prevEls = [];
    var el = this[0];
    if (!el) { return new Dom7$1([]); }
    while (el.previousElementSibling) {
      var prev = el.previousElementSibling;
      if (selector) {
        if ($(prev).is(selector)) { prevEls.push(prev); }
      } else { prevEls.push(prev); }
      el = prev;
    }
    return new Dom7$1(prevEls);
  },
  siblings: function siblings(selector) {
    return this.nextAll(selector).add(this.prevAll(selector));
  },
  parent: function parent(selector) {
    var this$1 = this;

    var parents = [];
    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i].parentNode !== null) {
        if (selector) {
          if ($(this$1[i].parentNode).is(selector)) { parents.push(this$1[i].parentNode); }
        } else {
          parents.push(this$1[i].parentNode);
        }
      }
    }
    return $(Utils.unique(parents));
  },
  parents: function parents(selector) {
    var this$1 = this;

    var parents = [];
    for (var i = 0; i < this.length; i += 1) {
      var parent = this$1[i].parentNode;
      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) { parents.push(parent); }
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return $(Utils.unique(parents));
  },
  closest: function closest(selector) {
    var closest = this;
    if (typeof selector === 'undefined') {
      return new Dom7$1([]);
    }
    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }
    return closest;
  },
  find: function find(selector) {
    var this$1 = this;

    var foundElements = [];
    for (var i = 0; i < this.length; i += 1) {
      var found = this$1[i].querySelectorAll(selector);
      for (var j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }
    return new Dom7$1(foundElements);
  },
  children: function children(selector) {
    var this$1 = this;

    var children = [];
    for (var i = 0; i < this.length; i += 1) {
      var childNodes = this$1[i].childNodes;

      for (var j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
        } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) { children.push(childNodes[j]); }
      }
    }
    return new Dom7$1(Utils.unique(children));
  },
  remove: function remove() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i].parentNode) { this$1[i].parentNode.removeChild(this$1[i]); }
    }
    return this;
  },
  detach: function detach() {
    return this.remove();
  },
  add: function add() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var dom = this;
    var i;
    var j;
    for (i = 0; i < args.length; i += 1) {
      var toAdd = $(args[i]);
      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }
    return dom;
  },
  empty: function empty() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      var el = this$1[i];
      if (el.nodeType === 1) {
        for (var j = 0; j < el.childNodes.length; j += 1) {
          if (el.childNodes[j].parentNode) {
            el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
          }
        }
        el.textContent = '';
      }
    }
    return this;
  },
};

function Animate(initialProps, initialParams) {
  var els = this;
  var a = {
    props: $.extend({}, initialProps),
    params: $.extend({
      duration: 300,
      easing: 'swing', // or 'linear'
      /* Callbacks
      begin(elements)
      complete(elements)
      progress(elements, complete, remaining, start, tweenValue)
      */
    }, initialParams),

    elements: els,
    animating: false,
    que: [],

    easingProgress: function easingProgress(easing, progress) {
      if (easing === 'swing') {
        return 0.5 - (Math.cos(progress * Math.PI) / 2);
      }
      if (typeof easing === 'function') {
        return easing(progress);
      }
      return progress;
    },
    stop: function stop() {
      if (a.frameId) {
        Utils.cancelAnimationFrame(a.frameId);
      }
      a.animating = false;
      a.elements.each(function (index, el) {
        var element = el;
        delete element.dom7AnimateInstance;
      });
      a.que = [];
    },
    done: function done(complete) {
      a.animating = false;
      a.elements.each(function (index, el) {
        var element = el;
        delete element.dom7AnimateInstance;
      });
      if (complete) { complete(els); }
      if (a.que.length > 0) {
        var que = a.que.shift();
        a.animate(que[0], que[1]);
      }
    },
    animate: function animate(props, params) {
      if (a.animating) {
        a.que.push([props, params]);
        return a;
      }
      var elements = [];

      // Define & Cache Initials & Units
      a.elements.each(function (index, el) {
        var initialFullValue;
        var initialValue;
        var unit;
        var finalValue;
        var finalFullValue;

        if (!el.dom7AnimateInstance) { a.elements[index].dom7AnimateInstance = a; }

        elements[index] = {
          container: el,
        };
        Object.keys(props).forEach(function (prop) {
          initialFullValue = window.getComputedStyle(el, null).getPropertyValue(prop).replace(',', '.');
          initialValue = parseFloat(initialFullValue);
          unit = initialFullValue.replace(initialValue, '');
          finalValue = parseFloat(props[prop]);
          finalFullValue = props[prop] + unit;
          elements[index][prop] = {
            initialFullValue: initialFullValue,
            initialValue: initialValue,
            unit: unit,
            finalValue: finalValue,
            finalFullValue: finalFullValue,
            currentValue: initialValue,
          };
        });
      });

      var startTime = null;
      var time;
      var elementsDone = 0;
      var propsDone = 0;
      var done;
      var began = false;

      a.animating = true;

      function render() {
        time = new Date().getTime();
        var progress;
        var easeProgress;
        // let el;
        if (!began) {
          began = true;
          if (params.begin) { params.begin(els); }
        }
        if (startTime === null) {
          startTime = time;
        }
        if (params.progress) {
          params.progress(els, Math.max(Math.min((time - startTime) / params.duration, 1), 0), ((startTime + params.duration) - time < 0 ? 0 : (startTime + params.duration) - time), startTime);
        }

        elements.forEach(function (element) {
          var el = element;
          if (done || el.done) { return; }
          Object.keys(props).forEach(function (prop) {
            if (done || el.done) { return; }
            progress = Math.max(Math.min((time - startTime) / params.duration, 1), 0);
            easeProgress = a.easingProgress(params.easing, progress);
            var ref = el[prop];
            var initialValue = ref.initialValue;
            var finalValue = ref.finalValue;
            var unit = ref.unit;
            el[prop].currentValue = initialValue + (easeProgress * (finalValue - initialValue));
            var currentValue = el[prop].currentValue;

            if (
              (finalValue > initialValue && currentValue >= finalValue) ||
              (finalValue < initialValue && currentValue <= finalValue)) {
              el.container.style[prop] = finalValue + unit;
              propsDone += 1;
              if (propsDone === Object.keys(props).length) {
                el.done = true;
                elementsDone += 1;
              }
              if (elementsDone === elements.length) {
                done = true;
              }
            }
            if (done) {
              a.done(params.complete);
              return;
            }
            el.container.style[prop] = currentValue + unit;
          });
        });
        if (done) { return; }
        // Then call
        a.frameId = Utils.requestAnimationFrame(render);
      }
      a.frameId = Utils.requestAnimationFrame(render);
      return a;
    },
  };

  if (a.elements.length === 0) {
    return els;
  }

  var animateInstance;
  for (var i = 0; i < a.elements.length; i += 1) {
    if (a.elements[i].dom7AnimateInstance) {
      animateInstance = a.elements[i].dom7AnimateInstance;
    } else { a.elements[i].dom7AnimateInstance = a; }
  }
  if (!animateInstance) {
    animateInstance = a;
  }

  if (initialProps === 'stop') {
    animateInstance.stop();
  } else {
    animateInstance.animate(a.props, a.params);
  }

  return els;
}

function Stop() {
  var els = this;
  for (var i = 0; i < els.length; i += 1) {
    if (els[i].dom7AnimateInstance) {
      els[i].dom7AnimateInstance.stop();
    }
  }
}

function dom7() {
  // Utils & Helpers
  Object.keys(Utils).forEach(function (key) {
    $[key] = Utils[key];
  });

  // Methods
  Object.keys(Methods).forEach(function (key) {
    Dom7$1.prototype[key] = Methods[key];
  });

  // Scroll
  Object.keys(Scroll).forEach(function (key) {
    Dom7$1.prototype[key] = Scroll[key];
  });

  // Animate
  Dom7$1.prototype.animate = Animate;
  Dom7$1.prototype.stop = Stop;

  // Ajax
  $.ajax = Ajax;

  // Ajax Shrotcuts
  ('get post getJSON').split(' ').forEach(function (method) {
    $[method] = function ajax() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var url;
      var data;
      var success;
      var error;
      var dataType;
      if (typeof args[1] === 'function') {
        var assign;
        (assign = args, url = assign[0], success = assign[1], error = assign[2], dataType = assign[3]);
      } else {
        var assign$1;
        (assign$1 = args, url = assign$1[0], data = assign$1[1], success = assign$1[2], error = assign$1[3], dataType = assign$1[4]);
      }
      [success, error].forEach(function (callback) {
        if (typeof callback === 'string') {
          dataType = callback;
          if (callback === success) { success = undefined; }
          else { error = undefined; }
        }
      });
      dataType = dataType || (method === 'getJSON' ? 'json' : undefined);
      return $.ajax({
        url: url,
        method: method === 'post' ? 'POST' : 'GET',
        data: data,
        success: success,
        error: error,
        dataType: dataType,
      });
    };
  });

  // Link to prototype
  $.fn = Dom7$1.prototype;

  return $;
}
var dom7$1 = dom7();

export default dom7$1;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy92bGFkaW1pcmtoYXJsYW1waWRpL0dpdEh1Yi9Eb203L3NyYy9kb203LWNsYXNzLmpzIiwiL1VzZXJzL3ZsYWRpbWlya2hhcmxhbXBpZGkvR2l0SHViL0RvbTcvc3JjLyQuanMiLCIvVXNlcnMvdmxhZGltaXJraGFybGFtcGlkaS9HaXRIdWIvRG9tNy9zcmMvdXRpbHMuanMiLCIvVXNlcnMvdmxhZGltaXJraGFybGFtcGlkaS9HaXRIdWIvRG9tNy9zcmMvYWpheC5qcyIsIi9Vc2Vycy92bGFkaW1pcmtoYXJsYW1waWRpL0dpdEh1Yi9Eb203L3NyYy9zY3JvbGwuanMiLCIvVXNlcnMvdmxhZGltaXJraGFybGFtcGlkaS9HaXRIdWIvRG9tNy9zcmMvbWV0aG9kcy5qcyIsIi9Vc2Vycy92bGFkaW1pcmtoYXJsYW1waWRpL0dpdEh1Yi9Eb203L3NyYy9hbmltYXRlLmpzIiwiL1VzZXJzL3ZsYWRpbWlya2hhcmxhbXBpZGkvR2l0SHViL0RvbTcvc3JjL2RvbTcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tNyB7XG4gIGNvbnN0cnVjdG9yKGFycikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIC8vIENyZWF0ZSBhcnJheS1saWtlIG9iamVjdFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBzZWxmW2ldID0gYXJyW2ldO1xuICAgIH1cbiAgICBzZWxmLmxlbmd0aCA9IGFyci5sZW5ndGg7XG4gICAgLy8gUmV0dXJuIGNvbGxlY3Rpb24gd2l0aCBtZXRob2RzXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cbiIsImltcG9ydCBEb203IGZyb20gJy4vZG9tNy1jbGFzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICQoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgY29uc3QgYXJyID0gW107XG4gIGxldCBpID0gMDtcbiAgaWYgKHNlbGVjdG9yICYmICFjb250ZXh0KSB7XG4gICAgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgRG9tNykge1xuICAgICAgcmV0dXJuIHNlbGVjdG9yO1xuICAgIH1cbiAgfVxuICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIC8vIFN0cmluZ1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgZWxzO1xuICAgICAgbGV0IHRlbXBQYXJlbnQ7XG4gICAgICBjb25zdCBodG1sID0gc2VsZWN0b3IudHJpbSgpO1xuICAgICAgaWYgKGh0bWwuaW5kZXhPZignPCcpID49IDAgJiYgaHRtbC5pbmRleE9mKCc+JykgPj0gMCkge1xuICAgICAgICBsZXQgdG9DcmVhdGUgPSAnZGl2JztcbiAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPGxpJykgPT09IDApIHRvQ3JlYXRlID0gJ3VsJztcbiAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPHRyJykgPT09IDApIHRvQ3JlYXRlID0gJ3Rib2R5JztcbiAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPHRkJykgPT09IDAgfHwgaHRtbC5pbmRleE9mKCc8dGgnKSA9PT0gMCkgdG9DcmVhdGUgPSAndHInO1xuICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8dGJvZHknKSA9PT0gMCkgdG9DcmVhdGUgPSAndGFibGUnO1xuICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8b3B0aW9uJykgPT09IDApIHRvQ3JlYXRlID0gJ3NlbGVjdCc7XG4gICAgICAgIHRlbXBQYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRvQ3JlYXRlKTtcbiAgICAgICAgdGVtcFBhcmVudC5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGVtcFBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgYXJyLnB1c2godGVtcFBhcmVudC5jaGlsZE5vZGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFjb250ZXh0ICYmIHNlbGVjdG9yWzBdID09PSAnIycgJiYgIXNlbGVjdG9yLm1hdGNoKC9bIC48Pjp+XS8pKSB7XG4gICAgICAgICAgLy8gUHVyZSBJRCBzZWxlY3RvclxuICAgICAgICAgIGVscyA9IFtkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzZWxlY3Rvci50cmltKCkuc3BsaXQoJyMnKVsxXSldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyIHNlbGVjdG9yc1xuICAgICAgICAgIGVscyA9IChjb250ZXh0IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yLnRyaW0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGVscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChlbHNbaV0pIGFyci5wdXNoKGVsc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNlbGVjdG9yLm5vZGVUeXBlIHx8IHNlbGVjdG9yID09PSB3aW5kb3cgfHwgc2VsZWN0b3IgPT09IGRvY3VtZW50KSB7XG4gICAgICAvLyBOb2RlL2VsZW1lbnRcbiAgICAgIGFyci5wdXNoKHNlbGVjdG9yKTtcbiAgICB9IGVsc2UgaWYgKHNlbGVjdG9yLmxlbmd0aCA+IDAgJiYgc2VsZWN0b3JbMF0ubm9kZVR5cGUpIHtcbiAgICAgIC8vIEFycmF5IG9mIGVsZW1lbnRzIG9yIGluc3RhbmNlIG9mIERvbVxuICAgICAgZm9yIChpID0gMDsgaSA8IHNlbGVjdG9yLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGFyci5wdXNoKHNlbGVjdG9yW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBEb203KGFycik7XG59O1xuIiwiaW1wb3J0ICQgZnJvbSAnLi8kJztcblxuLy8gUmVtb3ZlIERpYWNyaXRpY3NcbmNvbnN0IGRlZmF1bHREaWFjcml0aWNzUmVtb3ZhbGFwID0gW1xuICB7IGJhc2U6ICdBJywgbGV0dGVyczogJ1xcdTAwNDFcXHUyNEI2XFx1RkYyMVxcdTAwQzBcXHUwMEMxXFx1MDBDMlxcdTFFQTZcXHUxRUE0XFx1MUVBQVxcdTFFQThcXHUwMEMzXFx1MDEwMFxcdTAxMDJcXHUxRUIwXFx1MUVBRVxcdTFFQjRcXHUxRUIyXFx1MDIyNlxcdTAxRTBcXHUwMEM0XFx1MDFERVxcdTFFQTJcXHUwMEM1XFx1MDFGQVxcdTAxQ0RcXHUwMjAwXFx1MDIwMlxcdTFFQTBcXHUxRUFDXFx1MUVCNlxcdTFFMDBcXHUwMTA0XFx1MDIzQVxcdTJDNkYnIH0sXG4gIHsgYmFzZTogJ0FBJywgbGV0dGVyczogJ1xcdUE3MzInIH0sXG4gIHsgYmFzZTogJ0FFJywgbGV0dGVyczogJ1xcdTAwQzZcXHUwMUZDXFx1MDFFMicgfSxcbiAgeyBiYXNlOiAnQU8nLCBsZXR0ZXJzOiAnXFx1QTczNCcgfSxcbiAgeyBiYXNlOiAnQVUnLCBsZXR0ZXJzOiAnXFx1QTczNicgfSxcbiAgeyBiYXNlOiAnQVYnLCBsZXR0ZXJzOiAnXFx1QTczOFxcdUE3M0EnIH0sXG4gIHsgYmFzZTogJ0FZJywgbGV0dGVyczogJ1xcdUE3M0MnIH0sXG4gIHsgYmFzZTogJ0InLCBsZXR0ZXJzOiAnXFx1MDA0MlxcdTI0QjdcXHVGRjIyXFx1MUUwMlxcdTFFMDRcXHUxRTA2XFx1MDI0M1xcdTAxODJcXHUwMTgxJyB9LFxuICB7IGJhc2U6ICdDJywgbGV0dGVyczogJ1xcdTAwNDNcXHUyNEI4XFx1RkYyM1xcdTAxMDZcXHUwMTA4XFx1MDEwQVxcdTAxMENcXHUwMEM3XFx1MUUwOFxcdTAxODdcXHUwMjNCXFx1QTczRScgfSxcbiAgeyBiYXNlOiAnRCcsIGxldHRlcnM6ICdcXHUwMDQ0XFx1MjRCOVxcdUZGMjRcXHUxRTBBXFx1MDEwRVxcdTFFMENcXHUxRTEwXFx1MUUxMlxcdTFFMEVcXHUwMTEwXFx1MDE4QlxcdTAxOEFcXHUwMTg5XFx1QTc3OScgfSxcbiAgeyBiYXNlOiAnRFonLCBsZXR0ZXJzOiAnXFx1MDFGMVxcdTAxQzQnIH0sXG4gIHsgYmFzZTogJ0R6JywgbGV0dGVyczogJ1xcdTAxRjJcXHUwMUM1JyB9LFxuICB7IGJhc2U6ICdFJywgbGV0dGVyczogJ1xcdTAwNDVcXHUyNEJBXFx1RkYyNVxcdTAwQzhcXHUwMEM5XFx1MDBDQVxcdTFFQzBcXHUxRUJFXFx1MUVDNFxcdTFFQzJcXHUxRUJDXFx1MDExMlxcdTFFMTRcXHUxRTE2XFx1MDExNFxcdTAxMTZcXHUwMENCXFx1MUVCQVxcdTAxMUFcXHUwMjA0XFx1MDIwNlxcdTFFQjhcXHUxRUM2XFx1MDIyOFxcdTFFMUNcXHUwMTE4XFx1MUUxOFxcdTFFMUFcXHUwMTkwXFx1MDE4RScgfSxcbiAgeyBiYXNlOiAnRicsIGxldHRlcnM6ICdcXHUwMDQ2XFx1MjRCQlxcdUZGMjZcXHUxRTFFXFx1MDE5MVxcdUE3N0InIH0sXG4gIHsgYmFzZTogJ0cnLCBsZXR0ZXJzOiAnXFx1MDA0N1xcdTI0QkNcXHVGRjI3XFx1MDFGNFxcdTAxMUNcXHUxRTIwXFx1MDExRVxcdTAxMjBcXHUwMUU2XFx1MDEyMlxcdTAxRTRcXHUwMTkzXFx1QTdBMFxcdUE3N0RcXHVBNzdFJyB9LFxuICB7IGJhc2U6ICdIJywgbGV0dGVyczogJ1xcdTAwNDhcXHUyNEJEXFx1RkYyOFxcdTAxMjRcXHUxRTIyXFx1MUUyNlxcdTAyMUVcXHUxRTI0XFx1MUUyOFxcdTFFMkFcXHUwMTI2XFx1MkM2N1xcdTJDNzVcXHVBNzhEJyB9LFxuICB7IGJhc2U6ICdJJywgbGV0dGVyczogJ1xcdTAwNDlcXHUyNEJFXFx1RkYyOVxcdTAwQ0NcXHUwMENEXFx1MDBDRVxcdTAxMjhcXHUwMTJBXFx1MDEyQ1xcdTAxMzBcXHUwMENGXFx1MUUyRVxcdTFFQzhcXHUwMUNGXFx1MDIwOFxcdTAyMEFcXHUxRUNBXFx1MDEyRVxcdTFFMkNcXHUwMTk3JyB9LFxuICB7IGJhc2U6ICdKJywgbGV0dGVyczogJ1xcdTAwNEFcXHUyNEJGXFx1RkYyQVxcdTAxMzRcXHUwMjQ4JyB9LFxuICB7IGJhc2U6ICdLJywgbGV0dGVyczogJ1xcdTAwNEJcXHUyNEMwXFx1RkYyQlxcdTFFMzBcXHUwMUU4XFx1MUUzMlxcdTAxMzZcXHUxRTM0XFx1MDE5OFxcdTJDNjlcXHVBNzQwXFx1QTc0MlxcdUE3NDRcXHVBN0EyJyB9LFxuICB7IGJhc2U6ICdMJywgbGV0dGVyczogJ1xcdTAwNENcXHUyNEMxXFx1RkYyQ1xcdTAxM0ZcXHUwMTM5XFx1MDEzRFxcdTFFMzZcXHUxRTM4XFx1MDEzQlxcdTFFM0NcXHUxRTNBXFx1MDE0MVxcdTAyM0RcXHUyQzYyXFx1MkM2MFxcdUE3NDhcXHVBNzQ2XFx1QTc4MCcgfSxcbiAgeyBiYXNlOiAnTEonLCBsZXR0ZXJzOiAnXFx1MDFDNycgfSxcbiAgeyBiYXNlOiAnTGonLCBsZXR0ZXJzOiAnXFx1MDFDOCcgfSxcbiAgeyBiYXNlOiAnTScsIGxldHRlcnM6ICdcXHUwMDREXFx1MjRDMlxcdUZGMkRcXHUxRTNFXFx1MUU0MFxcdTFFNDJcXHUyQzZFXFx1MDE5QycgfSxcbiAgeyBiYXNlOiAnTicsIGxldHRlcnM6ICdcXHUwMDRFXFx1MjRDM1xcdUZGMkVcXHUwMUY4XFx1MDE0M1xcdTAwRDFcXHUxRTQ0XFx1MDE0N1xcdTFFNDZcXHUwMTQ1XFx1MUU0QVxcdTFFNDhcXHUwMjIwXFx1MDE5RFxcdUE3OTBcXHVBN0E0JyB9LFxuICB7IGJhc2U6ICdOSicsIGxldHRlcnM6ICdcXHUwMUNBJyB9LFxuICB7IGJhc2U6ICdOaicsIGxldHRlcnM6ICdcXHUwMUNCJyB9LFxuICB7IGJhc2U6ICdPJywgbGV0dGVyczogJ1xcdTAwNEZcXHUyNEM0XFx1RkYyRlxcdTAwRDJcXHUwMEQzXFx1MDBENFxcdTFFRDJcXHUxRUQwXFx1MUVENlxcdTFFRDRcXHUwMEQ1XFx1MUU0Q1xcdTAyMkNcXHUxRTRFXFx1MDE0Q1xcdTFFNTBcXHUxRTUyXFx1MDE0RVxcdTAyMkVcXHUwMjMwXFx1MDBENlxcdTAyMkFcXHUxRUNFXFx1MDE1MFxcdTAxRDFcXHUwMjBDXFx1MDIwRVxcdTAxQTBcXHUxRURDXFx1MUVEQVxcdTFFRTBcXHUxRURFXFx1MUVFMlxcdTFFQ0NcXHUxRUQ4XFx1MDFFQVxcdTAxRUNcXHUwMEQ4XFx1MDFGRVxcdTAxODZcXHUwMTlGXFx1QTc0QVxcdUE3NEMnIH0sXG4gIHsgYmFzZTogJ09JJywgbGV0dGVyczogJ1xcdTAxQTInIH0sXG4gIHsgYmFzZTogJ09PJywgbGV0dGVyczogJ1xcdUE3NEUnIH0sXG4gIHsgYmFzZTogJ09VJywgbGV0dGVyczogJ1xcdTAyMjInIH0sXG4gIHsgYmFzZTogJ09FJywgbGV0dGVyczogJ1xcdTAwOENcXHUwMTUyJyB9LFxuICB7IGJhc2U6ICdvZScsIGxldHRlcnM6ICdcXHUwMDlDXFx1MDE1MycgfSxcbiAgeyBiYXNlOiAnUCcsIGxldHRlcnM6ICdcXHUwMDUwXFx1MjRDNVxcdUZGMzBcXHUxRTU0XFx1MUU1NlxcdTAxQTRcXHUyQzYzXFx1QTc1MFxcdUE3NTJcXHVBNzU0JyB9LFxuICB7IGJhc2U6ICdRJywgbGV0dGVyczogJ1xcdTAwNTFcXHUyNEM2XFx1RkYzMVxcdUE3NTZcXHVBNzU4XFx1MDI0QScgfSxcbiAgeyBiYXNlOiAnUicsIGxldHRlcnM6ICdcXHUwMDUyXFx1MjRDN1xcdUZGMzJcXHUwMTU0XFx1MUU1OFxcdTAxNThcXHUwMjEwXFx1MDIxMlxcdTFFNUFcXHUxRTVDXFx1MDE1NlxcdTFFNUVcXHUwMjRDXFx1MkM2NFxcdUE3NUFcXHVBN0E2XFx1QTc4MicgfSxcbiAgeyBiYXNlOiAnUycsIGxldHRlcnM6ICdcXHUwMDUzXFx1MjRDOFxcdUZGMzNcXHUxRTlFXFx1MDE1QVxcdTFFNjRcXHUwMTVDXFx1MUU2MFxcdTAxNjBcXHUxRTY2XFx1MUU2MlxcdTFFNjhcXHUwMjE4XFx1MDE1RVxcdTJDN0VcXHVBN0E4XFx1QTc4NCcgfSxcbiAgeyBiYXNlOiAnVCcsIGxldHRlcnM6ICdcXHUwMDU0XFx1MjRDOVxcdUZGMzRcXHUxRTZBXFx1MDE2NFxcdTFFNkNcXHUwMjFBXFx1MDE2MlxcdTFFNzBcXHUxRTZFXFx1MDE2NlxcdTAxQUNcXHUwMUFFXFx1MDIzRVxcdUE3ODYnIH0sXG4gIHsgYmFzZTogJ1RaJywgbGV0dGVyczogJ1xcdUE3MjgnIH0sXG4gIHsgYmFzZTogJ1UnLCBsZXR0ZXJzOiAnXFx1MDA1NVxcdTI0Q0FcXHVGRjM1XFx1MDBEOVxcdTAwREFcXHUwMERCXFx1MDE2OFxcdTFFNzhcXHUwMTZBXFx1MUU3QVxcdTAxNkNcXHUwMERDXFx1MDFEQlxcdTAxRDdcXHUwMUQ1XFx1MDFEOVxcdTFFRTZcXHUwMTZFXFx1MDE3MFxcdTAxRDNcXHUwMjE0XFx1MDIxNlxcdTAxQUZcXHUxRUVBXFx1MUVFOFxcdTFFRUVcXHUxRUVDXFx1MUVGMFxcdTFFRTRcXHUxRTcyXFx1MDE3MlxcdTFFNzZcXHUxRTc0XFx1MDI0NCcgfSxcbiAgeyBiYXNlOiAnVicsIGxldHRlcnM6ICdcXHUwMDU2XFx1MjRDQlxcdUZGMzZcXHUxRTdDXFx1MUU3RVxcdTAxQjJcXHVBNzVFXFx1MDI0NScgfSxcbiAgeyBiYXNlOiAnVlknLCBsZXR0ZXJzOiAnXFx1QTc2MCcgfSxcbiAgeyBiYXNlOiAnVycsIGxldHRlcnM6ICdcXHUwMDU3XFx1MjRDQ1xcdUZGMzdcXHUxRTgwXFx1MUU4MlxcdTAxNzRcXHUxRTg2XFx1MUU4NFxcdTFFODhcXHUyQzcyJyB9LFxuICB7IGJhc2U6ICdYJywgbGV0dGVyczogJ1xcdTAwNThcXHUyNENEXFx1RkYzOFxcdTFFOEFcXHUxRThDJyB9LFxuICB7IGJhc2U6ICdZJywgbGV0dGVyczogJ1xcdTAwNTlcXHUyNENFXFx1RkYzOVxcdTFFRjJcXHUwMEREXFx1MDE3NlxcdTFFRjhcXHUwMjMyXFx1MUU4RVxcdTAxNzhcXHUxRUY2XFx1MUVGNFxcdTAxQjNcXHUwMjRFXFx1MUVGRScgfSxcbiAgeyBiYXNlOiAnWicsIGxldHRlcnM6ICdcXHUwMDVBXFx1MjRDRlxcdUZGM0FcXHUwMTc5XFx1MUU5MFxcdTAxN0JcXHUwMTdEXFx1MUU5MlxcdTFFOTRcXHUwMUI1XFx1MDIyNFxcdTJDN0ZcXHUyQzZCXFx1QTc2MicgfSxcbiAgeyBiYXNlOiAnYScsIGxldHRlcnM6ICdcXHUwMDYxXFx1MjREMFxcdUZGNDFcXHUxRTlBXFx1MDBFMFxcdTAwRTFcXHUwMEUyXFx1MUVBN1xcdTFFQTVcXHUxRUFCXFx1MUVBOVxcdTAwRTNcXHUwMTAxXFx1MDEwM1xcdTFFQjFcXHUxRUFGXFx1MUVCNVxcdTFFQjNcXHUwMjI3XFx1MDFFMVxcdTAwRTRcXHUwMURGXFx1MUVBM1xcdTAwRTVcXHUwMUZCXFx1MDFDRVxcdTAyMDFcXHUwMjAzXFx1MUVBMVxcdTFFQURcXHUxRUI3XFx1MUUwMVxcdTAxMDVcXHUyQzY1XFx1MDI1MCcgfSxcbiAgeyBiYXNlOiAnYWEnLCBsZXR0ZXJzOiAnXFx1QTczMycgfSxcbiAgeyBiYXNlOiAnYWUnLCBsZXR0ZXJzOiAnXFx1MDBFNlxcdTAxRkRcXHUwMUUzJyB9LFxuICB7IGJhc2U6ICdhbycsIGxldHRlcnM6ICdcXHVBNzM1JyB9LFxuICB7IGJhc2U6ICdhdScsIGxldHRlcnM6ICdcXHVBNzM3JyB9LFxuICB7IGJhc2U6ICdhdicsIGxldHRlcnM6ICdcXHVBNzM5XFx1QTczQicgfSxcbiAgeyBiYXNlOiAnYXknLCBsZXR0ZXJzOiAnXFx1QTczRCcgfSxcbiAgeyBiYXNlOiAnYicsIGxldHRlcnM6ICdcXHUwMDYyXFx1MjREMVxcdUZGNDJcXHUxRTAzXFx1MUUwNVxcdTFFMDdcXHUwMTgwXFx1MDE4M1xcdTAyNTMnIH0sXG4gIHsgYmFzZTogJ2MnLCBsZXR0ZXJzOiAnXFx1MDA2M1xcdTI0RDJcXHVGRjQzXFx1MDEwN1xcdTAxMDlcXHUwMTBCXFx1MDEwRFxcdTAwRTdcXHUxRTA5XFx1MDE4OFxcdTAyM0NcXHVBNzNGXFx1MjE4NCcgfSxcbiAgeyBiYXNlOiAnZCcsIGxldHRlcnM6ICdcXHUwMDY0XFx1MjREM1xcdUZGNDRcXHUxRTBCXFx1MDEwRlxcdTFFMERcXHUxRTExXFx1MUUxM1xcdTFFMEZcXHUwMTExXFx1MDE4Q1xcdTAyNTZcXHUwMjU3XFx1QTc3QScgfSxcbiAgeyBiYXNlOiAnZHonLCBsZXR0ZXJzOiAnXFx1MDFGM1xcdTAxQzYnIH0sXG4gIHsgYmFzZTogJ2UnLCBsZXR0ZXJzOiAnXFx1MDA2NVxcdTI0RDRcXHVGRjQ1XFx1MDBFOFxcdTAwRTlcXHUwMEVBXFx1MUVDMVxcdTFFQkZcXHUxRUM1XFx1MUVDM1xcdTFFQkRcXHUwMTEzXFx1MUUxNVxcdTFFMTdcXHUwMTE1XFx1MDExN1xcdTAwRUJcXHUxRUJCXFx1MDExQlxcdTAyMDVcXHUwMjA3XFx1MUVCOVxcdTFFQzdcXHUwMjI5XFx1MUUxRFxcdTAxMTlcXHUxRTE5XFx1MUUxQlxcdTAyNDdcXHUwMjVCXFx1MDFERCcgfSxcbiAgeyBiYXNlOiAnZicsIGxldHRlcnM6ICdcXHUwMDY2XFx1MjRENVxcdUZGNDZcXHUxRTFGXFx1MDE5MlxcdUE3N0MnIH0sXG4gIHsgYmFzZTogJ2cnLCBsZXR0ZXJzOiAnXFx1MDA2N1xcdTI0RDZcXHVGRjQ3XFx1MDFGNVxcdTAxMURcXHUxRTIxXFx1MDExRlxcdTAxMjFcXHUwMUU3XFx1MDEyM1xcdTAxRTVcXHUwMjYwXFx1QTdBMVxcdTFENzlcXHVBNzdGJyB9LFxuICB7IGJhc2U6ICdoJywgbGV0dGVyczogJ1xcdTAwNjhcXHUyNEQ3XFx1RkY0OFxcdTAxMjVcXHUxRTIzXFx1MUUyN1xcdTAyMUZcXHUxRTI1XFx1MUUyOVxcdTFFMkJcXHUxRTk2XFx1MDEyN1xcdTJDNjhcXHUyQzc2XFx1MDI2NScgfSxcbiAgeyBiYXNlOiAnaHYnLCBsZXR0ZXJzOiAnXFx1MDE5NScgfSxcbiAgeyBiYXNlOiAnaScsIGxldHRlcnM6ICdcXHUwMDY5XFx1MjREOFxcdUZGNDlcXHUwMEVDXFx1MDBFRFxcdTAwRUVcXHUwMTI5XFx1MDEyQlxcdTAxMkRcXHUwMEVGXFx1MUUyRlxcdTFFQzlcXHUwMUQwXFx1MDIwOVxcdTAyMEJcXHUxRUNCXFx1MDEyRlxcdTFFMkRcXHUwMjY4XFx1MDEzMScgfSxcbiAgeyBiYXNlOiAnaicsIGxldHRlcnM6ICdcXHUwMDZBXFx1MjREOVxcdUZGNEFcXHUwMTM1XFx1MDFGMFxcdTAyNDknIH0sXG4gIHsgYmFzZTogJ2snLCBsZXR0ZXJzOiAnXFx1MDA2QlxcdTI0REFcXHVGRjRCXFx1MUUzMVxcdTAxRTlcXHUxRTMzXFx1MDEzN1xcdTFFMzVcXHUwMTk5XFx1MkM2QVxcdUE3NDFcXHVBNzQzXFx1QTc0NVxcdUE3QTMnIH0sXG4gIHsgYmFzZTogJ2wnLCBsZXR0ZXJzOiAnXFx1MDA2Q1xcdTI0REJcXHVGRjRDXFx1MDE0MFxcdTAxM0FcXHUwMTNFXFx1MUUzN1xcdTFFMzlcXHUwMTNDXFx1MUUzRFxcdTFFM0JcXHUwMTdGXFx1MDE0MlxcdTAxOUFcXHUwMjZCXFx1MkM2MVxcdUE3NDlcXHVBNzgxXFx1QTc0NycgfSxcbiAgeyBiYXNlOiAnbGonLCBsZXR0ZXJzOiAnXFx1MDFDOScgfSxcbiAgeyBiYXNlOiAnbScsIGxldHRlcnM6ICdcXHUwMDZEXFx1MjREQ1xcdUZGNERcXHUxRTNGXFx1MUU0MVxcdTFFNDNcXHUwMjcxXFx1MDI2RicgfSxcbiAgeyBiYXNlOiAnbicsIGxldHRlcnM6ICdcXHUwMDZFXFx1MjRERFxcdUZGNEVcXHUwMUY5XFx1MDE0NFxcdTAwRjFcXHUxRTQ1XFx1MDE0OFxcdTFFNDdcXHUwMTQ2XFx1MUU0QlxcdTFFNDlcXHUwMTlFXFx1MDI3MlxcdTAxNDlcXHVBNzkxXFx1QTdBNScgfSxcbiAgeyBiYXNlOiAnbmonLCBsZXR0ZXJzOiAnXFx1MDFDQycgfSxcbiAgeyBiYXNlOiAnbycsIGxldHRlcnM6ICdcXHUwMDZGXFx1MjRERVxcdUZGNEZcXHUwMEYyXFx1MDBGM1xcdTAwRjRcXHUxRUQzXFx1MUVEMVxcdTFFRDdcXHUxRUQ1XFx1MDBGNVxcdTFFNERcXHUwMjJEXFx1MUU0RlxcdTAxNERcXHUxRTUxXFx1MUU1M1xcdTAxNEZcXHUwMjJGXFx1MDIzMVxcdTAwRjZcXHUwMjJCXFx1MUVDRlxcdTAxNTFcXHUwMUQyXFx1MDIwRFxcdTAyMEZcXHUwMUExXFx1MUVERFxcdTFFREJcXHUxRUUxXFx1MUVERlxcdTFFRTNcXHUxRUNEXFx1MUVEOVxcdTAxRUJcXHUwMUVEXFx1MDBGOFxcdTAxRkZcXHUwMjU0XFx1QTc0QlxcdUE3NERcXHUwMjc1JyB9LFxuICB7IGJhc2U6ICdvaScsIGxldHRlcnM6ICdcXHUwMUEzJyB9LFxuICB7IGJhc2U6ICdvdScsIGxldHRlcnM6ICdcXHUwMjIzJyB9LFxuICB7IGJhc2U6ICdvbycsIGxldHRlcnM6ICdcXHVBNzRGJyB9LFxuICB7IGJhc2U6ICdwJywgbGV0dGVyczogJ1xcdTAwNzBcXHUyNERGXFx1RkY1MFxcdTFFNTVcXHUxRTU3XFx1MDFBNVxcdTFEN0RcXHVBNzUxXFx1QTc1M1xcdUE3NTUnIH0sXG4gIHsgYmFzZTogJ3EnLCBsZXR0ZXJzOiAnXFx1MDA3MVxcdTI0RTBcXHVGRjUxXFx1MDI0QlxcdUE3NTdcXHVBNzU5JyB9LFxuICB7IGJhc2U6ICdyJywgbGV0dGVyczogJ1xcdTAwNzJcXHUyNEUxXFx1RkY1MlxcdTAxNTVcXHUxRTU5XFx1MDE1OVxcdTAyMTFcXHUwMjEzXFx1MUU1QlxcdTFFNURcXHUwMTU3XFx1MUU1RlxcdTAyNERcXHUwMjdEXFx1QTc1QlxcdUE3QTdcXHVBNzgzJyB9LFxuICB7IGJhc2U6ICdzJywgbGV0dGVyczogJ1xcdTAwNzNcXHUyNEUyXFx1RkY1M1xcdTAwREZcXHUwMTVCXFx1MUU2NVxcdTAxNURcXHUxRTYxXFx1MDE2MVxcdTFFNjdcXHUxRTYzXFx1MUU2OVxcdTAyMTlcXHUwMTVGXFx1MDIzRlxcdUE3QTlcXHVBNzg1XFx1MUU5QicgfSxcbiAgeyBiYXNlOiAndCcsIGxldHRlcnM6ICdcXHUwMDc0XFx1MjRFM1xcdUZGNTRcXHUxRTZCXFx1MUU5N1xcdTAxNjVcXHUxRTZEXFx1MDIxQlxcdTAxNjNcXHUxRTcxXFx1MUU2RlxcdTAxNjdcXHUwMUFEXFx1MDI4OFxcdTJDNjZcXHVBNzg3JyB9LFxuICB7IGJhc2U6ICd0eicsIGxldHRlcnM6ICdcXHVBNzI5JyB9LFxuICB7IGJhc2U6ICd1JywgbGV0dGVyczogJ1xcdTAwNzVcXHUyNEU0XFx1RkY1NVxcdTAwRjlcXHUwMEZBXFx1MDBGQlxcdTAxNjlcXHUxRTc5XFx1MDE2QlxcdTFFN0JcXHUwMTZEXFx1MDBGQ1xcdTAxRENcXHUwMUQ4XFx1MDFENlxcdTAxREFcXHUxRUU3XFx1MDE2RlxcdTAxNzFcXHUwMUQ0XFx1MDIxNVxcdTAyMTdcXHUwMUIwXFx1MUVFQlxcdTFFRTlcXHUxRUVGXFx1MUVFRFxcdTFFRjFcXHUxRUU1XFx1MUU3M1xcdTAxNzNcXHUxRTc3XFx1MUU3NVxcdTAyODknIH0sXG4gIHsgYmFzZTogJ3YnLCBsZXR0ZXJzOiAnXFx1MDA3NlxcdTI0RTVcXHVGRjU2XFx1MUU3RFxcdTFFN0ZcXHUwMjhCXFx1QTc1RlxcdTAyOEMnIH0sXG4gIHsgYmFzZTogJ3Z5JywgbGV0dGVyczogJ1xcdUE3NjEnIH0sXG4gIHsgYmFzZTogJ3cnLCBsZXR0ZXJzOiAnXFx1MDA3N1xcdTI0RTZcXHVGRjU3XFx1MUU4MVxcdTFFODNcXHUwMTc1XFx1MUU4N1xcdTFFODVcXHUxRTk4XFx1MUU4OVxcdTJDNzMnIH0sXG4gIHsgYmFzZTogJ3gnLCBsZXR0ZXJzOiAnXFx1MDA3OFxcdTI0RTdcXHVGRjU4XFx1MUU4QlxcdTFFOEQnIH0sXG4gIHsgYmFzZTogJ3knLCBsZXR0ZXJzOiAnXFx1MDA3OVxcdTI0RThcXHVGRjU5XFx1MUVGM1xcdTAwRkRcXHUwMTc3XFx1MUVGOVxcdTAyMzNcXHUxRThGXFx1MDBGRlxcdTFFRjdcXHUxRTk5XFx1MUVGNVxcdTAxQjRcXHUwMjRGXFx1MUVGRicgfSxcbiAgeyBiYXNlOiAneicsIGxldHRlcnM6ICdcXHUwMDdBXFx1MjRFOVxcdUZGNUFcXHUwMTdBXFx1MUU5MVxcdTAxN0NcXHUwMTdFXFx1MUU5M1xcdTFFOTVcXHUwMUI2XFx1MDIyNVxcdTAyNDBcXHUyQzZDXFx1QTc2MycgfSxcbl07XG5cbmNvbnN0IGRpYWNyaXRpY3NNYXAgPSB7fTtcbmZvciAobGV0IGkgPSAwOyBpIDwgZGVmYXVsdERpYWNyaXRpY3NSZW1vdmFsYXAubGVuZ3RoOyBpICs9IDEpIHtcbiAgY29uc3QgbGV0dGVycyA9IGRlZmF1bHREaWFjcml0aWNzUmVtb3ZhbGFwW2ldLmxldHRlcnM7XG4gIGZvciAobGV0IGogPSAwOyBqIDwgbGV0dGVycy5sZW5ndGg7IGogKz0gMSkge1xuICAgIGRpYWNyaXRpY3NNYXBbbGV0dGVyc1tqXV0gPSBkZWZhdWx0RGlhY3JpdGljc1JlbW92YWxhcFtpXS5iYXNlO1xuICB9XG59XG5cbmNvbnN0IFV0aWxzID0ge1xuICBwYXJzZVVybFF1ZXJ5KHVybCkge1xuICAgIGNvbnN0IHF1ZXJ5ID0ge307XG4gICAgbGV0IHVybFRvUGFyc2UgPSB1cmwgfHwgd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgbGV0IGk7XG4gICAgbGV0IHBhcmFtcztcbiAgICBsZXQgcGFyYW07XG4gICAgbGV0IGxlbmd0aDtcbiAgICBpZiAodHlwZW9mIHVybFRvUGFyc2UgPT09ICdzdHJpbmcnICYmIHVybFRvUGFyc2UubGVuZ3RoKSB7XG4gICAgICB1cmxUb1BhcnNlID0gdXJsVG9QYXJzZS5pbmRleE9mKCc/JykgPiAtMSA/IHVybFRvUGFyc2UucmVwbGFjZSgvXFxTKlxcPy8sICcnKSA6ICcnO1xuICAgICAgcGFyYW1zID0gdXJsVG9QYXJzZS5zcGxpdCgnJicpLmZpbHRlcihwYXJhbXNQYXJ0ID0+IHBhcmFtc1BhcnQgIT09ICcnKTtcbiAgICAgIGxlbmd0aCA9IHBhcmFtcy5sZW5ndGg7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBwYXJhbSA9IHBhcmFtc1tpXS5yZXBsYWNlKC8jXFxTKy9nLCAnJykuc3BsaXQoJz0nKTtcbiAgICAgICAgcXVlcnlbZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtWzBdKV0gPSB0eXBlb2YgcGFyYW1bMV0gPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtWzFdKSB8fCAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9LFxuICBpc0FycmF5KGFycikge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KGFycik7XG4gIH0sXG4gIGVhY2gob2JqLCBjYWxsYmFjaykge1xuICAgICAgLy8gQ2hlY2sgaXQncyBpdGVyYWJsZVxuICAgICAgLy8gVE9ETzogU2hvdWxkIHByb2JhYmx5IHJhaXNlIGEgdmFsdWUgZXJyb3IgaGVyZVxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JykgcmV0dXJuO1xuICAgIC8vIERvbid0IGJvdGhlciBjb250aW51aW5nIHdpdGhvdXQgYSBjYWxsYmFja1xuICAgIGlmICghY2FsbGJhY2spIHJldHVybjtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopIHx8IG9iaiBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICAgIC8vIEFycmF5XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBJZiBjYWxsYmFjayByZXR1cm5zIGZhbHNlXG4gICAgICAgIGlmIChjYWxsYmFjayhpLCBvYmpbaV0pID09PSBmYWxzZSkge1xuICAgICAgICAgIC8vIEJyZWFrIG91dCBvZiB0aGUgbG9vcFxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPYmplY3RcbiAgICAgIGZvciAobGV0IHByb3AgaW4gb2JqKSB7XG4gICAgICAgIC8vIENoZWNrIHRoZSBwcm9wZXJ0aWUgYmVsb25ncyB0byB0aGUgb2JqZWN0XG4gICAgICAgIC8vIG5vdCBpdCdzIHByb3RvdHlwZVxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGNhbGxiYWNrIHJldHVybnMgZmFsc2VcbiAgICAgICAgICBpZiAoY2FsbGJhY2socHJvcCwgb2JqW3Byb3BdKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vIEJyZWFrIG91dCBvZiB0aGUgbG9vcDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHVuaXF1ZShhcnIpIHtcbiAgICBjb25zdCB1bmlxdWVBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodW5pcXVlQXJyYXkuaW5kZXhPZihhcnJbaV0pID09PSAtMSkgdW5pcXVlQXJyYXkucHVzaChhcnJbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdW5pcXVlQXJyYXk7XG4gIH0sXG4gIHNlcmlhbGl6ZU9iamVjdChvYmosIHBhcmVudHMgPSBbXSkge1xuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykgcmV0dXJuIG9iajtcbiAgICBjb25zdCByZXN1bHRBcnJheSA9IFtdO1xuICAgIGNvbnN0IHNlcGFyYXRvciA9ICcmJztcbiAgICBsZXQgbmV3UGFyZW50cztcbiAgICBmdW5jdGlvbiB2YXJOYW1lKG5hbWUpIHtcbiAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IHBhcmVudFBhcnRzID0gJyc7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGFyZW50cy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIGlmIChqID09PSAwKSBwYXJlbnRQYXJ0cyArPSBwYXJlbnRzW2pdO1xuICAgICAgICAgIGVsc2UgcGFyZW50UGFydHMgKz0gYFske2VuY29kZVVSSUNvbXBvbmVudChwYXJlbnRzW2pdKX1dYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYCR7cGFyZW50UGFydHN9WyR7ZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpfV1gO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChuYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdmFyVmFsdWUodmFsdWUpIHtcbiAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgIH1cbiAgICBmb3IgKGxldCBwcm9wIGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICBsZXQgdG9QdXNoO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmpbcHJvcF0pKSB7XG4gICAgICAgICAgdG9QdXNoID0gW107XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmpbcHJvcF0ubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvYmpbcHJvcF1baV0pICYmIHR5cGVvZiBvYmpbcHJvcF1baV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgIG5ld1BhcmVudHMgPSBwYXJlbnRzLnNsaWNlKCk7XG4gICAgICAgICAgICAgIG5ld1BhcmVudHMucHVzaChwcm9wKTtcbiAgICAgICAgICAgICAgbmV3UGFyZW50cy5wdXNoKFN0cmluZyhpKSk7XG4gICAgICAgICAgICAgIHRvUHVzaC5wdXNoKFV0aWxzLnNlcmlhbGl6ZU9iamVjdChvYmpbcHJvcF1baV0sIG5ld1BhcmVudHMpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRvUHVzaC5wdXNoKGAke3Zhck5hbWUocHJvcCl9W109JHt2YXJWYWx1ZShvYmpbcHJvcF1baV0pfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodG9QdXNoLmxlbmd0aCA+IDApIHJlc3VsdEFycmF5LnB1c2godG9QdXNoLmpvaW4oc2VwYXJhdG9yKSk7XG4gICAgICAgIH0gZWxzZSBpZiAob2JqW3Byb3BdID09PSBudWxsIHx8IG9ialtwcm9wXSA9PT0gJycpIHtcbiAgICAgICAgICByZXN1bHRBcnJheS5wdXNoKGAke3Zhck5hbWUocHJvcCl9PWApO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmpbcHJvcF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgLy8gT2JqZWN0LCBjb252ZXJ0IHRvIG5hbWVkIGFycmF5XG4gICAgICAgICAgbmV3UGFyZW50cyA9IHBhcmVudHMuc2xpY2UoKTtcbiAgICAgICAgICBuZXdQYXJlbnRzLnB1c2gocHJvcCk7XG4gICAgICAgICAgdG9QdXNoID0gVXRpbHMuc2VyaWFsaXplT2JqZWN0KG9ialtwcm9wXSwgbmV3UGFyZW50cyk7XG4gICAgICAgICAgaWYgKHRvUHVzaCAhPT0gJycpIHJlc3VsdEFycmF5LnB1c2godG9QdXNoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqW3Byb3BdICE9PSAndW5kZWZpbmVkJyAmJiBvYmpbcHJvcF0gIT09ICcnKSB7XG4gICAgICAgICAgLy8gU2hvdWxkIGJlIHN0cmluZyBvciBwbGFpbiB2YWx1ZVxuICAgICAgICAgIHJlc3VsdEFycmF5LnB1c2goYCR7dmFyTmFtZShwcm9wKX09JHt2YXJWYWx1ZShvYmpbcHJvcF0pfWApO1xuICAgICAgICB9IGVsc2UgaWYgKG9ialtwcm9wXSA9PT0gJycpIHJlc3VsdEFycmF5LnB1c2godmFyTmFtZShwcm9wKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRBcnJheS5qb2luKHNlcGFyYXRvcik7XG4gIH0sXG4gIHRvQ2FtZWxDYXNlKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8tKC4pL2csIChtYXRjaCwgZ3JvdXAxKSA9PiBncm91cDEudG9VcHBlckNhc2UoKSk7XG4gIH0sXG4gIGRhdGFzZXQoZWwpIHtcbiAgICByZXR1cm4gJChlbCkuZGF0YXNldCgpO1xuICB9LFxuICBnZXRUcmFuc2xhdGUoZWwsIGF4aXMgPSAneCcpIHtcbiAgICBjb25zdCBjdXJTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKTtcbiAgICBsZXQgbWF0cml4O1xuICAgIGxldCBjdXJUcmFuc2Zvcm07XG4gICAgbGV0IHRyYW5zZm9ybU1hdHJpeDtcblxuICAgIGlmICh3aW5kb3cuV2ViS2l0Q1NTTWF0cml4KSB7XG4gICAgICBjdXJUcmFuc2Zvcm0gPSBjdXJTdHlsZS50cmFuc2Zvcm0gfHwgY3VyU3R5bGUud2Via2l0VHJhbnNmb3JtO1xuICAgICAgaWYgKGN1clRyYW5zZm9ybS5zcGxpdCgnLCcpLmxlbmd0aCA+IDYpIHtcbiAgICAgICAgY3VyVHJhbnNmb3JtID0gY3VyVHJhbnNmb3JtLnNwbGl0KCcsICcpLm1hcChmdW5jdGlvbiBtYXAoYSkge1xuICAgICAgICAgIHJldHVybiBhLnJlcGxhY2UoJywnLCAnLicpO1xuICAgICAgICB9KS5qb2luKCcsICcpO1xuICAgICAgfVxuICAgICAgLy8gU29tZSBvbGQgdmVyc2lvbnMgb2YgV2Via2l0IGNob2tlIHdoZW4gJ25vbmUnIGlzIHBhc3NlZDsgcGFzc1xuICAgICAgLy8gZW1wdHkgc3RyaW5nIGluc3RlYWQgaW4gdGhpcyBjYXNlXG4gICAgICB0cmFuc2Zvcm1NYXRyaXggPSBuZXcgd2luZG93LldlYktpdENTU01hdHJpeChjdXJUcmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogY3VyVHJhbnNmb3JtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhbnNmb3JtTWF0cml4ID0gY3VyU3R5bGUudHJhbnNmb3JtIHx8IGN1clN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3RyYW5zZm9ybScpLnJlcGxhY2UoJ3RyYW5zbGF0ZSgnLCAnbWF0cml4KDEsIDAsIDAsIDEsJyk7XG4gICAgICBtYXRyaXggPSB0cmFuc2Zvcm1NYXRyaXgudG9TdHJpbmcoKS5zcGxpdCgnLCcpO1xuICAgIH1cblxuICAgIGlmIChheGlzID09PSAneCcpIHtcbiAgICAgIC8vIExhdGVzdCBDaHJvbWUgYW5kIHdlYmtpdHMgRml4XG4gICAgICBpZiAod2luZG93LldlYktpdENTU01hdHJpeCkgY3VyVHJhbnNmb3JtID0gdHJhbnNmb3JtTWF0cml4Lm00MTtcbiAgICAgIC8vIENyYXp5IElFMTAgTWF0cml4XG4gICAgICBlbHNlIGlmIChtYXRyaXgubGVuZ3RoID09PSAxNikgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbMTJdKTtcbiAgICAgIC8vIE5vcm1hbCBCcm93c2Vyc1xuICAgICAgZWxzZSBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFs0XSk7XG4gICAgfVxuICAgIGlmIChheGlzID09PSAneScpIHtcbiAgICAgIC8vIExhdGVzdCBDaHJvbWUgYW5kIHdlYmtpdHMgRml4XG4gICAgICBpZiAod2luZG93LldlYktpdENTU01hdHJpeCkgY3VyVHJhbnNmb3JtID0gdHJhbnNmb3JtTWF0cml4Lm00MjtcbiAgICAgIC8vIENyYXp5IElFMTAgTWF0cml4XG4gICAgICBlbHNlIGlmIChtYXRyaXgubGVuZ3RoID09PSAxNikgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbMTNdKTtcbiAgICAgIC8vIE5vcm1hbCBCcm93c2Vyc1xuICAgICAgZWxzZSBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFs1XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1clRyYW5zZm9ybSB8fCAwO1xuICB9LFxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spIHtcbiAgICBpZiAod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spO1xuICAgIGVsc2UgaWYgKHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHJldHVybiB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKTtcbiAgICByZXR1cm4gd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gIH0sXG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKSB7XG4gICAgaWYgKHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSkgcmV0dXJuIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShpZCk7XG4gICAgZWxzZSBpZiAod2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lKSByZXR1cm4gd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKTtcbiAgICByZXR1cm4gd2luZG93LmNsZWFyVGltZW91dChpZCk7XG4gIH0sXG4gIHN1cHBvcnRUb3VjaDogISEoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgKHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpKSxcbiAgcmVtb3ZlRGlhY3JpdGljcyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1teXFx1MDAwMC1cXHUwMDdFXS9nLCBhID0+IGRpYWNyaXRpY3NNYXBbYV0gfHwgYSk7XG4gIH0sXG4gIGV4dGVuZCguLi5hcmdzKSB7XG4gICAgY29uc3QgdG8gPSBPYmplY3QoYXJnc1swXSk7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmdzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBuZXh0U291cmNlID0gYXJnc1tpXTtcbiAgICAgIGlmIChuZXh0U291cmNlICE9PSB1bmRlZmluZWQgJiYgbmV4dFNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBrZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhPYmplY3QobmV4dFNvdXJjZSkpO1xuICAgICAgICBmb3IgKGxldCBuZXh0SW5kZXggPSAwLCBsZW4gPSBrZXlzQXJyYXkubGVuZ3RoOyBuZXh0SW5kZXggPCBsZW47IG5leHRJbmRleCArPSAxKSB7XG4gICAgICAgICAgY29uc3QgbmV4dEtleSA9IGtleXNBcnJheVtuZXh0SW5kZXhdO1xuICAgICAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRTb3VyY2UsIG5leHRLZXkpO1xuICAgICAgICAgIGlmIChkZXNjICE9PSB1bmRlZmluZWQgJiYgZGVzYy5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRvW25leHRLZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbmV4dFNvdXJjZVtuZXh0S2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgVXRpbHMuZXh0ZW5kKHRvW25leHRLZXldLCBuZXh0U291cmNlW25leHRLZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvO1xuICB9LFxufTtcblxuLy8gQWxpYXNlc1xuVXRpbHMucGFyc2VRdWVyeSA9IFV0aWxzLnBhcnNlVXJsUXVlcnk7XG5VdGlscy5wYXJhbSA9IFV0aWxzLnNlcmlhbGl6ZU9iamVjdDtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7XG4iLCJpbXBvcnQgJCBmcm9tICcuLyQnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG4vLyBHbG9iYWwgQWpheCBTZXR1cFxuY29uc3QgZ2xvYmFsQWpheE9wdGlvbnMgPSB7fTtcbiQuYWpheFNldHVwID0gZnVuY3Rpb24gYWpheFNldHVwKG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMudHlwZSAmJiAhb3B0aW9ucy5tZXRob2QpIG9wdGlvbnMubWV0aG9kID0gb3B0aW9ucy50eXBlO1xuICBVdGlscy5lYWNoKG9wdGlvbnMsIChvcHRpb25OYW1lLCBvcHRpb25WYWx1ZSkgPT4ge1xuICAgIGdsb2JhbEFqYXhPcHRpb25zW29wdGlvbk5hbWVdID0gb3B0aW9uVmFsdWU7XG4gIH0pO1xufTtcblxuLy8gSlNPTlAgUmVxdWVzdHNcbmxldCBqc29ucFJlcXVlc3RzID0gMDtcblxuLy8gQWpheFxuZnVuY3Rpb24gQWpheChvcHRpb25zKSB7XG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgZGF0YTogZmFsc2UsXG4gICAgYXN5bmM6IHRydWUsXG4gICAgY2FjaGU6IHRydWUsXG4gICAgdXNlcjogJycsXG4gICAgcGFzc3dvcmQ6ICcnLFxuICAgIGhlYWRlcnM6IHt9LFxuICAgIHhockZpZWxkczoge30sXG4gICAgc3RhdHVzQ29kZToge30sXG4gICAgcHJvY2Vzc0RhdGE6IHRydWUsXG4gICAgZGF0YVR5cGU6ICd0ZXh0JyxcbiAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgdGltZW91dDogMCxcbiAgfTtcbiAgY29uc3QgY2FsbGJhY2tzID0gWydiZWZvcmVTZW5kJywgJ2Vycm9yJywgJ2NvbXBsZXRlJywgJ3N1Y2Nlc3MnLCAnc3RhdHVzQ29kZSddO1xuXG4gIC8vIEZvciBqUXVlcnkgZ3V5c1xuICBpZiAob3B0aW9ucy50eXBlKSBvcHRpb25zLm1ldGhvZCA9IG9wdGlvbnMudHlwZTtcblxuICAvLyBHbG9iYWwgb3B0aW9uc1xuICBjb25zdCBnbG9iYWxzID0gZ2xvYmFsQWpheE9wdGlvbnM7XG5cbiAgLy8gTWVyZ2UgZ2xvYmFsIGFuZCBkZWZhdWx0c1xuICBVdGlscy5lYWNoKGdsb2JhbHMsIChnbG9iYWxPcHRpb25OYW1lLCBnbG9iYWxPcHRpb25WYWx1ZSkgPT4ge1xuICAgIGlmIChjYWxsYmFja3MuaW5kZXhPZihnbG9iYWxPcHRpb25OYW1lKSA8IDApIGRlZmF1bHRzW2dsb2JhbE9wdGlvbk5hbWVdID0gZ2xvYmFsT3B0aW9uVmFsdWU7XG4gIH0pO1xuXG4gIC8vIEZ1bmN0aW9uIHRvIHJ1biBYSFIgY2FsbGJhY2tzIGFuZCBldmVudHNcbiAgZnVuY3Rpb24gZmlyZUFqYXhDYWxsYmFjayhldmVudE5hbWUsIGV2ZW50RGF0YSwgY2FsbGJhY2tOYW1lKSB7XG4gICAgY29uc3QgYSA9IGFyZ3VtZW50cztcbiAgICBpZiAoZXZlbnROYW1lKSAkKGRvY3VtZW50KS50cmlnZ2VyKGV2ZW50TmFtZSwgZXZlbnREYXRhKTtcbiAgICBpZiAoY2FsbGJhY2tOYW1lKSB7XG4gICAgICAvLyBHbG9iYWwgY2FsbGJhY2tcbiAgICAgIGlmIChjYWxsYmFja05hbWUgaW4gZ2xvYmFscykgZ2xvYmFsc1tjYWxsYmFja05hbWVdKGFbM10sIGFbNF0sIGFbNV0sIGFbNl0pO1xuICAgICAgLy8gT3B0aW9ucyBjYWxsYmFja1xuICAgICAgaWYgKG9wdGlvbnNbY2FsbGJhY2tOYW1lXSkgb3B0aW9uc1tjYWxsYmFja05hbWVdKGFbM10sIGFbNF0sIGFbNV0sIGFbNl0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIE1lcmdlIG9wdGlvbnMgYW5kIGRlZmF1bHRzXG4gIFV0aWxzLmVhY2goZGVmYXVsdHMsIChwcm9wLCBkZWZhdWx0VmFsdWUpID0+IHtcbiAgICBpZiAoIShwcm9wIGluIG9wdGlvbnMpKSBvcHRpb25zW3Byb3BdID0gZGVmYXVsdFZhbHVlO1xuICB9KTtcblxuICAvLyBEZWZhdWx0IFVSTFxuICBpZiAoIW9wdGlvbnMudXJsKSB7XG4gICAgb3B0aW9ucy51cmwgPSB3aW5kb3cubG9jYXRpb24udG9TdHJpbmcoKTtcbiAgfVxuICAvLyBQYXJhbWV0ZXJzIFByZWZpeFxuICBsZXQgcGFyYW1zUHJlZml4ID0gb3B0aW9ucy51cmwuaW5kZXhPZignPycpID49IDAgPyAnJicgOiAnPyc7XG5cbiAgLy8gVUMgbWV0aG9kXG4gIGNvbnN0IG1ldGhvZCA9IG9wdGlvbnMubWV0aG9kLnRvVXBwZXJDYXNlKCk7XG5cbiAgLy8gRGF0YSB0byBtb2RpZnkgR0VUIFVSTFxuICBpZiAoKG1ldGhvZCA9PT0gJ0dFVCcgfHwgbWV0aG9kID09PSAnSEVBRCcgfHwgbWV0aG9kID09PSAnT1BUSU9OUycgfHwgbWV0aG9kID09PSAnREVMRVRFJykgJiYgb3B0aW9ucy5kYXRhKSB7XG4gICAgbGV0IHN0cmluZ0RhdGE7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBTaG91bGQgYmUga2V5PXZhbHVlIHN0cmluZ1xuICAgICAgaWYgKG9wdGlvbnMuZGF0YS5pbmRleE9mKCc/JykgPj0gMCkgc3RyaW5nRGF0YSA9IG9wdGlvbnMuZGF0YS5zcGxpdCgnPycpWzFdO1xuICAgICAgZWxzZSBzdHJpbmdEYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTaG91bGQgYmUga2V5PXZhbHVlIG9iamVjdFxuICAgICAgc3RyaW5nRGF0YSA9IFV0aWxzLnNlcmlhbGl6ZU9iamVjdChvcHRpb25zLmRhdGEpO1xuICAgIH1cbiAgICBpZiAoc3RyaW5nRGF0YS5sZW5ndGgpIHtcbiAgICAgIG9wdGlvbnMudXJsICs9IHBhcmFtc1ByZWZpeCArIHN0cmluZ0RhdGE7XG4gICAgICBpZiAocGFyYW1zUHJlZml4ID09PSAnPycpIHBhcmFtc1ByZWZpeCA9ICcmJztcbiAgICB9XG4gIH1cbiAgLy8gSlNPTlBcbiAgaWYgKG9wdGlvbnMuZGF0YVR5cGUgPT09ICdqc29uJyAmJiBvcHRpb25zLnVybC5pbmRleE9mKCdjYWxsYmFjaz0nKSA+PSAwKSB7XG4gICAgY29uc3QgY2FsbGJhY2tOYW1lID0gYGY3anNvbnBfJHtEYXRlLm5vdygpICsgKChqc29ucFJlcXVlc3RzICs9IDEpKX1gO1xuICAgIGxldCBhYm9ydFRpbWVvdXQ7XG4gICAgY29uc3QgY2FsbGJhY2tTcGxpdCA9IG9wdGlvbnMudXJsLnNwbGl0KCdjYWxsYmFjaz0nKTtcbiAgICBsZXQgcmVxdWVzdFVybCA9IGAke2NhbGxiYWNrU3BsaXRbMF19Y2FsbGJhY2s9JHtjYWxsYmFja05hbWV9YDtcbiAgICBpZiAoY2FsbGJhY2tTcGxpdFsxXS5pbmRleE9mKCcmJykgPj0gMCkge1xuICAgICAgY29uc3QgYWRkVmFycyA9IGNhbGxiYWNrU3BsaXRbMV0uc3BsaXQoJyYnKS5maWx0ZXIoKGVsKSA9PiBlbC5pbmRleE9mKCc9JykgPiAwKS5qb2luKCcmJyk7XG4gICAgICBpZiAoYWRkVmFycy5sZW5ndGggPiAwKSByZXF1ZXN0VXJsICs9IGAmJHthZGRWYXJzfWA7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHNjcmlwdFxuICAgIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24gb25lcnJvcigpIHtcbiAgICAgIGNsZWFyVGltZW91dChhYm9ydFRpbWVvdXQpO1xuICAgICAgZmlyZUFqYXhDYWxsYmFjayh1bmRlZmluZWQsIHVuZGVmaW5lZCwgJ2Vycm9yJywgbnVsbCwgJ3NjcmlwdGVycm9yJyk7XG4gICAgICBmaXJlQWpheENhbGxiYWNrKCdhamF4Q29tcGxldGUgYWpheDpjb21wbGV0ZScsIHsgc2NyaXB0ZXJyb3I6IHRydWUgfSwgJ2NvbXBsZXRlJywgbnVsbCwgJ3NjcmlwdGVycm9yJyk7XG4gICAgfTtcbiAgICBzY3JpcHQuc3JjID0gcmVxdWVzdFVybDtcblxuICAgIC8vIEhhbmRsZXJcbiAgICB3aW5kb3dbY2FsbGJhY2tOYW1lXSA9IGZ1bmN0aW9uIGpzb25wQ2FsbGJhY2soZGF0YSkge1xuICAgICAgY2xlYXJUaW1lb3V0KGFib3J0VGltZW91dCk7XG4gICAgICBmaXJlQWpheENhbGxiYWNrKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCAnc3VjY2VzcycsIGRhdGEpO1xuICAgICAgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgIHNjcmlwdCA9IG51bGw7XG4gICAgICBkZWxldGUgd2luZG93W2NhbGxiYWNrTmFtZV07XG4gICAgfTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuICAgIGlmIChvcHRpb25zLnRpbWVvdXQgPiAwKSB7XG4gICAgICBhYm9ydFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgZmlyZUFqYXhDYWxsYmFjayh1bmRlZmluZWQsIHVuZGVmaW5lZCwgJ2Vycm9yJywgbnVsbCwgJ3RpbWVvdXQnKTtcbiAgICAgIH0sIG9wdGlvbnMudGltZW91dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gQ2FjaGUgZm9yIEdFVC9IRUFEIHJlcXVlc3RzXG4gIGlmIChtZXRob2QgPT09ICdHRVQnIHx8IG1ldGhvZCA9PT0gJ0hFQUQnIHx8IG1ldGhvZCA9PT0gJ09QVElPTlMnIHx8IG1ldGhvZCA9PT0gJ0RFTEVURScpIHtcbiAgICBpZiAob3B0aW9ucy5jYWNoZSA9PT0gZmFsc2UpIHtcbiAgICAgIG9wdGlvbnMudXJsICs9IGAke3BhcmFtc1ByZWZpeH1fbm9jYWNoZSR7RGF0ZS5ub3coKX1gO1xuICAgIH1cbiAgfVxuXG4gIC8vIENyZWF0ZSBYSFJcbiAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgLy8gU2F2ZSBSZXF1ZXN0IFVSTFxuICB4aHIucmVxdWVzdFVybCA9IG9wdGlvbnMudXJsO1xuICB4aHIucmVxdWVzdFBhcmFtZXRlcnMgPSBvcHRpb25zO1xuXG4gIC8vIE9wZW4gWEhSXG4gIHhoci5vcGVuKG1ldGhvZCwgb3B0aW9ucy51cmwsIG9wdGlvbnMuYXN5bmMsIG9wdGlvbnMudXNlciwgb3B0aW9ucy5wYXNzd29yZCk7XG5cbiAgLy8gQ3JlYXRlIFBPU1QgRGF0YVxuICBsZXQgcG9zdERhdGEgPSBudWxsO1xuXG4gIGlmICgobWV0aG9kID09PSAnUE9TVCcgfHwgbWV0aG9kID09PSAnUFVUJyB8fCBtZXRob2QgPT09ICdQQVRDSCcpICYmIG9wdGlvbnMuZGF0YSkge1xuICAgIGlmIChvcHRpb25zLnByb2Nlc3NEYXRhKSB7XG4gICAgICBjb25zdCBwb3N0RGF0YUluc3RhbmNlcyA9IFtBcnJheUJ1ZmZlciwgQmxvYiwgRG9jdW1lbnQsIEZvcm1EYXRhXTtcbiAgICAgIC8vIFBvc3QgRGF0YVxuICAgICAgaWYgKHBvc3REYXRhSW5zdGFuY2VzLmluZGV4T2Yob3B0aW9ucy5kYXRhLmNvbnN0cnVjdG9yKSA+PSAwKSB7XG4gICAgICAgIHBvc3REYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUE9TVCBIZWFkZXJzXG4gICAgICAgIGxldCBib3VuZGFyeSA9IGAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0ke0RhdGUubm93KCkudG9TdHJpbmcoMTYpfWA7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuY29udGVudFR5cGUgPT09ICdtdWx0aXBhcnRcXC9mb3JtLWRhdGEnKSB7XG4gICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIGBtdWx0aXBhcnRcXC9mb3JtLWRhdGE7IGJvdW5kYXJ5PSR7Ym91bmRhcnl9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIG9wdGlvbnMuY29udGVudFR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHBvc3REYXRhID0gJyc7XG4gICAgICAgIGxldCBkYXRhID0gVXRpbHMuc2VyaWFsaXplT2JqZWN0KG9wdGlvbnMuZGF0YSk7XG4gICAgICAgIGlmIChvcHRpb25zLmNvbnRlbnRUeXBlID09PSAnbXVsdGlwYXJ0XFwvZm9ybS1kYXRhJykge1xuICAgICAgICAgIGJvdW5kYXJ5ID0gYC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSR7RGF0ZS5ub3coKS50b1N0cmluZygxNil9YDtcbiAgICAgICAgICBkYXRhID0gZGF0YS5zcGxpdCgnJicpO1xuICAgICAgICAgIGNvbnN0IG5ld0RhdGEgPSBbXTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIG5ld0RhdGEucHVzaCgnQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPVwiJyArIF9kYXRhW2ldLnNwbGl0KCc9JylbMF0gKyAnXCJcXHJcXG5cXHJcXG4nICsgX2RhdGFbaV0uc3BsaXQoJz0nKVsxXSArICdcXHJcXG4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcG9zdERhdGEgPSBgLS0ke2JvdW5kYXJ5fVxcclxcbiR7bmV3RGF0YS5qb2luKGAtLSR7Ym91bmRhcnl9XFxyXFxuYCl9LS0ke2JvdW5kYXJ5fS0tXFxyXFxuYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwb3N0RGF0YSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcG9zdERhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkaXRpb25hbCBoZWFkZXJzXG4gIGlmIChvcHRpb25zLmhlYWRlcnMpIHtcbiAgICBVdGlscy5lYWNoKG9wdGlvbnMuaGVhZGVycywgKGhlYWRlck5hbWUsIGhlYWRlckNhbGxiYWNrKSA9PiB7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXJOYW1lLCBoZWFkZXJDYWxsYmFjayk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBDaGVjayBmb3IgY3Jvc3NEb21haW5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmNyb3NzRG9tYWluID09PSAndW5kZWZpbmVkJykge1xuICAgIG9wdGlvbnMuY3Jvc3NEb21haW4gPSAvXihbXFx3LV0rOik/XFwvXFwvKFteXFwvXSspLy50ZXN0KG9wdGlvbnMudXJsKSAmJiBSZWdFeHAuJDIgIT09IHdpbmRvdy5sb2NhdGlvbi5ob3N0O1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLmNyb3NzRG9tYWluKSB7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCAnWE1MSHR0cFJlcXVlc3QnKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLnhockZpZWxkcykge1xuICAgIFV0aWxzLmVhY2gob3B0aW9ucy54aHJGaWVsZHMsIChmaWVsZE5hbWUsIGZpZWxkVmFsdWUpID0+IHtcbiAgICAgIHhocltmaWVsZE5hbWVdID0gZmllbGRWYWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIGxldCB4aHJUaW1lb3V0O1xuICAvLyBIYW5kbGUgWEhSXG4gIHhoci5vbmxvYWQgPSBmdW5jdGlvbiBvbmxvYWQoZSkge1xuICAgIGlmICh4aHJUaW1lb3V0KSBjbGVhclRpbWVvdXQoeGhyVGltZW91dCk7XG4gICAgaWYgKCh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB8fCB4aHIuc3RhdHVzID09PSAwKSB7XG4gICAgICBsZXQgcmVzcG9uc2VEYXRhO1xuICAgICAgaWYgKG9wdGlvbnMuZGF0YVR5cGUgPT09ICdqc29uJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlc3BvbnNlRGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgZmlyZUFqYXhDYWxsYmFjaygnYWpheFN1Y2Nlc3MgYWpheDpzdWNjZXNzJywgeyB4aHIgfSwgJ3N1Y2Nlc3MnLCByZXNwb25zZURhdGEsIHhoci5zdGF0dXMsIHhocik7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGZpcmVBamF4Q2FsbGJhY2soJ2FqYXhFcnJvciBhamF4OmVycm9yJywgeyB4aHIsIHBhcnNlZXJyb3I6IHRydWUgfSwgJ2Vycm9yJywgeGhyLCAncGFyc2VlcnJvcicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNwb25zZURhdGEgPSB4aHIucmVzcG9uc2VUeXBlID09PSAndGV4dCcgfHwgeGhyLnJlc3BvbnNlVHlwZSA9PT0gJycgPyB4aHIucmVzcG9uc2VUZXh0IDogeGhyLnJlc3BvbnNlO1xuICAgICAgICBmaXJlQWpheENhbGxiYWNrKCdhamF4U3VjY2VzcyBhamF4OnN1Y2Nlc3MnLCB7IHhociB9LCAnc3VjY2VzcycsIHJlc3BvbnNlRGF0YSwgeGhyLnN0YXR1cywgeGhyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZmlyZUFqYXhDYWxsYmFjaygnYWpheEVycm9yIGFqYXg6ZXJyb3InLCB7IHhociB9LCAnZXJyb3InLCB4aHIsIHhoci5zdGF0dXMpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zdGF0dXNDb2RlKSB7XG4gICAgICBpZiAoZ2xvYmFscy5zdGF0dXNDb2RlICYmIGdsb2JhbHMuc3RhdHVzQ29kZVt4aHIuc3RhdHVzXSkgZ2xvYmFscy5zdGF0dXNDb2RlW3hoci5zdGF0dXNdKHhocik7XG4gICAgICBpZiAob3B0aW9ucy5zdGF0dXNDb2RlW3hoci5zdGF0dXNdKSBvcHRpb25zLnN0YXR1c0NvZGVbeGhyLnN0YXR1c10oeGhyKTtcbiAgICB9XG4gICAgZmlyZUFqYXhDYWxsYmFjaygnYWpheENvbXBsZXRlIGFqYXg6Y29tcGxldGUnLCB7IHhociB9LCAnY29tcGxldGUnLCB4aHIsIHhoci5zdGF0dXMpO1xuICB9O1xuXG4gIHhoci5vbmVycm9yID0gZnVuY3Rpb24gb25lcnJvcihlKSB7XG4gICAgaWYgKHhoclRpbWVvdXQpIGNsZWFyVGltZW91dCh4aHJUaW1lb3V0KTtcbiAgICBmaXJlQWpheENhbGxiYWNrKCdhamF4RXJyb3IgYWpheDplcnJvcicsIHsgeGhyIH0sICdlcnJvcicsIHhociwgeGhyLnN0YXR1cyk7XG4gICAgZmlyZUFqYXhDYWxsYmFjaygnYWpheENvbXBsZXRlIGFqYXg6Y29tcGxldGUnLCB7IHhociwgZXJyb3I6IHRydWUgfSwgJ2NvbXBsZXRlJywgeGhyLCAnZXJyb3InKTtcbiAgfTtcblxuICAvLyBBamF4IHN0YXJ0IGNhbGxiYWNrXG4gIGZpcmVBamF4Q2FsbGJhY2soJ2FqYXhTdGFydCBhamF4OnN0YXJ0JywgeyB4aHIgfSwgJ3N0YXJ0JywgeGhyKTtcbiAgZmlyZUFqYXhDYWxsYmFjayh1bmRlZmluZWQsIHVuZGVmaW5lZCwgJ2JlZm9yZVNlbmQnLCB4aHIpO1xuXG4gIC8vIFRpbWVvdXRcbiAgaWYgKG9wdGlvbnMudGltZW91dCA+IDApIHtcbiAgICB4aHIub25hYm9ydCA9IGZ1bmN0aW9uIG9uYWJvcnQoKSB7XG4gICAgICBpZiAoeGhyVGltZW91dCkgY2xlYXJUaW1lb3V0KHhoclRpbWVvdXQpO1xuICAgIH07XG4gICAgeGhyVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgeGhyLmFib3J0KCk7XG4gICAgICBmaXJlQWpheENhbGxiYWNrKCdhamF4RXJyb3IgYWpheDplcnJvcicsIHsgeGhyLCB0aW1lb3V0OiB0cnVlIH0sICdlcnJvcicsIHhociwgJ3RpbWVvdXQnKTtcbiAgICAgIGZpcmVBamF4Q2FsbGJhY2soJ2FqYXhDb21wbGV0ZSBhamF4OmNvbXBsZXRlJywgeyB4aHIsIHRpbWVvdXQ6IHRydWUgfSwgJ2NvbXBsZXRlJywgeGhyLCAndGltZW91dCcpO1xuICAgIH0sIG9wdGlvbnMudGltZW91dCk7XG4gIH1cblxuICAvLyBTZW5kIFhIUlxuICB4aHIuc2VuZChwb3N0RGF0YSk7XG5cbiAgLy8gUmV0dXJuIFhIUiBvYmplY3RcbiAgcmV0dXJuIHhocjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQWpheDtcbiIsImltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgU2Nyb2xsID0ge1xuICBzY3JvbGxUbyhsZWZ0LCB0b3AsIGR1cmF0aW9uLCBlYXNpbmcgPSAnc3dpbmcnLCBjYWxsYmFjaykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0ICYmIHR5cGVvZiBlYXNpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gZWFzaW5nO1xuICAgICAgZWFzaW5nID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gICAgICBjb25zdCBlbCA9IHRoaXM7XG4gICAgICBsZXQgY3VycmVudFRvcDtcbiAgICAgIGxldCBjdXJyZW50TGVmdDtcbiAgICAgIGxldCBtYXhUb3A7XG4gICAgICBsZXQgbWF4TGVmdDtcbiAgICAgIGxldCBuZXdUb3A7XG4gICAgICBsZXQgbmV3TGVmdDtcbiAgICAgIGxldCBzY3JvbGxUb3A7XG4gICAgICBsZXQgc2Nyb2xsTGVmdDtcbiAgICAgIGxldCBhbmltYXRlVG9wID0gdG9wID4gMCB8fCB0b3AgPT09IDA7XG4gICAgICBsZXQgYW5pbWF0ZUxlZnQgPSBsZWZ0ID4gMCB8fCBsZWZ0ID09PSAwO1xuICAgICAgaWYgKHR5cGVvZiBlYXNpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGVhc2luZyA9ICdzd2luZyc7XG4gICAgICB9XG4gICAgICBpZiAoYW5pbWF0ZVRvcCkge1xuICAgICAgICBjdXJyZW50VG9wID0gZWwuc2Nyb2xsVG9wO1xuICAgICAgICBpZiAoIWR1cmF0aW9uKSB7XG4gICAgICAgICAgZWwuc2Nyb2xsVG9wID0gdG9wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYW5pbWF0ZUxlZnQpIHtcbiAgICAgICAgY3VycmVudExlZnQgPSBlbC5zY3JvbGxMZWZ0O1xuICAgICAgICBpZiAoIWR1cmF0aW9uKSB7XG4gICAgICAgICAgZWwuc2Nyb2xsTGVmdCA9IGxlZnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZHVyYXRpb24pIHJldHVybjtcbiAgICAgIGlmIChhbmltYXRlVG9wKSB7XG4gICAgICAgIG1heFRvcCA9IGVsLnNjcm9sbEhlaWdodCAtIGVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgbmV3VG9wID0gTWF0aC5tYXgoTWF0aC5taW4odG9wLCBtYXhUb3ApLCAwKTtcbiAgICAgIH1cbiAgICAgIGlmIChhbmltYXRlTGVmdCkge1xuICAgICAgICBtYXhMZWZ0ID0gZWwuc2Nyb2xsV2lkdGggLSBlbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgbmV3TGVmdCA9IE1hdGgubWF4KE1hdGgubWluKGxlZnQsIG1heExlZnQpLCAwKTtcbiAgICAgIH1cbiAgICAgIGxldCBzdGFydFRpbWUgPSBudWxsO1xuICAgICAgaWYgKGFuaW1hdGVUb3AgJiYgbmV3VG9wID09PSBjdXJyZW50VG9wKSBhbmltYXRlVG9wID0gZmFsc2U7XG4gICAgICBpZiAoYW5pbWF0ZUxlZnQgJiYgbmV3TGVmdCA9PT0gY3VycmVudExlZnQpIGFuaW1hdGVMZWZ0ID0gZmFsc2U7XG4gICAgICBmdW5jdGlvbiByZW5kZXIodGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpKSB7XG4gICAgICAgIGlmIChzdGFydFRpbWUgPT09IG51bGwpIHtcbiAgICAgICAgICBzdGFydFRpbWUgPSB0aW1lO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb2dyZXNzID0gTWF0aC5tYXgoTWF0aC5taW4oKHRpbWUgLSBzdGFydFRpbWUpIC8gZHVyYXRpb24sIDEpLCAwKTtcbiAgICAgICAgY29uc3QgZWFzZVByb2dyZXNzID0gZWFzaW5nID09PSAnbGluZWFyJyA/IHByb2dyZXNzIDogKDAuNSAtIChNYXRoLmNvcyhwcm9ncmVzcyAqIE1hdGguUEkpIC8gMikpO1xuICAgICAgICBsZXQgZG9uZTtcbiAgICAgICAgaWYgKGFuaW1hdGVUb3ApIHNjcm9sbFRvcCA9IGN1cnJlbnRUb3AgKyAoZWFzZVByb2dyZXNzICogKG5ld1RvcCAtIGN1cnJlbnRUb3ApKTtcbiAgICAgICAgaWYgKGFuaW1hdGVMZWZ0KSBzY3JvbGxMZWZ0ID0gY3VycmVudExlZnQgKyAoZWFzZVByb2dyZXNzICogKG5ld0xlZnQgLSBjdXJyZW50TGVmdCkpO1xuICAgICAgICBpZiAoYW5pbWF0ZVRvcCAmJiBuZXdUb3AgPiBjdXJyZW50VG9wICYmIHNjcm9sbFRvcCA+PSBuZXdUb3ApIHtcbiAgICAgICAgICBlbC5zY3JvbGxUb3AgPSBuZXdUb3A7XG4gICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFuaW1hdGVUb3AgJiYgbmV3VG9wIDwgY3VycmVudFRvcCAmJiBzY3JvbGxUb3AgPD0gbmV3VG9wKSB7XG4gICAgICAgICAgZWwuc2Nyb2xsVG9wID0gbmV3VG9wO1xuICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbmltYXRlTGVmdCAmJiBuZXdMZWZ0ID4gY3VycmVudExlZnQgJiYgc2Nyb2xsTGVmdCA+PSBuZXdMZWZ0KSB7XG4gICAgICAgICAgZWwuc2Nyb2xsTGVmdCA9IG5ld0xlZnQ7XG4gICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFuaW1hdGVMZWZ0ICYmIG5ld0xlZnQgPCBjdXJyZW50TGVmdCAmJiBzY3JvbGxMZWZ0IDw9IG5ld0xlZnQpIHtcbiAgICAgICAgICBlbC5zY3JvbGxMZWZ0ID0gbmV3TGVmdDtcbiAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYW5pbWF0ZVRvcCkgZWwuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgICBpZiAoYW5pbWF0ZUxlZnQpIGVsLnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xuICAgICAgICBVdGlscy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgIH1cbiAgICAgIFV0aWxzLnJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgIH0pO1xuICB9LFxuICBzY3JvbGxUb3AodG9wLCBkdXJhdGlvbiwgZWFzaW5nLCBjYWxsYmFjaykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIHR5cGVvZiBlYXNpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gZWFzaW5nO1xuICAgICAgZWFzaW5nID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCBkb20gPSB0aGlzO1xuICAgIGlmICh0eXBlb2YgdG9wID09PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKGRvbS5sZW5ndGggPiAwKSByZXR1cm4gZG9tWzBdLnNjcm9sbFRvcDtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZG9tLnNjcm9sbFRvKHVuZGVmaW5lZCwgdG9wLCBkdXJhdGlvbiwgZWFzaW5nLCBjYWxsYmFjayk7XG4gIH0sXG4gIHNjcm9sbExlZnQobGVmdCwgZHVyYXRpb24sIGVhc2luZywgY2FsbGJhY2spIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyAmJiB0eXBlb2YgZWFzaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWxsYmFjayA9IGVhc2luZztcbiAgICAgIGVhc2luZyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgZG9tID0gdGhpcztcbiAgICBpZiAodHlwZW9mIGxlZnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAoZG9tLmxlbmd0aCA+IDApIHJldHVybiBkb21bMF0uc2Nyb2xsTGVmdDtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZG9tLnNjcm9sbFRvKGxlZnQsIHVuZGVmaW5lZCwgZHVyYXRpb24sIGVhc2luZywgY2FsbGJhY2spO1xuICB9LFxufTtcbmV4cG9ydCBkZWZhdWx0IFNjcm9sbDtcbiIsImltcG9ydCBEb203IGZyb20gJy4vZG9tNy1jbGFzcyc7XG5pbXBvcnQgJCBmcm9tICcuLyQnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBNZXRob2RzID0ge1xuICAvLyBDbGFzc2VzIGFuZCBhdHRyaWJ1dGVzXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNvbnN0IGNsYXNzZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXNbal0uY2xhc3NMaXN0ICE9PSAndW5kZWZpbmVkJykgdGhpc1tqXS5jbGFzc0xpc3QuYWRkKGNsYXNzZXNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpc1tqXS5jbGFzc0xpc3QgIT09ICd1bmRlZmluZWQnKSB0aGlzW2pdLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBoYXNDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBpZiAoIXRoaXNbMF0pIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdGhpc1swXS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgfSxcbiAgdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpc1tqXS5jbGFzc0xpc3QgIT09ICd1bmRlZmluZWQnKSB0aGlzW2pdLmNsYXNzTGlzdC50b2dnbGUoY2xhc3Nlc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBhdHRyKGF0dHJzLCB2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhdHRycyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIEdldCBhdHRyXG4gICAgICBpZiAodGhpc1swXSkgcmV0dXJuIHRoaXNbMF0uZ2V0QXR0cmlidXRlKGF0dHJzKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLy8gU2V0IGF0dHJzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAvLyBTdHJpbmdcbiAgICAgICAgdGhpc1tpXS5zZXRBdHRyaWJ1dGUoYXR0cnMsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE9iamVjdFxuICAgICAgICBmb3IgKGNvbnN0IGF0dHJOYW1lIGluIGF0dHJzKSB7XG4gICAgICAgICAgdGhpc1tpXVthdHRyTmFtZV0gPSBhdHRyc1thdHRyTmFtZV07XG4gICAgICAgICAgdGhpc1tpXS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJzW2F0dHJOYW1lXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHJlbW92ZUF0dHIoYXR0cikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdGhpc1tpXS5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBwcm9wKHByb3BzLCB2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBwcm9wcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIEdldCBwcm9wXG4gICAgICBpZiAodGhpc1swXSkgcmV0dXJuIHRoaXNbMF1bcHJvcHNdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTZXQgcHJvcHNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIC8vIFN0cmluZ1xuICAgICAgICAgIHRoaXNbaV1bcHJvcHNdID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT2JqZWN0XG4gICAgICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBwcm9wcykge1xuICAgICAgICAgICAgdGhpc1tpXVtwcm9wTmFtZV0gPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sXG4gIGRhdGEoa2V5LCB2YWx1ZSkge1xuICAgIGxldCBlbDtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZWwgPSB0aGlzWzBdO1xuICAgICAgLy8gR2V0IHZhbHVlXG4gICAgICBpZiAoZWwpIHtcbiAgICAgICAgaWYgKGVsLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2UgJiYgKGtleSBpbiBlbC5kb203RWxlbWVudERhdGFTdG9yYWdlKSkge1xuICAgICAgICAgIHJldHVybiBlbC5kb203RWxlbWVudERhdGFTdG9yYWdlW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkYXRhS2V5ID0gZWwuZ2V0QXR0cmlidXRlKGBkYXRhLSR7a2V5fWApO1xuICAgICAgICBpZiAoZGF0YUtleSkge1xuICAgICAgICAgIHJldHVybiBkYXRhS2V5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIFNldCB2YWx1ZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgZWwgPSB0aGlzW2ldO1xuICAgICAgaWYgKCFlbC5kb203RWxlbWVudERhdGFTdG9yYWdlKSBlbC5kb203RWxlbWVudERhdGFTdG9yYWdlID0ge307XG4gICAgICBlbC5kb203RWxlbWVudERhdGFTdG9yYWdlW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHJlbW92ZURhdGEoa2V5KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBlbCA9IHRoaXNbaV07XG4gICAgICBpZiAoZWwuZG9tN0VsZW1lbnREYXRhU3RvcmFnZSAmJiBlbC5kb203RWxlbWVudERhdGFTdG9yYWdlW2tleV0pIHtcbiAgICAgICAgZWwuZG9tN0VsZW1lbnREYXRhU3RvcmFnZVtrZXldID0gbnVsbDtcbiAgICAgICAgZGVsZXRlIGVsLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGRhdGFzZXQoKSB7XG4gICAgY29uc3QgZWwgPSB0aGlzWzBdO1xuICAgIGlmICghZWwpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgZGF0YXNldCA9IHt9O1xuICAgIGlmIChlbC5kYXRhc2V0KSB7XG4gICAgICBmb3IgKGNvbnN0IGRhdGFLZXkgaW4gZWwuZGF0YXNldCkge1xuICAgICAgICBkYXRhc2V0W2RhdGFLZXldID0gZWwuZGF0YXNldFtkYXRhS2V5XTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGF0dHIgPSBlbC5hdHRyaWJ1dGVzW2ldO1xuICAgICAgICBpZiAoYXR0ci5uYW1lLmluZGV4T2YoJ2RhdGEtJykgPj0gMCkge1xuICAgICAgICAgIGRhdGFzZXRbVXRpbHMudG9DYW1lbENhc2UoYXR0ci5uYW1lLnNwbGl0KCdkYXRhLScpWzFdKV0gPSBhdHRyLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGFzZXQpIHtcbiAgICAgIGlmIChkYXRhc2V0W2tleV0gPT09ICdmYWxzZScpIGRhdGFzZXRba2V5XSA9IGZhbHNlO1xuICAgICAgZWxzZSBpZiAoZGF0YXNldFtrZXldID09PSAndHJ1ZScpIGRhdGFzZXRba2V5XSA9IHRydWU7XG4gICAgICBlbHNlIGlmIChwYXJzZUZsb2F0KGRhdGFzZXRba2V5XSkgPT09IGRhdGFzZXRba2V5XSAqIDEpIGRhdGFzZXRba2V5XSAqPSAxO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YXNldDtcbiAgfSxcbiAgdmFsKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmICh0aGlzWzBdKSB7XG4gICAgICAgIGlmICh0aGlzWzBdLm11bHRpcGxlICYmIHRoaXNbMF0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXNbMF0uc2VsZWN0ZWRPcHRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YWx1ZXMucHVzaCh0aGlzWzBdLnNlbGVjdGVkT3B0aW9uc1tpXS52YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNbMF0udmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdGhpc1tpXS52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgLy8gVHJhbnNmb3Jtc1xuICB0cmFuc2Zvcm0odHJhbnNmb3JtKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBlbFN0eWxlID0gdGhpc1tpXS5zdHlsZTtcbiAgICAgIGVsU3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgICAgZWxTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICB0cmFuc2l0aW9uKGR1cmF0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiBkdXJhdGlvbiAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGR1cmF0aW9uID0gYCR7ZHVyYXRpb259bXNgO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGVsU3R5bGUgPSB0aGlzW2ldLnN0eWxlO1xuICAgICAgZWxTdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgIGVsU3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICAvLyBFdmVudHNcbiAgb24oZXZlbnROYW1lLCB0YXJnZXRTZWxlY3RvciwgbGlzdGVuZXIsIGNhcHR1cmUpIHtcbiAgICBmdW5jdGlvbiBoYW5kbGVMaXZlRXZlbnQoZSkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICBpZiAoJCh0YXJnZXQpLmlzKHRhcmdldFNlbGVjdG9yKSkgbGlzdGVuZXIuY2FsbCh0YXJnZXQsIGUpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhcmVudHMgPSAkKHRhcmdldCkucGFyZW50cygpO1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHBhcmVudHMubGVuZ3RoOyBrICs9IDEpIHtcbiAgICAgICAgICBpZiAoJChwYXJlbnRzW2tdKS5pcyh0YXJnZXRTZWxlY3RvcikpIGxpc3RlbmVyLmNhbGwocGFyZW50c1trXSwgZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgZXZlbnRzID0gZXZlbnROYW1lLnNwbGl0KCcgJyk7XG4gICAgbGV0IGo7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodHlwZW9mIHRhcmdldFNlbGVjdG9yID09PSAnZnVuY3Rpb24nIHx8IHRhcmdldFNlbGVjdG9yID09PSBmYWxzZSkge1xuICAgICAgICAvLyBVc3VhbCBldmVudHNcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRTZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGxpc3RlbmVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgIGNhcHR1cmUgPSBhcmd1bWVudHNbMl0gfHwgZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChqID0gMDsgaiA8IGV2ZW50cy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIHRoaXNbaV0uYWRkRXZlbnRMaXN0ZW5lcihldmVudHNbal0sIGxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTGl2ZSBldmVudHNcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IGV2ZW50cy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIGlmICghdGhpc1tpXS5kb203TGl2ZUxpc3RlbmVycykgdGhpc1tpXS5kb203TGl2ZUxpc3RlbmVycyA9IFtdO1xuICAgICAgICAgIHRoaXNbaV0uZG9tN0xpdmVMaXN0ZW5lcnMucHVzaCh7IGxpc3RlbmVyLCBsaXZlTGlzdGVuZXI6IGhhbmRsZUxpdmVFdmVudCB9KTtcbiAgICAgICAgICB0aGlzW2ldLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzW2pdLCBoYW5kbGVMaXZlRXZlbnQsIGNhcHR1cmUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIG9mZihldmVudE5hbWUsIHRhcmdldFNlbGVjdG9yLCBsaXN0ZW5lciwgY2FwdHVyZSkge1xuICAgIGNvbnN0IGV2ZW50cyA9IGV2ZW50TmFtZS5zcGxpdCgnICcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRTZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJyB8fCB0YXJnZXRTZWxlY3RvciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAvLyBVc3VhbCBldmVudHNcbiAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBsaXN0ZW5lciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgIGNhcHR1cmUgPSBhcmd1bWVudHNbMl0gfHwgZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXNbal0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHNbaV0sIGxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzW2pdLmRvbTdMaXZlTGlzdGVuZXJzKSB7XG4gICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzW2pdLmRvbTdMaXZlTGlzdGVuZXJzLmxlbmd0aDsgayArPSAxKSB7XG4gICAgICAgICAgICBpZiAodGhpc1tqXS5kb203TGl2ZUxpc3RlbmVyc1trXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgdGhpc1tqXS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50c1tpXSwgdGhpc1tqXS5kb203TGl2ZUxpc3RlbmVyc1trXS5saXZlTGlzdGVuZXIsIGNhcHR1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgb25jZShldmVudE5hbWUsIHRhcmdldFNlbGVjdG9yLCBsaXN0ZW5lciwgY2FwdHVyZSkge1xuICAgIGNvbnN0IGRvbSA9IHRoaXM7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXRTZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbGlzdGVuZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBjYXB0dXJlID0gYXJndW1lbnRzWzJdO1xuICAgICAgdGFyZ2V0U2VsZWN0b3IgPSBmYWxzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcHJveHkoZSkge1xuICAgICAgbGlzdGVuZXIuY2FsbChlLnRhcmdldCwgZSk7XG4gICAgICBkb20ub2ZmKGV2ZW50TmFtZSwgdGFyZ2V0U2VsZWN0b3IsIHByb3h5LCBjYXB0dXJlKTtcbiAgICB9XG4gICAgcmV0dXJuIGRvbS5vbihldmVudE5hbWUsIHRhcmdldFNlbGVjdG9yLCBwcm94eSwgY2FwdHVyZSk7XG4gIH0sXG4gIHRyaWdnZXIoZXZlbnROYW1lLCBldmVudERhdGEpIHtcbiAgICBjb25zdCBldmVudHMgPSBldmVudE5hbWUuc3BsaXQoJyAnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGxldCBldnQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50c1tpXSwgeyBkZXRhaWw6IGV2ZW50RGF0YSwgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZSB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICAgIGV2dC5pbml0RXZlbnQoZXZlbnRzW2ldLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBldnQuZGV0YWlsID0gZXZlbnREYXRhO1xuICAgICAgICB9XG4gICAgICAgIHRoaXNbal0uZGlzcGF0Y2hFdmVudChldnQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgdHJhbnNpdGlvbkVuZChjYWxsYmFjaykge1xuICAgIGNvbnN0IGV2ZW50cyA9IFsnd2Via2l0VHJhbnNpdGlvbkVuZCcsICd0cmFuc2l0aW9uZW5kJ107XG4gICAgY29uc3QgZG9tID0gdGhpcztcbiAgICBsZXQgaTtcbiAgICBmdW5jdGlvbiBmaXJlQ2FsbEJhY2soZSkge1xuICAgICAgICAgIC8qIGpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKSByZXR1cm47XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGUpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBkb20ub2ZmKGV2ZW50c1tpXSwgZmlyZUNhbGxCYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGRvbS5vbihldmVudHNbaV0sIGZpcmVDYWxsQmFjayk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBhbmltYXRpb25FbmQoY2FsbGJhY2spIHtcbiAgICBjb25zdCBldmVudHMgPSBbJ3dlYmtpdEFuaW1hdGlvbkVuZCcsICdhbmltYXRpb25lbmQnXTtcbiAgICBjb25zdCBkb20gPSB0aGlzO1xuICAgIGxldCBpO1xuICAgIGZ1bmN0aW9uIGZpcmVDYWxsQmFjayhlKSB7XG4gICAgICBjYWxsYmFjayhlKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgZG9tLm9mZihldmVudHNbaV0sIGZpcmVDYWxsQmFjayk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgZm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBkb20ub24oZXZlbnRzW2ldLCBmaXJlQ2FsbEJhY2spO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgLy8gU2l6aW5nL1N0eWxlc1xuICB3aWR0aCgpIHtcbiAgICBpZiAodGhpc1swXSA9PT0gd2luZG93KSB7XG4gICAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy5jc3MoJ3dpZHRoJykpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBvdXRlcldpZHRoKGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuc3R5bGVzKCk7XG4gICAgICAgIHJldHVybiB0aGlzWzBdLm9mZnNldFdpZHRoICsgcGFyc2VGbG9hdChzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLXJpZ2h0JykpICsgcGFyc2VGbG9hdChzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLWxlZnQnKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRXaWR0aDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIGhlaWdodCgpIHtcbiAgICBpZiAodGhpc1swXSA9PT0gd2luZG93KSB7XG4gICAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KHRoaXMuY3NzKCdoZWlnaHQnKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIG91dGVySGVpZ2h0KGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHRoaXMuc3R5bGVzKCk7XG4gICAgICAgIHJldHVybiB0aGlzWzBdLm9mZnNldEhlaWdodCArIHBhcnNlRmxvYXQoc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi10b3AnKSkgKyBwYXJzZUZsb2F0KHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tYm90dG9tJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgb2Zmc2V0KCkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpc1swXTtcbiAgICAgIGNvbnN0IGJveCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgICBjb25zdCBjbGllbnRUb3AgPSBlbC5jbGllbnRUb3AgfHwgYm9keS5jbGllbnRUb3AgfHwgMDtcbiAgICAgIGNvbnN0IGNsaWVudExlZnQgPSBlbC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xuICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gZWwgPT09IHdpbmRvdyA/IHdpbmRvdy5zY3JvbGxZIDogZWwuc2Nyb2xsVG9wO1xuICAgICAgY29uc3Qgc2Nyb2xsTGVmdCA9IGVsID09PSB3aW5kb3cgPyB3aW5kb3cuc2Nyb2xsWCA6IGVsLnNjcm9sbExlZnQ7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IChib3gudG9wICsgc2Nyb2xsVG9wKSAtIGNsaWVudFRvcCxcbiAgICAgICAgbGVmdDogKGJveC5sZWZ0ICsgc2Nyb2xsTGVmdCkgLSBjbGllbnRMZWZ0LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgaGlkZSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHRoaXNbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHNob3coKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB0aGlzW2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgc3R5bGVzKCkge1xuICAgIGlmICh0aGlzWzBdKSByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpc1swXSwgbnVsbCk7XG4gIH0sXG4gIGNzcyhwcm9wcywgdmFsdWUpIHtcbiAgICBsZXQgaTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgaWYgKHR5cGVvZiBwcm9wcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHRoaXNbMF0pIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzWzBdLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBwcm9wcykge1xuICAgICAgICAgICAgdGhpc1tpXS5zdHlsZVtwcm9wXSA9IHByb3BzW3Byb3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIHByb3BzID09PSAnc3RyaW5nJykge1xuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpc1tpXS5zdHlsZVtwcm9wc10gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICAvLyBEb20gbWFuaXB1bGF0aW9uXG4gIC8vIEl0ZXJhdGUgb3ZlciB0aGUgY29sbGVjdGlvbiBwYXNzaW5nIGVsZW1lbnRzIHRvIGBjYWxsYmFja2BcbiAgZWFjaChjYWxsYmFjaykge1xuICAgIC8vIERvbid0IGJvdGhlciBjb250aW51aW5nIHdpdGhvdXQgYSBjYWxsYmFja1xuICAgIGlmICghY2FsbGJhY2spIHJldHVybiB0aGlzO1xuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUgY3VycmVudCBjb2xsZWN0aW9uXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAvLyBJZiB0aGUgY2FsbGJhY2sgcmV0dXJucyBmYWxzZVxuICAgICAgaWYgKGNhbGxiYWNrLmNhbGwodGhpc1tpXSwgaSwgdGhpc1tpXSkgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIEVuZCB0aGUgbG9vcCBlYXJseVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIGB0aGlzYCB0byBhbGxvdyBjaGFpbmVkIERPTSBvcGVyYXRpb25zXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGZpbHRlcihjYWxsYmFjaykge1xuICAgIGNvbnN0IG1hdGNoZWRJdGVtcyA9IFtdO1xuICAgIGNvbnN0IGRvbSA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb20ubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChjYWxsYmFjay5jYWxsKGRvbVtpXSwgaSwgZG9tW2ldKSkgbWF0Y2hlZEl0ZW1zLnB1c2goZG9tW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEb203KG1hdGNoZWRJdGVtcyk7XG4gIH0sXG4gIGh0bWwoaHRtbCkge1xuICAgIGlmICh0eXBlb2YgaHRtbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0aGlzWzBdID8gdGhpc1swXS5pbm5lckhUTUwgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB0aGlzW2ldLmlubmVySFRNTCA9IGh0bWw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICB0ZXh0KHRleHQpIHtcbiAgICBpZiAodHlwZW9mIHRleHQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAodGhpc1swXSkge1xuICAgICAgICByZXR1cm4gdGhpc1swXS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHRoaXNbaV0udGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgaXMoc2VsZWN0b3IpIHtcbiAgICBjb25zdCBlbCA9IHRoaXNbMF07XG4gICAgbGV0IGNvbXBhcmVXaXRoO1xuICAgIGxldCBpO1xuICAgIGlmICghZWwgfHwgdHlwZW9mIHNlbGVjdG9yID09PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoZWwubWF0Y2hlcykgcmV0dXJuIGVsLm1hdGNoZXMoc2VsZWN0b3IpO1xuICAgICAgZWxzZSBpZiAoZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yKSByZXR1cm4gZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgIGVsc2UgaWYgKGVsLm1zTWF0Y2hlc1NlbGVjdG9yKSByZXR1cm4gZWwubXNNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgICBjb21wYXJlV2l0aCA9ICQoc2VsZWN0b3IpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGNvbXBhcmVXaXRoLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChjb21wYXJlV2l0aFtpXSA9PT0gZWwpIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoc2VsZWN0b3IgPT09IGRvY3VtZW50KSByZXR1cm4gZWwgPT09IGRvY3VtZW50O1xuICAgIGVsc2UgaWYgKHNlbGVjdG9yID09PSB3aW5kb3cpIHJldHVybiBlbCA9PT0gd2luZG93O1xuXG4gICAgaWYgKHNlbGVjdG9yLm5vZGVUeXBlIHx8IHNlbGVjdG9yIGluc3RhbmNlb2YgRG9tNykge1xuICAgICAgY29tcGFyZVdpdGggPSBzZWxlY3Rvci5ub2RlVHlwZSA/IFtzZWxlY3Rvcl0gOiBzZWxlY3RvcjtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBjb21wYXJlV2l0aC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoY29tcGFyZVdpdGhbaV0gPT09IGVsKSByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuICBpbmRleE9mKGVsKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodGhpc1tpXSA9PT0gZWwpIHJldHVybiBpO1xuICAgIH1cbiAgfSxcbiAgaW5kZXgoKSB7XG4gICAgbGV0IGNoaWxkID0gdGhpc1swXTtcbiAgICBsZXQgaTtcbiAgICBpZiAoY2hpbGQpIHtcbiAgICAgIGkgPSAwO1xuICAgICAgd2hpbGUgKChjaGlsZCA9IGNoaWxkLnByZXZpb3VzU2libGluZykgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSAxKSBpICs9IDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH0sXG4gIGVxKGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiB0aGlzO1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICAgIGxldCByZXR1cm5JbmRleDtcbiAgICBpZiAoaW5kZXggPiBsZW5ndGggLSAxKSB7XG4gICAgICByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgIH1cbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICByZXR1cm5JbmRleCA9IGxlbmd0aCArIGluZGV4O1xuICAgICAgaWYgKHJldHVybkluZGV4IDwgMCkgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICAgIHJldHVybiBuZXcgRG9tNyhbdGhpc1tyZXR1cm5JbmRleF1dKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEb203KFt0aGlzW2luZGV4XV0pO1xuICB9LFxuICBhcHBlbmQoLi4uYXJncykge1xuICAgIGxldCBuZXdDaGlsZDtcblxuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgYXJncy5sZW5ndGg7IGsgKz0gMSkge1xuICAgICAgbmV3Q2hpbGQgPSBhcmdzW2tdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmV3Q2hpbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29uc3QgdGVtcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gbmV3Q2hpbGQ7XG4gICAgICAgICAgd2hpbGUgKHRlbXBEaXYuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpc1tpXS5hcHBlbmRDaGlsZCh0ZW1wRGl2LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChuZXdDaGlsZCBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5ld0NoaWxkLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICB0aGlzW2ldLmFwcGVuZENoaWxkKG5ld0NoaWxkW2pdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpc1tpXS5hcHBlbmRDaGlsZChuZXdDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgYXBwZW5kVG8ocGFyZW50KSB7XG4gICAgJChwYXJlbnQpLmFwcGVuZCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgcHJlcGVuZChuZXdDaGlsZCkge1xuICAgIGxldCBpO1xuICAgIGxldCBqO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodHlwZW9mIG5ld0NoaWxkID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gbmV3Q2hpbGQ7XG4gICAgICAgIGZvciAoaiA9IHRlbXBEaXYuY2hpbGROb2Rlcy5sZW5ndGggLSAxOyBqID49IDA7IGogLT0gMSkge1xuICAgICAgICAgIHRoaXNbaV0uaW5zZXJ0QmVmb3JlKHRlbXBEaXYuY2hpbGROb2Rlc1tqXSwgdGhpc1tpXS5jaGlsZE5vZGVzWzBdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuZXdDaGlsZCBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IG5ld0NoaWxkLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgdGhpc1tpXS5pbnNlcnRCZWZvcmUobmV3Q2hpbGRbal0sIHRoaXNbaV0uY2hpbGROb2Rlc1swXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXNbaV0uaW5zZXJ0QmVmb3JlKG5ld0NoaWxkLCB0aGlzW2ldLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgcHJlcGVuZFRvKHBhcmVudCkge1xuICAgICQocGFyZW50KS5wcmVwZW5kKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBpbnNlcnRCZWZvcmUoc2VsZWN0b3IpIHtcbiAgICBjb25zdCBiZWZvcmUgPSAkKHNlbGVjdG9yKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChiZWZvcmUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGJlZm9yZVswXS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzW2ldLCBiZWZvcmVbMF0pO1xuICAgICAgfSBlbHNlIGlmIChiZWZvcmUubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJlZm9yZS5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIGJlZm9yZVtqXS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzW2ldLmNsb25lTm9kZSh0cnVlKSwgYmVmb3JlW2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgaW5zZXJ0QWZ0ZXIoc2VsZWN0b3IpIHtcbiAgICBjb25zdCBhZnRlciA9ICQoc2VsZWN0b3IpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGFmdGVyLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBhZnRlclswXS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzW2ldLCBhZnRlclswXS5uZXh0U2libGluZyk7XG4gICAgICB9IGVsc2UgaWYgKGFmdGVyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhZnRlci5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgIGFmdGVyW2pdLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXNbaV0uY2xvbmVOb2RlKHRydWUpLCBhZnRlcltqXS5uZXh0U2libGluZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIG5leHQoc2VsZWN0b3IpIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKHRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nICYmICQodGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmcpLmlzKHNlbGVjdG9yKSkgcmV0dXJuIG5ldyBEb203KFt0aGlzWzBdLm5leHRFbGVtZW50U2libGluZ10pO1xuICAgICAgICByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmcpIHJldHVybiBuZXcgRG9tNyhbdGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmddKTtcbiAgICAgIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gIH0sXG4gIG5leHRBbGwoc2VsZWN0b3IpIHtcbiAgICBjb25zdCBuZXh0RWxzID0gW107XG4gICAgbGV0IGVsID0gdGhpc1swXTtcbiAgICBpZiAoIWVsKSByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgIHdoaWxlIChlbC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgIGNvbnN0IG5leHQgPSBlbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKCQobmV4dCkuaXMoc2VsZWN0b3IpKSBuZXh0RWxzLnB1c2gobmV4dCk7XG4gICAgICB9IGVsc2UgbmV4dEVscy5wdXNoKG5leHQpO1xuICAgICAgZWwgPSBuZXh0O1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERvbTcobmV4dEVscyk7XG4gIH0sXG4gIHByZXYoc2VsZWN0b3IpIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBlbCA9IHRoaXNbMF07XG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgJChlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKS5pcyhzZWxlY3RvcikpIHJldHVybiBuZXcgRG9tNyhbZWwucHJldmlvdXNFbGVtZW50U2libGluZ10pO1xuICAgICAgICByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWwucHJldmlvdXNFbGVtZW50U2libGluZykgcmV0dXJuIG5ldyBEb203KFtlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXSk7XG4gICAgICByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERvbTcoW10pO1xuICB9LFxuICBwcmV2QWxsKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgcHJldkVscyA9IFtdO1xuICAgIGxldCBlbCA9IHRoaXNbMF07XG4gICAgaWYgKCFlbCkgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICB3aGlsZSAoZWwucHJldmlvdXNFbGVtZW50U2libGluZykge1xuICAgICAgY29uc3QgcHJldiA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKCQocHJldikuaXMoc2VsZWN0b3IpKSBwcmV2RWxzLnB1c2gocHJldik7XG4gICAgICB9IGVsc2UgcHJldkVscy5wdXNoKHByZXYpO1xuICAgICAgZWwgPSBwcmV2O1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERvbTcocHJldkVscyk7XG4gIH0sXG4gIHNpYmxpbmdzKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIHRoaXMubmV4dEFsbChzZWxlY3RvcikuYWRkKHRoaXMucHJldkFsbChzZWxlY3RvcikpO1xuICB9LFxuICBwYXJlbnQoc2VsZWN0b3IpIHtcbiAgICBjb25zdCBwYXJlbnRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodGhpc1tpXS5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgIGlmICgkKHRoaXNbaV0ucGFyZW50Tm9kZSkuaXMoc2VsZWN0b3IpKSBwYXJlbnRzLnB1c2godGhpc1tpXS5wYXJlbnROb2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJlbnRzLnB1c2godGhpc1tpXS5wYXJlbnROb2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJChVdGlscy51bmlxdWUocGFyZW50cykpO1xuICB9LFxuICBwYXJlbnRzKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgcGFyZW50cyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgbGV0IHBhcmVudCA9IHRoaXNbaV0ucGFyZW50Tm9kZTtcbiAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgaWYgKCQocGFyZW50KS5pcyhzZWxlY3RvcikpIHBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJChVdGlscy51bmlxdWUocGFyZW50cykpO1xuICB9LFxuICBjbG9zZXN0KHNlbGVjdG9yKSB7XG4gICAgbGV0IGNsb3Nlc3QgPSB0aGlzO1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgIH1cbiAgICBpZiAoIWNsb3Nlc3QuaXMoc2VsZWN0b3IpKSB7XG4gICAgICBjbG9zZXN0ID0gY2xvc2VzdC5wYXJlbnRzKHNlbGVjdG9yKS5lcSgwKTtcbiAgICB9XG4gICAgcmV0dXJuIGNsb3Nlc3Q7XG4gIH0sXG4gIGZpbmQoc2VsZWN0b3IpIHtcbiAgICBjb25zdCBmb3VuZEVsZW1lbnRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBmb3VuZCA9IHRoaXNbaV0ucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGZvdW5kLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGZvdW5kRWxlbWVudHMucHVzaChmb3VuZFtqXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgRG9tNyhmb3VuZEVsZW1lbnRzKTtcbiAgfSxcbiAgY2hpbGRyZW4oc2VsZWN0b3IpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgY2hpbGROb2RlcyA9IHRoaXNbaV0uY2hpbGROb2RlcztcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaGlsZE5vZGVzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgICBpZiAoY2hpbGROb2Rlc1tqXS5ub2RlVHlwZSA9PT0gMSkgY2hpbGRyZW4ucHVzaChjaGlsZE5vZGVzW2pdKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZE5vZGVzW2pdLm5vZGVUeXBlID09PSAxICYmICQoY2hpbGROb2Rlc1tqXSkuaXMoc2VsZWN0b3IpKSBjaGlsZHJlbi5wdXNoKGNoaWxkTm9kZXNbal0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IERvbTcoVXRpbHMudW5pcXVlKGNoaWxkcmVuKSk7XG4gIH0sXG4gIHJlbW92ZSgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICh0aGlzW2ldLnBhcmVudE5vZGUpIHRoaXNbaV0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGRldGFjaCgpIHtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmUoKTtcbiAgfSxcbiAgYWRkKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBkb20gPSB0aGlzO1xuICAgIGxldCBpO1xuICAgIGxldCBqO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCB0b0FkZCA9ICQoYXJnc1tpXSk7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgdG9BZGQubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgZG9tW2RvbS5sZW5ndGhdID0gdG9BZGRbal07XG4gICAgICAgIGRvbS5sZW5ndGggKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRvbTtcbiAgfSxcbiAgZW1wdHkoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBlbCA9IHRoaXNbaV07XG4gICAgICBpZiAoZWwubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBlbC5jaGlsZE5vZGVzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgaWYgKGVsLmNoaWxkTm9kZXNbal0ucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgZWwuY2hpbGROb2Rlc1tqXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsLmNoaWxkTm9kZXNbal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1ldGhvZHM7XG4iLCJpbXBvcnQgJCBmcm9tICcuLyQnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG5mdW5jdGlvbiBBbmltYXRlKGluaXRpYWxQcm9wcywgaW5pdGlhbFBhcmFtcykge1xuICBjb25zdCBlbHMgPSB0aGlzO1xuICBjb25zdCBhID0ge1xuICAgIHByb3BzOiAkLmV4dGVuZCh7fSwgaW5pdGlhbFByb3BzKSxcbiAgICBwYXJhbXM6ICQuZXh0ZW5kKHtcbiAgICAgIGR1cmF0aW9uOiAzMDAsXG4gICAgICBlYXNpbmc6ICdzd2luZycsIC8vIG9yICdsaW5lYXInXG4gICAgICAvKiBDYWxsYmFja3NcbiAgICAgIGJlZ2luKGVsZW1lbnRzKVxuICAgICAgY29tcGxldGUoZWxlbWVudHMpXG4gICAgICBwcm9ncmVzcyhlbGVtZW50cywgY29tcGxldGUsIHJlbWFpbmluZywgc3RhcnQsIHR3ZWVuVmFsdWUpXG4gICAgICAqL1xuICAgIH0sIGluaXRpYWxQYXJhbXMpLFxuXG4gICAgZWxlbWVudHM6IGVscyxcbiAgICBhbmltYXRpbmc6IGZhbHNlLFxuICAgIHF1ZTogW10sXG5cbiAgICBlYXNpbmdQcm9ncmVzcyhlYXNpbmcsIHByb2dyZXNzKSB7XG4gICAgICBpZiAoZWFzaW5nID09PSAnc3dpbmcnKSB7XG4gICAgICAgIHJldHVybiAwLjUgLSAoTWF0aC5jb3MocHJvZ3Jlc3MgKiBNYXRoLlBJKSAvIDIpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBlYXNpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGVhc2luZyhwcm9ncmVzcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZ3Jlc3M7XG4gICAgfSxcbiAgICBzdG9wKCkge1xuICAgICAgaWYgKGEuZnJhbWVJZCkge1xuICAgICAgICBVdGlscy5jYW5jZWxBbmltYXRpb25GcmFtZShhLmZyYW1lSWQpO1xuICAgICAgfVxuICAgICAgYS5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIGEuZWxlbWVudHMuZWFjaCgoaW5kZXgsIGVsKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbDtcbiAgICAgICAgZGVsZXRlIGVsZW1lbnQuZG9tN0FuaW1hdGVJbnN0YW5jZTtcbiAgICAgIH0pO1xuICAgICAgYS5xdWUgPSBbXTtcbiAgICB9LFxuICAgIGRvbmUoY29tcGxldGUpIHtcbiAgICAgIGEuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICBhLmVsZW1lbnRzLmVhY2goKGluZGV4LCBlbCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZWw7XG4gICAgICAgIGRlbGV0ZSBlbGVtZW50LmRvbTdBbmltYXRlSW5zdGFuY2U7XG4gICAgICB9KTtcbiAgICAgIGlmIChjb21wbGV0ZSkgY29tcGxldGUoZWxzKTtcbiAgICAgIGlmIChhLnF1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHF1ZSA9IGEucXVlLnNoaWZ0KCk7XG4gICAgICAgIGEuYW5pbWF0ZShxdWVbMF0sIHF1ZVsxXSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBhbmltYXRlKHByb3BzLCBwYXJhbXMpIHtcbiAgICAgIGlmIChhLmFuaW1hdGluZykge1xuICAgICAgICBhLnF1ZS5wdXNoKFtwcm9wcywgcGFyYW1zXSk7XG4gICAgICAgIHJldHVybiBhO1xuICAgICAgfVxuICAgICAgY29uc3QgZWxlbWVudHMgPSBbXTtcblxuICAgICAgLy8gRGVmaW5lICYgQ2FjaGUgSW5pdGlhbHMgJiBVbml0c1xuICAgICAgYS5lbGVtZW50cy5lYWNoKChpbmRleCwgZWwpID0+IHtcbiAgICAgICAgbGV0IGluaXRpYWxGdWxsVmFsdWU7XG4gICAgICAgIGxldCBpbml0aWFsVmFsdWU7XG4gICAgICAgIGxldCB1bml0O1xuICAgICAgICBsZXQgZmluYWxWYWx1ZTtcbiAgICAgICAgbGV0IGZpbmFsRnVsbFZhbHVlO1xuXG4gICAgICAgIGlmICghZWwuZG9tN0FuaW1hdGVJbnN0YW5jZSkgYS5lbGVtZW50c1tpbmRleF0uZG9tN0FuaW1hdGVJbnN0YW5jZSA9IGE7XG5cbiAgICAgICAgZWxlbWVudHNbaW5kZXhdID0ge1xuICAgICAgICAgIGNvbnRhaW5lcjogZWwsXG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgICAgaW5pdGlhbEZ1bGxWYWx1ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3ApLnJlcGxhY2UoJywnLCAnLicpO1xuICAgICAgICAgIGluaXRpYWxWYWx1ZSA9IHBhcnNlRmxvYXQoaW5pdGlhbEZ1bGxWYWx1ZSk7XG4gICAgICAgICAgdW5pdCA9IGluaXRpYWxGdWxsVmFsdWUucmVwbGFjZShpbml0aWFsVmFsdWUsICcnKTtcbiAgICAgICAgICBmaW5hbFZhbHVlID0gcGFyc2VGbG9hdChwcm9wc1twcm9wXSk7XG4gICAgICAgICAgZmluYWxGdWxsVmFsdWUgPSBwcm9wc1twcm9wXSArIHVuaXQ7XG4gICAgICAgICAgZWxlbWVudHNbaW5kZXhdW3Byb3BdID0ge1xuICAgICAgICAgICAgaW5pdGlhbEZ1bGxWYWx1ZSxcbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZSxcbiAgICAgICAgICAgIHVuaXQsXG4gICAgICAgICAgICBmaW5hbFZhbHVlLFxuICAgICAgICAgICAgZmluYWxGdWxsVmFsdWUsXG4gICAgICAgICAgICBjdXJyZW50VmFsdWU6IGluaXRpYWxWYWx1ZSxcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgc3RhcnRUaW1lID0gbnVsbDtcbiAgICAgIGxldCB0aW1lO1xuICAgICAgbGV0IGVsZW1lbnRzRG9uZSA9IDA7XG4gICAgICBsZXQgcHJvcHNEb25lID0gMDtcbiAgICAgIGxldCBkb25lO1xuICAgICAgbGV0IGJlZ2FuID0gZmFsc2U7XG5cbiAgICAgIGEuYW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgICAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIGxldCBwcm9ncmVzcztcbiAgICAgICAgbGV0IGVhc2VQcm9ncmVzcztcbiAgICAgICAgLy8gbGV0IGVsO1xuICAgICAgICBpZiAoIWJlZ2FuKSB7XG4gICAgICAgICAgYmVnYW4gPSB0cnVlO1xuICAgICAgICAgIGlmIChwYXJhbXMuYmVnaW4pIHBhcmFtcy5iZWdpbihlbHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydFRpbWUgPT09IG51bGwpIHtcbiAgICAgICAgICBzdGFydFRpbWUgPSB0aW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJhbXMucHJvZ3Jlc3MpIHtcbiAgICAgICAgICBwYXJhbXMucHJvZ3Jlc3MoZWxzLCBNYXRoLm1heChNYXRoLm1pbigodGltZSAtIHN0YXJ0VGltZSkgLyBwYXJhbXMuZHVyYXRpb24sIDEpLCAwKSwgKChzdGFydFRpbWUgKyBwYXJhbXMuZHVyYXRpb24pIC0gdGltZSA8IDAgPyAwIDogKHN0YXJ0VGltZSArIHBhcmFtcy5kdXJhdGlvbikgLSB0aW1lKSwgc3RhcnRUaW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBlbCA9IGVsZW1lbnQ7XG4gICAgICAgICAgaWYgKGRvbmUgfHwgZWwuZG9uZSkgcmV0dXJuO1xuICAgICAgICAgIE9iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgICAgICBpZiAoZG9uZSB8fCBlbC5kb25lKSByZXR1cm47XG4gICAgICAgICAgICBwcm9ncmVzcyA9IE1hdGgubWF4KE1hdGgubWluKCh0aW1lIC0gc3RhcnRUaW1lKSAvIHBhcmFtcy5kdXJhdGlvbiwgMSksIDApO1xuICAgICAgICAgICAgZWFzZVByb2dyZXNzID0gYS5lYXNpbmdQcm9ncmVzcyhwYXJhbXMuZWFzaW5nLCBwcm9ncmVzcyk7XG4gICAgICAgICAgICBjb25zdCB7IGluaXRpYWxWYWx1ZSwgZmluYWxWYWx1ZSwgdW5pdCB9ID0gZWxbcHJvcF07XG4gICAgICAgICAgICBlbFtwcm9wXS5jdXJyZW50VmFsdWUgPSBpbml0aWFsVmFsdWUgKyAoZWFzZVByb2dyZXNzICogKGZpbmFsVmFsdWUgLSBpbml0aWFsVmFsdWUpKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGVsW3Byb3BdLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoZmluYWxWYWx1ZSA+IGluaXRpYWxWYWx1ZSAmJiBjdXJyZW50VmFsdWUgPj0gZmluYWxWYWx1ZSkgfHxcbiAgICAgICAgICAgICAgKGZpbmFsVmFsdWUgPCBpbml0aWFsVmFsdWUgJiYgY3VycmVudFZhbHVlIDw9IGZpbmFsVmFsdWUpKSB7XG4gICAgICAgICAgICAgIGVsLmNvbnRhaW5lci5zdHlsZVtwcm9wXSA9IGZpbmFsVmFsdWUgKyB1bml0O1xuICAgICAgICAgICAgICBwcm9wc0RvbmUgKz0gMTtcbiAgICAgICAgICAgICAgaWYgKHByb3BzRG9uZSA9PT0gT2JqZWN0LmtleXMocHJvcHMpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGVsLmRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzRG9uZSArPSAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50c0RvbmUgPT09IGVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICBhLmRvbmUocGFyYW1zLmNvbXBsZXRlKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWwuY29udGFpbmVyLnN0eWxlW3Byb3BdID0gY3VycmVudFZhbHVlICsgdW5pdDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgIC8vIFRoZW4gY2FsbFxuICAgICAgICBhLmZyYW1lSWQgPSBVdGlscy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICAgIH1cbiAgICAgIGEuZnJhbWVJZCA9IFV0aWxzLnJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgcmV0dXJuIGE7XG4gICAgfSxcbiAgfTtcblxuICBpZiAoYS5lbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZWxzO1xuICB9XG5cbiAgbGV0IGFuaW1hdGVJbnN0YW5jZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmVsZW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGEuZWxlbWVudHNbaV0uZG9tN0FuaW1hdGVJbnN0YW5jZSkge1xuICAgICAgYW5pbWF0ZUluc3RhbmNlID0gYS5lbGVtZW50c1tpXS5kb203QW5pbWF0ZUluc3RhbmNlO1xuICAgIH0gZWxzZSBhLmVsZW1lbnRzW2ldLmRvbTdBbmltYXRlSW5zdGFuY2UgPSBhO1xuICB9XG4gIGlmICghYW5pbWF0ZUluc3RhbmNlKSB7XG4gICAgYW5pbWF0ZUluc3RhbmNlID0gYTtcbiAgfVxuXG4gIGlmIChpbml0aWFsUHJvcHMgPT09ICdzdG9wJykge1xuICAgIGFuaW1hdGVJbnN0YW5jZS5zdG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgYW5pbWF0ZUluc3RhbmNlLmFuaW1hdGUoYS5wcm9wcywgYS5wYXJhbXMpO1xuICB9XG5cbiAgcmV0dXJuIGVscztcbn1cblxuZnVuY3Rpb24gU3RvcCgpIHtcbiAgY29uc3QgZWxzID0gdGhpcztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoZWxzW2ldLmRvbTdBbmltYXRlSW5zdGFuY2UpIHtcbiAgICAgIGVsc1tpXS5kb203QW5pbWF0ZUluc3RhbmNlLnN0b3AoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgQW5pbWF0ZSwgU3RvcCB9O1xuIiwiaW1wb3J0IERvbTcgZnJvbSAnLi9kb203LWNsYXNzJztcbmltcG9ydCAkIGZyb20gJy4vJCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgQWpheCBmcm9tICcuL2FqYXgnO1xuaW1wb3J0IFNjcm9sbCBmcm9tICcuL3Njcm9sbCc7XG5pbXBvcnQgTWV0aG9kcyBmcm9tICcuL21ldGhvZHMnO1xuaW1wb3J0IHsgQW5pbWF0ZSwgU3RvcCB9IGZyb20gJy4vYW5pbWF0ZSc7XG5cbmZ1bmN0aW9uIGRvbTcoKSB7XG4gIC8vIFV0aWxzICYgSGVscGVyc1xuICBPYmplY3Qua2V5cyhVdGlscykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgJFtrZXldID0gVXRpbHNba2V5XTtcbiAgfSk7XG5cbiAgLy8gTWV0aG9kc1xuICBPYmplY3Qua2V5cyhNZXRob2RzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBEb203LnByb3RvdHlwZVtrZXldID0gTWV0aG9kc1trZXldO1xuICB9KTtcblxuICAvLyBTY3JvbGxcbiAgT2JqZWN0LmtleXMoU2Nyb2xsKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBEb203LnByb3RvdHlwZVtrZXldID0gU2Nyb2xsW2tleV07XG4gIH0pO1xuXG4gIC8vIEFuaW1hdGVcbiAgRG9tNy5wcm90b3R5cGUuYW5pbWF0ZSA9IEFuaW1hdGU7XG4gIERvbTcucHJvdG90eXBlLnN0b3AgPSBTdG9wO1xuXG4gIC8vIEFqYXhcbiAgJC5hamF4ID0gQWpheDtcblxuICAvLyBBamF4IFNocm90Y3V0c1xuICAoJ2dldCBwb3N0IGdldEpTT04nKS5zcGxpdCgnICcpLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICAgICRbbWV0aG9kXSA9IGZ1bmN0aW9uIGFqYXgoLi4uYXJncykge1xuICAgICAgbGV0IHVybDtcbiAgICAgIGxldCBkYXRhO1xuICAgICAgbGV0IHN1Y2Nlc3M7XG4gICAgICBsZXQgZXJyb3I7XG4gICAgICBsZXQgZGF0YVR5cGU7XG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgW3VybCwgc3VjY2VzcywgZXJyb3IsIGRhdGFUeXBlXSA9IGFyZ3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbdXJsLCBkYXRhLCBzdWNjZXNzLCBlcnJvciwgZGF0YVR5cGVdID0gYXJncztcbiAgICAgIH1cbiAgICAgIFtzdWNjZXNzLCBlcnJvcl0uZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBkYXRhVHlwZSA9IGNhbGxiYWNrO1xuICAgICAgICAgIGlmIChjYWxsYmFjayA9PT0gc3VjY2Vzcykgc3VjY2VzcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBlbHNlIGVycm9yID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRhdGFUeXBlID0gZGF0YVR5cGUgfHwgKG1ldGhvZCA9PT0gJ2dldEpTT04nID8gJ2pzb24nIDogdW5kZWZpbmVkKTtcbiAgICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICB1cmwsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kID09PSAncG9zdCcgPyAnUE9TVCcgOiAnR0VUJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgc3VjY2VzcyxcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGRhdGFUeXBlLFxuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gTGluayB0byBwcm90b3R5cGVcbiAgJC5mbiA9IERvbTcucHJvdG90eXBlO1xuXG4gIHJldHVybiAkO1xufVxuZXhwb3J0IGRlZmF1bHQgZG9tNygpO1xuIl0sIm5hbWVzIjpbIkRvbTciLCJsZXQiLCJjb25zdCIsInRoaXMiLCJhcmd1bWVudHMiLCJpIiwidHJhbnNmb3JtIiwiaHRtbCIsInRleHQiXSwibWFwcGluZ3MiOiJBQUFlLElBQU1BLE1BQUksR0FBQyxhQUNiLENBQUMsR0FBRyxFQUFFO0VBQ2pCLElBQVEsSUFBSSxHQUFHLElBQUksQ0FBQzs7RUFFcEIsS0FBT0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVB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QUFDLENBQUM7SUFDckMsS0FBS0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDMUMsS0FBS0EsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdkMsSUFBSSxPQUFPRSxNQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLFdBQVcsRUFBRSxFQUFBQSxNQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFBO09BQ3BGO0tBQ0Y7SUFDRCxPQUFPLElBQUksQ0FBQztHQUNiO0VBQ0QsUUFBUSxtQkFBQSxDQUFDLFNBQVMsRUFBRTtJQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUEsT0FBTyxLQUFLLENBQUMsRUFBQTtJQUMzQixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQzlDO0VBQ0QsV0FBVyxzQkFBQSxDQUFDLFNBQVMsRUFBRTs7O0lBQ3JCRCxJQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLEtBQUtELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO01BQzFDLEtBQUtBLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZDLElBQUksT0FBT0UsTUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBSyxXQUFXLEVBQUUsRUFBQUEsTUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNB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