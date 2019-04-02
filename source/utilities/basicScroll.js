(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.basicScroll = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function backInOut(t) {
  var s = 1.70158 * 1.525;
  if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s));
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
}

module.exports = backInOut;

},{}],2:[function(require,module,exports){
"use strict";

function backIn(t) {
  var s = 1.70158;
  return t * t * ((s + 1) * t - s);
}

module.exports = backIn;

},{}],3:[function(require,module,exports){
"use strict";

function backOut(t) {
  var s = 1.70158;
  return --t * t * ((s + 1) * t + s) + 1;
}

module.exports = backOut;

},{}],4:[function(require,module,exports){
'use strict';

var bounceOut = require('./bounce-out');

function bounceInOut(t) {
  return t < 0.5 ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0)) : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5;
}

module.exports = bounceInOut;

},{"./bounce-out":6}],5:[function(require,module,exports){
'use strict';

var bounceOut = require('./bounce-out');

function bounceIn(t) {
  return 1.0 - bounceOut(1.0 - t);
}

module.exports = bounceIn;

},{"./bounce-out":6}],6:[function(require,module,exports){
"use strict";

function bounceOut(t) {
  var a = 4.0 / 11.0;
  var b = 8.0 / 11.0;
  var c = 9.0 / 10.0;

  var ca = 4356.0 / 361.0;
  var cb = 35442.0 / 1805.0;
  var cc = 16061.0 / 1805.0;

  var t2 = t * t;

  return t < a ? 7.5625 * t2 : t < b ? 9.075 * t2 - 9.9 * t + 3.4 : t < c ? ca * t2 - cb * t + cc : 10.8 * t * t - 20.52 * t + 10.72;
}

module.exports = bounceOut;

},{}],7:[function(require,module,exports){
"use strict";

function circInOut(t) {
  if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
}

module.exports = circInOut;

},{}],8:[function(require,module,exports){
"use strict";

function circIn(t) {
  return 1.0 - Math.sqrt(1.0 - t * t);
}

module.exports = circIn;

},{}],9:[function(require,module,exports){
"use strict";

function circOut(t) {
  return Math.sqrt(1 - --t * t);
}

module.exports = circOut;

},{}],10:[function(require,module,exports){
"use strict";

function cubicInOut(t) {
  return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
}

module.exports = cubicInOut;

},{}],11:[function(require,module,exports){
"use strict";

function cubicIn(t) {
  return t * t * t;
}

module.exports = cubicIn;

},{}],12:[function(require,module,exports){
"use strict";

function cubicOut(t) {
  var f = t - 1.0;
  return f * f * f + 1.0;
}

module.exports = cubicOut;

},{}],13:[function(require,module,exports){
"use strict";

function elasticInOut(t) {
  return t < 0.5 ? 0.5 * Math.sin(+13.0 * Math.PI / 2 * 2.0 * t) * Math.pow(2.0, 10.0 * (2.0 * t - 1.0)) : 0.5 * Math.sin(-13.0 * Math.PI / 2 * (2.0 * t - 1.0 + 1.0)) * Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0;
}

module.exports = elasticInOut;

},{}],14:[function(require,module,exports){
"use strict";

function elasticIn(t) {
  return Math.sin(13.0 * t * Math.PI / 2) * Math.pow(2.0, 10.0 * (t - 1.0));
}

module.exports = elasticIn;

},{}],15:[function(require,module,exports){
"use strict";

function elasticOut(t) {
  return Math.sin(-13.0 * (t + 1.0) * Math.PI / 2) * Math.pow(2.0, -10.0 * t) + 1.0;
}

module.exports = elasticOut;

},{}],16:[function(require,module,exports){
"use strict";

function expoInOut(t) {
  return t === 0.0 || t === 1.0 ? t : t < 0.5 ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0) : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
}

module.exports = expoInOut;

},{}],17:[function(require,module,exports){
"use strict";

function expoIn(t) {
  return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
}

module.exports = expoIn;

},{}],18:[function(require,module,exports){
"use strict";

function expoOut(t) {
  return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
}

module.exports = expoOut;

},{}],19:[function(require,module,exports){
'use strict';

module.exports = {
  'backInOut': require('./back-in-out'),
  'backIn': require('./back-in'),
  'backOut': require('./back-out'),
  'bounceInOut': require('./bounce-in-out'),
  'bounceIn': require('./bounce-in'),
  'bounceOut': require('./bounce-out'),
  'circInOut': require('./circ-in-out'),
  'circIn': require('./circ-in'),
  'circOut': require('./circ-out'),
  'cubicInOut': require('./cubic-in-out'),
  'cubicIn': require('./cubic-in'),
  'cubicOut': require('./cubic-out'),
  'elasticInOut': require('./elastic-in-out'),
  'elasticIn': require('./elastic-in'),
  'elasticOut': require('./elastic-out'),
  'expoInOut': require('./expo-in-out'),
  'expoIn': require('./expo-in'),
  'expoOut': require('./expo-out'),
  'linear': require('./linear'),
  'quadInOut': require('./quad-in-out'),
  'quadIn': require('./quad-in'),
  'quadOut': require('./quad-out'),
  'quartInOut': require('./quart-in-out'),
  'quartIn': require('./quart-in'),
  'quartOut': require('./quart-out'),
  'quintInOut': require('./quint-in-out'),
  'quintIn': require('./quint-in'),
  'quintOut': require('./quint-out'),
  'sineInOut': require('./sine-in-out'),
  'sineIn': require('./sine-in'),
  'sineOut': require('./sine-out')
};

},{"./back-in":2,"./back-in-out":1,"./back-out":3,"./bounce-in":5,"./bounce-in-out":4,"./bounce-out":6,"./circ-in":8,"./circ-in-out":7,"./circ-out":9,"./cubic-in":11,"./cubic-in-out":10,"./cubic-out":12,"./elastic-in":14,"./elastic-in-out":13,"./elastic-out":15,"./expo-in":17,"./expo-in-out":16,"./expo-out":18,"./linear":20,"./quad-in":22,"./quad-in-out":21,"./quad-out":23,"./quart-in":25,"./quart-in-out":24,"./quart-out":26,"./quint-in":28,"./quint-in-out":27,"./quint-out":29,"./sine-in":31,"./sine-in-out":30,"./sine-out":32}],20:[function(require,module,exports){
"use strict";

function linear(t) {
  return t;
}

module.exports = linear;

},{}],21:[function(require,module,exports){
"use strict";

function quadInOut(t) {
    t /= 0.5;
    if (t < 1) return 0.5 * t * t;
    t--;
    return -0.5 * (t * (t - 2) - 1);
}

module.exports = quadInOut;

},{}],22:[function(require,module,exports){
"use strict";

function quadIn(t) {
  return t * t;
}

module.exports = quadIn;

},{}],23:[function(require,module,exports){
"use strict";

function quadOut(t) {
  return -t * (t - 2.0);
}

module.exports = quadOut;

},{}],24:[function(require,module,exports){
"use strict";

function quarticInOut(t) {
  return t < 0.5 ? +8.0 * Math.pow(t, 4.0) : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0;
}

module.exports = quarticInOut;

},{}],25:[function(require,module,exports){
"use strict";

function quarticIn(t) {
  return Math.pow(t, 4.0);
}

module.exports = quarticIn;

},{}],26:[function(require,module,exports){
"use strict";

function quarticOut(t) {
  return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
}

module.exports = quarticOut;

},{}],27:[function(require,module,exports){
"use strict";

function qinticInOut(t) {
    if ((t *= 2) < 1) return 0.5 * t * t * t * t * t;
    return 0.5 * ((t -= 2) * t * t * t * t + 2);
}

module.exports = qinticInOut;

},{}],28:[function(require,module,exports){
"use strict";

function qinticIn(t) {
  return t * t * t * t * t;
}

module.exports = qinticIn;

},{}],29:[function(require,module,exports){
"use strict";

function qinticOut(t) {
  return --t * t * t * t * t + 1;
}

module.exports = qinticOut;

},{}],30:[function(require,module,exports){
"use strict";

function sineInOut(t) {
  return -0.5 * (Math.cos(Math.PI * t) - 1);
}

module.exports = sineInOut;

},{}],31:[function(require,module,exports){
"use strict";

function sineIn(t) {
  var v = Math.cos(t * Math.PI * 0.5);
  if (Math.abs(v) < 1e-14) return 1;else return 1 - v;
}

module.exports = sineIn;

},{}],32:[function(require,module,exports){
"use strict";

function sineOut(t) {
  return Math.sin(t * Math.PI / 2);
}

module.exports = sineOut;

},{}],33:[function(require,module,exports){
'use strict';

module.exports = function parseUnit(str, out) {
    if (!out) out = [0, ''];

    str = String(str);
    var num = parseFloat(str, 10);
    out[0] = num;
    out[1] = str.match(/[\d.\-\+]*\s*(.*)/)[1] || '';
    return out;
};

},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _parseUnit = require('parse-unit');

var _parseUnit2 = _interopRequireDefault(_parseUnit);

var _eases = require('eases');

var _eases2 = _interopRequireDefault(_eases);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instances = [];
var isBrowser = typeof window !== 'undefined';

/**
 * Debounces a function that will be triggered many times.
 * @param {Function} fn
 * @param {Integer} duration
 * @returns {Function}
 */
var debounce = function debounce(fn, duration) {

  var timeout = null;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timeout);

    timeout = setTimeout(function () {
      return fn.apply(undefined, args);
    }, duration);
  };
};

