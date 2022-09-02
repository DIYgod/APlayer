(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("APlayer", [], factory);
	else if(typeof exports === 'object')
		exports["APlayer"] = factory();
	else
		root["APlayer"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_art-template@4.13.2@art-template/lib/compile/runtime.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/_art-template@4.13.2@art-template/lib/compile/runtime.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
/*! art-template@runtime | https://github.com/aui/art-template */

var globalThis = typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
var runtime = Object.create(globalThis);
var ESCAPE_REG = /["&'<>]/;
/**
 * 编码模板输出的内容
 * @param  {any}        content
 * @return {string}
 */

runtime.$escape = function (content) {
  return xmlEscape(toString(content));
};
/**
 * 迭代器，支持数组与对象
 * @param {array|Object} data
 * @param {function}     callback
 */


runtime.$each = function (data, callback) {
  if (Array.isArray(data)) {
    for (var i = 0, len = data.length; i < len; i++) {
      callback(data[i], i);
    }
  } else {
    for (var _i in data) {
      callback(data[_i], _i);
    }
  }
}; // 将目标转成字符


function toString(value) {
  if (typeof value !== 'string') {
    if (value === undefined || value === null) {
      value = '';
    } else if (typeof value === 'function') {
      value = toString(value.call(value));
    } else {
      value = JSON.stringify(value);
    }
  }

  return value;
} // 编码 HTML 内容


function xmlEscape(content) {
  var html = '' + content;
  var regexResult = ESCAPE_REG.exec(html);

  if (!regexResult) {
    return content;
  }

  var result = '';

  var i = void 0,
      lastIndex = void 0,
      _char = void 0;

  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34:
        _char = '&#34;';
        break;

      case 38:
        _char = '&#38;';
        break;

      case 39:
        _char = '&#39;';
        break;

      case 60:
        _char = '&#60;';
        break;

      case 62:
        _char = '&#62;';
        break;

      default:
        continue;
    }

    if (lastIndex !== i) {
      result += html.substring(lastIndex, i);
    }

    lastIndex = i + 1;
    result += _char;
  }

  if (lastIndex !== i) {
    return result + html.substring(lastIndex, i);
  } else {
    return result;
  }
}

module.exports = runtime;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../_webpack@4.46.0@webpack/buildin/global.js */ "./node_modules/_webpack@4.46.0@webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/_art-template@4.13.2@art-template/lib/runtime.js":
/*!***********************************************************************!*\
  !*** ./node_modules/_art-template@4.13.2@art-template/lib/runtime.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./compile/runtime */ "./node_modules/_art-template@4.13.2@art-template/lib/compile/runtime.js");

/***/ }),

