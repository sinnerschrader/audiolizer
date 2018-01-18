(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(7), __webpack_require__(8), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(require('../src/index.js'), require('./audio/electronical.mp3'), require('./audio/nerdcore.mp3'), require('./audio/car.mp3'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.index, global.electronical, global.nerdcore, global.car);
    global.index = mod.exports;
  }
})(this, function (_index, _electronical, _nerdcore, _car) {
  'use strict';

  var _index2 = _interopRequireDefault(_index);

  var _electronical2 = _interopRequireDefault(_electronical);

  var _nerdcore2 = _interopRequireDefault(_nerdcore);

  var _car2 = _interopRequireDefault(_car);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const W = 512;
  const H = 512;
  const LINE_WIDTH = 3;
  const OPACITY = 1;
  const VOLUME = 0.2;

  const ROUND = 1;
  const part = 2 * Math.PI;
  const BG = '#000';
  const FG = '#fff';
  const BRAND = getComputedStyle(document.documentElement).getPropertyValue('--brand-color');

  const C = document.getElementById('canvas');
  const verticesRange = document.getElementById('vertices');
  const volumeRange = document.getElementById('volume');
  const playDemo1 = document.getElementById('demo1');
  const playDemo2 = document.getElementById('demo2');
  const playDemo3 = document.getElementById('demo3');
  const stopButton = document.getElementById('stop');
  const playButton = document.getElementById('play');
  const $ = C.getContext('2d');

  const FF = 64;
  verticesRange.setAttribute('min', 3);
  verticesRange.setAttribute('max', FF * 2);
  verticesRange.setAttribute('value', FF);
  volumeRange.setAttribute('min', 0);
  volumeRange.setAttribute('max', 1);
  volumeRange.setAttribute('step', 0.1);
  volumeRange.setAttribute('value', VOLUME);
  const STEP = W / FF;
  let MOD = ~~(FF * 2 / parseInt(verticesRange.value, 10));

  const audiolizer = new _index2.default({ fftSize: FF });
  audiolizer.volume = VOLUME;

  verticesRange.addEventListener('input', e => {
    MOD = ~~(FF * 2 / parseInt(e.target.value, 10));
  });

  volumeRange.addEventListener('input', e => {
    audiolizer.volume = parseFloat(e.target.value);
  });

  playDemo1.addEventListener('click', e => {
    audiolizer.file = _electronical2.default;
  });

  playButton.addEventListener('click', e => {
    audiolizer.play();
  });

  stopButton.addEventListener('click', e => {
    audiolizer.stop();
  });

  playDemo2.addEventListener('click', e => {
    audiolizer.file = _nerdcore2.default;
  });

  playDemo3.addEventListener('click', e => {
    audiolizer.file = _car2.default;
  });

  C.height = H;
  C.width = W;
  $.fillStyle = BG;
  $.fillRect(0, 0, W, H);
  $.strokeStyle = FG;
  $.lineWidth = LINE_WIDTH;
  let counter = 0;
  $.fillStyle = `hsla(0, 0%, 0%, ${OPACITY})`;
  audiolizer.convert = (arr = []) => {
    $.fillRect(0, 0, W, H);
    $.beginPath();
    let n = 0;
    const revArr = [...arr].reverse();
    const roundArr = [...arr, ...revArr];
    let start;
    const filteredArray = roundArr.filter((x, i) => !Boolean(i % MOD));
    filteredArray.forEach((point, i) => {
      const rad = part / filteredArray.length * i;
      const x = Math.sin(rad) * point + W / 2;
      const y = Math.cos(rad) * point + H / 2;
      if (!start) {
        start = true;
        $.moveTo(x, y);
      } else {
        $.lineTo(x, y);
      }
      n += point;
    });

    const average = n / filteredArray.length;
    if (average > 128) {
      $.strokeStyle = BRAND;
    } else {
      $.strokeStyle = FG;
    }

    $.closePath();
    $.stroke();
  };

  //audiolizer.play()
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('audio-loader'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.audioLoader);
    global.index = mod.exports;
  }
})(this, function (exports, load) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  // load a collection of files

  const defaultConfig = {
    fftSize: 512
  };

  class Audiolizer {

    constructor(config = {}) {
      this._audio = new Audio();
      this._audioCtx = new AudioContext();
      this._analyser = this._audioCtx.createAnalyser();
      this._dataArray = new Uint8Array(this._analyser.frequencyBinCount);

      this._config = _extends({}, defaultConfig, config);
      this._analyser.fftSize = this._config.fftSize;
      this._draw = this._draw.bind(this);
    }

    _visualize() {
      this._dataArray = new Uint8Array(this._analyser.fftSize);
    }

    _draw() {
      this._analyser.getByteTimeDomainData(this._dataArray);
      this._convert(this._dataArray);
      if (this._isPlaying) {
        requestAnimationFrame(this._draw);
      } else {
        cancelAnimationFrame(this._draw);
      }
    }

    set file(file) {
      this._file = file;
      this._updateSrc();
    }

    set fftSize(fftSize) {
      this._analyser.fftSize = fftSize;
    }

    set convert(fn) {
      this._convert = fn;
    }

    play() {
      this._isPlaying = true;
      this._play();
      this._visualize();
      this._draw();
    }

    stop() {
      this._stop();
    }

    pause() {
      this._isPlaying = false;
      this._pause();
    }

    _stop() {
      this._pause();
      this._audio.currentTime = 0;
    }

    _pause() {
      this._audio.pause();
    }

    _play() {
      this._audio.play();
    }

    _updateSrc() {
      this._audio.src = this._file;
      this._loadFile();
    }

    set volume(volume) {
      this._audio.volume = volume;
    }

    _loadFile() {
      load(this._file).then(buffer => {
        if (!this._source) {
          this._source = this._audioCtx.createMediaElementSource(this._audio);
          this._source.connect(this._analyser);
          this._analyser.connect(this._audioCtx.destination);
        }
        this.play();
      });
    }
  }

  exports.default = Audiolizer;
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* global XMLHttpRequest */

var load = __webpack_require__(3)
var context = __webpack_require__(6)

module.exports = function (source, options, cb) {
  if (options instanceof Function) {
    cb = options
    options = {}
  }
  options = options || {}
  options.ready = cb || function () {}
  var ac = options && options.context ? options.context : context()
  var defaults = { decode: getAudioDecoder(ac), fetch: fetch }
  var opts = Object.assign(defaults, options)
  return load(source, opts)
}

/**
 * Wraps AudioContext's decodeAudio into a Promise
 */
function getAudioDecoder (ac) {
  return function decode (buffer) {
    return new Promise(function (resolve, reject) {
      ac.decodeAudioData(buffer,
        function (data) { resolve(data) },
        function (err) { reject(err) })
    })
  }
}

/*
 * Wraps a XMLHttpRequest into a Promise
 *
 * @param {String} url
 * @param {String} type - can be 'text' or 'arraybuffer'
 * @return {Promise}
 */
function fetch (url, type) {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest()
    if (type) req.responseType = type

    req.open('GET', url)
    req.onload = function () {
      req.status === 200 ? resolve(req.response) : reject(Error(req.statusText))
    }
    req.onerror = function () { reject(Error('Network Error')) }
    req.send()
  })
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base64 = __webpack_require__(4)
var isBuffer = __webpack_require__(5)