/**
 * Returns all active instances from an array.
 * @param {Array} instances
 * @returns {Array} instances - Active instances.
 */
var getActiveInstances = function getActiveInstances(instances) {

  return instances.filter(function (instance) {
    return instance != null && instance.isActive();
  });
};

/**
 * Returns all tracked instances from an array.
 * @param {Array} instances
 * @returns {Array} instances - Tracked instances.
 */
var getTrackedInstances = function getTrackedInstances(instances) {

  return instances.filter(function (instance) {
    return instance != null && instance.getData().track;
  });
};

var scrollingElement = document.scrollingElement || document.documentElement;
var setScrollingElement = exports.setScrollingElement = function setScrollingElement(node) {
  scrollingElement = node;
}

/**
 * Returns the number of scrolled pixels.
 * @returns {Integer} scrollTop
 */
var getScrollTop = function getScrollTop() {

  // Use scrollTop because it's faster than getBoundingClientRect()
  return scrollingElement.scrollTop;
};

/**
 * Returns the height of the viewport.
 * @returns {Integer} viewportHeight
 */
var getViewportHeight = function getViewportHeight() {

  return window.innerHeight || window.outerHeight;
};

/**
 * Checks if a value is absolute.
 * An absolute value must have a value that's not NaN.
 * @param {String|Integer} value
 * @returns {Boolean} isAbsolute
 */