/***/ "./node_modules/_css-loader@5.2.7@css-loader/dist/cjs.js?!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@10.3.1@sass-loader/dist/cjs.js!./src/css/index.scss":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_css-loader@5.2.7@css-loader/dist/cjs.js??ref--5-1!./node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--5-2!./node_modules/_sass-loader@10.3.1@sass-loader/dist/cjs.js!./src/css/index.scss ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_5_2_7_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/_css-loader@5.2.7@css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/_css-loader@5.2.7@css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_5_2_7_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_5_2_7_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_5_2_7_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/_css-loader@5.2.7@css-loader/dist/runtime/api.js */ "./node_modules/_css-loader@5.2.7@css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_5_2_7_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_5_2_7_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_5_2_7_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_5_2_7_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".aplayer{background:#fff;font-family:Arial,Helvetica,sans-serif;margin:5px;box-shadow:0 2px 2px 0 rgba(0,0,0,.07),0 1px 5px 0 rgba(0,0,0,.1);border-radius:2px;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;user-select:none;line-height:normal;position:relative}.aplayer *{box-sizing:content-box}.aplayer svg{width:100%;height:100%}.aplayer svg circle,.aplayer svg path{fill:#fff}.aplayer.aplayer-withlist .aplayer-info{border-bottom:1px solid #e9e9e9}.aplayer.aplayer-withlist .aplayer-list{display:block}.aplayer.aplayer-withlist .aplayer-icon-order,.aplayer.aplayer-withlist .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon.aplayer-icon-menu{display:inline}.aplayer.aplayer-withlrc .aplayer-pic{height:90px;width:90px}.aplayer.aplayer-withlrc .aplayer-info{margin-left:90px;height:90px;padding:10px 7px 0}.aplayer.aplayer-withlrc .aplayer-lrc{display:block}.aplayer.aplayer-narrow{width:66px}.aplayer.aplayer-narrow .aplayer-info,.aplayer.aplayer-narrow .aplayer-list{display:none}.aplayer.aplayer-narrow .aplayer-body,.aplayer.aplayer-narrow .aplayer-pic{height:66px;width:66px}.aplayer.aplayer-fixed{position:fixed;bottom:0;left:0;right:0;margin:0;z-index:99;overflow:visible;max-width:400px;box-shadow:none}.aplayer.aplayer-fixed .aplayer-list{margin-bottom:65px;border:1px solid #eee;border-bottom:none}.aplayer.aplayer-fixed .aplayer-body{position:fixed;bottom:0;left:0;right:0;margin:0;z-index:99;background:#fff;padding-right:18px;transition:all .3s ease;max-width:400px}.aplayer.aplayer-fixed .aplayer-lrc{display:block;position:fixed;bottom:10px;left:0;right:0;margin:0;z-index:98;pointer-events:none;text-shadow:-1px -1px 0 #fff}.aplayer.aplayer-fixed .aplayer-lrc:after,.aplayer.aplayer-fixed .aplayer-lrc:before{display:none}.aplayer.aplayer-fixed .aplayer-info{transform:scaleX(1);transform-origin:0 0;transition:all .3s ease;border-bottom:none;border-top:1px solid #e9e9e9}.aplayer.aplayer-fixed .aplayer-info .aplayer-music{width:calc(100% - 105px)}.aplayer.aplayer-fixed .aplayer-miniswitcher{display:block}.aplayer.aplayer-fixed.aplayer-narrow .aplayer-info{display:block;transform:scaleX(0)}.aplayer.aplayer-fixed.aplayer-narrow .aplayer-body{width:66px!important}.aplayer.aplayer-fixed.aplayer-narrow .aplayer-miniswitcher .aplayer-icon{transform:rotateY(0)}.aplayer.aplayer-fixed .aplayer-icon-back,.aplayer.aplayer-fixed .aplayer-icon-forward,.aplayer.aplayer-fixed .aplayer-icon-lrc,.aplayer.aplayer-fixed .aplayer-icon-play{display:inline-block}.aplayer.aplayer-fixed .aplayer-icon-back,.aplayer.aplayer-fixed .aplayer-icon-forward,.aplayer.aplayer-fixed .aplayer-icon-menu,.aplayer.aplayer-fixed .aplayer-icon-play{position:absolute;bottom:27px;width:20px;height:20px}.aplayer.aplayer-fixed .aplayer-icon-back{right:75px}.aplayer.aplayer-fixed .aplayer-icon-play{right:50px}.aplayer.aplayer-fixed .aplayer-icon-forward{right:25px}.aplayer.aplayer-fixed .aplayer-icon-menu{right:0}.aplayer.aplayer-arrow .aplayer-icon-loop,.aplayer.aplayer-arrow .aplayer-icon-order,.aplayer.aplayer-mobile .aplayer-icon-volume-down{display:none}.aplayer.aplayer-loading .aplayer-info .aplayer-controller .aplayer-loading-icon{display:block}.aplayer.aplayer-loading .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played .aplayer-thumb{transform:scale(1)}.aplayer .aplayer-body{position:relative}.aplayer .aplayer-icon{width:15px;height:15px;border:none;background-color:transparent;outline:none;cursor:pointer;opacity:.8;vertical-align:middle;padding:0;font-size:12px;margin:0;display:inline-block}.aplayer .aplayer-icon path{transition:all .2s ease-in-out}.aplayer .aplayer-icon-back,.aplayer .aplayer-icon-forward,.aplayer .aplayer-icon-lrc,.aplayer .aplayer-icon-order,.aplayer .aplayer-icon-play{display:none}.aplayer .aplayer-icon-lrc-inactivity svg{opacity:.4}.aplayer .aplayer-icon-forward{transform:rotate(180deg)}.aplayer .aplayer-lrc-content{display:none}.aplayer .aplayer-pic{position:relative;float:left;height:66px;width:66px;background-size:cover;background-position:50%;transition:all .3s ease;cursor:pointer}.aplayer .aplayer-pic:hover .aplayer-button{opacity:1}.aplayer .aplayer-pic .aplayer-button{position:absolute;border-radius:50%;opacity:.8;text-shadow:0 1px 1px rgba(0,0,0,.2);box-shadow:0 1px 1px rgba(0,0,0,.2);background:rgba(0,0,0,.2);transition:all .1s ease}.aplayer .aplayer-pic .aplayer-button path{fill:#fff}.aplayer .aplayer-pic .aplayer-hide{display:none}.aplayer .aplayer-pic .aplayer-play{width:26px;height:26px;border:2px solid #fff;bottom:50%;right:50%;margin:0 -15px -15px 0}.aplayer .aplayer-pic .aplayer-play svg{position:absolute;top:3px;left:4px;height:20px;width:20px}.aplayer .aplayer-pic .aplayer-pause{width:16px;height:16px;border:2px solid #fff;bottom:4px;right:4px}.aplayer .aplayer-pic .aplayer-pause svg{position:absolute;top:2px;left:2px;height:12px;width:12px}.aplayer .aplayer-info{margin-left:66px;padding:14px 7px 0 10px;height:66px;box-sizing:border-box}.aplayer .aplayer-info .aplayer-music{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:0 0 13px 5px;-webkit-user-select:text;-moz-user-select:text;user-select:text;cursor:default;padding-bottom:2px;height:20px}.aplayer .aplayer-info .aplayer-music .aplayer-title{font-size:14px}.aplayer .aplayer-info .aplayer-music .aplayer-author{font-size:12px;color:#666}.aplayer .aplayer-info .aplayer-controller{position:relative;display:flex}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap{margin:0 0 0 5px;padding:4px 0;cursor:pointer!important;flex:1}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap:hover .aplayer-bar .aplayer-played .aplayer-thumb{transform:scale(1)}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar{position:relative;height:2px;width:100%;background:#cdcdcd}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-loaded{position:absolute;left:0;top:0;bottom:0;background:#aaa;height:2px;transition:all .5s ease}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played{position:absolute;left:0;top:0;bottom:0;height:2px}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played .aplayer-thumb{position:absolute;top:0;right:5px;margin-top:-4px;margin-right:-10px;height:10px;width:10px;border-radius:50%;cursor:pointer;transition:all .3s ease-in-out;transform:scale(0)}.aplayer .aplayer-info .aplayer-controller .aplayer-time{position:relative;right:0;bottom:4px;height:17px;color:#999;font-size:11px;padding-left:7px}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-time-inner{vertical-align:middle}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon{cursor:pointer;transition:all .2s ease}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon path{fill:#666}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon.aplayer-icon-loop{margin-right:2px}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon:hover path{fill:#000}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon.aplayer-icon-menu,.aplayer .aplayer-info .aplayer-controller .aplayer-time.aplayer-time-narrow .aplayer-icon-menu,.aplayer .aplayer-info .aplayer-controller .aplayer-time.aplayer-time-narrow .aplayer-icon-mode{display:none}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap{position:relative;display:inline-block;margin-left:3px;cursor:pointer!important}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap:hover .aplayer-volume-bar-wrap{height:40px}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap .aplayer-volume-bar-wrap{position:absolute;bottom:15px;right:-3px;width:25px;height:0;z-index:99;overflow:hidden;transition:all .2s ease-in-out}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap .aplayer-volume-bar-wrap.aplayer-volume-bar-wrap-active{height:40px}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap .aplayer-volume-bar-wrap .aplayer-volume-bar{position:absolute;bottom:0;right:10px;width:5px;height:35px;background:#aaa;border-radius:2.5px;overflow:hidden}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap .aplayer-volume-bar-wrap .aplayer-volume-bar .aplayer-volume{position:absolute;bottom:0;right:0;width:5px;transition:all .1s ease}.aplayer .aplayer-info .aplayer-controller .aplayer-loading-icon{display:none}.aplayer .aplayer-info .aplayer-controller .aplayer-loading-icon svg{position:absolute;-webkit-animation:rotate 1s linear infinite;animation:rotate 1s linear infinite}.aplayer .aplayer-lrc{display:none;position:relative;height:30px;text-align:center;overflow:hidden;margin:-10px 0 7px}.aplayer .aplayer-lrc:before{top:0;height:10%;background:linear-gradient(180deg,#fff 0,hsla(0,0%,100%,0));filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#ffffff\",endColorstr=\"#00ffffff\",GradientType=0)}.aplayer .aplayer-lrc:after,.aplayer .aplayer-lrc:before{position:absolute;z-index:1;display:block;overflow:hidden;width:100%;content:\" \"}.aplayer .aplayer-lrc:after{bottom:0;height:33%;background:linear-gradient(180deg,hsla(0,0%,100%,0) 0,hsla(0,0%,100%,.8));filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#00ffffff\",endColorstr=\"#ccffffff\",GradientType=0)}.aplayer .aplayer-lrc p{font-size:12px;color:#666;line-height:16px!important;height:16px!important;padding:0!important;margin:0!important;transition:all .5s ease-out;opacity:.4;overflow:hidden}.aplayer .aplayer-lrc p.aplayer-lrc-current{opacity:1;overflow:visible;height:auto!important;min-height:16px}.aplayer .aplayer-lrc.aplayer-lrc-hide{display:none}.aplayer .aplayer-lrc .aplayer-lrc-contents{width:100%;transition:all .5s ease-out;-webkit-user-select:text;-moz-user-select:text;user-select:text;cursor:default}.aplayer .aplayer-list{overflow:auto;transition:all .5s ease;will-change:height;display:none;overflow:hidden;list-style-type:none;margin:0;padding:0;overflow-y:auto}.aplayer .aplayer-list::-webkit-scrollbar{width:5px}.aplayer .aplayer-list::-webkit-scrollbar-thumb{border-radius:3px;background-color:#eee}.aplayer .aplayer-list::-webkit-scrollbar-thumb:hover{background-color:#ccc}.aplayer .aplayer-list li{position:relative;height:32px;line-height:32px;padding:0 0 0 15px;font-size:12px;border-top:1px solid #e9e9e9;cursor:pointer;transition:all .2s ease;overflow:hidden;margin:0}.aplayer .aplayer-list li:first-child{border-top:none}.aplayer .aplayer-list li:hover{background:#efefef}.aplayer .aplayer-list li.aplayer-list-light{background:#e9e9e9}.aplayer .aplayer-list li.aplayer-list-light .aplayer-list-cur{display:inline-block}.aplayer .aplayer-list li .aplayer-list-cur{display:none;width:3px;height:22px;position:absolute;left:0;top:5px;cursor:pointer}.aplayer .aplayer-list li .aplayer-list-index{color:#666;margin-right:12px;cursor:pointer}.aplayer .aplayer-list li .aplayer-list-author{color:#666;float:right;cursor:pointer}.aplayer .aplayer-list li .aplayer-list-remove{color:#666;float:right;font-size:14px;width:20px;text-align:center;line-height:32px;cursor:pointer}.aplayer .aplayer-list li .aplayer-list-occupied{width:20px;height:1px;float:right}.aplayer .aplayer-notice{opacity:0;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:12px;border-radius:4px;padding:5px 10px;transition:all .3s ease-in-out;overflow:hidden;color:#fff;pointer-events:none;background-color:#f4f4f5;color:#909399}.aplayer .aplayer-miniswitcher{display:none;position:absolute;top:0;right:0;bottom:0;height:100%;background:#e6e6e6;width:18px;border-radius:0 2px 2px 0}.aplayer .aplayer-miniswitcher .aplayer-icon{height:100%;width:100%;transform:rotateY(180deg);transition:all .3s ease}.aplayer .aplayer-miniswitcher .aplayer-icon path{fill:#666}.aplayer .aplayer-miniswitcher .aplayer-icon:hover path{fill:#000}@-webkit-keyframes aplayer-roll{0%{left:0}to{left:-100%}}@keyframes aplayer-roll{0%{left:0}to{left:-100%}}@-webkit-keyframes rotate{0%{transform:rotate(0)}to{transform:rotate(1turn)}}@keyframes rotate{0%{transform:rotate(0)}to{transform:rotate(1turn)}}", "",{"version":3,"sources":["webpack://./src/css/index.scss"],"names":[],"mappings":"AAAA,SAAS,eAAe,CAAC,sCAAsC,CAAC,UAAU,CAAC,iEAAiE,CAAC,iBAAiB,CAAC,eAAe,CAAC,wBAAwB,CAAC,qBAAqB,CAAC,gBAAgB,CAAC,kBAAkB,CAAC,iBAAiB,CAAC,WAAW,sBAAsB,CAAC,aAAa,UAAU,CAAC,WAAW,CAAC,sCAAsC,SAAS,CAAC,wCAAwC,+BAA+B,CAAC,wCAAwC,aAAa,CAAC,wJAAwJ,cAAc,CAAC,sCAAsC,WAAW,CAAC,UAAU,CAAC,uCAAuC,gBAAgB,CAAC,WAAW,CAAC,kBAAkB,CAAC,sCAAsC,aAAa,CAAC,wBAAwB,UAAU,CAAC,4EAA4E,YAAY,CAAC,2EAA2E,WAAW,CAAC,UAAU,CAAC,uBAAuB,cAAc,CAAC,QAAQ,CAAC,MAAM,CAAC,OAAO,CAAC,QAAQ,CAAC,UAAU,CAAC,gBAAgB,CAAC,eAAe,CAAC,eAAe,CAAC,qCAAqC,kBAAkB,CAAC,qBAAqB,CAAC,kBAAkB,CAAC,qCAAqC,cAAc,CAAC,QAAQ,CAAC,MAAM,CAAC,OAAO,CAAC,QAAQ,CAAC,UAAU,CAAC,eAAe,CAAC,kBAAkB,CAAC,uBAAuB,CAAC,eAAe,CAAC,oCAAoC,aAAa,CAAC,cAAc,CAAC,WAAW,CAAC,MAAM,CAAC,OAAO,CAAC,QAAQ,CAAC,UAAU,CAAC,mBAAmB,CAAC,4BAA4B,CAAC,qFAAqF,YAAY,CAAC,qCAAqC,mBAAmB,CAAC,oBAAoB,CAAC,uBAAuB,CAAC,kBAAkB,CAAC,4BAA4B,CAAC,oDAAoD,wBAAwB,CAAC,6CAA6C,aAAa,CAAC,oDAAoD,aAAa,CAAC,mBAAmB,CAAC,oDAAoD,oBAAoB,CAAC,0EAA0E,oBAAoB,CAAC,0KAA0K,oBAAoB,CAAC,2KAA2K,iBAAiB,CAAC,WAAW,CAAC,UAAU,CAAC,WAAW,CAAC,0CAA0C,UAAU,CAAC,0CAA0C,UAAU,CAAC,6CAA6C,UAAU,CAAC,0CAA0C,OAAO,CAAC,uIAAuI,YAAY,CAAC,iFAAiF,aAAa,CAAC,yHAAyH,kBAAkB,CAAC,uBAAuB,iBAAiB,CAAC,uBAAuB,UAAU,CAAC,WAAW,CAAC,WAAW,CAAC,4BAA4B,CAAC,YAAY,CAAC,cAAc,CAAC,UAAU,CAAC,qBAAqB,CAAC,SAAS,CAAC,cAAc,CAAC,QAAQ,CAAC,oBAAoB,CAAC,4BAA4B,8BAA8B,CAAC,+IAA+I,YAAY,CAAC,0CAA0C,UAAU,CAAC,+BAA+B,wBAAwB,CAAC,8BAA8B,YAAY,CAAC,sBAAsB,iBAAiB,CAAC,UAAU,CAAC,WAAW,CAAC,UAAU,CAAC,qBAAqB,CAAC,uBAAuB,CAAC,uBAAuB,CAAC,cAAc,CAAC,4CAA4C,SAAS,CAAC,sCAAsC,iBAAiB,CAAC,iBAAiB,CAAC,UAAU,CAAC,oCAAoC,CAAC,mCAAmC,CAAC,yBAAyB,CAAC,uBAAuB,CAAC,2CAA2C,SAAS,CAAC,oCAAoC,YAAY,CAAC,oCAAoC,UAAU,CAAC,WAAW,CAAC,qBAAqB,CAAC,UAAU,CAAC,SAAS,CAAC,sBAAsB,CAAC,wCAAwC,iBAAiB,CAAC,OAAO,CAAC,QAAQ,CAAC,WAAW,CAAC,UAAU,CAAC,qCAAqC,UAAU,CAAC,WAAW,CAAC,qBAAqB,CAAC,UAAU,CAAC,SAAS,CAAC,yCAAyC,iBAAiB,CAAC,OAAO,CAAC,QAAQ,CAAC,WAAW,CAAC,UAAU,CAAC,uBAAuB,gBAAgB,CAAC,uBAAuB,CAAC,WAAW,CAAC,qBAAqB,CAAC,sCAAsC,eAAe,CAAC,kBAAkB,CAAC,sBAAsB,CAAC,mBAAmB,CAAC,wBAAwB,CAAC,qBAAqB,CAAC,gBAAgB,CAAC,cAAc,CAAC,kBAAkB,CAAC,WAAW,CAAC,qDAAqD,cAAc,CAAC,sDAAsD,cAAc,CAAC,UAAU,CAAC,2CAA2C,iBAAiB,CAAC,YAAY,CAAC,6DAA6D,gBAAgB,CAAC,aAAa,CAAC,wBAAwB,CAAC,MAAM,CAAC,+GAA+G,kBAAkB,CAAC,0EAA0E,iBAAiB,CAAC,UAAU,CAAC,UAAU,CAAC,kBAAkB,CAAC,0FAA0F,iBAAiB,CAAC,MAAM,CAAC,KAAK,CAAC,QAAQ,CAAC,eAAe,CAAC,UAAU,CAAC,uBAAuB,CAAC,0FAA0F,iBAAiB,CAAC,MAAM,CAAC,KAAK,CAAC,QAAQ,CAAC,UAAU,CAAC,yGAAyG,iBAAiB,CAAC,KAAK,CAAC,SAAS,CAAC,eAAe,CAAC,kBAAkB,CAAC,WAAW,CAAC,UAAU,CAAC,iBAAiB,CAAC,cAAc,CAAC,8BAA8B,CAAC,kBAAkB,CAAC,yDAAyD,iBAAiB,CAAC,OAAO,CAAC,UAAU,CAAC,WAAW,CAAC,UAAU,CAAC,cAAc,CAAC,gBAAgB,CAAC,6EAA6E,qBAAqB,CAAC,uEAAuE,cAAc,CAAC,uBAAuB,CAAC,4EAA4E,SAAS,CAAC,yFAAyF,gBAAgB,CAAC,kFAAkF,SAAS,CAAC,yRAAyR,YAAY,CAAC,gEAAgE,iBAAiB,CAAC,oBAAoB,CAAC,eAAe,CAAC,wBAAwB,CAAC,+FAA+F,WAAW,CAAC,yFAAyF,iBAAiB,CAAC,WAAW,CAAC,UAAU,CAAC,UAAU,CAAC,QAAQ,CAAC,UAAU,CAAC,eAAe,CAAC,8BAA8B,CAAC,wHAAwH,WAAW,CAAC,6GAA6G,iBAAiB,CAAC,QAAQ,CAAC,UAAU,CAAC,SAAS,CAAC,WAAW,CAAC,eAAe,CAAC,mBAAmB,CAAC,eAAe,CAAC,6HAA6H,iBAAiB,CAAC,QAAQ,CAAC,OAAO,CAAC,SAAS,CAAC,uBAAuB,CAAC,iEAAiE,YAAY,CAAC,qEAAqE,iBAAiB,CAAC,2CAA2C,CAAC,mCAAmC,CAAC,sBAAsB,YAAY,CAAC,iBAAiB,CAAC,WAAW,CAAC,iBAAiB,CAAC,eAAe,CAAC,kBAAkB,CAAC,6BAA6B,KAAK,CAAC,UAAU,CAAC,2DAA2D,CAAC,iHAAiH,CAAC,yDAAyD,iBAAiB,CAAC,SAAS,CAAC,aAAa,CAAC,eAAe,CAAC,UAAU,CAAC,WAAW,CAAC,4BAA4B,QAAQ,CAAC,UAAU,CAAC,yEAAyE,CAAC,mHAAmH,CAAC,wBAAwB,cAAc,CAAC,UAAU,CAAC,0BAA0B,CAAC,qBAAqB,CAAC,mBAAmB,CAAC,kBAAkB,CAAC,2BAA2B,CAAC,UAAU,CAAC,eAAe,CAAC,4CAA4C,SAAS,CAAC,gBAAgB,CAAC,qBAAqB,CAAC,eAAe,CAAC,uCAAuC,YAAY,CAAC,4CAA4C,UAAU,CAAC,2BAA2B,CAAC,wBAAwB,CAAC,qBAAqB,CAAC,gBAAgB,CAAC,cAAc,CAAC,uBAAuB,aAAa,CAAC,uBAAuB,CAAC,kBAAkB,CAAC,YAAY,CAAC,eAAe,CAAC,oBAAoB,CAAC,QAAQ,CAAC,SAAS,CAAC,eAAe,CAAC,0CAA0C,SAAS,CAAC,gDAAgD,iBAAiB,CAAC,qBAAqB,CAAC,sDAAsD,qBAAqB,CAAC,0BAA0B,iBAAiB,CAAC,WAAW,CAAC,gBAAgB,CAAC,kBAAkB,CAAC,cAAc,CAAC,4BAA4B,CAAC,cAAc,CAAC,uBAAuB,CAAC,eAAe,CAAC,QAAQ,CAAC,sCAAsC,eAAe,CAAC,gCAAgC,kBAAkB,CAAC,6CAA6C,kBAAkB,CAAC,+DAA+D,oBAAoB,CAAC,4CAA4C,YAAY,CAAC,SAAS,CAAC,WAAW,CAAC,iBAAiB,CAAC,MAAM,CAAC,OAAO,CAAC,cAAc,CAAC,8CAA8C,UAAU,CAAC,iBAAiB,CAAC,cAAc,CAAC,+CAA+C,UAAU,CAAC,WAAW,CAAC,cAAc,CAAC,+CAA+C,UAAU,CAAC,WAAW,CAAC,cAAc,CAAC,UAAU,CAAC,iBAAiB,CAAC,gBAAgB,CAAC,cAAc,CAAC,iDAAiD,UAAU,CAAC,UAAU,CAAC,WAAW,CAAC,yBAAyB,SAAS,CAAC,iBAAiB,CAAC,OAAO,CAAC,QAAQ,CAAC,8BAA8B,CAAC,cAAc,CAAC,iBAAiB,CAAC,gBAAgB,CAAC,8BAA8B,CAAC,eAAe,CAAC,UAAU,CAAC,mBAAmB,CAAC,wBAAwB,CAAC,aAAa,CAAC,+BAA+B,YAAY,CAAC,iBAAiB,CAAC,KAAK,CAAC,OAAO,CAAC,QAAQ,CAAC,WAAW,CAAC,kBAAkB,CAAC,UAAU,CAAC,yBAAyB,CAAC,6CAA6C,WAAW,CAAC,UAAU,CAAC,yBAAyB,CAAC,uBAAuB,CAAC,kDAAkD,SAAS,CAAC,wDAAwD,SAAS,CAAC,gCAAgC,GAAG,MAAM,CAAC,GAAG,UAAU,CAAC,CAAC,wBAAwB,GAAG,MAAM,CAAC,GAAG,UAAU,CAAC,CAAC,0BAA0B,GAAG,mBAAmB,CAAC,GAAG,uBAAuB,CAAC,CAAC,kBAAkB,GAAG,mBAAmB,CAAC,GAAG,uBAAuB,CAAC","sourcesContent":[".aplayer{background:#fff;font-family:Arial,Helvetica,sans-serif;margin:5px;box-shadow:0 2px 2px 0 rgba(0,0,0,.07),0 1px 5px 0 rgba(0,0,0,.1);border-radius:2px;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;user-select:none;line-height:normal;position:relative}.aplayer *{box-sizing:content-box}.aplayer svg{width:100%;height:100%}.aplayer svg circle,.aplayer svg path{fill:#fff}.aplayer.aplayer-withlist .aplayer-info{border-bottom:1px solid #e9e9e9}.aplayer.aplayer-withlist .aplayer-list{display:block}.aplayer.aplayer-withlist .aplayer-icon-order,.aplayer.aplayer-withlist .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon.aplayer-icon-menu{display:inline}.aplayer.aplayer-withlrc .aplayer-pic{height:90px;width:90px}.aplayer.aplayer-withlrc .aplayer-info{margin-left:90px;height:90px;padding:10px 7px 0}.aplayer.aplayer-withlrc .aplayer-lrc{display:block}.aplayer.aplayer-narrow{width:66px}.aplayer.aplayer-narrow .aplayer-info,.aplayer.aplayer-narrow .aplayer-list{display:none}.aplayer.aplayer-narrow .aplayer-body,.aplayer.aplayer-narrow .aplayer-pic{height:66px;width:66px}.aplayer.aplayer-fixed{position:fixed;bottom:0;left:0;right:0;margin:0;z-index:99;overflow:visible;max-width:400px;box-shadow:none}.aplayer.aplayer-fixed .aplayer-list{margin-bottom:65px;border:1px solid #eee;border-bottom:none}.aplayer.aplayer-fixed .aplayer-body{position:fixed;bottom:0;left:0;right:0;margin:0;z-index:99;background:#fff;padding-right:18px;transition:all .3s ease;max-width:400px}.aplayer.aplayer-fixed .aplayer-lrc{display:block;position:fixed;bottom:10px;left:0;right:0;margin:0;z-index:98;pointer-events:none;text-shadow:-1px -1px 0 #fff}.aplayer.aplayer-fixed .aplayer-lrc:after,.aplayer.aplayer-fixed .aplayer-lrc:before{display:none}.aplayer.aplayer-fixed .aplayer-info{transform:scaleX(1);transform-origin:0 0;transition:all .3s ease;border-bottom:none;border-top:1px solid #e9e9e9}.aplayer.aplayer-fixed .aplayer-info .aplayer-music{width:calc(100% - 105px)}.aplayer.aplayer-fixed .aplayer-miniswitcher{display:block}.aplayer.aplayer-fixed.aplayer-narrow .aplayer-info{display:block;transform:scaleX(0)}.aplayer.aplayer-fixed.aplayer-narrow .aplayer-body{width:66px!important}.aplayer.aplayer-fixed.aplayer-narrow .aplayer-miniswitcher .aplayer-icon{transform:rotateY(0)}.aplayer.aplayer-fixed .aplayer-icon-back,.aplayer.aplayer-fixed .aplayer-icon-forward,.aplayer.aplayer-fixed .aplayer-icon-lrc,.aplayer.aplayer-fixed .aplayer-icon-play{display:inline-block}.aplayer.aplayer-fixed .aplayer-icon-back,.aplayer.aplayer-fixed .aplayer-icon-forward,.aplayer.aplayer-fixed .aplayer-icon-menu,.aplayer.aplayer-fixed .aplayer-icon-play{position:absolute;bottom:27px;width:20px;height:20px}.aplayer.aplayer-fixed .aplayer-icon-back{right:75px}.aplayer.aplayer-fixed .aplayer-icon-play{right:50px}.aplayer.aplayer-fixed .aplayer-icon-forward{right:25px}.aplayer.aplayer-fixed .aplayer-icon-menu{right:0}.aplayer.aplayer-arrow .aplayer-icon-loop,.aplayer.aplayer-arrow .aplayer-icon-order,.aplayer.aplayer-mobile .aplayer-icon-volume-down{display:none}.aplayer.aplayer-loading .aplayer-info .aplayer-controller .aplayer-loading-icon{display:block}.aplayer.aplayer-loading .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played .aplayer-thumb{transform:scale(1)}.aplayer .aplayer-body{position:relative}.aplayer .aplayer-icon{width:15px;height:15px;border:none;background-color:transparent;outline:none;cursor:pointer;opacity:.8;vertical-align:middle;padding:0;font-size:12px;margin:0;display:inline-block}.aplayer .aplayer-icon path{transition:all .2s ease-in-out}.aplayer .aplayer-icon-back,.aplayer .aplayer-icon-forward,.aplayer .aplayer-icon-lrc,.aplayer .aplayer-icon-order,.aplayer .aplayer-icon-play{display:none}.aplayer .aplayer-icon-lrc-inactivity svg{opacity:.4}.aplayer .aplayer-icon-forward{transform:rotate(180deg)}.aplayer .aplayer-lrc-content{display:none}.aplayer .aplayer-pic{position:relative;float:left;height:66px;width:66px;background-size:cover;background-position:50%;transition:all .3s ease;cursor:pointer}.aplayer .aplayer-pic:hover .aplayer-button{opacity:1}.aplayer .aplayer-pic .aplayer-button{position:absolute;border-radius:50%;opacity:.8;text-shadow:0 1px 1px rgba(0,0,0,.2);box-shadow:0 1px 1px rgba(0,0,0,.2);background:rgba(0,0,0,.2);transition:all .1s ease}.aplayer .aplayer-pic .aplayer-button path{fill:#fff}.aplayer .aplayer-pic .aplayer-hide{display:none}.aplayer .aplayer-pic .aplayer-play{width:26px;height:26px;border:2px solid #fff;bottom:50%;right:50%;margin:0 -15px -15px 0}.aplayer .aplayer-pic .aplayer-play svg{position:absolute;top:3px;left:4px;height:20px;width:20px}.aplayer .aplayer-pic .aplayer-pause{width:16px;height:16px;border:2px solid #fff;bottom:4px;right:4px}.aplayer .aplayer-pic .aplayer-pause svg{position:absolute;top:2px;left:2px;height:12px;width:12px}.aplayer .aplayer-info{margin-left:66px;padding:14px 7px 0 10px;height:66px;box-sizing:border-box}.aplayer .aplayer-info .aplayer-music{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:0 0 13px 5px;-webkit-user-select:text;-moz-user-select:text;user-select:text;cursor:default;padding-bottom:2px;height:20px}.aplayer .aplayer-info .aplayer-music .aplayer-title{font-size:14px}.aplayer .aplayer-info .aplayer-music .aplayer-author{font-size:12px;color:#666}.aplayer .aplayer-info .aplayer-controller{position:relative;display:flex}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap{margin:0 0 0 5px;padding:4px 0;cursor:pointer!important;flex:1}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap:hover .aplayer-bar .aplayer-played .aplayer-thumb{transform:scale(1)}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar{position:relative;height:2px;width:100%;background:#cdcdcd}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-loaded{position:absolute;left:0;top:0;bottom:0;background:#aaa;height:2px;transition:all .5s ease}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played{position:absolute;left:0;top:0;bottom:0;height:2px}.aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played .aplayer-thumb{position:absolute;top:0;right:5px;margin-top:-4px;margin-right:-10px;height:10px;width:10px;border-radius:50%;cursor:pointer;transition:all .3s ease-in-out;transform:scale(0)}.aplayer .aplayer-info .aplayer-controller .aplayer-time{position:relative;right:0;bottom:4px;height:17px;color:#999;font-size:11px;padding-left:7px}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-time-inner{vertical-align:middle}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon{cursor:pointer;transition:all .2s ease}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon path{fill:#666}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon.aplayer-icon-loop{margin-right:2px}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon:hover path{fill:#000}.aplayer .aplayer-info .aplayer-controller .aplayer-time .aplayer-icon.aplayer-icon-menu,.aplayer .aplayer-info .aplayer-controller .aplayer-time.aplayer-time-narrow .aplayer-icon-menu,.aplayer .aplayer-info .aplayer-controller .aplayer-time.aplayer-time-narrow .aplayer-icon-mode{display:none}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap{position:relative;display:inline-block;margin-left:3px;cursor:pointer!important}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap:hover .aplayer-volume-bar-wrap{height:40px}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap .aplayer-volume-bar-wrap{position:absolute;bottom:15px;right:-3px;width:25px;height:0;z-index:99;overflow:hidden;transition:all .2s ease-in-out}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap .aplayer-volume-bar-wrap.aplayer-volume-bar-wrap-active{height:40px}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap .aplayer-volume-bar-wrap .aplayer-volume-bar{position:absolute;bottom:0;right:10px;width:5px;height:35px;background:#aaa;border-radius:2.5px;overflow:hidden}.aplayer .aplayer-info .aplayer-controller .aplayer-volume-wrap .aplayer-volume-bar-wrap .aplayer-volume-bar .aplayer-volume{position:absolute;bottom:0;right:0;width:5px;transition:all .1s ease}.aplayer .aplayer-info .aplayer-controller .aplayer-loading-icon{display:none}.aplayer .aplayer-info .aplayer-controller .aplayer-loading-icon svg{position:absolute;-webkit-animation:rotate 1s linear infinite;animation:rotate 1s linear infinite}.aplayer .aplayer-lrc{display:none;position:relative;height:30px;text-align:center;overflow:hidden;margin:-10px 0 7px}.aplayer .aplayer-lrc:before{top:0;height:10%;background:linear-gradient(180deg,#fff 0,hsla(0,0%,100%,0));filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#ffffff\",endColorstr=\"#00ffffff\",GradientType=0)}.aplayer .aplayer-lrc:after,.aplayer .aplayer-lrc:before{position:absolute;z-index:1;display:block;overflow:hidden;width:100%;content:\" \"}.aplayer .aplayer-lrc:after{bottom:0;height:33%;background:linear-gradient(180deg,hsla(0,0%,100%,0) 0,hsla(0,0%,100%,.8));filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#00ffffff\",endColorstr=\"#ccffffff\",GradientType=0)}.aplayer .aplayer-lrc p{font-size:12px;color:#666;line-height:16px!important;height:16px!important;padding:0!important;margin:0!important;transition:all .5s ease-out;opacity:.4;overflow:hidden}.aplayer .aplayer-lrc p.aplayer-lrc-current{opacity:1;overflow:visible;height:auto!important;min-height:16px}.aplayer .aplayer-lrc.aplayer-lrc-hide{display:none}.aplayer .aplayer-lrc .aplayer-lrc-contents{width:100%;transition:all .5s ease-out;-webkit-user-select:text;-moz-user-select:text;user-select:text;cursor:default}.aplayer .aplayer-list{overflow:auto;transition:all .5s ease;will-change:height;display:none;overflow:hidden;list-style-type:none;margin:0;padding:0;overflow-y:auto}.aplayer .aplayer-list::-webkit-scrollbar{width:5px}.aplayer .aplayer-list::-webkit-scrollbar-thumb{border-radius:3px;background-color:#eee}.aplayer .aplayer-list::-webkit-scrollbar-thumb:hover{background-color:#ccc}.aplayer .aplayer-list li{position:relative;height:32px;line-height:32px;padding:0 0 0 15px;font-size:12px;border-top:1px solid #e9e9e9;cursor:pointer;transition:all .2s ease;overflow:hidden;margin:0}.aplayer .aplayer-list li:first-child{border-top:none}.aplayer .aplayer-list li:hover{background:#efefef}.aplayer .aplayer-list li.aplayer-list-light{background:#e9e9e9}.aplayer .aplayer-list li.aplayer-list-light .aplayer-list-cur{display:inline-block}.aplayer .aplayer-list li .aplayer-list-cur{display:none;width:3px;height:22px;position:absolute;left:0;top:5px;cursor:pointer}.aplayer .aplayer-list li .aplayer-list-index{color:#666;margin-right:12px;cursor:pointer}.aplayer .aplayer-list li .aplayer-list-author{color:#666;float:right;cursor:pointer}.aplayer .aplayer-list li .aplayer-list-remove{color:#666;float:right;font-size:14px;width:20px;text-align:center;line-height:32px;cursor:pointer}.aplayer .aplayer-list li .aplayer-list-occupied{width:20px;height:1px;float:right}.aplayer .aplayer-notice{opacity:0;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:12px;border-radius:4px;padding:5px 10px;transition:all .3s ease-in-out;overflow:hidden;color:#fff;pointer-events:none;background-color:#f4f4f5;color:#909399}.aplayer .aplayer-miniswitcher{display:none;position:absolute;top:0;right:0;bottom:0;height:100%;background:#e6e6e6;width:18px;border-radius:0 2px 2px 0}.aplayer .aplayer-miniswitcher .aplayer-icon{height:100%;width:100%;transform:rotateY(180deg);transition:all .3s ease}.aplayer .aplayer-miniswitcher .aplayer-icon path{fill:#666}.aplayer .aplayer-miniswitcher .aplayer-icon:hover path{fill:#000}@-webkit-keyframes aplayer-roll{0%{left:0}to{left:-100%}}@keyframes aplayer-roll{0%{left:0}to{left:-100%}}@-webkit-keyframes rotate{0%{transform:rotate(0)}to{transform:rotate(1turn)}}@keyframes rotate{0%{transform:rotate(0)}to{transform:rotate(1turn)}}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/_css-loader@5.2.7@css-loader/dist/runtime/api.js":
/*!***********************************************************************!*\
  !*** ./node_modules/_css-loader@5.2.7@css-loader/dist/runtime/api.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names

module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/_css-loader@5.2.7@css-loader/dist/runtime/cssWithMappingToString.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/_css-loader@5.2.7@css-loader/dist/runtime/cssWithMappingToString.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/_process@0.11.10@process/browser.js":
/*!**********************************************************!*\
  !*** ./node_modules/_process@0.11.10@process/browser.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ "./node_modules/_promise-polyfill@8.2.0@promise-polyfill/src/allSettled.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/_promise-polyfill@8.2.0@promise-polyfill/src/allSettled.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function allSettled(arr) {
  var P = this;
  return new P(function (resolve, reject) {
    if (!(arr && typeof arr.length !== 'undefined')) {
      return reject(new TypeError(_typeof(arr) + ' ' + arr + ' is not iterable(cannot read property Symbol(Symbol.iterator))'));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      if (val && (_typeof(val) === 'object' || typeof val === 'function')) {
        var then = val.then;

        if (typeof then === 'function') {
          then.call(val, function (val) {
            res(i, val);
          }, function (e) {
            args[i] = {
              status: 'rejected',
              reason: e
            };

            if (--remaining === 0) {
              resolve(args);
            }
          });
          return;
        }
      }

      args[i] = {
        status: 'fulfilled',
        value: val
      };

      if (--remaining === 0) {
        resolve(args);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (allSettled);

/***/ }),

