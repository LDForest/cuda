(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _circles = require('./circles');

var _circles2 = _interopRequireDefault(_circles);

var _tabs = require('./tabs');

var _tabs2 = _interopRequireDefault(_tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _circles2.default)();
(0, _tabs2.default)();

},{"./circles":2,"./tabs":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Circles = require('Circles');

var _Circles2 = _interopRequireDefault(_Circles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var circles = document.querySelectorAll('.circle');
var colors = ["#30bae7", "#d74680", "#15c7a8", "#eb7d4b"];

function getRandomOf(arr) {
	var num = Math.floor(Math.random() * arr.length);
	return arr[num];
}
var createCircles = function createCircles() {
	return circles.forEach(function (item, i) {
		var id = item.getAttribute('id');
		var color = colors[i] || getRandomOf(colors);
		var value = item.innerText;
		_Circles2.default.create({
			id: id,
			radius: 80,
			value: value,
			maxValue: 100,
			width: 10,
			text: function text(value) {
				return value + '%';
			},
			colors: ['#dfe8ed', color],
			duration: 400,
			wrpClass: 'circles-wrp',
			textClass: 'circles-text',
			styleWrapper: true,
			styleText: true
		});
	});
};

exports.default = createCircles;

},{"Circles":3}],3:[function(require,module,exports){
(function (global){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;var __browserify_shim_require__ = require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
  /**
   * circles - v0.0.6 - 2015-11-27
   *
   * Copyright (c) 2015 lugolabs
   * Licensed 
   */
  !function (a, b) {
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = b() : "function" == typeof define && define.amd ? define([], b) : a.Circles = b();
  }(this, function () {
    "use strict";
    var a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
      setTimeout(a, 1e3 / 60);
    },
        b = function b(a) {
      var b = a.id;if (this._el = document.getElementById(b), null !== this._el) {
        this._radius = a.radius || 10, this._duration = void 0 === a.duration ? 500 : a.duration, this._value = 0, this._maxValue = a.maxValue || 100, this._text = void 0 === a.text ? function (a) {
          return this.htmlifyNumber(a);
        } : a.text, this._strokeWidth = a.width || 10, this._colors = a.colors || ["#EEE", "#F00"], this._svg = null, this._movingPath = null, this._wrapContainer = null, this._textContainer = null, this._wrpClass = a.wrpClass || "circles-wrp", this._textClass = a.textClass || "circles-text", this._valClass = a.valueStrokeClass || "circles-valueStroke", this._maxValClass = a.maxValueStrokeClass || "circles-maxValueStroke", this._styleWrapper = a.styleWrapper === !1 ? !1 : !0, this._styleText = a.styleText === !1 ? !1 : !0;var c = Math.PI / 180 * 270;this._start = -Math.PI / 180 * 90, this._startPrecise = this._precise(this._start), this._circ = c - this._start, this._generate().update(a.value || 0);
      }
    };return b.prototype = { VERSION: "0.0.6", _generate: function _generate() {
        return this._svgSize = 2 * this._radius, this._radiusAdjusted = this._radius - this._strokeWidth / 2, this._generateSvg()._generateText()._generateWrapper(), this._el.innerHTML = "", this._el.appendChild(this._wrapContainer), this;
      }, _setPercentage: function _setPercentage(a) {
        this._movingPath.setAttribute("d", this._calculatePath(a, !0)), this._textContainer.innerHTML = this._getText(this.getValueFromPercent(a));
      }, _generateWrapper: function _generateWrapper() {
        return this._wrapContainer = document.createElement("div"), this._wrapContainer.className = this._wrpClass, this._styleWrapper && (this._wrapContainer.style.position = "relative", this._wrapContainer.style.display = "inline-block"), this._wrapContainer.appendChild(this._svg), this._wrapContainer.appendChild(this._textContainer), this;
      }, _generateText: function _generateText() {
        if (this._textContainer = document.createElement("div"), this._textContainer.className = this._textClass, this._styleText) {
          var a = { position: "absolute", top: 0, left: 0, textAlign: "center", width: "100%", fontSize: .7 * this._radius + "px", height: this._svgSize + "px", lineHeight: this._svgSize + "px" };for (var b in a) {
            this._textContainer.style[b] = a[b];
          }
        }return this._textContainer.innerHTML = this._getText(0), this;
      }, _getText: function _getText(a) {
        return this._text ? (void 0 === a && (a = this._value), a = parseFloat(a.toFixed(2)), "function" == typeof this._text ? this._text.call(this, a) : this._text) : "";
      }, _generateSvg: function _generateSvg() {
        return this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this._svg.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this._svg.setAttribute("width", this._svgSize), this._svg.setAttribute("height", this._svgSize), this._generatePath(100, !1, this._colors[0], this._maxValClass)._generatePath(1, !0, this._colors[1], this._valClass), this._movingPath = this._svg.getElementsByTagName("path")[1], this;
      }, _generatePath: function _generatePath(a, b, c, d) {
        var e = document.createElementNS("http://www.w3.org/2000/svg", "path");return e.setAttribute("fill", "transparent"), e.setAttribute("stroke", c), e.setAttribute("stroke-width", this._strokeWidth), e.setAttribute("d", this._calculatePath(a, b)), e.setAttribute("class", d), this._svg.appendChild(e), this;
      }, _calculatePath: function _calculatePath(a, b) {
        var c = this._start + a / 100 * this._circ,
            d = this._precise(c);return this._arc(d, b);
      }, _arc: function _arc(a, b) {
        var c = a - .001,
            d = a - this._startPrecise < Math.PI ? 0 : 1;return ["M", this._radius + this._radiusAdjusted * Math.cos(this._startPrecise), this._radius + this._radiusAdjusted * Math.sin(this._startPrecise), "A", this._radiusAdjusted, this._radiusAdjusted, 0, d, 1, this._radius + this._radiusAdjusted * Math.cos(c), this._radius + this._radiusAdjusted * Math.sin(c), b ? "" : "Z"].join(" ");
      }, _precise: function _precise(a) {
        return Math.round(1e3 * a) / 1e3;
      }, htmlifyNumber: function htmlifyNumber(a, b, c) {
        b = b || "circles-integer", c = c || "circles-decimals";var d = (a + "").split("."),
            e = '<span class="' + b + '">' + d[0] + "</span>";return d.length > 1 && (e += '.<span class="' + c + '">' + d[1].substring(0, 2) + "</span>"), e;
      }, updateRadius: function updateRadius(a) {
        return this._radius = a, this._generate().update(!0);
      }, updateWidth: function updateWidth(a) {
        return this._strokeWidth = a, this._generate().update(!0);
      }, updateColors: function updateColors(a) {
        this._colors = a;var b = this._svg.getElementsByTagName("path");return b[0].setAttribute("stroke", a[0]), b[1].setAttribute("stroke", a[1]), this;
      }, getPercent: function getPercent() {
        return 100 * this._value / this._maxValue;
      }, getValueFromPercent: function getValueFromPercent(a) {
        return this._maxValue * a / 100;
      }, getValue: function getValue() {
        return this._value;
      }, getMaxValue: function getMaxValue() {
        return this._maxValue;
      }, update: function update(b, c) {
        if (b === !0) return this._setPercentage(this.getPercent()), this;if (this._value == b || isNaN(b)) return this;void 0 === c && (c = this._duration);var d,
            e,
            f,
            g,
            h = this,
            i = h.getPercent(),
            j = 1;return this._value = Math.min(this._maxValue, Math.max(0, b)), c ? (d = h.getPercent(), e = d > i, j += d % 1, f = Math.floor(Math.abs(d - i) / j), g = c / f, function k(b) {
          if (e ? i += j : i -= j, e && i >= d || !e && d >= i) return void a(function () {
            h._setPercentage(d);
          });a(function () {
            h._setPercentage(i);
          });var c = Date.now(),
              f = c - b;f >= g ? k(c) : setTimeout(function () {
            k(Date.now());
          }, g - f);
        }(Date.now()), this) : (this._setPercentage(this.getPercent()), this);
      } }, b.create = function (a) {
      return new b(a);
    }, b;
  });
  ;browserify_shim__define__module__export__(typeof Circles != "undefined" ? Circles : window.Circles);
}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) {
  module.exports = ex;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var tabs = document.querySelectorAll('.tab');
var content = document.querySelectorAll('.tab-content');

var createTabs = function createTabs() {
	tabs.forEach(tabsEvent);

	function tabsEvent(item) {
		item.addEventListener('click', eventListener);
	}

	function eventListener(evt) {
		evt.preventDefault();
		var target = evt.target;

		tabs.forEach(function (item) {
			return item.classList.remove('tab_active');
		});
		target.classList.add('tab_active');

		content.forEach(function (item) {
			return item.classList.remove('tab-content_active');
		});
		var active_content = '[data-tab-content="' + target.getAttribute('data-tab') + '"]';
		document.querySelector(active_content).classList.add('tab-content_active');
		console.log(document.querySelector(active_content));
	}
};
exports.default = createTabs;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcYXBwLmpzIiwianNcXGNpcmNsZXMuanMiLCJqc1xcZGVwc1xcanNcXGRlcHNcXGNpcmNsZXMubWluLmpzIiwianNcXHRhYnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7OztBQUNBO0FBQ0E7Ozs7Ozs7OztBQ0hBOzs7Ozs7QUFDQSxJQUFNLFVBQVUsU0FBUyxnQkFBVCxDQUEwQixTQUExQixDQUFoQjtBQUNBLElBQU0sU0FBUyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLENBQWY7O0FBRUEsU0FBUyxXQUFULENBQXFCLEdBQXJCLEVBQTBCO0FBQ3pCLEtBQU0sTUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsSUFBSSxNQUEvQixDQUFaO0FBQ0EsUUFBTyxJQUFJLEdBQUosQ0FBUDtBQUNBO0FBQ0QsSUFBTSxnQkFBZ0IsU0FBaEIsYUFBZ0I7QUFBQSxRQUFNLFFBQVEsT0FBUixDQUFnQixVQUFDLElBQUQsRUFBTyxDQUFQLEVBQWE7QUFDdkQsTUFBTSxLQUFLLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUFYO0FBQ0EsTUFBTSxRQUFRLE9BQU8sQ0FBUCxLQUFhLFlBQVksTUFBWixDQUEzQjtBQUNBLE1BQU0sUUFBUSxLQUFLLFNBQW5CO0FBQ0Esb0JBQVEsTUFBUixDQUFlO0FBQ2QsU0FEYztBQUVkLFdBQVEsRUFGTTtBQUdkLGVBSGM7QUFJZCxhQUFVLEdBSkk7QUFLZCxVQUFPLEVBTE87QUFNZCxTQUFNLGNBQVMsS0FBVCxFQUFnQjtBQUFFLFdBQU8sUUFBUSxHQUFmO0FBQXFCLElBTi9CO0FBT2QsV0FBUSxDQUFDLFNBQUQsRUFBWSxLQUFaLENBUE07QUFRZCxhQUFVLEdBUkk7QUFTZCxhQUFVLGFBVEk7QUFVZCxjQUFXLGNBVkc7QUFXZCxpQkFBYyxJQVhBO0FBWWQsY0FB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LENBQTBCLE1BQTFCLENBQWI7QUFDQSxJQUFNLFVBQVUsU0FBUyxnQkFBVCxDQUEwQixjQUExQixDQUFoQjs7QUFFQSxJQUFNLGFBQWEsU0FBYixVQUFhLEdBQU07QUFDeEIsTUFBSyxPQUFMLENBQWEsU0FBYjs7QUFFQSxVQUFTLFNBQVQsQ0FBbUIsSUFBbkIsRUFBeUI7QUFDeEIsT0FBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixhQUEvQjtBQUNBOztBQUVELFVBQVMsYUFBVCxDQUF1QixHQUF2QixFQUE0QjtBQUMzQixNQUFJLGNBQUo7QUFEMkIsTUFFbkIsTUFGbUIsR0FFUixHQUZRLENBRW5CLE1BRm1COztBQUczQixPQUFLLE9BQUwsQ0FBYTtBQUFBLFVBQVEsS0FBSyxTQUFMLENBQWUsTUFBZixDQUFzQixZQUF0QixDQUFSO0FBQUEsR0FBYjtBQUNBLFNBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQixZQUFyQjs7QUFFQSxVQUFRLE9BQVIsQ0FBZ0I7QUFBQSxVQUFRLEtBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0Isb0JBQXRCLENBQVI7QUFBQSxHQUFoQjtBQUNBLE1BQU0seUNBQXVDLE9BQU8sWUFBUCxDQUFvQixVQUFwQixDQUF2QyxPQUFOO0FBQ0EsV0FBUyxhQUFULENBQXVCLGNBQXZCLEVBQXVDLFNBQXZDLENBQWlELEdBQWpELENBQXFELG9CQUFyRDtBQUNBLFVBQVEsR0FBUixDQUFZLFNBQVMsYUFBVCxDQUF1QixjQUF2QixDQUFaO0FBQ0E7QUFDRCxDQWxCRDtrQkFtQmUsVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgY3JlYXRlQ2lyY2xlcyBmcm9tICcuL2NpcmNsZXMnO1xyXG5pbXBvcnQgdGFicyBmcm9tICcuL3RhYnMnXHJcbmNyZWF0ZUNpcmNsZXMoKVxyXG50YWJzKClcclxuIiwiaW1wb3J0IENpcmNsZXMgZnJvbSAnQ2lyY2xlcyc7XHJcbmNvbnN0IGNpcmNsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2lyY2xlJylcclxuY29uc3QgY29sb3JzID0gW1wiIzMwYmFlN1wiLCBcIiNkNzQ2ODBcIiwgXCIjMTVjN2E4XCIsIFwiI2ViN2Q0YlwiXVxyXG5cclxuZnVuY3Rpb24gZ2V0UmFuZG9tT2YoYXJyKSB7XHJcblx0Y29uc3QgbnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aClcclxuXHRyZXR1cm4gYXJyW251bV1cclxufVxyXG5jb25zdCBjcmVhdGVDaXJjbGVzID0gKCkgPT4gY2lyY2xlcy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XHJcblx0XHRjb25zdCBpZCA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdpZCcpXHJcblx0XHRjb25zdCBjb2xvciA9IGNvbG9yc1tpXSB8fCBnZXRSYW5kb21PZihjb2xvcnMpXHJcblx0XHRjb25zdCB2YWx1ZSA9IGl0ZW0uaW5uZXJUZXh0XHJcblx0XHRDaXJjbGVzLmNyZWF0ZSh7XHJcblx0XHRcdGlkLFxyXG5cdFx0XHRyYWRpdXM6IDgwLFxyXG5cdFx0XHR2YWx1ZSxcclxuXHRcdFx0bWF4VmFsdWU6IDEwMCxcclxuXHRcdFx0d2lkdGg6IDEwLFxyXG5cdFx0XHR0ZXh0OiBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWUgKyAnJSc7IH0sXHJcblx0XHRcdGNvbG9yczogWycjZGZlOGVkJywgY29sb3JdLFxyXG5cdFx0XHRkdXJhdGlvbjogNDAwLFxyXG5cdFx0XHR3cnBDbGFzczogJ2NpcmNsZXMtd3JwJyxcclxuXHRcdFx0dGV4dENsYXNzOiAnY2lyY2xlcy10ZXh0JyxcclxuXHRcdFx0c3R5bGVXcmFwcGVyOiB0cnVlLFxyXG5cdFx0XHRzdHlsZVRleHQ6IHRydWVcclxuXHRcdH0pXHJcblx0fSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNpcmNsZXMiLCI7IHZhciBfX2Jyb3dzZXJpZnlfc2hpbV9yZXF1aXJlX189cmVxdWlyZTsoZnVuY3Rpb24gYnJvd3NlcmlmeVNoaW0obW9kdWxlLCBleHBvcnRzLCByZXF1aXJlLCBkZWZpbmUsIGJyb3dzZXJpZnlfc2hpbV9fZGVmaW5lX19tb2R1bGVfX2V4cG9ydF9fKSB7XG4vKipcbiAqIGNpcmNsZXMgLSB2MC4wLjYgLSAyMDE1LTExLTI3XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1IGx1Z29sYWJzXG4gKiBMaWNlbnNlZCBcbiAqL1xuIWZ1bmN0aW9uKGEsYil7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9YigpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sYik6YS5DaXJjbGVzPWIoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBhPXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fGZ1bmN0aW9uKGEpe3NldFRpbWVvdXQoYSwxZTMvNjApfSxiPWZ1bmN0aW9uKGEpe3ZhciBiPWEuaWQ7aWYodGhpcy5fZWw9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYiksbnVsbCE9PXRoaXMuX2VsKXt0aGlzLl9yYWRpdXM9YS5yYWRpdXN8fDEwLHRoaXMuX2R1cmF0aW9uPXZvaWQgMD09PWEuZHVyYXRpb24/NTAwOmEuZHVyYXRpb24sdGhpcy5fdmFsdWU9MCx0aGlzLl9tYXhWYWx1ZT1hLm1heFZhbHVlfHwxMDAsdGhpcy5fdGV4dD12b2lkIDA9PT1hLnRleHQ/ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuaHRtbGlmeU51bWJlcihhKX06YS50ZXh0LHRoaXMuX3N0cm9rZVdpZHRoPWEud2lkdGh8fDEwLHRoaXMuX2NvbG9ycz1hLmNvbG9yc3x8W1wiI0VFRVwiLFwiI0YwMFwiXSx0aGlzLl9zdmc9bnVsbCx0aGlzLl9tb3ZpbmdQYXRoPW51bGwsdGhpcy5fd3JhcENvbnRhaW5lcj1udWxsLHRoaXMuX3RleHRDb250YWluZXI9bnVsbCx0aGlzLl93cnBDbGFzcz1hLndycENsYXNzfHxcImNpcmNsZXMtd3JwXCIsdGhpcy5fdGV4dENsYXNzPWEudGV4dENsYXNzfHxcImNpcmNsZXMtdGV4dFwiLHRoaXMuX3ZhbENsYXNzPWEudmFsdWVTdHJva2VDbGFzc3x8XCJjaXJjbGVzLXZhbHVlU3Ryb2tlXCIsdGhpcy5fbWF4VmFsQ2xhc3M9YS5tYXhWYWx1ZVN0cm9rZUNsYXNzfHxcImNpcmNsZXMtbWF4VmFsdWVTdHJva2VcIix0aGlzLl9zdHlsZVdyYXBwZXI9YS5zdHlsZVdyYXBwZXI9PT0hMT8hMTohMCx0aGlzLl9zdHlsZVRleHQ9YS5zdHlsZVRleHQ9PT0hMT8hMTohMDt2YXIgYz1NYXRoLlBJLzE4MCoyNzA7dGhpcy5fc3RhcnQ9LU1hdGguUEkvMTgwKjkwLHRoaXMuX3N0YXJ0UHJlY2lzZT10aGlzLl9wcmVjaXNlKHRoaXMuX3N0YXJ0KSx0aGlzLl9jaXJjPWMtdGhpcy5fc3RhcnQsdGhpcy5fZ2VuZXJhdGUoKS51cGRhdGUoYS52YWx1ZXx8MCl9fTtyZXR1cm4gYi5wcm90b3R5cGU9e1ZFUlNJT046XCIwLjAuNlwiLF9nZW5lcmF0ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9zdmdTaXplPTIqdGhpcy5fcmFkaXVzLHRoaXMuX3JhZGl1c0FkanVzdGVkPXRoaXMuX3JhZGl1cy10aGlzLl9zdHJva2VXaWR0aC8yLHRoaXMuX2dlbmVyYXRlU3ZnKCkuX2dlbmVyYXRlVGV4dCgpLl9nZW5lcmF0ZVdyYXBwZXIoKSx0aGlzLl9lbC5pbm5lckhUTUw9XCJcIix0aGlzLl9lbC5hcHBlbmRDaGlsZCh0aGlzLl93cmFwQ29udGFpbmVyKSx0aGlzfSxfc2V0UGVyY2VudGFnZTpmdW5jdGlvbihhKXt0aGlzLl9tb3ZpbmdQYXRoLnNldEF0dHJpYnV0ZShcImRcIix0aGlzLl9jYWxjdWxhdGVQYXRoKGEsITApKSx0aGlzLl90ZXh0Q29udGFpbmVyLmlubmVySFRNTD10aGlzLl9nZXRUZXh0KHRoaXMuZ2V0VmFsdWVGcm9tUGVyY2VudChhKSl9LF9nZW5lcmF0ZVdyYXBwZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JhcENvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLHRoaXMuX3dyYXBDb250YWluZXIuY2xhc3NOYW1lPXRoaXMuX3dycENsYXNzLHRoaXMuX3N0eWxlV3JhcHBlciYmKHRoaXMuX3dyYXBDb250YWluZXIuc3R5bGUucG9zaXRpb249XCJyZWxhdGl2ZVwiLHRoaXMuX3dyYXBDb250YWluZXIuc3R5bGUuZGlzcGxheT1cImlubGluZS1ibG9ja1wiKSx0aGlzLl93cmFwQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuX3N2ZyksdGhpcy5fd3JhcENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl90ZXh0Q29udGFpbmVyKSx0aGlzfSxfZ2VuZXJhdGVUZXh0OmZ1bmN0aW9uKCl7aWYodGhpcy5fdGV4dENvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLHRoaXMuX3RleHRDb250YWluZXIuY2xhc3NOYW1lPXRoaXMuX3RleHRDbGFzcyx0aGlzLl9zdHlsZVRleHQpe3ZhciBhPXtwb3NpdGlvbjpcImFic29sdXRlXCIsdG9wOjAsbGVmdDowLHRleHRBbGlnbjpcImNlbnRlclwiLHdpZHRoOlwiMTAwJVwiLGZvbnRTaXplOi43KnRoaXMuX3JhZGl1cytcInB4XCIsaGVpZ2h0OnRoaXMuX3N2Z1NpemUrXCJweFwiLGxpbmVIZWlnaHQ6dGhpcy5fc3ZnU2l6ZStcInB4XCJ9O2Zvcih2YXIgYiBpbiBhKXRoaXMuX3RleHRDb250YWluZXIuc3R5bGVbYl09YVtiXX1yZXR1cm4gdGhpcy5fdGV4dENvbnRhaW5lci5pbm5lckhUTUw9dGhpcy5fZ2V0VGV4dCgwKSx0aGlzfSxfZ2V0VGV4dDpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5fdGV4dD8odm9pZCAwPT09YSYmKGE9dGhpcy5fdmFsdWUpLGE9cGFyc2VGbG9hdChhLnRvRml4ZWQoMikpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMuX3RleHQ/dGhpcy5fdGV4dC5jYWxsKHRoaXMsYSk6dGhpcy5fdGV4dCk6XCJcIn0sX2dlbmVyYXRlU3ZnOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3N2Zz1kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFwic3ZnXCIpLHRoaXMuX3N2Zy5zZXRBdHRyaWJ1dGUoXCJ4bWxuc1wiLFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiksdGhpcy5fc3ZnLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsdGhpcy5fc3ZnU2l6ZSksdGhpcy5fc3ZnLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLHRoaXMuX3N2Z1NpemUpLHRoaXMuX2dlbmVyYXRlUGF0aCgxMDAsITEsdGhpcy5fY29sb3JzWzBdLHRoaXMuX21heFZhbENsYXNzKS5fZ2VuZXJhdGVQYXRoKDEsITAsdGhpcy5fY29sb3JzWzFdLHRoaXMuX3ZhbENsYXNzKSx0aGlzLl9tb3ZpbmdQYXRoPXRoaXMuX3N2Zy5nZXRFbGVtZW50c0J5VGFnTmFtZShcInBhdGhcIilbMV0sdGhpc30sX2dlbmVyYXRlUGF0aDpmdW5jdGlvbihhLGIsYyxkKXt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFwicGF0aFwiKTtyZXR1cm4gZS5zZXRBdHRyaWJ1dGUoXCJmaWxsXCIsXCJ0cmFuc3BhcmVudFwiKSxlLnNldEF0dHJpYnV0ZShcInN0cm9rZVwiLGMpLGUuc2V0QXR0cmlidXRlKFwic3Ryb2tlLXdpZHRoXCIsdGhpcy5fc3Ryb2tlV2lkdGgpLGUuc2V0QXR0cmlidXRlKFwiZFwiLHRoaXMuX2NhbGN1bGF0ZVBhdGgoYSxiKSksZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLGQpLHRoaXMuX3N2Zy5hcHBlbmRDaGlsZChlKSx0aGlzfSxfY2FsY3VsYXRlUGF0aDpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXMuX3N0YXJ0K2EvMTAwKnRoaXMuX2NpcmMsZD10aGlzLl9wcmVjaXNlKGMpO3JldHVybiB0aGlzLl9hcmMoZCxiKX0sX2FyYzpmdW5jdGlvbihhLGIpe3ZhciBjPWEtLjAwMSxkPWEtdGhpcy5fc3RhcnRQcmVjaXNlPE1hdGguUEk/MDoxO3JldHVybltcIk1cIix0aGlzLl9yYWRpdXMrdGhpcy5fcmFkaXVzQWRqdXN0ZWQqTWF0aC5jb3ModGhpcy5fc3RhcnRQcmVjaXNlKSx0aGlzLl9yYWRpdXMrdGhpcy5fcmFkaXVzQWRqdXN0ZWQqTWF0aC5zaW4odGhpcy5fc3RhcnRQcmVjaXNlKSxcIkFcIix0aGlzLl9yYWRpdXNBZGp1c3RlZCx0aGlzLl9yYWRpdXNBZGp1c3RlZCwwLGQsMSx0aGlzLl9yYWRpdXMrdGhpcy5fcmFkaXVzQWRqdXN0ZWQqTWF0aC5jb3MoYyksdGhpcy5fcmFkaXVzK3RoaXMuX3JhZGl1c0FkanVzdGVkKk1hdGguc2luKGMpLGI/XCJcIjpcIlpcIl0uam9pbihcIiBcIil9LF9wcmVjaXNlOmZ1bmN0aW9uKGEpe3JldHVybiBNYXRoLnJvdW5kKDFlMyphKS8xZTN9LGh0bWxpZnlOdW1iZXI6ZnVuY3Rpb24oYSxiLGMpe2I9Ynx8XCJjaXJjbGVzLWludGVnZXJcIixjPWN8fFwiY2lyY2xlcy1kZWNpbWFsc1wiO3ZhciBkPShhK1wiXCIpLnNwbGl0KFwiLlwiKSxlPSc8c3BhbiBjbGFzcz1cIicrYisnXCI+JytkWzBdK1wiPC9zcGFuPlwiO3JldHVybiBkLmxlbmd0aD4xJiYoZSs9Jy48c3BhbiBjbGFzcz1cIicrYysnXCI+JytkWzFdLnN1YnN0cmluZygwLDIpK1wiPC9zcGFuPlwiKSxlfSx1cGRhdGVSYWRpdXM6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuX3JhZGl1cz1hLHRoaXMuX2dlbmVyYXRlKCkudXBkYXRlKCEwKX0sdXBkYXRlV2lkdGg6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuX3N0cm9rZVdpZHRoPWEsdGhpcy5fZ2VuZXJhdGUoKS51cGRhdGUoITApfSx1cGRhdGVDb2xvcnM6ZnVuY3Rpb24oYSl7dGhpcy5fY29sb3JzPWE7dmFyIGI9dGhpcy5fc3ZnLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicGF0aFwiKTtyZXR1cm4gYlswXS5zZXRBdHRyaWJ1dGUoXCJzdHJva2VcIixhWzBdKSxiWzFdLnNldEF0dHJpYnV0ZShcInN0cm9rZVwiLGFbMV0pLHRoaXN9LGdldFBlcmNlbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gMTAwKnRoaXMuX3ZhbHVlL3RoaXMuX21heFZhbHVlfSxnZXRWYWx1ZUZyb21QZXJjZW50OmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLl9tYXhWYWx1ZSphLzEwMH0sZ2V0VmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fdmFsdWV9LGdldE1heFZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX21heFZhbHVlfSx1cGRhdGU6ZnVuY3Rpb24oYixjKXtpZihiPT09ITApcmV0dXJuIHRoaXMuX3NldFBlcmNlbnRhZ2UodGhpcy5nZXRQZXJjZW50KCkpLHRoaXM7aWYodGhpcy5fdmFsdWU9PWJ8fGlzTmFOKGIpKXJldHVybiB0aGlzO3ZvaWQgMD09PWMmJihjPXRoaXMuX2R1cmF0aW9uKTt2YXIgZCxlLGYsZyxoPXRoaXMsaT1oLmdldFBlcmNlbnQoKSxqPTE7cmV0dXJuIHRoaXMuX3ZhbHVlPU1hdGgubWluKHRoaXMuX21heFZhbHVlLE1hdGgubWF4KDAsYikpLGM/KGQ9aC5nZXRQZXJjZW50KCksZT1kPmksais9ZCUxLGY9TWF0aC5mbG9vcihNYXRoLmFicyhkLWkpL2opLGc9Yy9mLGZ1bmN0aW9uIGsoYil7aWYoZT9pKz1qOmktPWosZSYmaT49ZHx8IWUmJmQ+PWkpcmV0dXJuIHZvaWQgYShmdW5jdGlvbigpe2guX3NldFBlcmNlbnRhZ2UoZCl9KTthKGZ1bmN0aW9uKCl7aC5fc2V0UGVyY2VudGFnZShpKX0pO3ZhciBjPURhdGUubm93KCksZj1jLWI7Zj49Zz9rKGMpOnNldFRpbWVvdXQoZnVuY3Rpb24oKXtrKERhdGUubm93KCkpfSxnLWYpfShEYXRlLm5vdygpKSx0aGlzKToodGhpcy5fc2V0UGVyY2VudGFnZSh0aGlzLmdldFBlcmNlbnQoKSksdGhpcyl9fSxiLmNyZWF0ZT1mdW5jdGlvbihhKXtyZXR1cm4gbmV3IGIoYSl9LGJ9KTtcbjsgYnJvd3NlcmlmeV9zaGltX19kZWZpbmVfX21vZHVsZV9fZXhwb3J0X18odHlwZW9mIENpcmNsZXMgIT0gXCJ1bmRlZmluZWRcIiA/IENpcmNsZXMgOiB3aW5kb3cuQ2lyY2xlcyk7XG5cbn0pLmNhbGwoZ2xvYmFsLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGZ1bmN0aW9uIGRlZmluZUV4cG9ydChleCkgeyBtb2R1bGUuZXhwb3J0cyA9IGV4OyB9KTtcbiIsImNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiJylcclxuY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWItY29udGVudCcpXHJcblxyXG5jb25zdCBjcmVhdGVUYWJzID0gKCkgPT4ge1xyXG5cdHRhYnMuZm9yRWFjaCh0YWJzRXZlbnQpXHJcblxyXG5cdGZ1bmN0aW9uIHRhYnNFdmVudChpdGVtKSB7XHJcblx0XHRpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lcilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGV2ZW50TGlzdGVuZXIoZXZ0KSB7XHJcblx0XHRldnQucHJldmVudERlZmF1bHQoKVxyXG5cdFx0Y29uc3QgeyB0YXJnZXQgfSA9IGV2dFxyXG5cdFx0dGFicy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCd0YWJfYWN0aXZlJykpXHJcblx0XHR0YXJnZXQuY2xhc3NMaXN0LmFkZCgndGFiX2FjdGl2ZScpXHJcblxyXG5cdFx0Y29udGVudC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCd0YWItY29udGVudF9hY3RpdmUnKSlcclxuXHRcdGNvbnN0IGFjdGl2ZV9jb250ZW50ID0gYFtkYXRhLXRhYi1jb250ZW50PVwiJHt0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYicpfVwiXWBcclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYWN0aXZlX2NvbnRlbnQpLmNsYXNzTGlzdC5hZGQoJ3RhYi1jb250ZW50X2FjdGl2ZScpXHJcblx0XHRjb25zb2xlLmxvZyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFjdGl2ZV9jb250ZW50KSlcclxuXHR9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlVGFicyJdfQ==