var isAbsoluteValue = function isAbsoluteValue(value) {

  return isNaN((0, _parseUnit2.default)(value)[0]) === false;
};

/**
 * Parses an absolute value.
 * @param {String|Integer} value
 * @returns {Object} value - Parsed value.
 */
var parseAbsoluteValue = function parseAbsoluteValue(value) {

  var parsedValue = (0, _parseUnit2.default)(value);

  return {
    value: parsedValue[0],
    unit: parsedValue[1]
  };
};

/**
 * Checks if a value is relative.
 * A relative value must start and end with [a-z] and needs a '-' in the middle.
 * @param {String|Integer} value
 * @returns {Boolean} isRelative
 */
var isRelativeValue = function isRelativeValue(value) {

  return String(value).match(/^[a-z]+-[a-z]+$/) !== null;
};

/**
 * Returns the property that should be used according to direct.
 * @param {Boolean|Node} direct
 * @param {Object} properties
 * @returns {*}
 */
var mapDirectToProperty = function mapDirectToProperty(direct, properties) {

  if (direct === true) return properties.elem;
  if (direct instanceof HTMLElement === true) return properties.direct;

  return properties.global;
};

/**
 * Converts a relative value to an absolute value.
 * @param {String} value
 * @param {Node} elem - Anchor of the relative value.
 * @param {?Integer} scrollTop - Pixels scrolled in document.
 * @param {?Integer} viewportHeight - Height of the viewport.
 * @returns {String} value - Absolute value.
 */
var relativeToAbsoluteValue = function relativeToAbsoluteValue(value, elem) {
  var scrollTop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getScrollTop();
  var viewportHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : getViewportHeight();


  var elemSize = elem.getBoundingClientRect();

  var elemAnchor = value.match(/^[a-z]+/)[0];
  var viewportAnchor = value.match(/[a-z]+$/)[0];

  var y = 0;

  if (viewportAnchor === 'top') y -= 0;
  if (viewportAnchor === 'middle') y -= viewportHeight / 2;
  if (viewportAnchor === 'bottom') y -= viewportHeight;

  if (elemAnchor === 'top') y += elemSize.top + scrollTop;
  if (elemAnchor === 'middle') y += elemSize.top + scrollTop + elemSize.height / 2;
  if (elemAnchor === 'bottom') y += elemSize.top + scrollTop + elemSize.height;

  return y + 'px';
};