/***/ "./node_modules/_promise-polyfill@8.2.0@promise-polyfill/src/finally.js":
/*!******************************************************************************!*\
  !*** ./node_modules/_promise-polyfill@8.2.0@promise-polyfill/src/finally.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(function (value) {
    // @ts-ignore
    return constructor.resolve(callback()).then(function () {
      return value;
    });
  }, function (reason) {
    // @ts-ignore
    return constructor.resolve(callback()).then(function () {
      // @ts-ignore
      return constructor.reject(reason);
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (finallyConstructor);

/***/ }),

/***/ "./node_modules/_promise-polyfill@8.2.0@promise-polyfill/src/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/_promise-polyfill@8.2.0@promise-polyfill/src/index.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(setImmediate) {/* harmony import */ var _finally__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./finally */ "./node_modules/_promise-polyfill@8.2.0@promise-polyfill/src/finally.js");
/* harmony import */ var _allSettled__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./allSettled */ "./node_modules/_promise-polyfill@8.2.0@promise-polyfill/src/allSettled.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }


 // Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())

var setTimeoutFunc = setTimeout;

function isArray(x) {
  return Boolean(x && typeof x.length !== 'undefined');
}

function noop() {} // Polyfill for Function.prototype.bind


function bind(fn, thisArg) {
  return function () {
    fn.apply(thisArg, arguments);
  };
}
/**
 * @constructor
 * @param {Function} fn
 */


function Promise(fn) {
  if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */

  this._state = 0;
  /** @type {!boolean} */

  this._handled = false;
  /** @type {Promise|undefined} */

  this._value = undefined;
  /** @type {!Array<!Function>} */

  this._deferreds = [];
  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }

  if (self._state === 0) {
    self._deferreds.push(deferred);

    return;
  }

  self._handled = true;

  Promise._immediateFn(function () {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;

    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }

    var ret;

    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }

    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');

    if (newValue && (_typeof(newValue) === 'object' || typeof newValue === 'function')) {
      var then = newValue.then;

      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }

    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function () {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }

  self._deferreds = null;
}
/**
 * @constructor
 */


function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}
/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */


function doResolve(fn, self) {
  var done = false;

  try {
    fn(function (value) {
      if (done) return;
      done = true;
      resolve(self, value);
    }, function (reason) {
      if (done) return;
      done = true;
      reject(self, reason);
    });
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function (onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);
  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = _finally__WEBPACK_IMPORTED_MODULE_0__["default"];

Promise.all = function (arr) {
  return new Promise(function (resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.all accepts an array'));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (_typeof(val) === 'object' || typeof val === 'function')) {
          var then = val.then;

          if (typeof then === 'function') {
            then.call(val, function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }

        args[i] = val;

        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.allSettled = _allSettled__WEBPACK_IMPORTED_MODULE_1__["default"];

Promise.resolve = function (value) {
  if (value && _typeof(value) === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function (resolve) {
    resolve(value);
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (arr) {
  return new Promise(function (resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.race accepts an array'));
    }

    for (var i = 0, len = arr.length; i < len; i++) {
      Promise.resolve(arr[i]).then(resolve, reject);
    }
  });
}; // Use polyfill for setImmediate for performance gains


Promise._immediateFn = // @ts-ignore
typeof setImmediate === 'function' && function (fn) {
  // @ts-ignore
  setImmediate(fn);
} || function (fn) {
  setTimeoutFunc(fn, 0);
};

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Promise);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../_timers-browserify@2.0.12@timers-browserify/main.js */ "./node_modules/_timers-browserify@2.0.12@timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/_setimmediate@1.0.5@setimmediate/setImmediate.js":
/*!***********************************************************************!*\
  !*** ./node_modules/_setimmediate@1.0.5@setimmediate/setImmediate.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
  "use strict";

  if (global.setImmediate) {
    return;
  }

  var nextHandle = 1; // Spec says greater than zero

  var tasksByHandle = {};
  var currentlyRunningATask = false;
  var doc = global.document;
  var registerImmediate;

  function setImmediate(callback) {
    // Callback can either be a function or a string
    if (typeof callback !== "function") {
      callback = new Function("" + callback);
    } // Copy function arguments


    var args = new Array(arguments.length - 1);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i + 1];
    } // Store and register the task


    var task = {
      callback: callback,
      args: args
    };
    tasksByHandle[nextHandle] = task;
    registerImmediate(nextHandle);
    return nextHandle++;
  }

  function clearImmediate(handle) {
    delete tasksByHandle[handle];
  }

  function run(task) {
    var callback = task.callback;
    var args = task.args;

    switch (args.length) {
      case 0:
        callback();
        break;

      case 1:
        callback(args[0]);
        break;

      case 2:
        callback(args[0], args[1]);
        break;

      case 3:
        callback(args[0], args[1], args[2]);
        break;

      default:
        callback.apply(undefined, args);
        break;
    }
  }

  function runIfPresent(handle) {
    // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
    // So if we're currently running a task, we'll need to delay this invocation.
    if (currentlyRunningATask) {
      // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
      // "too much recursion" error.
      setTimeout(runIfPresent, 0, handle);
    } else {
      var task = tasksByHandle[handle];

      if (task) {
        currentlyRunningATask = true;

        try {
          run(task);
        } finally {
          clearImmediate(handle);
          currentlyRunningATask = false;
        }
      }
    }
  }

  function installNextTickImplementation() {
    registerImmediate = function registerImmediate(handle) {
      process.nextTick(function () {
        runIfPresent(handle);
      });
    };
  }

  function canUsePostMessage() {
    // The test against `importScripts` prevents this implementation from being installed inside a web worker,
    // where `global.postMessage` means something completely different and can't be used for this purpose.
    if (global.postMessage && !global.importScripts) {
      var postMessageIsAsynchronous = true;
      var oldOnMessage = global.onmessage;

      global.onmessage = function () {
        postMessageIsAsynchronous = false;
      };

      global.postMessage("", "*");
      global.onmessage = oldOnMessage;
      return postMessageIsAsynchronous;
    }
  }

  function installPostMessageImplementation() {
    // Installs an event handler on `global` for the `message` event: see
    // * https://developer.mozilla.org/en/DOM/window.postMessage
    // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
    var messagePrefix = "setImmediate$" + Math.random() + "$";

    var onGlobalMessage = function onGlobalMessage(event) {
      if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
        runIfPresent(+event.data.slice(messagePrefix.length));
      }
    };

    if (global.addEventListener) {
      global.addEventListener("message", onGlobalMessage, false);
    } else {
      global.attachEvent("onmessage", onGlobalMessage);
    }

    registerImmediate = function registerImmediate(handle) {
      global.postMessage(messagePrefix + handle, "*");
    };
  }

  function installMessageChannelImplementation() {
    var channel = new MessageChannel();

    channel.port1.onmessage = function (event) {
      var handle = event.data;
      runIfPresent(handle);
    };

    registerImmediate = function registerImmediate(handle) {
      channel.port2.postMessage(handle);
    };
  }

  function installReadyStateChangeImplementation() {
    var html = doc.documentElement;

    registerImmediate = function registerImmediate(handle) {
      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var script = doc.createElement("script");

      script.onreadystatechange = function () {
        runIfPresent(handle);
        script.onreadystatechange = null;
        html.removeChild(script);
        script = null;
      };

      html.appendChild(script);
    };
  }

  function installSetTimeoutImplementation() {
    registerImmediate = function registerImmediate(handle) {
      setTimeout(runIfPresent, 0, handle);
    };
  } // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.


  var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
  attachTo = attachTo && attachTo.setTimeout ? attachTo : global; // Don't get fooled by e.g. browserify environments.

  if ({}.toString.call(global.process) === "[object process]") {
    // For Node.js before 0.9
    installNextTickImplementation();
  } else if (canUsePostMessage()) {
    // For non-IE10 modern browsers
    installPostMessageImplementation();
  } else if (global.MessageChannel) {
    // For web workers, where supported
    installMessageChannelImplementation();
  } else if (doc && "onreadystatechange" in doc.createElement("script")) {
    // For IE 6–8
    installReadyStateChangeImplementation();
  } else {
    // For older browsers
    installSetTimeoutImplementation();
  }

  attachTo.setImmediate = setImmediate;
  attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../_webpack@4.46.0@webpack/buildin/global.js */ "./node_modules/_webpack@4.46.0@webpack/buildin/global.js"), __webpack_require__(/*! ./../_process@0.11.10@process/browser.js */ "./node_modules/_process@0.11.10@process/browser.js")))

/***/ }),

/***/ "./node_modules/_smoothscroll@0.4.0@smoothscroll/smoothscroll.js":
/*!***********************************************************************!*\
  !*** ./node_modules/_smoothscroll@0.4.0@smoothscroll/smoothscroll.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

(function (root, smoothScroll) {
  'use strict'; // Support RequireJS and CommonJS/NodeJS module formats.
  // Attach smoothScroll to the `window` when executed as a <script>.
  // RequireJS

  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (smoothScroll),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // CommonJS
  } else {}
})(this, function () {
  'use strict'; // Do not initialize smoothScroll when running server side, handle it in client:

  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== 'object') return; // We do not want this script to be applied in browsers that do not support those
  // That means no smoothscroll on IE9 and below.

  if (document.querySelectorAll === void 0 || window.pageYOffset === void 0 || history.pushState === void 0) {
    return;
  } // Get the top position of an element in the document


  var getTop = function getTop(element, start) {
    // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
    if (element.nodeName === 'HTML') return -start;
    return element.getBoundingClientRect().top + start;
  }; // ease in out function thanks to:
  // http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/


  var easeInOutCubic = function easeInOutCubic(t) {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }; // calculate the scroll position we should be in
  // given the start and end point of the scroll
  // the time elapsed from the beginning of the scroll
  // and the total duration of the scroll (default 500ms)


  var position = function position(start, end, elapsed, duration) {
    if (elapsed > duration) return end;
    return start + (end - start) * easeInOutCubic(elapsed / duration); // <-- you can change the easing funtion there
    // return start + (end - start) * (elapsed / duration); // <-- this would give a linear scroll
  }; // we use requestAnimationFrame to be called by the browser before every repaint
  // if the first argument is an element then scroll to the top of this element
  // if the first argument is numeric then scroll to this location
  // if the callback exist, it is called when the scrolling is finished
  // if context is set then scroll that element, else scroll window


  var smoothScroll = function smoothScroll(el, duration, callback, context) {
    duration = duration || 500;
    context = context || window;
    var start = context.scrollTop || window.pageYOffset;

    if (typeof el === 'number') {
      var end = parseInt(el);
    } else {
      var end = getTop(el, start);
    }

    var clock = Date.now();

    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
      window.setTimeout(fn, 15);
    };

    var step = function step() {
      var elapsed = Date.now() - clock;

      if (context !== window) {
        context.scrollTop = position(start, end, elapsed, duration);
      } else {
        window.scroll(0, position(start, end, elapsed, duration));
      }

      if (elapsed > duration) {
        if (typeof callback === 'function') {
          callback(el);
        }
      } else {
        requestAnimationFrame(step);
      }
    };

    step();
  };

  var linkHandler = function linkHandler(ev) {
    if (!ev.defaultPrevented) {
      ev.preventDefault();
      if (location.hash !== this.hash) window.history.pushState(null, null, this.hash); // using the history api to solve issue #1 - back doesn't work
      // most browser don't update :target when the history api is used:
      // THIS IS A BUG FROM THE BROWSERS.
      // change the scrolling duration in this call

      var node = document.getElementById(this.hash.substring(1));
      if (!node) return; // Do not scroll to non-existing node

      smoothScroll(node, 500, function (el) {
        location.replace('#' + el.id); // this will cause the :target to be activated.
      });
    }
  }; // We look for all the internal links in the documents and attach the smoothscroll function


  document.addEventListener("DOMContentLoaded", function () {
    var internal = document.querySelectorAll('a[href^="#"]:not([href="#"])'),
        a;

    for (var i = internal.length; a = internal[--i];) {
      a.addEventListener("click", linkHandler, false);
    }
  }); // return smoothscroll API

  return smoothScroll;
});

/***/ }),

/***/ "./node_modules/_style-loader@2.0.0@style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/_style-loader@2.0.0@style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/_timers-browserify@2.0.12@timers-browserify/main.js":
/*!**************************************************************************!*\
  !*** ./node_modules/_timers-browserify@2.0.12@timers-browserify/main.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
var apply = Function.prototype.apply; // DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};

exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};

exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}

Timeout.prototype.unref = Timeout.prototype.ref = function () {};

Timeout.prototype.close = function () {
  this._clearFn.call(scope, this._id);
}; // Does not start the time, just sets up the members needed.


exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);
  var msecs = item._idleTimeout;

  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
}; // setimmediate attaches itself to the global object


__webpack_require__(/*! setimmediate */ "./node_modules/_setimmediate@1.0.5@setimmediate/setImmediate.js"); // On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.


exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || this && this.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || this && this.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../_webpack@4.46.0@webpack/buildin/global.js */ "./node_modules/_webpack@4.46.0@webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/_webpack@4.46.0@webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "./src/assets/loading.svg":
/*!********************************!*\
  !*** ./src/assets/loading.svg ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 32 32\"><path d=\"M4 16c0-6.6 5.4-12 12-12s12 5.4 12 12c0 1.2-0.8 2-2 2s-2-0.8-2-2c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.2 0 2 0.8 2 2s-0.8 2-2 2c-6.6 0-12-5.4-12-12z\"></path></svg>"

/***/ }),

/***/ "./src/assets/loop-all.svg":
/*!*********************************!*\
  !*** ./src/assets/loop-all.svg ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 29 32\"><path d=\"M9.333 9.333h13.333v4l5.333-5.333-5.333-5.333v4h-16v8h2.667v-5.333zM22.667 22.667h-13.333v-4l-5.333 5.333 5.333 5.333v-4h16v-8h-2.667v5.333z\"></path></svg>"

/***/ }),

/***/ "./src/assets/loop-none.svg":
/*!**********************************!*\
  !*** ./src/assets/loop-none.svg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 29 32\"><path d=\"M2.667 7.027l1.707-1.693 22.293 22.293-1.693 1.707-4-4h-11.64v4l-5.333-5.333 5.333-5.333v4h8.973l-8.973-8.973v0.973h-2.667v-3.64l-4-4zM22.667 17.333h2.667v5.573l-2.667-2.667v-2.907zM22.667 6.667v-4l5.333 5.333-5.333 5.333v-4h-10.907l-2.667-2.667h13.573z\"></path></svg>"

/***/ }),

/***/ "./src/assets/loop-one.svg":
/*!*********************************!*\
  !*** ./src/assets/loop-one.svg ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 33 32\"><path d=\"M9.333 9.333h13.333v4l5.333-5.333-5.333-5.333v4h-16v8h2.667v-5.333zM22.667 22.667h-13.333v-4l-5.333 5.333 5.333 5.333v-4h16v-8h-2.667v5.333zM17.333 20v-8h-1.333l-2.667 1.333v1.333h2v5.333h2z\"></path></svg>"

/***/ }),

/***/ "./src/assets/lrc.svg":
/*!****************************!*\
  !*** ./src/assets/lrc.svg ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 32 32\"><path d=\"M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z\"></path></svg>"

/***/ }),

/***/ "./src/assets/menu.svg":
/*!*****************************!*\
  !*** ./src/assets/menu.svg ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 22 32\"><path d=\"M20.8 14.4q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2zM1.6 11.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2zM20.8 20.8q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2z\"></path></svg>"

/***/ }),

/***/ "./src/assets/order-list.svg":
/*!***********************************!*\
  !*** ./src/assets/order-list.svg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 32 32\"><path d=\"M0.622 18.334h19.54v7.55l11.052-9.412-11.052-9.413v7.549h-19.54v3.725z\"></path></svg>"

/***/ }),

/***/ "./src/assets/order-random.svg":
/*!*************************************!*\
  !*** ./src/assets/order-random.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 32 32\"><path d=\"M22.667 4l7 6-7 6 7 6-7 6v-4h-3.653l-3.76-3.76 2.827-2.827 2.587 2.587h2v-8h-2l-12 12h-6v-4h4.347l12-12h3.653v-4zM2.667 8h6l3.76 3.76-2.827 2.827-2.587-2.587h-4.347v-4z\"></path></svg>"

/***/ }),

/***/ "./src/assets/pause.svg":
/*!******************************!*\
  !*** ./src/assets/pause.svg ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 17 32\"><path d=\"M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z\"></path></svg>"

/***/ }),

/***/ "./src/assets/play.svg":
/*!*****************************!*\
  !*** ./src/assets/play.svg ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 16 31\"><path d=\"M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z\"></path></svg>"

/***/ }),

/***/ "./src/assets/right.svg":
/*!******************************!*\
  !*** ./src/assets/right.svg ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 32 32\"><path d=\"M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z\"></path></svg>"

/***/ }),

/***/ "./src/assets/skip.svg":
/*!*****************************!*\
  !*** ./src/assets/skip.svg ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 32 32\"><path d=\"M25.468 6.947c-0.326-0.172-0.724-0.151-1.030 0.057l-6.438 4.38v-3.553c0-0.371-0.205-0.71-0.532-0.884-0.326-0.172-0.724-0.151-1.030 0.057l-12 8.164c-0.274 0.186-0.438 0.496-0.438 0.827s0.164 0.641 0.438 0.827l12 8.168c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-3.556l6.438 4.382c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-16.333c0-0.371-0.205-0.71-0.532-0.884z\"></path></svg>"

/***/ }),

/***/ "./src/assets/volume-down.svg":
/*!************************************!*\
  !*** ./src/assets/volume-down.svg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 28 32\"><path d=\"M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z\"></path></svg>"

/***/ }),

/***/ "./src/assets/volume-off.svg":
/*!***********************************!*\
  !*** ./src/assets/volume-off.svg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 28 32\"><path d=\"M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z\"></path></svg>"

/***/ }),

/***/ "./src/assets/volume-up.svg":
/*!**********************************!*\
  !*** ./src/assets/volume-up.svg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 28 32\"><path d=\"M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056zM29.728 16q0 4.096-2.272 7.552t-6.048 5.056q-0.224 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.64 0.704-1.056 0.128-0.064 0.384-0.192t0.416-0.192q0.8-0.448 1.44-0.896 2.208-1.632 3.456-4.064t1.216-5.152-1.216-5.152-3.456-4.064q-0.64-0.448-1.44-0.896-0.128-0.096-0.416-0.192t-0.384-0.192q-0.704-0.416-0.704-1.056 0-0.448 0.32-0.8t0.832-0.352q0.224 0 0.448 0.096 3.776 1.632 6.048 5.056t2.272 7.552z\"></path></svg>"

/***/ }),

/***/ "./src/css/index.scss":
/*!****************************!*\
  !*** ./src/css/index.scss ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_2_0_0_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/_style-loader@2.0.0@style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/_style-loader@2.0.0@style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_2_0_0_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_2_0_0_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_5_2_7_css_loader_dist_cjs_js_ref_5_1_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_2_node_modules_sass_loader_10_3_1_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/_css-loader@5.2.7@css-loader/dist/cjs.js??ref--5-1!../../node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--5-2!../../node_modules/_sass-loader@10.3.1@sass-loader/dist/cjs.js!./index.scss */ "./node_modules/_css-loader@5.2.7@css-loader/dist/cjs.js?!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_sass-loader@10.3.1@sass-loader/dist/cjs.js!./src/css/index.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_2_0_0_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_5_2_7_css_loader_dist_cjs_js_ref_5_1_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_2_node_modules_sass_loader_10_3_1_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_5_2_7_css_loader_dist_cjs_js_ref_5_1_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_5_2_node_modules_sass_loader_10_3_1_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./src/js/bar.js":
