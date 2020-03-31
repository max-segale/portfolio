// Common JS functions
const max = (function (window, document) {
  // Recursive check of attributes to apply to element
  function objElAtr(element, atrObj, parentAtr) {
    Object.keys(atrObj).forEach(function (atr) {
      if (typeof atrObj[atr] === 'object') {
        objElAtr(element, atrObj[atr], atr);
      } else if (parentAtr) {
        element[parentAtr][atr] = atrObj[atr];
      } else {
        element[atr] = atrObj[atr];
      }
    });
  }
  // Process request state changes
  function stateChange(XHR, passFn, failFn, waitFn) {
    if (waitFn) {
      waitFn(XHR);
    }
    if (XHR.readyState === 4) {
      if (XHR.status === 200) {
        if (passFn) {
          passFn(XHR);
        }
      } else if (failFn) {
        failFn(XHR);
      }
    }
  }
  return {
    // Encoded ajax request with callback functions
    request: function (method, path, paramObj, passFn, failFn, waitFn) {
      const XHR = new XMLHttpRequest();
      let theParams = '';
      let sendURL = '';
      let sendString = '';
      if (paramObj) {
        Object.keys(paramObj).forEach(function (param, p) {
          if (p > 0) {
            theParams += '&';
          }
          theParams += encodeURIComponent(param) + '=';
          theParams += encodeURIComponent(paramObj[param]);
        });
      }
      if (method === 'GET') {
        sendURL = path + '?' + theParams;
      } else {
        sendURL = path;
        sendString = theParams;
      }
      XHR.onreadystatechange = function () {
        stateChange(XHR, passFn, failFn, waitFn);
      };
      XHR.open(method, sendURL, true);
      XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      XHR.setRequestHeader('Cache-Control', 'no-cache');
      XHR.send(sendString);
    },
    // Create new element, apply attributes, add to parent
    newKid: function (elParent, elType, elAtrs, elInner) {
      const element = document.createElement(elType);
      if (elAtrs) {
        if (typeof elAtrs === 'string') {
          element.className = elAtrs;
        } else if (typeof elAtrs === 'object') {
          objElAtr(element, elAtrs);
        }
      }
      if (elInner) {
        if (typeof elInner === 'string') {
          element.innerHTML = elInner;
        } else if (typeof elInner === 'object') {
          this.newKids(element, elInner);
        }
      }
      if (elParent) {
        elParent.appendChild(element);
      }
      return element;
    },
    // Add multiple new elements to parent
    newKids: function (elParent, kids) {
      const elements = [];
      const thisObj = this;
      kids.forEach(function (el) {
        const element = thisObj.newKid(elParent, el[0], el[1], el[2]);
        elements.push(element);
      });
      return elements;
    },
    // Calculate size as percentage of total width for auto resize
    relativeSize: function (widthPx, heightPx, maxWidthPx) {
      const widthPct = widthPx * 100 / maxWidthPx;
      const heightPct = widthPct * heightPx / widthPx;
      return {
        width: widthPct,
        height: heightPct
      };
    },
    // Parse query string and return parameter object
    parseQueryStr: function () {
      const paramStr = window.location.search.substr(1);
      const paramArray = paramStr.split('&');
      const paramObj = {};
      if (paramStr.length === 0) {
        return null;
      }
      paramArray.forEach(function (param) {
        const valPair = param.split('=');
        paramObj[valPair[0]] = decodeURIComponent(valPair[1]);
      });
      return paramObj;
    }
  };
}(window, document));