// Given a regex, return a function that test if against a string
function fromRegex (r) {
  return function (o) { return typeof o === 'string' && r.test(o) }
}
// Try to apply a prefix to a name
function prefix (pre, name) {
  return typeof pre === 'string' ? pre + name
    : typeof pre === 'function' ? pre(name)
    : name
}

/**
 * Load one or more audio files
 *
 *
 * Possible option keys:
 *
 * - __from__ {Function|String}: a function or string to convert from file names to urls.
 * If is a string it will be prefixed to the name:
 * `load('snare.mp3', { from: 'http://audio.net/samples/' })`
 * If it's a function it receives the file name and should return the url as string.
 * - __only__ {Array} - when loading objects, if provided, only the given keys
 * will be included in the decoded object:
 * `load('piano.json', { only: ['C2', 'D2'] })`
 *
 * @param {Object} source - the object to be loaded
 * @param {Object} options - (Optional) the load options for that object
 * @param {Object} defaultValue - (Optional) the default value to return as
 * in a promise if not valid loader found
 */
function load (source, options, defVal) {
  var loader =
    // Basic audio loading
      isArrayBuffer(source) || isBuffer(source) ? decodeBuffer
    : isAudioFileName(source) ? loadAudioFile
    : isPromise(source) ? loadPromise
    // Compound objects
    : isArray(source) ? loadArrayData
    : isObject(source) ? loadObjectData
    : isJsonFileName(source) ? loadJsonFile
    // Base64 encoded audio
    : isBase64Audio(source) ? loadBase64Audio
    : isJsFileName(source) ? loadMidiJSFile
    : null

  var opts = options || {}
  var promise = loader ? loader(source, opts)
    : defVal ? Promise.resolve(defVal)
    : Promise.reject('Source not valid (' + source + ')')

  return promise.then(function (data) {
    opts.ready(null, data)
    return data
  }, function (err) {
    opts.ready(err)
    throw err
  })
}

// BASIC AUDIO LOADING
// ===================

// Load (decode) an array buffer
function isArrayBuffer (o) { return o instanceof ArrayBuffer }
function decodeBuffer (array, options) {
  return options.decode(array)
}