/**
 * Validates data and sets defaults for undefined properties.
 * @param {?Object} data
 * @returns {Object} data - Validated data.
 */
var validate = function validate() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  // Copy root object to avoid changes by reference
  data = Object.assign({}, data);

  if (data.inside == null) data.inside = function () {};
  if (data.outside == null) data.outside = function () {};
  if (data.direct == null) data.direct = false;
  if (data.track == null) data.track = true;
  if (data.props == null) data.props = {};

  if (data.from == null) throw new Error('Missing property `from`');
  if (data.to == null) throw new Error('Missing property `to`');
  if (typeof data.inside !== 'function') throw new Error('Property `inside` must be undefined or a function');
  if (typeof data.outside !== 'function') throw new Error('Property `outside` must be undefined or a function');
  if (typeof data.direct !== 'boolean' && data.direct instanceof HTMLElement === false) throw new Error('Property `direct` must be undefined, a boolean or a DOM element/node');
  if (data.direct === true && data.elem == null) throw new Error('Property `elem` is required when `direct` is true');
  if (typeof data.track !== 'boolean') throw new Error('Property `track` must be undefined or a boolean');
  if (_typeof(data.props) !== 'object') throw new Error('Property `props` must be undefined or an object');

  if (data.elem == null) {

    if (isAbsoluteValue(data.from) === false) throw new Error('Property `from` must be a absolute value when no `elem` has been provided');
    if (isAbsoluteValue(data.to) === false) throw new Error('Property `to` must be a absolute value when no `elem` has been provided');
  } else {

    if (isRelativeValue(data.from) === true) data.from = relativeToAbsoluteValue(data.from, data.elem);
    if (isRelativeValue(data.to) === true) data.to = relativeToAbsoluteValue(data.to, data.elem);
  }

  data.from = parseAbsoluteValue(data.from);
  data.to = parseAbsoluteValue(data.to);

  // Create a new props object to avoid changes by reference
  data.props = Object.keys(data.props).reduce(function (acc, key) {

    // Copy prop object to avoid changes by reference
    var prop = Object.assign({}, data.props[key]);

    if (isAbsoluteValue(prop.from) === false) throw new Error('Property `from` of prop must be a absolute value');
    if (isAbsoluteValue(prop.to) === false) throw new Error('Property `from` of prop must be a absolute value');

    prop.from = parseAbsoluteValue(prop.from);
    prop.to = parseAbsoluteValue(prop.to);

    if (prop.timing == null) prop.timing = _eases2.default['linear'];

    if (typeof prop.timing !== 'string' && typeof prop.timing !== 'function') throw new Error('Property `timing` of prop must be undefined, a string or a function');

    if (typeof prop.timing === 'string' && _eases2.default[prop.timing] == null) throw new Error('Unknown timing for property `timing` of prop');
    if (typeof prop.timing === 'string') prop.timing = _eases2.default[prop.timing];

    acc[key] = prop;

    return acc;
  }, {});

  return data;
};

/**
 * Calculates the props of an instance.
 * @param {Object} instance
 * @param {?Integer} scrollTop - Pixels scrolled in document.
 * @returns {Object} Calculated props and the element to apply styles to.
 */
var getProps = function getProps(instance) {
  var scrollTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getScrollTop();


  var data = instance.getData();

  // 100% in pixel
  var total = data.to.value - data.from.value;

  // Pixel scrolled
  var current = scrollTop - data.from.value;

  // Percent scrolled
  var precisePercentage = current / (total / 100);
  var normalizedPercentage = Math.min(Math.max(precisePercentage, 0), 100);

  // Get the element that should be used according to direct
  var elem = mapDirectToProperty(data.direct, {
    global: document.documentElement,
    elem: data.elem,
    direct: data.direct
  });

  // Generate an object with all new props
  var props = Object.keys(data.props).reduce(function (acc, key) {

    var prop = data.props[key];

    // Use the unit of from OR to. It's valid to animate from '0' to '100px' and
    // '0' should be treated as 'px', too. Unit will be an empty string when no unit given.
    var unit = prop.from.unit || prop.to.unit;

    // The value that should be interpolated
    var diff = prop.from.value - prop.to.value;

    // All easing functions only remap a time value, and all have the same signature.
    // Typically a value between 0 and 1, and it returns a new float that has been eased.
    var time = prop.timing(normalizedPercentage / 100);

    var value = prop.from.value - diff * time;

    // Round to avoid imprecise values.
    // The precision of floating point computations is only as precise as the precision it uses.
    // http://stackoverflow.com/questions/588004/is-floating-point-math-broken
    var rounded = Math.round(value * 10000) / 10000;

    acc[key] = rounded + unit;

    return acc;
  }, {});

  // Use precise percentage to check if the viewport is between from and to.
  // Would always return true when using the normalized percentage.
  var isInside = precisePercentage >= 0 && precisePercentage <= 100;
  var isOutside = precisePercentage < 0 || precisePercentage > 100;

  // Execute callbacks
  if (isInside === true) data.inside(instance, precisePercentage, props);
  if (isOutside === true) data.outside(instance, precisePercentage, props);

  return {
    elem: elem,
    props: props
  };
};