/*!***********************!*\
  !*** ./src/js/bar.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Bar = /*#__PURE__*/function () {
  function Bar(template) {
    _classCallCheck(this, Bar);

    this.elements = {};
    this.elements.volume = template.volume;
    this.elements.played = template.played;
    this.elements.loaded = template.loaded;
  }
  /**
   * Update progress
   *
   * @param {String} type - Point out which bar it is
   * @param {Number} percentage
   * @param {String} direction - Point out the direction of this bar, Should be height or width
   */


  _createClass(Bar, [{
    key: "set",
    value: function set(type, percentage, direction) {
      percentage = Math.max(percentage, 0);
      percentage = Math.min(percentage, 1);
      this.elements[type].style[direction] = percentage * 100 + '%';
    }
  }, {
    key: "get",
    value: function get(type, direction) {
      return parseFloat(this.elements[type].style[direction]) / 100;
    }
  }]);

  return Bar;
}();

/* harmony default export */ __webpack_exports__["default"] = (Bar);

/***/ }),

/***/ "./src/js/controller.js":
/*!******************************!*\
  !*** ./src/js/controller.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icons */ "./src/js/icons.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var Controller = /*#__PURE__*/function () {
  function Controller(player) {
    _classCallCheck(this, Controller);

    this.player = player;
    this.initPlayButton();
    this.initPlayBar();
    this.initOrderButton();
    this.initLoopButton();
    this.initMenuButton();

    if (!_utils__WEBPACK_IMPORTED_MODULE_0__["default"].isMobile) {
      this.initVolumeButton();
    }

    this.initMiniSwitcher();
    this.initSkipButton();
    this.initLrcButton();
  }

  _createClass(Controller, [{
    key: "initPlayButton",
    value: function initPlayButton() {
      var _this = this;

      this.player.template.pic.addEventListener('click', function () {
        _this.player.toggle();
      });
    }
  }, {
    key: "initPlayBar",
    value: function initPlayBar() {
      var _this2 = this;

      var thumbMove = function thumbMove(e) {
        var percentage = ((e.clientX || e.changedTouches[0].clientX) - _this2.player.template.barWrap.getBoundingClientRect().left) / _this2.player.template.barWrap.clientWidth;

        percentage = Math.max(percentage, 0);
        percentage = Math.min(percentage, 1);

        _this2.player.bar.set('played', percentage, 'width');

        _this2.player.lrc && _this2.player.lrc.update(percentage * _this2.player.duration);
        _this2.player.template.ptime.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].secondToTime(percentage * _this2.player.duration);
      };

      var thumbUp = function thumbUp(e) {
        document.removeEventListener(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].nameMap.dragEnd, thumbUp);
        document.removeEventListener(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].nameMap.dragMove, thumbMove);

        var percentage = ((e.clientX || e.changedTouches[0].clientX) - _this2.player.template.barWrap.getBoundingClientRect().left) / _this2.player.template.barWrap.clientWidth;

        percentage = Math.max(percentage, 0);
        percentage = Math.min(percentage, 1);

        _this2.player.bar.set('played', percentage, 'width');

        _this2.player.seek(percentage * _this2.player.duration);

        _this2.player.disableTimeupdate = false;
      };

      this.player.template.barWrap.addEventListener(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].nameMap.dragStart, function () {
        _this2.player.disableTimeupdate = true;
        document.addEventListener(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].nameMap.dragMove, thumbMove);
        document.addEventListener(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].nameMap.dragEnd, thumbUp);
      });
    }
  }, {
    key: "initVolumeButton",
    value: function initVolumeButton() {
      var _this3 = this;

      this.player.template.volumeButton.addEventListener('click', function () {
        if (_this3.player.audio.muted) {
          _this3.player.volume(_this3.player.audio.volume, true);
        } else {
          _this3.player.audio.muted = true;

          _this3.player.switchVolumeIcon();

          _this3.player.bar.set('volume', 0, 'height');
        }
      });

      var thumbMove = function thumbMove(e) {
        var percentage = 1 - ((e.clientY || e.changedTouches[0].clientY) - _this3.player.template.volumeBar.getBoundingClientRect().top) / _this3.player.template.volumeBar.clientHeight;

        percentage = Math.max(percentage, 0);
        percentage = Math.min(percentage, 1);

        _this3.player.volume(percentage);
      };

      var thumbUp = function thumbUp(e) {
        _this3.player.template.volumeBarWrap.classList.remove('aplayer-volume-bar-wrap-active');

        document.removeEventListener(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].nameMap.dragEnd, thumbUp);
        document.removeEventListener(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].nameMap.dragMove, thumbMove);

        var percentage = 1 - ((e.clientY || e.changedTouches[0].clientY) - _this3.player.template.volumeBar.getBoundingClientRect().top) / _this3.player.template.volumeBar.clientHeight;

        percentage = Math.max(percentage, 0);
        percentage = Math.min(percentage, 1);

        _this3.player.volume(percentage);
      };

      this.player.template.volumeBarWrap.addEventListener(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].nameMap.dragStart, function () {
        _this3.player.template.volumeBarWrap.classList.add('aplayer-volume-bar-wrap-active');

        document.addEventListener(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].nameMap.dragMove, thumbMove);
        document.addEventListener(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].nameMap.dragEnd, thumbUp);
      });
    }
  }, {
    key: "initOrderButton",
    value: function initOrderButton() {
      var _this4 = this;

      this.player.template.order.addEventListener('click', function () {
        if (_this4.player.options.order === 'list') {
          _this4.player.options.order = 'random';
          _this4.player.template.order.innerHTML = _icons__WEBPACK_IMPORTED_MODULE_1__["default"].orderRandom;
        } else if (_this4.player.options.order === 'random') {
          _this4.player.options.order = 'list';
          _this4.player.template.order.innerHTML = _icons__WEBPACK_IMPORTED_MODULE_1__["default"].orderList;
        }
      });
    }
  }, {
    key: "initLoopButton",
    value: function initLoopButton() {
      var _this5 = this;

      this.player.template.loop.addEventListener('click', function () {
        if (_this5.player.list.audios.length > 1) {
          if (_this5.player.options.loop === 'one') {
            _this5.player.options.loop = 'none';
            _this5.player.template.loop.innerHTML = _icons__WEBPACK_IMPORTED_MODULE_1__["default"].loopNone;
          } else if (_this5.player.options.loop === 'none') {
            _this5.player.options.loop = 'all';
            _this5.player.template.loop.innerHTML = _icons__WEBPACK_IMPORTED_MODULE_1__["default"].loopAll;
          } else if (_this5.player.options.loop === 'all') {
            _this5.player.options.loop = 'one';
            _this5.player.template.loop.innerHTML = _icons__WEBPACK_IMPORTED_MODULE_1__["default"].loopOne;
          }
        } else {
          if (_this5.player.options.loop === 'one' || _this5.player.options.loop === 'all') {
            _this5.player.options.loop = 'none';
            _this5.player.template.loop.innerHTML = _icons__WEBPACK_IMPORTED_MODULE_1__["default"].loopNone;
          } else if (_this5.player.options.loop === 'none') {
            _this5.player.options.loop = 'all';
            _this5.player.template.loop.innerHTML = _icons__WEBPACK_IMPORTED_MODULE_1__["default"].loopAll;
          }
        }
      });
    }
  }, {
    key: "initMenuButton",
    value: function initMenuButton() {
      var _this6 = this;

      this.player.template.menu.addEventListener('click', function () {
        _this6.player.list.toggle();
      });
    }
  }, {
    key: "initMiniSwitcher",
    value: function initMiniSwitcher() {
      var _this7 = this;

      this.player.template.miniSwitcher.addEventListener('click', function () {
        _this7.player.setMode(_this7.player.mode === 'mini' ? 'normal' : 'mini');
      });
    }
  }, {
    key: "initSkipButton",
    value: function initSkipButton() {
      var _this8 = this;

      this.player.template.skipBackButton.addEventListener('click', function () {
        _this8.player.skipBack();
      });
      this.player.template.skipForwardButton.addEventListener('click', function () {
        _this8.player.skipForward();
      });
      this.player.template.skipPlayButton.addEventListener('click', function () {
        _this8.player.toggle();
      });
    }
  }, {
    key: "initLrcButton",
    value: function initLrcButton() {
      var _this9 = this;

      this.player.template.lrcButton.addEventListener('click', function () {
        if (_this9.player.template.lrcButton.classList.contains('aplayer-icon-lrc-inactivity')) {
          _this9.player.template.lrcButton.classList.remove('aplayer-icon-lrc-inactivity');

          _this9.player.lrc && _this9.player.lrc.show();
        } else {
          _this9.player.template.lrcButton.classList.add('aplayer-icon-lrc-inactivity');

          _this9.player.lrc && _this9.player.lrc.hide();
        }
      });
    }
  }]);

  return Controller;
}();

/* harmony default export */ __webpack_exports__["default"] = (Controller);

/***/ }),

/***/ "./src/js/events.js":
/*!**************************!*\
  !*** ./src/js/events.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Events = /*#__PURE__*/function () {
  function Events() {
    _classCallCheck(this, Events);

    this.events = {};
    this.audioEvents = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'mozaudioavailable', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];
    this.playerEvents = ['destroy', 'listshow', 'listhide', 'listadd', 'listremove', 'listswitch', 'listclear', 'noticeshow', 'noticehide', 'lrcshow', 'lrchide'];
  }

  _createClass(Events, [{
    key: "on",
    value: function on(name, callback) {
      if (this.type(name) && typeof callback === 'function') {
        if (!this.events[name]) {
          this.events[name] = [];
        }

        this.events[name].push(callback);
      }
    }
  }, {
    key: "trigger",
    value: function trigger(name, data) {
      if (this.events[name] && this.events[name].length) {
        for (var i = 0; i < this.events[name].length; i++) {
          this.events[name][i](data);
        }
      }
    }
  }, {
    key: "type",
    value: function type(name) {
      if (this.playerEvents.indexOf(name) !== -1) {
        return 'player';
      } else if (this.audioEvents.indexOf(name) !== -1) {
        return 'audio';
      }

      console.error("Unknown event name: ".concat(name));
      return null;
    }
  }]);

  return Events;
}();

/* harmony default export */ __webpack_exports__["default"] = (Events);

/***/ }),

/***/ "./src/js/icons.js":
/*!*************************!*\
  !*** ./src/js/icons.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_play_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/play.svg */ "./src/assets/play.svg");
/* harmony import */ var _assets_play_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_play_svg__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_pause_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/pause.svg */ "./src/assets/pause.svg");
/* harmony import */ var _assets_pause_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_pause_svg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_volume_up_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/volume-up.svg */ "./src/assets/volume-up.svg");
/* harmony import */ var _assets_volume_up_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_volume_up_svg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_volume_down_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/volume-down.svg */ "./src/assets/volume-down.svg");
/* harmony import */ var _assets_volume_down_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_volume_down_svg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _assets_volume_off_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../assets/volume-off.svg */ "./src/assets/volume-off.svg");
/* harmony import */ var _assets_volume_off_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_volume_off_svg__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_order_random_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../assets/order-random.svg */ "./src/assets/order-random.svg");
/* harmony import */ var _assets_order_random_svg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_order_random_svg__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _assets_order_list_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/order-list.svg */ "./src/assets/order-list.svg");
/* harmony import */ var _assets_order_list_svg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_order_list_svg__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _assets_menu_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../assets/menu.svg */ "./src/assets/menu.svg");
/* harmony import */ var _assets_menu_svg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_menu_svg__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _assets_loop_all_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../assets/loop-all.svg */ "./src/assets/loop-all.svg");
/* harmony import */ var _assets_loop_all_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_loop_all_svg__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _assets_loop_one_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../assets/loop-one.svg */ "./src/assets/loop-one.svg");
/* harmony import */ var _assets_loop_one_svg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_assets_loop_one_svg__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _assets_loop_none_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../assets/loop-none.svg */ "./src/assets/loop-none.svg");
/* harmony import */ var _assets_loop_none_svg__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_assets_loop_none_svg__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _assets_loading_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../assets/loading.svg */ "./src/assets/loading.svg");
/* harmony import */ var _assets_loading_svg__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_assets_loading_svg__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _assets_right_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../assets/right.svg */ "./src/assets/right.svg");
/* harmony import */ var _assets_right_svg__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_assets_right_svg__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _assets_skip_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../assets/skip.svg */ "./src/assets/skip.svg");
/* harmony import */ var _assets_skip_svg__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_assets_skip_svg__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _assets_lrc_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../assets/lrc.svg */ "./src/assets/lrc.svg");
/* harmony import */ var _assets_lrc_svg__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_assets_lrc_svg__WEBPACK_IMPORTED_MODULE_14__);















var Icons = {
  play: _assets_play_svg__WEBPACK_IMPORTED_MODULE_0___default.a,
  pause: _assets_pause_svg__WEBPACK_IMPORTED_MODULE_1___default.a,
  volumeUp: _assets_volume_up_svg__WEBPACK_IMPORTED_MODULE_2___default.a,
  volumeDown: _assets_volume_down_svg__WEBPACK_IMPORTED_MODULE_3___default.a,
  volumeOff: _assets_volume_off_svg__WEBPACK_IMPORTED_MODULE_4___default.a,
  orderRandom: _assets_order_random_svg__WEBPACK_IMPORTED_MODULE_5___default.a,
  orderList: _assets_order_list_svg__WEBPACK_IMPORTED_MODULE_6___default.a,
  menu: _assets_menu_svg__WEBPACK_IMPORTED_MODULE_7___default.a,
  loopAll: _assets_loop_all_svg__WEBPACK_IMPORTED_MODULE_8___default.a,
  loopOne: _assets_loop_one_svg__WEBPACK_IMPORTED_MODULE_9___default.a,
  loopNone: _assets_loop_none_svg__WEBPACK_IMPORTED_MODULE_10___default.a,
  loading: _assets_loading_svg__WEBPACK_IMPORTED_MODULE_11___default.a,
  right: _assets_right_svg__WEBPACK_IMPORTED_MODULE_12___default.a,
  skip: _assets_skip_svg__WEBPACK_IMPORTED_MODULE_13___default.a,
  lrc: _assets_lrc_svg__WEBPACK_IMPORTED_MODULE_14___default.a
};
/* harmony default export */ __webpack_exports__["default"] = (Icons);

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.scss */ "./src/css/index.scss");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/js/player.js");


/* global APLAYER_VERSION GIT_HASH */

console.log('\n'.concat(" %c APlayer v", "1.10.1", " ").concat("addedb3", " %c http://aplayer.js.org ", '\n'), 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');
/* harmony default export */ __webpack_exports__["default"] = (_player__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./src/js/list.js":
/*!************************!*\
  !*** ./src/js/list.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _template_list_item_art__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../template/list-item.art */ "./src/template/list-item.art");
/* harmony import */ var _template_list_item_art__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_template_list_item_art__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var smoothscroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! smoothscroll */ "./node_modules/_smoothscroll@0.4.0@smoothscroll/smoothscroll.js");
/* harmony import */ var smoothscroll__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(smoothscroll__WEBPACK_IMPORTED_MODULE_2__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }





var List = /*#__PURE__*/function () {
  function List(player) {
    _classCallCheck(this, List);

    this.player = player;
    this.index = 0;
    this.audios = this.player.options.audio;
    this.showing = true;
    this.player.template.list.style.height = "".concat(Math.min(this.player.template.list.scrollHeight, this.player.options.listMaxHeight), "px");
    this.bindEvents();
  }

  _createClass(List, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;

      this.player.template.list.addEventListener('click', function (e) {
        var target;
        console.log(e.target);

        if (e.target.className === 'aplayer-list-remove') {
          var index = e.target.dataset.index;

          _this.remove(index);

          return false;
        } else if (e.target.tagName.toUpperCase() === 'LI') {
          target = e.target;
        } else {
          target = e.target.parentElement;
        }

        var audioIndex = parseInt(target.getElementsByClassName('aplayer-list-index')[0].innerHTML) - 1;

        if (audioIndex !== _this.index) {
          _this["switch"](audioIndex);

          _this.player.play();
        } else {
          _this.player.toggle();
        }
      });
    }
  }, {
    key: "show",
    value: function show() {
      this.showing = true;
      this.player.template.list.scrollTop = this.index * 33;
      this.player.template.list.style.height = "".concat(Math.min(this.player.template.list.scrollHeight, this.player.options.listMaxHeight), "px");
      this.player.events.trigger('listshow');
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this2 = this;

      this.showing = false;
      this.player.template.list.style.height = "".concat(Math.min(this.player.template.list.scrollHeight, this.player.options.listMaxHeight), "px");
      setTimeout(function () {
        _this2.player.template.list.style.height = '0px';

        _this2.player.events.trigger('listhide');
      }, 0);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.showing) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: "add",
    value: function add(audios) {
      this.player.events.trigger('listadd', {
        audios: audios
      });

      if (Object.prototype.toString.call(audios) !== '[object Array]') {
        audios = [audios];
      }

      audios.map(function (item) {
        item.name = item.name || item.title || 'Audio name';
        item.artist = item.artist || item.author || 'Audio artist';
        item.cover = item.cover || item.pic;
        item.type = item.type || 'normal';
        return item;
      });
      var wasSingle = !(this.audios.length > 1);
      var wasEmpty = this.audios.length === 0;
      this.player.template.list.innerHTML += _template_list_item_art__WEBPACK_IMPORTED_MODULE_0___default()({
        theme: this.player.options.theme,
        audio: audios,
        index: this.audios.length + 1
      });
      this.audios = this.audios.concat(audios);

      if (wasSingle && this.audios.length > 1) {
        this.player.container.classList.add('aplayer-withlist');
      }

      this.player.randomOrder = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].randomOrder(this.audios.length);
      this.player.template.listCurs = this.player.container.querySelectorAll('.aplayer-list-cur');
      this.player.template.listCurs[this.audios.length - 1].style.backgroundColor = audios.theme || this.player.options.theme;

      if (wasEmpty) {
        if (this.player.options.order === 'random') {
          this["switch"](this.player.randomOrder[0]);
        } else {
          this["switch"](0);
        }
      }
    }
  }, {
    key: "remove",
    value: function remove(index) {
      this.player.events.trigger('listremove', {
        index: index
      });

      if (this.audios[index]) {
        if (this.audios.length > 1) {
          var list = this.player.container.querySelectorAll('.aplayer-list li');
          list[index].remove();
          this.audios.splice(index, 1);
          this.player.lrc && this.player.lrc.remove(index);

          if (index === this.index) {
            if (this.audios[index]) {
              this["switch"](index);
            } else {
              this["switch"](index - 1);
            }
          }

          if (this.index > index) {
            this.index--;
          }

          for (var i = index; i < list.length; i++) {
            list[i].getElementsByClassName('aplayer-list-index')[0].textContent = i;
          }

          if (this.audios.length === 1) {
            this.player.container.classList.remove('aplayer-withlist');
          }

          this.player.template.listCurs = this.player.container.querySelectorAll('.aplayer-list-cur');
        } else {
          this.clear();
        }
      }
    }
  }, {
    key: "switch",
    value: function _switch(index) {
      this.player.events.trigger('listswitch', {
        index: index
      });

      if (typeof index !== 'undefined' && this.audios[index]) {
        this.index = index;
        var audio = this.audios[this.index]; // set html

        this.player.template.pic.style.backgroundImage = audio.cover ? "url('".concat(audio.cover, "')") : '';
        this.player.theme(this.audios[this.index].theme || this.player.options.theme, this.index, false);
        this.player.template.title.innerHTML = audio.name;
        this.player.template.author.innerHTML = audio.artist ? ' - ' + audio.artist : '';
        var light = this.player.container.getElementsByClassName('aplayer-list-light')[0];

        if (light) {
          light.classList.remove('aplayer-list-light');
        }

        this.player.container.querySelectorAll('.aplayer-list li')[this.index].classList.add('aplayer-list-light');
        smoothscroll__WEBPACK_IMPORTED_MODULE_2___default()(this.index * 33, 500, null, this.player.template.list);
        this.player.setAudio(audio);
        this.player.lrc && this.player.lrc["switch"](this.index);
        this.player.lrc && this.player.lrc.update(0); // set duration time

        if (this.player.duration !== 1) {
          // compatibility: Android browsers will output 1 at first
          this.player.template.dtime.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].secondToTime(this.player.duration);
        }
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.player.events.trigger('listclear');
      this.index = 0;
      this.player.container.classList.remove('aplayer-withlist');
      this.player.pause();
      this.audios = [];
      this.player.lrc && this.player.lrc.clear();
      this.player.audio.src = '';
      this.player.template.list.innerHTML = '';
      this.player.template.pic.style.backgroundImage = '';
      this.player.theme(this.player.options.theme, this.index, false);
      this.player.template.title.innerHTML = 'No audio';
      this.player.template.author.innerHTML = '';
      this.player.bar.set('loaded', 0, 'width');
      this.player.template.dtime.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].secondToTime(0);
    }
  }]);

  return List;
}();

/* harmony default export */ __webpack_exports__["default"] = (List);

/***/ }),

/***/ "./src/js/lrc.js":
/*!***********************!*\
  !*** ./src/js/lrc.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _template_lrc_art__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../template/lrc.art */ "./src/template/lrc.art");
/* harmony import */ var _template_lrc_art__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_template_lrc_art__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Lrc = /*#__PURE__*/function () {
  function Lrc(options) {
    _classCallCheck(this, Lrc);

    this.container = options.container;
    this.async = options.async;
    this.player = options.player;
    this.parsed = [];
    this.index = 0;
    this.current = [];
  }

  _createClass(Lrc, [{
    key: "show",
    value: function show() {
      this.player.events.trigger('lrcshow');
      this.player.template.lrcWrap.classList.remove('aplayer-lrc-hide');
    }
  }, {
    key: "hide",
    value: function hide() {
      this.player.events.trigger('lrchide');
      this.player.template.lrcWrap.classList.add('aplayer-lrc-hide');
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.player.template.lrcWrap.classList.contains('aplayer-lrc-hide')) {
        this.show();
      } else {
        this.hide();
      }
    }
  }, {
    key: "update",
    value: function update() {
      var currentTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.player.audio.currentTime;

      if (this.index > this.current.length - 1 || currentTime < this.current[this.index][0] || !this.current[this.index + 1] || currentTime >= this.current[this.index + 1][0]) {
        for (var i = 0; i < this.current.length; i++) {
          if (currentTime >= this.current[i][0] && (!this.current[i + 1] || currentTime < this.current[i + 1][0])) {
            this.index = i;
            this.container.style.transform = "translateY(".concat(-this.index * 16, "px)");
            this.container.style.webkitTransform = "translateY(".concat(-this.index * 16, "px)");
            this.container.getElementsByClassName('aplayer-lrc-current')[0].classList.remove('aplayer-lrc-current');
            this.container.getElementsByTagName('p')[i].classList.add('aplayer-lrc-current');
          }
        }
      }
    }
  }, {
    key: "switch",
    value: function _switch(index) {
      var _this = this;

      if (!this.parsed[index]) {
        if (!this.async) {
          if (this.player.list.audios[index].lrc) {
            this.parsed[index] = this.parse(this.player.list.audios[index].lrc);
          } else {
            this.parsed[index] = [['00:00', 'Not available']];
          }
        } else {
          this.parsed[index] = [['00:00', 'Loading']];
          var xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function () {
            if (index === _this.player.list.index && xhr.readyState === 4) {
              if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                _this.parsed[index] = _this.parse(xhr.responseText);
              } else {
                _this.player.notice("LRC file request fails: status ".concat(xhr.status));

                _this.parsed[index] = [['00:00', 'Not available']];
              }

              _this.container.innerHTML = _template_lrc_art__WEBPACK_IMPORTED_MODULE_0___default()({
                lyrics: _this.parsed[index]
              });

              _this.update(0);

              _this.current = _this.parsed[index];
            }
          };

          var apiurl = this.player.list.audios[index].lrc;
          xhr.open('get', apiurl, true);
          xhr.send(null);
        }
      }

      this.container.innerHTML = _template_lrc_art__WEBPACK_IMPORTED_MODULE_0___default()({
        lyrics: this.parsed[index]
      });
      this.current = this.parsed[index];
      this.update(0);
    }
    /**
     * Parse lrc, suppose multiple time tag
     *
     * @param {String} lrc_s - Format:
     * [mm:ss]lyric
     * [mm:ss.xx]lyric
     * [mm:ss.xxx]lyric
     * [mm:ss.xx][mm:ss.xx][mm:ss.xx]lyric
     * [mm:ss.xx]<mm:ss.xx>lyric
     *
     * @return {String} [[time, text], [time, text], [time, text], ...]
     */

  }, {
    key: "parse",
    value: function parse(lrc_s) {
      if (lrc_s) {
        lrc_s = lrc_s.replace(/([^\]^\n])\[/g, function (match, p1) {
          return p1 + '\n[';
        });
        var lyric = lrc_s.split('\n');
        var lrc = [];
        var lyricLen = lyric.length;

        for (var i = 0; i < lyricLen; i++) {
          // match lrc time
          var lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g); // match lrc text

          var lrcText = lyric[i].replace(/.*\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g, '').replace(/<(\d{2}):(\d{2})(\.(\d{2,3}))?>/g, '').replace(/^\s+|\s+$/g, '');

          if (lrcTimes) {
            // handle multiple time tag
            var timeLen = lrcTimes.length;

            for (var j = 0; j < timeLen; j++) {
              var oneTime = /\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/.exec(lrcTimes[j]);
              var min2sec = oneTime[1] * 60;
              var sec2sec = parseInt(oneTime[2]);
              var msec2sec = oneTime[4] ? parseInt(oneTime[4]) / ((oneTime[4] + '').length === 2 ? 100 : 1000) : 0;
              var lrcTime = min2sec + sec2sec + msec2sec;
              lrc.push([lrcTime, lrcText]);
            }
          }
        } // sort by time


        lrc = lrc.filter(function (item) {
          return item[1];
        });
        lrc.sort(function (a, b) {
          return a[0] - b[0];
        });
        return lrc;
      } else {
        return [];
      }
    }
  }, {
    key: "remove",
    value: function remove(index) {
      this.parsed.splice(index, 1);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.parsed = [];
      this.container.innerHTML = '';
    }
  }]);

  return Lrc;
}();

/* harmony default export */ __webpack_exports__["default"] = (Lrc);

/***/ }),

/***/ "./src/js/options.js":
/*!***************************!*\
  !*** ./src/js/options.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (options) {
  // default options
  var defaultOption = {
    container: options.element || document.getElementsByClassName('aplayer')[0],
    mini: options.narrow || options.fixed || false,
    fixed: false,
    autoplay: false,
    mutex: true,
    lrcType: options.showlrc || options.lrc || 0,
    preload: 'metadata',
    theme: '#b7daff',
    loop: 'all',
    order: 'list',
    volume: 0.7,
    listFolded: options.fixed,
    listMaxHeight: options.listmaxheight || 250,
    audio: options.music || [],
    storageName: 'aplayer-setting'
  };

  for (var defaultKey in defaultOption) {
    if (defaultOption.hasOwnProperty(defaultKey) && !options.hasOwnProperty(defaultKey)) {
      options[defaultKey] = defaultOption[defaultKey];
    }
  }

  options.listMaxHeight = parseFloat(options.listMaxHeight);

  if (Object.prototype.toString.call(options.audio) !== '[object Array]') {
    options.audio = [options.audio];
  }

  options.audio.map(function (item) {
    item.name = item.name || item.title || 'Audio name';
    item.artist = item.artist || item.author || 'Audio artist';
    item.cover = item.cover || item.pic;
    item.type = item.type || 'normal';
    return item;
  });

  if (options.audio.length <= 1 && options.loop === 'one') {
    options.loop = 'all';
  }

  return options;
});

/***/ }),

/***/ "./src/js/player.js":
/*!**************************!*\
  !*** ./src/js/player.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var promise_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! promise-polyfill */ "./node_modules/_promise-polyfill@8.2.0@promise-polyfill/src/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons */ "./src/js/icons.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./options */ "./src/js/options.js");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template */ "./src/js/template.js");
/* harmony import */ var _bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bar */ "./src/js/bar.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./storage */ "./src/js/storage.js");
/* harmony import */ var _lrc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lrc */ "./src/js/lrc.js");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./controller */ "./src/js/controller.js");
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./timer */ "./src/js/timer.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./events */ "./src/js/events.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./list */ "./src/js/list.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }













var instances = [];

