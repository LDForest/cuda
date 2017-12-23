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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcYXBwLmpzIiwianNcXGNpcmNsZXMuanMiLCJqc1xcZGVwc1xcanNcXGRlcHNcXGNpcmNsZXMubWluLmpzIiwianNcXHRhYnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7OztBQUNBO0FBQ0E7Ozs7Ozs7OztBQ0hBOzs7Ozs7QUFFQSxJQUFNLFVBQVUsU0FBUyxnQkFBVCxDQUEwQixTQUExQixDQUFoQjtBQUNBLElBQU0sU0FBUyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLENBQWY7O0FBRUEsU0FBUyxXQUFULENBQXFCLEdBQXJCLEVBQTBCO0FBQ3pCLEtBQU0sTUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsSUFBSSxNQUEvQixDQUFaO0FBQ0EsUUFBTyxJQUFJLEdBQUosQ0FBUDtBQUNBO0FBQ0QsSUFBTSxnQkFBZ0IsU0FBaEIsYUFBZ0I7QUFBQSxRQUFNLFFBQVEsT0FBUixDQUFnQixVQUFDLElBQUQsRUFBTyxDQUFQLEVBQWE7QUFDdkQsTUFBTSxLQUFLLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUFYO0FBQ0EsTUFBTSxRQUFRLE9BQU8sQ0FBUCxLQUFhLFlBQVksTUFBWixDQUEzQjtBQUNBLE1BQU0sUUFBUSxLQUFLLFNBQW5CO0FBQ0Esb0JBQVEsTUFBUixDQUFlO0FBQ2QsU0FEYztBQUVkLFdBQVEsRUFGTTtBQUdkLGVBSGM7QUFJZCxhQUFVLEdBSkk7QUFLZCxVQUFPLEVBTE87QUFNZCxTQUFNLGNBQVMsS0FBVCxFQUFnQjtBQUFFLFdBQU8sUUFBUSxHQUFmO0FBQXFCLElBTi9CO0FBT2QsV0FBUSxDQUFDLFNBQUQsRUFBWSxLQUFaLENBUE07QUFRZCxhQUFVLEdBUkk7QUFTZCxhQUFVLGFBVEk7QUFVZCxjQUFXLGNBVkc7QUFXZCxpQkFBYyxJQVhBO0FBWWQsY0FB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LENBQTBCLE1BQTFCLENBQWI7QUFDQSxJQUFNLFVBQVUsU0FBUyxnQkFBVCxDQUEwQixjQUExQixDQUFoQjs7QUFFQSxJQUFNLGFBQWEsU0FBYixVQUFhLEdBQU07QUFDeEIsTUFBSyxPQUFMLENBQWEsU0FBYjs7QUFFQSxVQUFTLFNBQVQsQ0FBbUIsSUFBbkIsRUFBeUI7QUFDeEIsT0FBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixhQUEvQjtBQUNBOztBQUVELFVBQVMsYUFBVCxDQUF1QixHQUF2QixFQUE0QjtBQUMzQixNQUFJLGNBQUo7QUFEMkIsTUFFbkIsTUFGbUIsR0FFUixHQUZRLENBRW5CLE1BRm1COztBQUczQixPQUFLLE9BQUwsQ0FBYTtBQUFBLFVBQVEsS0FBSyxTQUFMLENBQWUsTUFBZixDQUFzQixZQUF0QixDQUFSO0FBQUEsR0FBYjtBQUNBLFNBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFxQixZQUFyQjs7QUFFQSxVQUFRLE9BQVIsQ0FBZ0I7QUFBQSxVQUFRLEtBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0Isb0JBQXRCLENBQVI7QUFBQSxHQUFoQjtBQUNBLE1BQU0seUNBQXVDLE9BQU8sWUFBUCxDQUFvQixVQUFwQixDQUF2QyxPQUFOO0FBQ0EsV0FBUyxhQUFULENBQXVCLGNBQXZCLEVBQXVDLFNBQXZDLENBQWlELEdBQWpELENBQXFELG9CQUFyRDtBQUNBLFVBQVEsR0FBUixDQUFZLFNBQVMsYUFBVCxDQUF1QixjQUF2QixDQUFaO0FBQ0E7QUFDRCxDQWxCRDtrQkFtQmUsVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgY3JlYXRlQ2lyY2xlcyBmcm9tICcuL2NpcmNsZXMnO1xyXG5pbXBvcnQgdGFicyBmcm9tICcuL3RhYnMnXHJcbmNyZWF0ZUNpcmNsZXMoKVxyXG50YWJzKClcclxuIiwiaW1wb3J0IENpcmNsZXMgZnJvbSAnQ2lyY2xlcyc7XHJcblxyXG5jb25zdCBjaXJjbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNpcmNsZScpXHJcbmNvbnN0IGNvbG9ycyA9IFtcIiMzMGJhZTdcIiwgXCIjZDc0NjgwXCIsIFwiIzE1YzdhOFwiLCBcIiNlYjdkNGJcIl1cclxuXHJcbmZ1bmN0aW9uIGdldFJhbmRvbU9mKGFycikge1xyXG5cdGNvbnN0IG51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpXHJcblx0cmV0dXJuIGFycltudW1dXHJcbn1cclxuY29uc3QgY3JlYXRlQ2lyY2xlcyA9ICgpID0+IGNpcmNsZXMuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xyXG5cdFx0Y29uc3QgaWQgPSBpdGVtLmdldEF0dHJpYnV0ZSgnaWQnKVxyXG5cdFx0Y29uc3QgY29sb3IgPSBjb2xvcnNbaV0gfHwgZ2V0UmFuZG9tT2YoY29sb3JzKVxyXG5cdFx0Y29uc3QgdmFsdWUgPSBpdGVtLmlubmVyVGV4dFxyXG5cdFx0Q2lyY2xlcy5jcmVhdGUoe1xyXG5cdFx0XHRpZCxcclxuXHRcdFx0cmFkaXVzOiA4MCxcclxuXHRcdFx0dmFsdWUsXHJcblx0XHRcdG1heFZhbHVlOiAxMDAsXHJcblx0XHRcdHdpZHRoOiAxMCxcclxuXHRcdFx0dGV4dDogZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlICsgJyUnOyB9LFxyXG5cdFx0XHRjb2xvcnM6IFsnI2RmZThlZCcsIGNvbG9yXSxcclxuXHRcdFx0ZHVyYXRpb246IDQwMCxcclxuXHRcdFx0d3JwQ2xhc3M6ICdjaXJjbGVzLXdycCcsXHJcblx0XHRcdHRleHRDbGFzczogJ2NpcmNsZXMtdGV4dCcsXHJcblx0XHRcdHN0eWxlV3JhcHBlcjogdHJ1ZSxcclxuXHRcdFx0c3R5bGVUZXh0OiB0cnVlXHJcblx0XHR9KVxyXG5cdH0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDaXJjbGVzIiwiOyB2YXIgX19icm93c2VyaWZ5X3NoaW1fcmVxdWlyZV9fPXJlcXVpcmU7KGZ1bmN0aW9uIGJyb3dzZXJpZnlTaGltKG1vZHVsZSwgZXhwb3J0cywgcmVxdWlyZSwgZGVmaW5lLCBicm93c2VyaWZ5X3NoaW1fX2RlZmluZV9fbW9kdWxlX19leHBvcnRfXykge1xuLyoqXG4gKiBjaXJjbGVzIC0gdjAuMC42IC0gMjAxNS0xMS0yN1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSBsdWdvbGFic1xuICogTGljZW5zZWQgXG4gKi9cbiFmdW5jdGlvbihhLGIpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPWIoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLGIpOmEuQ2lyY2xlcz1iKCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgYT13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHx3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZXx8d2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxmdW5jdGlvbihhKXtzZXRUaW1lb3V0KGEsMWUzLzYwKX0sYj1mdW5jdGlvbihhKXt2YXIgYj1hLmlkO2lmKHRoaXMuX2VsPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGIpLG51bGwhPT10aGlzLl9lbCl7dGhpcy5fcmFkaXVzPWEucmFkaXVzfHwxMCx0aGlzLl9kdXJhdGlvbj12b2lkIDA9PT1hLmR1cmF0aW9uPzUwMDphLmR1cmF0aW9uLHRoaXMuX3ZhbHVlPTAsdGhpcy5fbWF4VmFsdWU9YS5tYXhWYWx1ZXx8MTAwLHRoaXMuX3RleHQ9dm9pZCAwPT09YS50ZXh0P2Z1bmN0aW9uKGEpe3JldHVybiB0aGlzLmh0bWxpZnlOdW1iZXIoYSl9OmEudGV4dCx0aGlzLl9zdHJva2VXaWR0aD1hLndpZHRofHwxMCx0aGlzLl9jb2xvcnM9YS5jb2xvcnN8fFtcIiNFRUVcIixcIiNGMDBcIl0sdGhpcy5fc3ZnPW51bGwsdGhpcy5fbW92aW5nUGF0aD1udWxsLHRoaXMuX3dyYXBDb250YWluZXI9bnVsbCx0aGlzLl90ZXh0Q29udGFpbmVyPW51bGwsdGhpcy5fd3JwQ2xhc3M9YS53cnBDbGFzc3x8XCJjaXJjbGVzLXdycFwiLHRoaXMuX3RleHRDbGFzcz1hLnRleHRDbGFzc3x8XCJjaXJjbGVzLXRleHRcIix0aGlzLl92YWxDbGFzcz1hLnZhbHVlU3Ryb2tlQ2xhc3N8fFwiY2lyY2xlcy12YWx1ZVN0cm9rZVwiLHRoaXMuX21heFZhbENsYXNzPWEubWF4VmFsdWVTdHJva2VDbGFzc3x8XCJjaXJjbGVzLW1heFZhbHVlU3Ryb2tlXCIsdGhpcy5fc3R5bGVXcmFwcGVyPWEuc3R5bGVXcmFwcGVyPT09ITE/ITE6ITAsdGhpcy5fc3R5bGVUZXh0PWEuc3R5bGVUZXh0PT09ITE/ITE6ITA7dmFyIGM9TWF0aC5QSS8xODAqMjcwO3RoaXMuX3N0YXJ0PS1NYXRoLlBJLzE4MCo5MCx0aGlzLl9zdGFydFByZWNpc2U9dGhpcy5fcHJlY2lzZSh0aGlzLl9zdGFydCksdGhpcy5fY2lyYz1jLXRoaXMuX3N0YXJ0LHRoaXMuX2dlbmVyYXRlKCkudXBkYXRlKGEudmFsdWV8fDApfX07cmV0dXJuIGIucHJvdG90eXBlPXtWRVJTSU9OOlwiMC4wLjZcIixfZ2VuZXJhdGU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fc3ZnU2l6ZT0yKnRoaXMuX3JhZGl1cyx0aGlzLl9yYWRpdXNBZGp1c3RlZD10aGlzLl9yYWRpdXMtdGhpcy5fc3Ryb2tlV2lkdGgvMix0aGlzLl9nZW5lcmF0ZVN2ZygpLl9nZW5lcmF0ZVRleHQoKS5fZ2VuZXJhdGVXcmFwcGVyKCksdGhpcy5fZWwuaW5uZXJIVE1MPVwiXCIsdGhpcy5fZWwuYXBwZW5kQ2hpbGQodGhpcy5fd3JhcENvbnRhaW5lciksdGhpc30sX3NldFBlcmNlbnRhZ2U6ZnVuY3Rpb24oYSl7dGhpcy5fbW92aW5nUGF0aC5zZXRBdHRyaWJ1dGUoXCJkXCIsdGhpcy5fY2FsY3VsYXRlUGF0aChhLCEwKSksdGhpcy5fdGV4dENvbnRhaW5lci5pbm5lckhUTUw9dGhpcy5fZ2V0VGV4dCh0aGlzLmdldFZhbHVlRnJvbVBlcmNlbnQoYSkpfSxfZ2VuZXJhdGVXcmFwcGVyOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3dyYXBDb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSx0aGlzLl93cmFwQ29udGFpbmVyLmNsYXNzTmFtZT10aGlzLl93cnBDbGFzcyx0aGlzLl9zdHlsZVdyYXBwZXImJih0aGlzLl93cmFwQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uPVwicmVsYXRpdmVcIix0aGlzLl93cmFwQ29udGFpbmVyLnN0eWxlLmRpc3BsYXk9XCJpbmxpbmUtYmxvY2tcIiksdGhpcy5fd3JhcENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl9zdmcpLHRoaXMuX3dyYXBDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5fdGV4dENvbnRhaW5lciksdGhpc30sX2dlbmVyYXRlVGV4dDpmdW5jdGlvbigpe2lmKHRoaXMuX3RleHRDb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSx0aGlzLl90ZXh0Q29udGFpbmVyLmNsYXNzTmFtZT10aGlzLl90ZXh0Q2xhc3MsdGhpcy5fc3R5bGVUZXh0KXt2YXIgYT17cG9zaXRpb246XCJhYnNvbHV0ZVwiLHRvcDowLGxlZnQ6MCx0ZXh0QWxpZ246XCJjZW50ZXJcIix3aWR0aDpcIjEwMCVcIixmb250U2l6ZTouNyp0aGlzLl9yYWRpdXMrXCJweFwiLGhlaWdodDp0aGlzLl9zdmdTaXplK1wicHhcIixsaW5lSGVpZ2h0OnRoaXMuX3N2Z1NpemUrXCJweFwifTtmb3IodmFyIGIgaW4gYSl0aGlzLl90ZXh0Q29udGFpbmVyLnN0eWxlW2JdPWFbYl19cmV0dXJuIHRoaXMuX3RleHRDb250YWluZXIuaW5uZXJIVE1MPXRoaXMuX2dldFRleHQoMCksdGhpc30sX2dldFRleHQ6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuX3RleHQ/KHZvaWQgMD09PWEmJihhPXRoaXMuX3ZhbHVlKSxhPXBhcnNlRmxvYXQoYS50b0ZpeGVkKDIpKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLl90ZXh0P3RoaXMuX3RleHQuY2FsbCh0aGlzLGEpOnRoaXMuX3RleHQpOlwiXCJ9LF9nZW5lcmF0ZVN2ZzpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9zdmc9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcInN2Z1wiKSx0aGlzLl9zdmcuc2V0QXR0cmlidXRlKFwieG1sbnNcIixcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIpLHRoaXMuX3N2Zy5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLHRoaXMuX3N2Z1NpemUpLHRoaXMuX3N2Zy5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIix0aGlzLl9zdmdTaXplKSx0aGlzLl9nZW5lcmF0ZVBhdGgoMTAwLCExLHRoaXMuX2NvbG9yc1swXSx0aGlzLl9tYXhWYWxDbGFzcykuX2dlbmVyYXRlUGF0aCgxLCEwLHRoaXMuX2NvbG9yc1sxXSx0aGlzLl92YWxDbGFzcyksdGhpcy5fbW92aW5nUGF0aD10aGlzLl9zdmcuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwYXRoXCIpWzFdLHRoaXN9LF9nZW5lcmF0ZVBhdGg6ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcInBhdGhcIik7cmV0dXJuIGUuc2V0QXR0cmlidXRlKFwiZmlsbFwiLFwidHJhbnNwYXJlbnRcIiksZS5zZXRBdHRyaWJ1dGUoXCJzdHJva2VcIixjKSxlLnNldEF0dHJpYnV0ZShcInN0cm9rZS13aWR0aFwiLHRoaXMuX3N0cm9rZVdpZHRoKSxlLnNldEF0dHJpYnV0ZShcImRcIix0aGlzLl9jYWxjdWxhdGVQYXRoKGEsYikpLGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixkKSx0aGlzLl9zdmcuYXBwZW5kQ2hpbGQoZSksdGhpc30sX2NhbGN1bGF0ZVBhdGg6ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLl9zdGFydCthLzEwMCp0aGlzLl9jaXJjLGQ9dGhpcy5fcHJlY2lzZShjKTtyZXR1cm4gdGhpcy5fYXJjKGQsYil9LF9hcmM6ZnVuY3Rpb24oYSxiKXt2YXIgYz1hLS4wMDEsZD1hLXRoaXMuX3N0YXJ0UHJlY2lzZTxNYXRoLlBJPzA6MTtyZXR1cm5bXCJNXCIsdGhpcy5fcmFkaXVzK3RoaXMuX3JhZGl1c0FkanVzdGVkKk1hdGguY29zKHRoaXMuX3N0YXJ0UHJlY2lzZSksdGhpcy5fcmFkaXVzK3RoaXMuX3JhZGl1c0FkanVzdGVkKk1hdGguc2luKHRoaXMuX3N0YXJ0UHJlY2lzZSksXCJBXCIsdGhpcy5fcmFkaXVzQWRqdXN0ZWQsdGhpcy5fcmFkaXVzQWRqdXN0ZWQsMCxkLDEsdGhpcy5fcmFkaXVzK3RoaXMuX3JhZGl1c0FkanVzdGVkKk1hdGguY29zKGMpLHRoaXMuX3JhZGl1cyt0aGlzLl9yYWRpdXNBZGp1c3RlZCpNYXRoLnNpbihjKSxiP1wiXCI6XCJaXCJdLmpvaW4oXCIgXCIpfSxfcHJlY2lzZTpmdW5jdGlvbihhKXtyZXR1cm4gTWF0aC5yb3VuZCgxZTMqYSkvMWUzfSxodG1saWZ5TnVtYmVyOmZ1bmN0aW9uKGEsYixjKXtiPWJ8fFwiY2lyY2xlcy1pbnRlZ2VyXCIsYz1jfHxcImNpcmNsZXMtZGVjaW1hbHNcIjt2YXIgZD0oYStcIlwiKS5zcGxpdChcIi5cIiksZT0nPHNwYW4gY2xhc3M9XCInK2IrJ1wiPicrZFswXStcIjwvc3Bhbj5cIjtyZXR1cm4gZC5sZW5ndGg+MSYmKGUrPScuPHNwYW4gY2xhc3M9XCInK2MrJ1wiPicrZFsxXS5zdWJzdHJpbmcoMCwyKStcIjwvc3Bhbj5cIiksZX0sdXBkYXRlUmFkaXVzOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLl9yYWRpdXM9YSx0aGlzLl9nZW5lcmF0ZSgpLnVwZGF0ZSghMCl9LHVwZGF0ZVdpZHRoOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLl9zdHJva2VXaWR0aD1hLHRoaXMuX2dlbmVyYXRlKCkudXBkYXRlKCEwKX0sdXBkYXRlQ29sb3JzOmZ1bmN0aW9uKGEpe3RoaXMuX2NvbG9ycz1hO3ZhciBiPXRoaXMuX3N2Zy5nZXRFbGVtZW50c0J5VGFnTmFtZShcInBhdGhcIik7cmV0dXJuIGJbMF0uc2V0QXR0cmlidXRlKFwic3Ryb2tlXCIsYVswXSksYlsxXS5zZXRBdHRyaWJ1dGUoXCJzdHJva2VcIixhWzFdKSx0aGlzfSxnZXRQZXJjZW50OmZ1bmN0aW9uKCl7cmV0dXJuIDEwMCp0aGlzLl92YWx1ZS90aGlzLl9tYXhWYWx1ZX0sZ2V0VmFsdWVGcm9tUGVyY2VudDpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5fbWF4VmFsdWUqYS8xMDB9LGdldFZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3ZhbHVlfSxnZXRNYXhWYWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9tYXhWYWx1ZX0sdXBkYXRlOmZ1bmN0aW9uKGIsYyl7aWYoYj09PSEwKXJldHVybiB0aGlzLl9zZXRQZXJjZW50YWdlKHRoaXMuZ2V0UGVyY2VudCgpKSx0aGlzO2lmKHRoaXMuX3ZhbHVlPT1ifHxpc05hTihiKSlyZXR1cm4gdGhpczt2b2lkIDA9PT1jJiYoYz10aGlzLl9kdXJhdGlvbik7dmFyIGQsZSxmLGcsaD10aGlzLGk9aC5nZXRQZXJjZW50KCksaj0xO3JldHVybiB0aGlzLl92YWx1ZT1NYXRoLm1pbih0aGlzLl9tYXhWYWx1ZSxNYXRoLm1heCgwLGIpKSxjPyhkPWguZ2V0UGVyY2VudCgpLGU9ZD5pLGorPWQlMSxmPU1hdGguZmxvb3IoTWF0aC5hYnMoZC1pKS9qKSxnPWMvZixmdW5jdGlvbiBrKGIpe2lmKGU/aSs9ajppLT1qLGUmJmk+PWR8fCFlJiZkPj1pKXJldHVybiB2b2lkIGEoZnVuY3Rpb24oKXtoLl9zZXRQZXJjZW50YWdlKGQpfSk7YShmdW5jdGlvbigpe2guX3NldFBlcmNlbnRhZ2UoaSl9KTt2YXIgYz1EYXRlLm5vdygpLGY9Yy1iO2Y+PWc/ayhjKTpzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ayhEYXRlLm5vdygpKX0sZy1mKX0oRGF0ZS5ub3coKSksdGhpcyk6KHRoaXMuX3NldFBlcmNlbnRhZ2UodGhpcy5nZXRQZXJjZW50KCkpLHRoaXMpfX0sYi5jcmVhdGU9ZnVuY3Rpb24oYSl7cmV0dXJuIG5ldyBiKGEpfSxifSk7XG47IGJyb3dzZXJpZnlfc2hpbV9fZGVmaW5lX19tb2R1bGVfX2V4cG9ydF9fKHR5cGVvZiBDaXJjbGVzICE9IFwidW5kZWZpbmVkXCIgPyBDaXJjbGVzIDogd2luZG93LkNpcmNsZXMpO1xuXG59KS5jYWxsKGdsb2JhbCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmdW5jdGlvbiBkZWZpbmVFeHBvcnQoZXgpIHsgbW9kdWxlLmV4cG9ydHMgPSBleDsgfSk7XG4iLCJjb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYicpXHJcbmNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFiLWNvbnRlbnQnKVxyXG5cclxuY29uc3QgY3JlYXRlVGFicyA9ICgpID0+IHtcclxuXHR0YWJzLmZvckVhY2godGFic0V2ZW50KVxyXG5cclxuXHRmdW5jdGlvbiB0YWJzRXZlbnQoaXRlbSkge1xyXG5cdFx0aXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50TGlzdGVuZXIpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBldmVudExpc3RlbmVyKGV2dCkge1xyXG5cdFx0ZXZ0LnByZXZlbnREZWZhdWx0KClcclxuXHRcdGNvbnN0IHsgdGFyZ2V0IH0gPSBldnRcclxuXHRcdHRhYnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgndGFiX2FjdGl2ZScpKVxyXG5cdFx0dGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3RhYl9hY3RpdmUnKVxyXG5cclxuXHRcdGNvbnRlbnQuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgndGFiLWNvbnRlbnRfYWN0aXZlJykpXHJcblx0XHRjb25zdCBhY3RpdmVfY29udGVudCA9IGBbZGF0YS10YWItY29udGVudD1cIiR7dGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS10YWInKX1cIl1gXHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFjdGl2ZV9jb250ZW50KS5jbGFzc0xpc3QuYWRkKCd0YWItY29udGVudF9hY3RpdmUnKVxyXG5cdFx0Y29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhY3RpdmVfY29udGVudCkpXHJcblx0fVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVRhYnMiXX0=