// Load an audio filename
var isAudioFileName = fromRegex(/\.(mp3|wav|ogg)(\?.*)?$/i)
function loadAudioFile (name, options) {
  var url = prefix(options.from, name)
  return load(options.fetch(url, 'arraybuffer'), options)
}

// Load the result of a promise
function isPromise (o) { return o && typeof o.then === 'function' }
function loadPromise (promise, options) {
  return promise.then(function (value) {
    return load(value, options)
  })
}

// COMPOUND OBJECTS
// ================

// Try to load all the items of an array
var isArray = Array.isArray
function loadArrayData (array, options) {
  return Promise.all(array.map(function (data) {
    return load(data, options, data)
  }))
}

// Try to load all the values of a key/value object
function isObject (o) { return o && typeof o === 'object' }
function loadObjectData (obj, options) {
  var dest = {}
  var promises = Object.keys(obj).map(function (key) {
    if (options.only && options.only.indexOf(key) === -1) return null
    var value = obj[key]
    return load(value, options, value).then(function (audio) {
      dest[key] = audio
    })
  })
  return Promise.all(promises).then(function () { return dest })
}

// Load the content of a JSON file
var isJsonFileName = fromRegex(/\.json(\?.*)?$/i)
function loadJsonFile (name, options) {
  var url = prefix(options.from, name)
  return load(options.fetch(url, 'text').then(JSON.parse), options)
}

// BASE64 ENCODED FORMATS
// ======================

// Load strings with Base64 encoded audio
var isBase64Audio = fromRegex(/^data:audio/)
function loadBase64Audio (source, options) {
  var i = source.indexOf(',')
  return load(base64.decode(source.slice(i + 1)).buffer, options)
}

// Load .js files with MidiJS soundfont prerendered audio
var isJsFileName = fromRegex(/\.js(\?.*)?$/i)
function loadMidiJSFile (name, options) {
  var url = prefix(options.from, name)
  return load(options.fetch(url, 'text').then(midiJsToJson), options)
}

// convert a MIDI.js javascript soundfont file to json
function midiJsToJson (data) {
  var begin = data.indexOf('MIDI.Soundfont.')
  if (begin < 0) throw Error('Invalid MIDI.js Soundfont format')
  begin = data.indexOf('=', begin) + 2
  var end = data.lastIndexOf(',')
  return JSON.parse(data.slice(begin, end) + '}')
}

if (typeof module === 'object' && module.exports) module.exports = load
if (typeof window !== 'undefined') window.loadAudio = load


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// DECODE UTILITIES
function b64ToUint6 (nChr) {
  return nChr > 64 && nChr < 91 ? nChr - 65
    : nChr > 96 && nChr < 123 ? nChr - 71
    : nChr > 47 && nChr < 58 ? nChr + 4
    : nChr === 43 ? 62
    : nChr === 47 ? 63
    : 0
}

// Decode Base64 to Uint8Array
// ---------------------------
function decode (sBase64, nBlocksSize) {
  var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, '')
  var nInLen = sB64Enc.length
  var nOutLen = nBlocksSize
    ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize
    : nInLen * 3 + 1 >> 2
  var taBytes = new Uint8Array(nOutLen)

  for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
    nMod4 = nInIdx & 3
    nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4
    if (nMod4 === 3 || nInLen - nInIdx === 1) {
      for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
        taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255
      }
      nUint24 = 0
    }
  }
  return taBytes
}

module.exports = { decode: decode }


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cache = {}

module.exports = function getContext (options) {
	if (typeof window === 'undefined') return null
	
	var OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext
	var Context = window.AudioContext || window.webkitAudioContext
	
	if (!Context) return null

	if (typeof options === 'number') {
		options = {sampleRate: options}
	}

	var sampleRate = options && options.sampleRate


	if (options && options.offline) {
		if (!OfflineContext) return null

		return new OfflineContext(options.channels || 2, options.length, sampleRate || 44100)
	}


	//cache by sampleRate, rather strong guess
	var ctx = cache[sampleRate]

	if (ctx) return ctx

	//several versions of firefox have issues with the
	//constructor argument
	//see: https://bugzilla.mozilla.org/show_bug.cgi?id=1361475
	try {
		ctx = new Context(options)
	}
	catch (err) {
		ctx = new Context()
	}
	cache[ctx.sampleRate] = cache[sampleRate] = ctx

	return ctx
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c112c1f74121ac25cde37bfb24004fd3.mp3";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f1cf3cfafcdf4d7bfba77d12093d5679.mp3";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "32b1695449ef67bbb63e04c79a458130.mp3";

/***/ })
/******/ ]);
});
//# sourceMappingURL=app.js.map