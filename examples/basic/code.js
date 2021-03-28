function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function commonjsRequire (target) {
	throw new Error('Could not dynamically require "' + target + '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.');
}

var global$1 = (typeof global !== "undefined" ? global :
  typeof self !== "undefined" ? self :
  typeof window !== "undefined" ? window : {});

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
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
    while(len) {
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
function nextTick(fun) {
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
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var browser$1 = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var processEs6 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': browser$1,
	addListener: addListener,
	argv: argv,
	binding: binding,
	browser: browser,
	chdir: chdir,
	config: config,
	cwd: cwd,
	emit: emit,
	env: env,
	hrtime: hrtime,
	nextTick: nextTick,
	off: off,
	on: on,
	once: once,
	platform: platform,
	release: release,
	removeAllListeners: removeAllListeners,
	removeListener: removeListener,
	title: title,
	umask: umask,
	uptime: uptime,
	version: version,
	versions: versions
});

var process = /*@__PURE__*/getAugmentedNamespace(processEs6);

// TODO: Check package from working directory
// TODO: Check versions from working directory
// TODO: How to fix issue of referenceing file when used as depency
// import pkg from '../package.json';
// import versionHistory from './versions.json';
// import semver from 'semver';
// import fs from 'fs';
// import path from 'path';
var versionHistory, pkg;

// // var process = process;
if (process.env.NODE_ENV === "TEST") ;
else {
    try {
        versionHistory = commonjsRequire(process.cwd() + ".plugma/versions.json");
    }
    catch (_a) {
        versionHistory = {};
    }
    pkg = commonjsRequire(process.cwd() + "package.json");
}
console.log(process.cwd() + "package.json");
// fs.readFile("../package.json", (err, data) => {
// 	console.log(err, data)
// })
// const file = require("package.json")
// console.log(file)
// function updateAvailable() {
// 	var currentVersion = figma.root.getPluginData("pluginVersion") || pkg.version;
// 	var newVersion = pkg.version;
// 	if (semver.gt(newVersion, currentVersion)) {
// 		return true
// 	}
// 	else {
// 		false
// 	}
// }
function plugma(plugin) {
    var pluginState = {
        version: pkg.version,
        updateAvailable: false,
        ui: {}
    };
    // pluginState.updateAvailable = updateAvailable()
    var eventListeners = [];
    var menuCommands = [];
    pluginState.on = (type, callback) => {
        eventListeners.push({ type, callback });
    };
    pluginState.command = (type, callback) => {
        menuCommands.push({ type, callback });
    };
    // Override default page name if set
    var pageMannuallySet = false;
    pluginState.setStartPage = (name) => {
        pluginState.ui.page = name;
        pageMannuallySet = true;
    };
    // pluginState.update = (callback) => {
    // 	for (let [version, changes] of Object.entries(versionHistory)) {
    // 		if (version === pkg.version) {
    // 			// for (let i = 0; i < changes.length; i++) {
    // 			// 	var change = changes[i]
    // 			// }
    // 			callback({ version, changes })
    // 		}
    // 	}
    // }
    var pluginCommands = plugin(pluginState);
    // // Override default page name if set
    // if (pageName[0]) {
    // 	pluginState.ui.page = pageName[0]
    // }
    // console.log("pageName", pluginState.ui.page)
    Object.assign({}, pluginState, { commands: pluginCommands });
    if (pluginCommands) {
        for (let [key, value] of Object.entries(pluginCommands)) {
            // If command exists in manifest
            if (figma.command === key) {
                // Pass default page for ui
                if (!pageMannuallySet) {
                    pluginState.ui.page = key;
                }
                // Override default page name if set
                // if (pageName[0]) {
                // 	pluginState.ui.page = pageName[0]
                // }
                // Call function for that command
                value(pluginState);
                // Show UI?
                if (pluginState.ui.open) {
                    console.log("open?");
                    figma.showUI(pluginState.ui.html);
                }
            }
        }
    }
    figma.ui.onmessage = message => {
        for (let eventListener of eventListeners) {
            // console.log(message)
            if (message.type === eventListener.type)
                eventListener.callback(message);
        }
    };
    pluginState.ui.show = (data) => {
        figma.showUI(pluginState.ui.html, { width: pluginState.ui.width, height: pluginState.ui.height });
        figma.ui.postMessage(data);
    };
    for (let command of menuCommands) {
        if (figma.command === command.type) {
            command.callback(pluginState);
        }
    }
    // console.log(pluginObject)
}

var dist = plugma;

dist((plugin) => {
    console.log(plugin);
    plugin.ui = {
        html: __html__,
        width: 250,
        height: 300
    };
    plugin.command('createRectangles', ({ ui, data }) => {
        ui.show(data);
        plugin.on('create-rectangles', (msg) => {
            const nodes = [];
            for (let i = 0; i < msg.count; i++) {
                const rect = figma.createRectangle();
                const rect2 = figma.createRectangle();
                console.log(rect2);
                rect.x = i * 150;
                rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
                figma.currentPage.appendChild(rect);
                nodes.push(rect);
            }
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
            figma.closePlugin();
        });
        plugin.on('cancel', () => {
            figma.closePlugin();
        });
    });
});
