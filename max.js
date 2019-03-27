/*
    max.js version 3.0
    max segale
    maxsegale.com
*/
var max = (function (window, document) {
    "use strict";
    // recursive check of attributes to apply to element
    function objElAtr(element, atrObj, parentAtr) {
        Object.keys(atrObj).forEach(function (atr) {
            if (typeof atrObj[atr] === "object") {
                objElAtr(element, atrObj[atr], atr);
            } else if (parentAtr) {
                element[parentAtr][atr] = atrObj[atr];
            } else {
                element[atr] = atrObj[atr];
            }
        });
    }
    // process request state changes
    function stateChange(xmlhttp, afterFn, errorFn, statusFn) {
        if (statusFn) {
            statusFn(xmlhttp);
        }
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                if (afterFn) {
                    afterFn(xmlhttp);
                }
            } else if (errorFn) {
                errorFn(xmlhttp);
            }
        }
    }
    return {
        // encoded ajax request with callback functions
        request: function (method, path, paramObj, afterFn, errorFn, statusFn) {
            var xmlhttp = new XMLHttpRequest();
            var contType = "application/x-www-form-urlencoded";
            var theParams = "";
            var sendUrl = "";
            var sendString = "";
            if (paramObj) {
                Object.keys(paramObj).forEach(function (param, p) {
                    if (p > 0) {
                        theParams += "&";
                    }
                    theParams += encodeURIComponent(param) + "=";
                    theParams += encodeURIComponent(paramObj[param]);
                });
            }
            if (method === "GET") {
                if (theParams !== "") {
                    theParams += "&";
                }
                theParams += "v=" + Math.random();
                sendUrl = path + "?" + theParams;
            } else {
                sendUrl = path;
                sendString = theParams;
            }
            xmlhttp.onreadystatechange = function () {
                stateChange(xmlhttp, afterFn, errorFn, statusFn);
            };
            xmlhttp.open(method, sendUrl, true);
            xmlhttp.setRequestHeader("Content-Type", contType);
            xmlhttp.send(sendString);
        },
        // parse query string and return parameter object
        parseQueryStr: function () {
            var paramStr = window.location.search.substr(1);
            var paramArray = paramStr.split("&");
            var paramObj = {};
            if (paramStr.length === 0) {
                return null;
            }
            paramArray.forEach(function (param) {
                var valPair = param.split("=");
                paramObj[valPair[0]] = decodeURIComponent(valPair[1]);
            });
            return paramObj;
        },
        // create new element, apply attributes, add to parent
        addKid: function (elParent, elType, elAtrs, elInner) {
            var element = document.createElement(elType);
            if (elAtrs) {
                if (typeof elAtrs === "string") {
                    element.className = elAtrs;
                } else if (typeof elAtrs === "object") {
                    objElAtr(element, elAtrs);
                }
            }
            if (elInner) {
                if (typeof elInner === "string") {
                    element.innerHTML = elInner;
                } else if (typeof elInner === "object") {
                    this.addKids(element, elInner);
                }
            }
            if (elParent) {
                elParent.appendChild(element);
            }
            return element;
        },
        // add multiple new elements to parent
        addKids: function (elParent, kids) {
            var elements = [];
            var thisObj = this;
            kids.forEach(function (el) {
                var element = thisObj.addKid(elParent, el[0], el[1], el[2]);
                elements.push(element);
            });
            return elements;
        },
        // calculate size as percentage of total width for auto resize
        relativeSize: function (widthPx, heightPx, maxWidthPx) {
            var widthPct = widthPx * 100 / maxWidthPx;
            var heightPct = widthPct * heightPx / widthPx;
            return {
                width: widthPct,
                height: heightPct
            };
        },
        // add event listener, with old browser support
        addEvent: function (element, evtType, fn, capture) {
            if (element.addEventListener) {
                element.addEventListener(evtType, fn, capture);
            } else if (element.attachEvent) {
                element.attachEvent("on" + evtType, fn);
            }
        },
        // remove event listener, with older browser support
        subEvent: function (element, evtType, fn, capture) {
            if (element.removeEventListener) {
                element.removeEventListener(evtType, fn, capture);
            } else if (element.detachEvent) {
                element.detachEvent("on" + evtType, fn);
            }
        },
        // add to element class, with older browser support
        addClass: function (element, theClass) {
            if (element.classList) {
                element.classList.add(theClass);
            } else if (element.className) {
                element.className += " " + theClass;
            }
        },
        // remove class from element, with older browser support
        subClass: function (element, theClass) {
            var classArray = [];
            if (element.classList) {
                element.classList.remove(theClass);
            } else if (element.className) {
                if (element.className === theClass) {
                    element.removeAttribute("class");
                } else {
                    element.className.split(" ").forEach(function (classItem) {
                        if (classItem !== theClass) {
                            classArray.push(classItem);
                        }
                    });
                    element.className = classArray.join(" ");
                }
            }
        }
    };
}(window, document));