var APlayer = /*#__PURE__*/function () {
  /**
   * APlayer constructor function
   *
   * @param {Object} options - See README
   * @constructor
   */
  function APlayer(options) {
    _classCallCheck(this, APlayer);

    this.options = Object(_options__WEBPACK_IMPORTED_MODULE_3__["default"])(options);
    this.container = this.options.container;
    this.paused = true;
    this.playedPromise = promise_polyfill__WEBPACK_IMPORTED_MODULE_0__["default"].resolve();
    this.mode = 'normal';
    this.randomOrder = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].randomOrder(this.options.audio.length);
    this.container.classList.add('aplayer');

    if (this.options.lrcType && !this.options.fixed) {
      this.container.classList.add('aplayer-withlrc');
    }

    if (this.options.audio.length > 1) {
      this.container.classList.add('aplayer-withlist');
    }

    if (_utils__WEBPACK_IMPORTED_MODULE_1__["default"].isMobile) {
      this.container.classList.add('aplayer-mobile');
    }

    this.arrow = this.container.offsetWidth <= 300;

    if (this.arrow) {
      this.container.classList.add('aplayer-arrow');
    } // save lrc


    if (this.options.lrcType === 2 || this.options.lrcType === true) {
      var lrcEle = this.container.getElementsByClassName('aplayer-lrc-content');

      for (var i = 0; i < lrcEle.length; i++) {
        if (this.options.audio[i]) {
          this.options.audio[i].lrc = lrcEle[i].innerHTML;
        }
      }
    }

    this.template = new _template__WEBPACK_IMPORTED_MODULE_4__["default"]({
      container: this.container,
      options: this.options,
      randomOrder: this.randomOrder
    });

    if (this.options.fixed) {
      this.container.classList.add('aplayer-fixed');
      this.template.body.style.width = this.template.body.offsetWidth - 18 + 'px';
    }

    if (this.options.mini) {
      this.setMode('mini');
      this.template.info.style.display = 'block';
    }

    if (this.template.info.offsetWidth < 200) {
      this.template.time.classList.add('aplayer-time-narrow');
    }

    if (this.options.lrcType) {
      this.lrc = new _lrc__WEBPACK_IMPORTED_MODULE_7__["default"]({
        container: this.template.lrc,
        async: this.options.lrcType === 3,
        player: this
      });
    }

    this.events = new _events__WEBPACK_IMPORTED_MODULE_10__["default"]();
    this.storage = new _storage__WEBPACK_IMPORTED_MODULE_6__["default"](this);
    this.bar = new _bar__WEBPACK_IMPORTED_MODULE_5__["default"](this.template);
    this.controller = new _controller__WEBPACK_IMPORTED_MODULE_8__["default"](this);
    this.timer = new _timer__WEBPACK_IMPORTED_MODULE_9__["default"](this);
    this.list = new _list__WEBPACK_IMPORTED_MODULE_11__["default"](this);
    this.initAudio();
    this.bindEvents();

    if (this.options.order === 'random') {
      this.list["switch"](this.randomOrder[0]);
    } else {
      this.list["switch"](0);
    } // autoplay


    if (this.options.autoplay) {
      this.play();
    }

    instances.push(this);
  }

  _createClass(APlayer, [{
    key: "initAudio",
    value: function initAudio() {
      var _this = this;

      this.audio = document.createElement('audio');
      this.audio.preload = this.options.preload;

      var _loop = function _loop(i) {
        _this.audio.addEventListener(_this.events.audioEvents[i], function (e) {
          _this.events.trigger(_this.events.audioEvents[i], e);
        });
      };

      for (var i = 0; i < this.events.audioEvents.length; i++) {
        _loop(i);
      }

      this.volume(this.storage.get('volume'), true);
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this2 = this;

      this.on('play', function () {
        if (_this2.paused) {
          _this2.setUIPlaying();
        }
      });
      this.on('pause', function () {
        if (!_this2.paused) {
          _this2.setUIPaused();
        }
      });
      this.on('timeupdate', function () {
        if (!_this2.disableTimeupdate) {
          _this2.bar.set('played', _this2.audio.currentTime / _this2.duration, 'width');

          _this2.lrc && _this2.lrc.update();
          var currentTime = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].secondToTime(_this2.audio.currentTime);

          if (_this2.template.ptime.innerHTML !== currentTime) {
            _this2.template.ptime.innerHTML = currentTime;
          }
        }
      }); // show audio time: the metadata has loaded or changed

      this.on('durationchange', function () {
        if (_this2.duration !== 1) {
          // compatibility: Android browsers will output 1 at first
          _this2.template.dtime.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].secondToTime(_this2.duration);
        }
      }); // Can seek now

      this.on('loadedmetadata', function () {
        _this2.seek(0);

        if (!_this2.paused) {
          _this2.audio.play();
        }
      }); // show audio loaded bar: to inform interested parties of progress downloading the media

      this.on('canplay', function () {
        var percentage = _this2.audio.buffered.length ? _this2.audio.buffered.end(_this2.audio.buffered.length - 1) / _this2.duration : 0;

        _this2.bar.set('loaded', percentage, 'width');
      });
      this.on('progress', function () {
        var percentage = _this2.audio.buffered.length ? _this2.audio.buffered.end(_this2.audio.buffered.length - 1) / _this2.duration : 0;

        _this2.bar.set('loaded', percentage, 'width');
      }); // audio download error: an error occurs

      var skipTime;
      this.on('error', function () {
        if (_this2.list.audios.length > 1) {
          _this2.notice('An audio error has occurred, player will skip forward in 2 seconds.');

          skipTime = setTimeout(function () {
            _this2.skipForward();

            if (!_this2.paused) {
              _this2.play();
            }
          }, 2000);
        } else if (_this2.list.audios.length === 1) {
          _this2.notice('An audio error has occurred.');
        }
      });
      this.events.on('listswitch', function () {
        skipTime && clearTimeout(skipTime);
      }); // multiple audio play

      this.on('ended', function () {
        if (_this2.options.loop === 'none') {
          if (_this2.options.order === 'list') {
            if (_this2.list.index < _this2.list.audios.length - 1) {
              _this2.list["switch"]((_this2.list.index + 1) % _this2.list.audios.length);

              _this2.play();
            } else {
              _this2.list["switch"]((_this2.list.index + 1) % _this2.list.audios.length);

              _this2.pause();
            }
          } else if (_this2.options.order === 'random') {
            if (_this2.randomOrder.indexOf(_this2.list.index) < _this2.randomOrder.length - 1) {
              _this2.list["switch"](_this2.nextIndex());

              _this2.play();
            } else {
              _this2.list["switch"](_this2.nextIndex());

              _this2.pause();
            }
          }
        } else if (_this2.options.loop === 'one') {
          _this2.list["switch"](_this2.list.index);

          _this2.play();
        } else if (_this2.options.loop === 'all') {
          _this2.skipForward();

          _this2.play();
        }
      });
    }
  }, {
    key: "setAudio",
    value: function setAudio(audio) {
      if (this.hls) {
        this.hls.destroy();
        this.hls = null;
      }

      var type = audio.type;

      if (this.options.customAudioType && this.options.customAudioType[type]) {
        if (Object.prototype.toString.call(this.options.customAudioType[type]) === '[object Function]') {
          this.options.customAudioType[type](this.audio, audio, this);
        } else {
          console.error("Illegal customType: ".concat(type));
        }
      } else {
        if (!type || type === 'auto') {
          if (/m3u8(#|\?|$)/i.exec(audio.url)) {
            type = 'hls';
          } else {
            type = 'normal';
          }
        }

        if (type === 'hls') {
          if (window.Hls.isSupported()) {
            this.hls = new window.Hls();
            this.hls.loadSource(audio.url);
            this.hls.attachMedia(this.audio);
          } else if (this.audio.canPlayType('application/x-mpegURL') || this.audio.canPlayType('application/vnd.apple.mpegURL')) {
            this.audio.src = audio.url;
          } else {
            this.notice('Error: HLS is not supported.');
          }
        } else if (type === 'normal') {
          this.audio.src = audio.url;
        }
      }
    }
  }, {
    key: "theme",
    value: function theme() {
      var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.list.audios[this.list.index].theme || this.options.theme;
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.list.index;
      var isReset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (isReset) {
        this.list.audios[index] && (this.list.audios[index].theme = color);
      }

      this.template.listCurs[index] && (this.template.listCurs[index].style.backgroundColor = color);

      if (index === this.list.index) {
        this.template.pic.style.backgroundColor = color;
        this.template.played.style.background = color;
        this.template.thumb.style.background = color;
        this.template.volume.style.background = color;
      }
    }
  }, {
    key: "seek",
    value: function seek(time) {
      time = Math.max(time, 0);
      time = Math.min(time, this.duration);
      this.audio.currentTime = time;
      this.bar.set('played', time / this.duration, 'width');
      this.template.ptime.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].secondToTime(time);
    }
  }, {
    key: "duration",
    get: function get() {
      return isNaN(this.audio.duration) ? 0 : this.audio.duration;
    }
  }, {
    key: "setUIPlaying",
    value: function setUIPlaying() {
      var _this3 = this;

      if (this.paused) {
        this.paused = false;
        this.template.button.classList.remove('aplayer-play');
        this.template.button.classList.add('aplayer-pause');
        this.template.button.innerHTML = '';
        setTimeout(function () {
          _this3.template.button.innerHTML = _icons__WEBPACK_IMPORTED_MODULE_2__["default"].pause;
        }, 100);
        this.template.skipPlayButton.innerHTML = _icons__WEBPACK_IMPORTED_MODULE_2__["default"].pause;
      }

      this.timer.enable('loading');

      if (this.options.mutex) {
        for (var i = 0; i < instances.length; i++) {
          if (this !== instances[i]) {
            instances[i].pause();
          }
        }
      }
    }
  }, {
    key: "play",
    value: function play() {
      var _this4 = this;

      this.setUIPlaying();
      var playPromise = this.audio.play();

      if (playPromise) {
        playPromise["catch"](function (e) {
          console.warn(e);

          if (e.name === 'NotAllowedError') {
            _this4.setUIPaused();
          }
        });
      }
    }
  }, {
    key: "setUIPaused",
    value: function setUIPaused() {
      var _this5 = this;

      if (!this.paused) {
        this.paused = true;
        this.template.button.classList.remove('aplayer-pause');
        this.template.button.classList.add('aplayer-play');
        this.template.button.innerHTML = '';
        setTimeout(function () {
          _this5.template.button.innerHTML = _icons__WEBPACK_IMPORTED_MODULE_2__["default"].play;
        }, 100);
        this.template.skipPlayButton.innerHTML = _icons__WEBPACK_IMPORTED_MODULE_2__["default"].play;
      }

      this.container.classList.remove('aplayer-loading');
      this.timer.disable('loading');
    }
  }, {
    key: "pause",
    value: function pause() {
      this.setUIPaused();
      this.audio.pause();
    }
  }, {
    key: "switchVolumeIcon",
    value: function switchVolumeIcon() {
      if (this.volume() >= 0.95) {
        this.template.volumeButton.innerHTML = _icons__WEBPACK_IMPORTED_MODULE_2__["default"].volumeUp;
      } else if (this.volume() > 0) {
        this.template.volumeButton.innerHTML = _icons__WEBPACK_IMPORTED_MODULE_2__["default"].volumeDown;
      } else {
        this.template.volumeButton.innerHTML = _icons__WEBPACK_IMPORTED_MODULE_2__["default"].volumeOff;
      }
    }
    /**
     * Set volume
     */

  }, {
    key: "volume",
    value: function volume(percentage, nostorage) {
      percentage = parseFloat(percentage);

      if (!isNaN(percentage)) {
        percentage = Math.max(percentage, 0);
        percentage = Math.min(percentage, 1);
        this.bar.set('volume', percentage, 'height');

        if (!nostorage) {
          this.storage.set('volume', percentage);
        }

        this.audio.volume = percentage;

        if (this.audio.muted) {
          this.audio.muted = false;
        }

        this.switchVolumeIcon();
      }

      return this.audio.muted ? 0 : this.audio.volume;
    }
    /**
     * bind events
     */

  }, {
    key: "on",
    value: function on(name, callback) {
      this.events.on(name, callback);
    }
    /**
     * toggle between play and pause
     */

  }, {
    key: "toggle",
    value: function toggle() {
      if (this.template.button.classList.contains('aplayer-play')) {
        this.play();
      } else if (this.template.button.classList.contains('aplayer-pause')) {
        this.pause();
      }
    } // abandoned

  }, {
    key: "switchAudio",
    value: function switchAudio(index) {
      this.list["switch"](index);
    } // abandoned

  }, {
    key: "addAudio",
    value: function addAudio(audios) {
      this.list.add(audios);
    } // abandoned

  }, {
    key: "removeAudio",
    value: function removeAudio(index) {
      this.list.remove(index);
    }
    /**
     * destroy this player
     */

  }, {
    key: "destroy",
    value: function destroy() {
      instances.splice(instances.indexOf(this), 1);
      this.pause();
      this.container.innerHTML = '';
      this.audio.src = '';
      this.timer.destroy();
      this.events.trigger('destroy');
    }
  }, {
    key: "setMode",
    value: function setMode() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'normal';
      this.mode = mode;

      if (mode === 'mini') {
        this.container.classList.add('aplayer-narrow');
      } else if (mode === 'normal') {
        this.container.classList.remove('aplayer-narrow');
      }
    }
  }, {
    key: "notice",
    value: function notice(text) {
      var _this6 = this;

      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
      var opacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.8;
      this.template.notice.innerHTML = text;
      this.template.notice.style.opacity = opacity;

      if (this.noticeTime) {
        clearTimeout(this.noticeTime);
      }

      this.events.trigger('noticeshow', {
        text: text
      });

      if (time) {
        this.noticeTime = setTimeout(function () {
          _this6.template.notice.style.opacity = 0;

          _this6.events.trigger('noticehide');
        }, time);
      }
    }
  }, {
    key: "prevIndex",
    value: function prevIndex() {
      if (this.list.audios.length > 1) {
        if (this.options.order === 'list') {
          return this.list.index - 1 < 0 ? this.list.audios.length - 1 : this.list.index - 1;
        } else if (this.options.order === 'random') {
          var index = this.randomOrder.indexOf(this.list.index);

          if (index === 0) {
            return this.randomOrder[this.randomOrder.length - 1];
          } else {
            return this.randomOrder[index - 1];
          }
        }
      } else {
        return 0;
      }
    }
  }, {
    key: "nextIndex",
    value: function nextIndex() {
      if (this.list.audios.length > 1) {
        if (this.options.order === 'list') {
          return (this.list.index + 1) % this.list.audios.length;
        } else if (this.options.order === 'random') {
          var index = this.randomOrder.indexOf(this.list.index);

          if (index === this.randomOrder.length - 1) {
            return this.randomOrder[0];
          } else {
            return this.randomOrder[index + 1];
          }
        }
      } else {
        return 0;
      }
    }
  }, {
    key: "skipBack",
    value: function skipBack() {
      this.list["switch"](this.prevIndex());
    }
  }, {
    key: "skipForward",
    value: function skipForward() {
      this.list["switch"](this.nextIndex());
    }
  }], [{
    key: "version",
    get: function get() {
      /* global APLAYER_VERSION */
      return "1.10.1";
    }
  }]);

  return APlayer;
}();

/* harmony default export */ __webpack_exports__["default"] = (APlayer);

/***/ }),

/***/ "./src/js/storage.js":
/*!***************************!*\
  !*** ./src/js/storage.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Storage = /*#__PURE__*/function () {
  function Storage(player) {
    _classCallCheck(this, Storage);

    this.storageName = player.options.storageName;
    this.data = JSON.parse(_utils__WEBPACK_IMPORTED_MODULE_0__["default"].storage.get(this.storageName));

    if (!this.data) {
      this.data = {};
    }

    this.data.volume = this.data.volume || player.options.volume;
  }

  _createClass(Storage, [{
    key: "get",
    value: function get(key) {
      return this.data[key];
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.data[key] = value;
      _utils__WEBPACK_IMPORTED_MODULE_0__["default"].storage.set(this.storageName, JSON.stringify(this.data));
    }
  }]);

  return Storage;
}();

/* harmony default export */ __webpack_exports__["default"] = (Storage);

/***/ }),

/***/ "./src/js/template.js":
/*!****************************!*\
  !*** ./src/js/template.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons */ "./src/js/icons.js");
/* harmony import */ var _template_player_art__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../template/player.art */ "./src/template/player.art");
/* harmony import */ var _template_player_art__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_template_player_art__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var Template = /*#__PURE__*/function () {
  function Template(options) {
    _classCallCheck(this, Template);

    this.container = options.container;
    this.options = options.options;
    this.randomOrder = options.randomOrder;
    this.init();
  }

  _createClass(Template, [{
    key: "init",
    value: function init() {
      var cover = '';

      if (this.options.audio.length) {
        if (this.options.order === 'random') {
          cover = this.options.audio[this.randomOrder[0]].cover;
        } else {
          cover = this.options.audio[0].cover;
        }
      }

      this.container.innerHTML = _template_player_art__WEBPACK_IMPORTED_MODULE_1___default()({
        options: this.options,
        icons: _icons__WEBPACK_IMPORTED_MODULE_0__["default"],
        cover: cover,
        getObject: function getObject(obj) {
          return obj;
        }
      });
      this.lrc = this.container.querySelector('.aplayer-lrc-contents');
      this.lrcWrap = this.container.querySelector('.aplayer-lrc');
      this.ptime = this.container.querySelector('.aplayer-ptime');
      this.info = this.container.querySelector('.aplayer-info');
      this.time = this.container.querySelector('.aplayer-time');
      this.barWrap = this.container.querySelector('.aplayer-bar-wrap');
      this.button = this.container.querySelector('.aplayer-button');
      this.body = this.container.querySelector('.aplayer-body');
      this.list = this.container.querySelector('.aplayer-list');
      this.listCurs = this.container.querySelectorAll('.aplayer-list-cur');
      this.played = this.container.querySelector('.aplayer-played');
      this.loaded = this.container.querySelector('.aplayer-loaded');
      this.thumb = this.container.querySelector('.aplayer-thumb');
      this.volume = this.container.querySelector('.aplayer-volume');
      this.volumeBar = this.container.querySelector('.aplayer-volume-bar');
      this.volumeButton = this.container.querySelector('.aplayer-time button');
      this.volumeBarWrap = this.container.querySelector('.aplayer-volume-bar-wrap');
      this.loop = this.container.querySelector('.aplayer-icon-loop');
      this.order = this.container.querySelector('.aplayer-icon-order');
      this.menu = this.container.querySelector('.aplayer-icon-menu');
      this.pic = this.container.querySelector('.aplayer-pic');
      this.title = this.container.querySelector('.aplayer-title');
      this.author = this.container.querySelector('.aplayer-author');
      this.dtime = this.container.querySelector('.aplayer-dtime');
      this.notice = this.container.querySelector('.aplayer-notice');
      this.miniSwitcher = this.container.querySelector('.aplayer-miniswitcher');
      this.skipBackButton = this.container.querySelector('.aplayer-icon-back');
      this.skipForwardButton = this.container.querySelector('.aplayer-icon-forward');
      this.skipPlayButton = this.container.querySelector('.aplayer-icon-play');
      this.lrcButton = this.container.querySelector('.aplayer-icon-lrc');
    }
  }]);

  return Template;
}();