/**
 * Adds a property with the specified name and value to a given style object.
 * @param {Node} elem - Styles will be applied to this element.
 * @param {Object} prop - Object with a key and value.
 */
var setProp = function setProp(elem, prop) {

  elem.style.setProperty(prop.key, prop.value);
};

/**
 * Adds properties to a given style object.
 * @param {Node} elem - Styles will be applied to this element.
 * @param {Object} props - Object of props.
 */
var setProps = function setProps(elem, props) {

  Object.keys(props).forEach(function (key) {
    return setProp(elem, {
      key: key,
      value: props[key]
    });
  });
};

/**
 * Gets and sets new props when the user has scrolled and when there are active instances.
 * This part get executed with every frame. Make sure it's performant as hell.
 * @param {Object} style - Style object.
 * @param {?Integer} previousScrollTop
 * @returns {?*}
 */
var loop = function loop(style, previousScrollTop) {

  // Continue loop
  var repeat = function repeat() {

    // It depends on the browser, but it turns out that closures
    // are sometimes faster than .bind or .apply.
    requestAnimationFrame(function () {
      return loop(style, previousScrollTop);
    });
  };

  // Get all active instances
  var activeInstances = getActiveInstances(instances);

  // Only continue when active instances available
  if (activeInstances.length === 0) return repeat();

  var scrollTop = getScrollTop();

  // Only continue when scrollTop has changed
  if (previousScrollTop === scrollTop) return repeat();else previousScrollTop = scrollTop;

  // Get and set new props of each instance
  activeInstances.map(function (instance) {
    return getProps(instance, scrollTop);
  }).forEach(function (_ref) {
    var elem = _ref.elem,
        props = _ref.props;
    return setProps(elem, props);
  });

  repeat();
};

/**
 * Creates a new instance.
 * @param {Object} data
 * @returns {Object} instance
 */
var create = exports.create = function create(data) {

  // Store the parsed data
  var _data = null;

  // Store if instance is started or stopped
  var active = false;

  // Returns if instance is started or stopped
  var _isActive = function _isActive() {

    return active;
  };

  // Returns the parsed and calculated data
  var _getData = function _getData() {

    return _data;
  };

  // Parses and calculates data
  var _calculate = function _calculate() {

    _data = validate(data);
  };

  // Update props
  var _update = function _update() {

    // Get new props
    var _getProps = getProps(instance),
        elem = _getProps.elem,
        props = _getProps.props;

    // Set new props


    setProps(elem, props);

    return props;
  };

  // Starts to animate
  var _start = function _start() {

    active = true;
  };

  // Stops to animate
  var _stop = function _stop() {

    active = false;
  };

  // Destroys the instance
  var _destroy = function _destroy() {

    // Replace instance instead of deleting the item to avoid
    // that the index of other instances changes.
    instances[index] = undefined;
  };

  // Assign instance to a variable so the instance can be used
  // elsewhere in the current function.
  var instance = {
    isActive: _isActive,
    getData: _getData,
    calculate: _calculate,
    update: _update,
    start: _start,
    stop: _stop,
    destroy: _destroy

    // Store instance in global array and save the index
  };var index = instances.push(instance) - 1;

  // Calculate data for the first time
  instance.calculate();

  return instance;
};

// Only run basicScroll when executed in a browser environment
if (isBrowser === true) {

  // Start to loop
  loop();

  // Recalculate and update instances when the window size changes
  window.addEventListener('resize', debounce(function () {

    // Get all tracked instances
    var trackedInstances = getTrackedInstances(instances);

    trackedInstances.forEach(function (instance) {
      instance.calculate();
      instance.update();
    });
  }, 50));
} else {

  console.warn('basicScroll is not executing because you are using it in an environment without a `window` object');
}

},{"eases":19,"parse-unit":33}]},{},[34])(34)
});

export { basicScroll }