/* harmony default export */ __webpack_exports__["default"] = (Template);

/***/ }),

/***/ "./src/js/timer.js":
/*!*************************!*\
  !*** ./src/js/timer.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Timer = /*#__PURE__*/function () {
  function Timer(player) {
    _classCallCheck(this, Timer);

    this.player = player;

    window.requestAnimationFrame = function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    }();

    this.types = ['loading'];
    this.init();
  }

  _createClass(Timer, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.types.forEach(function (item) {
        _this["init".concat(item, "Checker")]();
      });
    }
  }, {
    key: "initloadingChecker",
    value: function initloadingChecker() {
      var _this2 = this;

      var lastPlayPos = 0;
      var currentPlayPos = 0;
      var bufferingDetected = false;
      this.loadingChecker = setInterval(function () {
        if (_this2.enableloadingChecker) {
          // whether the audio is buffering
          currentPlayPos = _this2.player.audio.currentTime;

          if (!bufferingDetected && currentPlayPos === lastPlayPos && !_this2.player.audio.paused) {
            _this2.player.container.classList.add('aplayer-loading');

            bufferingDetected = true;
          }

          if (bufferingDetected && currentPlayPos > lastPlayPos && !_this2.player.audio.paused) {
            _this2.player.container.classList.remove('aplayer-loading');

            bufferingDetected = false;
          }

          lastPlayPos = currentPlayPos;
        }
      }, 100);
    }
  }, {
    key: "enable",
    value: function enable(type) {
      this["enable".concat(type, "Checker")] = true;

      if (type === 'fps') {
        this.initfpsChecker();
      }
    }
  }, {
    key: "disable",
    value: function disable(type) {
      this["enable".concat(type, "Checker")] = false;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this3 = this;

      this.types.forEach(function (item) {
        _this3["enable".concat(item, "Checker")] = false;
        _this3["".concat(item, "Checker")] && clearInterval(_this3["".concat(item, "Checker")]);
      });
    }
  }]);

  return Timer;
}();

/* harmony default export */ __webpack_exports__["default"] = (Timer);

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var isMobile = /mobile/i.test(window.navigator.userAgent);
var utils = {
  /**
   * Parse second to time string
   *
   * @param {Number} second
   * @return {String} 00:00 or 00:00:00
   */
  secondToTime: function secondToTime(second) {
    var add0 = function add0(num) {
      return num < 10 ? '0' + num : '' + num;
    };

    var hour = Math.floor(second / 3600);
    var min = Math.floor((second - hour * 3600) / 60);
    var sec = Math.floor(second - hour * 3600 - min * 60);
    return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':');
  },
  isMobile: isMobile,
  storage: {
    set: function set(key, value) {
      localStorage.setItem(key, value);
    },
    get: function get(key) {
      return localStorage.getItem(key);
    }
  },
  nameMap: {
    dragStart: isMobile ? 'touchstart' : 'mousedown',
    dragMove: isMobile ? 'touchmove' : 'mousemove',
    dragEnd: isMobile ? 'touchend' : 'mouseup'
  },

  /**
   * get random order, using Fisher–Yates shuffle
   */
  randomOrder: function randomOrder(length) {
    function shuffle(arr) {
      for (var i = arr.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = arr[randomIndex];
        arr[randomIndex] = arr[i];
        arr[i] = itemAtIndex;
      }

      return arr;
    }

    return shuffle(_toConsumableArray(Array(length)).map(function (item, i) {
      return i;
    }));
  }
};
/* harmony default export */ __webpack_exports__["default"] = (utils);

/***/ }),

/***/ "./src/template/list-item.art":
/*!************************************!*\
  !*** ./src/template/list-item.art ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $imports = __webpack_require__(/*! ../../node_modules/_art-template@4.13.2@art-template/lib/runtime.js */ "./node_modules/_art-template@4.13.2@art-template/lib/runtime.js");
module.exports = function ($data) {
    'use strict';
    $data = $data || {};
    var $$out = '', $each = $imports.$each, audio = $data.audio, $value = $data.$value, $index = $data.$index, $escape = $imports.$escape, theme = $data.theme, index = $data.index;
    $each(audio, function ($value, $index) {
        $$out += '\n<li>\n    <span class="aplayer-list-cur" style="background-color: ';
        $$out += $escape($value.theme || theme);
        $$out += ';"></span>\n    <span class="aplayer-list-index">';
        $$out += $escape($index + index);
        $$out += '</span>\n    <span class="aplayer-list-title">';
        $$out += $escape($value.name);
        $$out += '</span>\n    ';
        if ($value.removeable) {
            $$out += ' \n    <span class="aplayer-list-remove" data-index="';
            $$out += $escape($index);
            $$out += '">\u2716</span> \n    ';
        } else {
            $$out += '\n    <span class="aplayer-list-occupied"></span> \n    ';
        }
        $$out += '\n    <span class="aplayer-list-author">';
        $$out += $escape($value.artist);
        $$out += '</span>\n</li>\n';
    });
    return $$out;
};

/***/ }),

/***/ "./src/template/lrc.art":
/*!******************************!*\
  !*** ./src/template/lrc.art ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $imports = __webpack_require__(/*! ../../node_modules/_art-template@4.13.2@art-template/lib/runtime.js */ "./node_modules/_art-template@4.13.2@art-template/lib/runtime.js");
module.exports = function ($data) {
    'use strict';
    $data = $data || {};
    var $$out = '', $each = $imports.$each, lyrics = $data.lyrics, $value = $data.$value, $index = $data.$index, $escape = $imports.$escape;
    $each(lyrics, function ($value, $index) {
        $$out += '\n    <p';
        if ($index === 0) {
            $$out += ' class="aplayer-lrc-current"';
        }
        $$out += '>';
        $$out += $escape($value[1]);
        $$out += '</p>\n';
    });
    return $$out;
};

/***/ }),

/***/ "./src/template/player.art":
/*!*********************************!*\
  !*** ./src/template/player.art ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $imports = __webpack_require__(/*! ../../node_modules/_art-template@4.13.2@art-template/lib/runtime.js */ "./node_modules/_art-template@4.13.2@art-template/lib/runtime.js");
module.exports = function ($data) {
    'use strict';
    $data = $data || {};
    var $$out = '', options = $data.options, cover = $data.cover, $escape = $imports.$escape, icons = $data.icons, $$blocks = arguments[1] || {}, include = function (content) {
            $$out += content;
            return $$out;
        }, getObject = $data.getObject, theme = $data.theme, audio = $data.audio, index = $data.index;
    if (!options.fixed) {
        $$out += '\n<div class="aplayer-body">\n    <div class="aplayer-pic" style="';
        if (cover) {
            $$out += 'background-image: url(&quot;';
            $$out += $escape(cover);
            $$out += '&quot;);';
        }
        $$out += 'background-color: ';
        $$out += $escape(options.theme);
        $$out += ';">\n        <div class="aplayer-button aplayer-play">';
        $$out += icons.play;
        $$out += '</div>\n    </div>\n    <div class="aplayer-info">\n        <div class="aplayer-music">\n            <span class="aplayer-title">No audio</span>\n            <span class="aplayer-author"></span>\n        </div>\n        <div class="aplayer-lrc">\n            <div class="aplayer-lrc-contents" style="transform: translateY(0); -webkit-transform: translateY(0);"></div>\n        </div>\n        <div class="aplayer-controller">\n            <div class="aplayer-bar-wrap">\n                <div class="aplayer-bar">\n                    <div class="aplayer-loaded" style="width: 0"></div>\n                    <div class="aplayer-played" style="width: 0; background: ';
        $$out += $escape(options.theme);
        $$out += ';">\n                        <span class="aplayer-thumb" style="background: ';
        $$out += $escape(options.theme);
        $$out += ';">\n                            <span class="aplayer-loading-icon">';
        $$out += icons.loading;
        $$out += '</span>\n                        </span>\n                    </div>\n                </div>\n            </div>\n            <div class="aplayer-time">\n                <span class="aplayer-time-inner">\n                    <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span>\n                </span>\n                <span class="aplayer-icon aplayer-icon-back">\n                    ';
        $$out += icons.skip;
        $$out += '\n                </span>\n                <span class="aplayer-icon aplayer-icon-play">\n                    ';
        $$out += icons.play;
        $$out += '\n                </span>\n                <span class="aplayer-icon aplayer-icon-forward">\n                    ';
        $$out += icons.skip;
        $$out += '\n                </span>\n                <div class="aplayer-volume-wrap">\n                    <button type="button" class="aplayer-icon aplayer-icon-volume-down">\n                        ';
        $$out += icons.volumeDown;
        $$out += '\n                    </button>\n                    <div class="aplayer-volume-bar-wrap">\n                        <div class="aplayer-volume-bar">\n                            <div class="aplayer-volume" style="height: 80%; background: ';
        $$out += $escape(options.theme);
        $$out += ';"></div>\n                        </div>\n                    </div>\n                </div>\n                <button type="button" class="aplayer-icon aplayer-icon-order">\n                    ';
        if (options.order === 'list') {
            $$out += icons.orderList;
        } else if (options.order === 'random') {
            $$out += icons.orderRandom;
        }
        $$out += '\n                </button>\n                <button type="button" class="aplayer-icon aplayer-icon-loop">\n                    ';
        if (options.loop === 'one') {
            $$out += icons.loopOne;
        } else if (options.loop === 'all') {
            $$out += icons.loopAll;
        } else if (options.loop === 'none') {
            $$out += icons.loopNone;
        }
        $$out += '\n                </button>\n                <button type="button" class="aplayer-icon aplayer-icon-menu">\n                    ';
        $$out += icons.menu;
        $$out += '\n                </button>\n                <button type="button" class="aplayer-icon aplayer-icon-lrc">\n                    ';
        $$out += icons.lrc;
        $$out += '\n                </button>\n            </div>\n        </div>\n    </div>\n    <div class="aplayer-notice"></div>\n    <div class="aplayer-miniswitcher"><button class="aplayer-icon">';
        $$out += icons.right;
        $$out += '</button></div>\n</div>\n<ol class="aplayer-list';
        if (options.listFolded) {
            $$out += ' aplayer-list-hide';
        }
        $$out += '">\n    ';
        include(__webpack_require__(/*! ./list-item.art */ "./src/template/list-item.art")(getObject({
            theme: options.theme,
            audio: options.audio,
            index: 1
        })));
        $$out += '\n</ol>\n';
    } else {
        $$out += '\n<ol class="aplayer-list';
        if (options.listFolded) {
            $$out += ' aplayer-list-hide';
        }
        $$out += '">\n    ';
        include(__webpack_require__(/*! ./list-item.art */ "./src/template/list-item.art")(getObject({
            theme: options.theme,
            audio: options.audio,
            index: 1
        })));
        $$out += '\n</ol>\n<div class="aplayer-body">\n    <div class="aplayer-pic" style="';
        if (cover) {
            $$out += 'background-image: url(&quot;';
            $$out += $escape(cover);
            $$out += '&quot;);';
        }
        $$out += 'background-color: ';
        $$out += $escape(options.theme);
        $$out += ';">\n        <div class="aplayer-button aplayer-play">';
        $$out += icons.play;
        $$out += '</div>\n    </div>\n    <div class="aplayer-info" style="display: none;">\n        <div class="aplayer-music">\n            <span class="aplayer-title">No audio</span>\n            <span class="aplayer-author"></span>\n        </div>\n        <div class="aplayer-controller">\n            <div class="aplayer-bar-wrap">\n                <div class="aplayer-bar">\n                    <div class="aplayer-loaded" style="width: 0"></div>\n                    <div class="aplayer-played" style="width: 0; background: ';
        $$out += $escape(options.theme);
        $$out += ';">\n                        <span class="aplayer-thumb" style="background: ';
        $$out += $escape(options.theme);
        $$out += ';">\n                            <span class="aplayer-loading-icon">';
        $$out += icons.loading;
        $$out += '</span>\n                        </span>\n                    </div>\n                </div>\n            </div>\n            <div class="aplayer-time">\n                <span class="aplayer-time-inner">\n                    <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span>\n                </span>\n                <span class="aplayer-icon aplayer-icon-back">\n                    ';
        $$out += icons.skip;
        $$out += '\n                </span>\n                <span class="aplayer-icon aplayer-icon-play">\n                    ';
        $$out += icons.play;
        $$out += '\n                </span>\n                <span class="aplayer-icon aplayer-icon-forward">\n                    ';
        $$out += icons.skip;
        $$out += '\n                </span>\n                <div class="aplayer-volume-wrap">\n                    <button type="button" class="aplayer-icon aplayer-icon-volume-down">\n                        ';
        $$out += icons.volumeDown;
        $$out += '\n                    </button>\n                    <div class="aplayer-volume-bar-wrap">\n                        <div class="aplayer-volume-bar">\n                            <div class="aplayer-volume" style="height: 80%; background: ';
        $$out += $escape(options.theme);
        $$out += ';"></div>\n                        </div>\n                    </div>\n                </div>\n                <button type="button" class="aplayer-icon aplayer-icon-order">\n                    ';
        if (options.order === 'list') {
            $$out += icons.orderList;
        } else if (options.order === 'random') {
            $$out += icons.orderRandom;
        }
        $$out += '\n                </button>\n                <button type="button" class="aplayer-icon aplayer-icon-loop">\n                    ';
        if (options.loop === 'one') {
            $$out += icons.loopOne;
        } else if (options.loop === 'all') {
            $$out += icons.loopAll;
        } else if (options.loop === 'none') {
            $$out += icons.loopNone;
        }
        $$out += '\n                </button>\n                <button type="button" class="aplayer-icon aplayer-icon-menu">\n                    ';
        $$out += icons.menu;
        $$out += '\n                </button>\n                <button type="button" class="aplayer-icon aplayer-icon-lrc">\n                    ';
        $$out += icons.lrc;
        $$out += '\n                </button>\n            </div>\n        </div>\n    </div>\n    <div class="aplayer-notice"></div>\n    <div class="aplayer-miniswitcher"><button class="aplayer-icon">';
        $$out += icons.right;
        $$out += '</button></div>\n</div>\n<div class="aplayer-lrc">\n    <div class="aplayer-lrc-contents" style="transform: translateY(0); -webkit-transform: translateY(0);"></div>\n</div>\n';
    }
    return $$out;
};

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=APlayer.js.map