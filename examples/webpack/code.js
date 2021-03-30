/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./.plugma/versions.json":
/*!*******************************!*\
  !*** ./.plugma/versions.json ***!
  \*******************************/
/***/ ((module) => {

module.exports = JSON.parse('{"1.1.0":[{"type":"new","description":"","action":"upgradeTables"}],"1.0.1":[{"fix":"Description"}],"1.0.0":[{"new":"Description"},{"fix":"Description"}]}');

/***/ }),

/***/ "../../dist/index.js":
/*!***************************!*\
  !*** ../../dist/index.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



// TODO: Check package from working directory
// TODO: Check versions from working directory
// TODO: How to fix issue of referenceing file when used as depency
// import pkg from '../package.json';
// import versionHistory from './versions.json';
// import semver from 'semver';
// import fs from 'fs';
// import path from 'path';
var pkg;
// var process = require('process')
if (true) {
    pkg = __webpack_require__(/*! ./package.json */ "./package.json");
}
if (true) {
    __webpack_require__(/*! ./.plugma/versions.json */ "./.plugma/versions.json");
}
// try {
// 	versionHistory = require("./package.json");
// }
// catch {
// 	versionHistory = {}
// }
// pkg = require(process.cwd() + "/package.json");
// }
// console.log(process.cwd() + "/package.json");
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
        updateAvailable: false,
        ui: {}
    };
    if (pkg === null || pkg === void 0 ? void 0 : pkg.version) {
        pluginState.version = pkg.version;
    }
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

module.exports = plugma;


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"figma-webpack","private":true,"version":"1.0.2","description":"","main":"code.ts","scripts":{"build":"webpack --mode=production --stats-error-details","dev":"webpack --mode=development --stats-error-details --watch"},"devDependencies":{"@figma/plugin-typings":"^1.19.2","@types/node":"^14.14.35","json-loader":"^0.5.7","node-polyfill-webpack-plugin":"^1.1.0","node-process":"^1.0.1","plugma":"0.0.0-alpha0.2","process":"^0.11.10","string-replace-loader":"^3.0.1","ts-loader":"^8.0.18","typescript":"^4.2.3","webpack":"^5.28.0","webpack-cli":"^4.6.0","webpack-dev-server":"^3.11.2"},"author":"","license":"ISC"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************!*\
  !*** ./code.ts ***!
  \*****************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var plugma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! plugma */ "../../dist/index.js");
/* harmony import */ var plugma__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(plugma__WEBPACK_IMPORTED_MODULE_0__);

// var process = require('process')
// var pkg = require(process.cwd() + "package.json");
// console.log(pkg.version)
plugma__WEBPACK_IMPORTED_MODULE_0___default()((plugin) => {
    console.log(plugin.version);
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maWdtYS13ZWJwYWNrLy4vbm9kZV9tb2R1bGVzL3N0cmluZy1yZXBsYWNlLWxvYWRlci9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL2ZpZ21hLXdlYnBhY2svd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmlnbWEtd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9maWdtYS13ZWJwYWNrL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9maWdtYS13ZWJwYWNrL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZmlnbWEtd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ZpZ21hLXdlYnBhY2svLi9jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQWlFO0FBQ3JFLFVBQVUsbUJBQU8sQ0FBQyxzQ0FBaUU7QUFDbkY7QUFDQSxJQUFJLElBQTBFO0FBQzlFLElBQUksbUJBQU8sQ0FBQyx3REFBMEU7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixpQkFBaUI7QUFDOUM7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnQkFBZ0IsMkJBQTJCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyw2REFBNkQ7QUFDeEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztVQzNIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ040QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSw2Q0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxXQUFXO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixlQUFlO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHdCQUF3QixxQkFBcUIsRUFBRTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0wsQ0FBQyIsImZpbGUiOiIuL2NvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vIFRPRE86IENoZWNrIHBhY2thZ2UgZnJvbSB3b3JraW5nIGRpcmVjdG9yeVxuLy8gVE9ETzogQ2hlY2sgdmVyc2lvbnMgZnJvbSB3b3JraW5nIGRpcmVjdG9yeVxuLy8gVE9ETzogSG93IHRvIGZpeCBpc3N1ZSBvZiByZWZlcmVuY2VpbmcgZmlsZSB3aGVuIHVzZWQgYXMgZGVwZW5jeVxuLy8gaW1wb3J0IHBrZyBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuLy8gaW1wb3J0IHZlcnNpb25IaXN0b3J5IGZyb20gJy4vdmVyc2lvbnMuanNvbic7XG4vLyBpbXBvcnQgc2VtdmVyIGZyb20gJ3NlbXZlcic7XG4vLyBpbXBvcnQgZnMgZnJvbSAnZnMnO1xuLy8gaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG52YXIgcGtnO1xuLy8gdmFyIHByb2Nlc3MgPSByZXF1aXJlKCdwcm9jZXNzJylcbmlmIChcIi9Vc2Vycy9saW1pdGxlc3Nsb29wL1NpdGVzL3BsdWdtYS9leGFtcGxlcy93ZWJwYWNrL3BhY2thZ2UuanNvblwiKSB7XG4gICAgcGtnID0gcmVxdWlyZShcIi9Vc2Vycy9saW1pdGxlc3Nsb29wL1NpdGVzL3BsdWdtYS9leGFtcGxlcy93ZWJwYWNrL3BhY2thZ2UuanNvblwiKTtcbn1cbmlmIChcIi9Vc2Vycy9saW1pdGxlc3Nsb29wL1NpdGVzL3BsdWdtYS9leGFtcGxlcy93ZWJwYWNrLy5wbHVnbWEvdmVyc2lvbnMuanNvblwiKSB7XG4gICAgcmVxdWlyZShcIi9Vc2Vycy9saW1pdGxlc3Nsb29wL1NpdGVzL3BsdWdtYS9leGFtcGxlcy93ZWJwYWNrLy5wbHVnbWEvdmVyc2lvbnMuanNvblwiKTtcbn1cbi8vIHRyeSB7XG4vLyBcdHZlcnNpb25IaXN0b3J5ID0gcmVxdWlyZShcIi4vcGFja2FnZS5qc29uXCIpO1xuLy8gfVxuLy8gY2F0Y2gge1xuLy8gXHR2ZXJzaW9uSGlzdG9yeSA9IHt9XG4vLyB9XG4vLyBwa2cgPSByZXF1aXJlKHByb2Nlc3MuY3dkKCkgKyBcIi9wYWNrYWdlLmpzb25cIik7XG4vLyB9XG4vLyBjb25zb2xlLmxvZyhwcm9jZXNzLmN3ZCgpICsgXCIvcGFja2FnZS5qc29uXCIpO1xuLy8gZnMucmVhZEZpbGUoXCIuLi9wYWNrYWdlLmpzb25cIiwgKGVyciwgZGF0YSkgPT4ge1xuLy8gXHRjb25zb2xlLmxvZyhlcnIsIGRhdGEpXG4vLyB9KVxuLy8gY29uc3QgZmlsZSA9IHJlcXVpcmUoXCJwYWNrYWdlLmpzb25cIilcbi8vIGNvbnNvbGUubG9nKGZpbGUpXG4vLyBmdW5jdGlvbiB1cGRhdGVBdmFpbGFibGUoKSB7XG4vLyBcdHZhciBjdXJyZW50VmVyc2lvbiA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShcInBsdWdpblZlcnNpb25cIikgfHwgcGtnLnZlcnNpb247XG4vLyBcdHZhciBuZXdWZXJzaW9uID0gcGtnLnZlcnNpb247XG4vLyBcdGlmIChzZW12ZXIuZ3QobmV3VmVyc2lvbiwgY3VycmVudFZlcnNpb24pKSB7XG4vLyBcdFx0cmV0dXJuIHRydWVcbi8vIFx0fVxuLy8gXHRlbHNlIHtcbi8vIFx0XHRmYWxzZVxuLy8gXHR9XG4vLyB9XG5mdW5jdGlvbiBwbHVnbWEocGx1Z2luKSB7XG4gICAgdmFyIHBsdWdpblN0YXRlID0ge1xuICAgICAgICB1cGRhdGVBdmFpbGFibGU6IGZhbHNlLFxuICAgICAgICB1aToge31cbiAgICB9O1xuICAgIGlmIChwa2cgPT09IG51bGwgfHwgcGtnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwa2cudmVyc2lvbikge1xuICAgICAgICBwbHVnaW5TdGF0ZS52ZXJzaW9uID0gcGtnLnZlcnNpb247XG4gICAgfVxuICAgIC8vIHBsdWdpblN0YXRlLnVwZGF0ZUF2YWlsYWJsZSA9IHVwZGF0ZUF2YWlsYWJsZSgpXG4gICAgdmFyIGV2ZW50TGlzdGVuZXJzID0gW107XG4gICAgdmFyIG1lbnVDb21tYW5kcyA9IFtdO1xuICAgIHBsdWdpblN0YXRlLm9uID0gKHR5cGUsIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGV2ZW50TGlzdGVuZXJzLnB1c2goeyB0eXBlLCBjYWxsYmFjayB9KTtcbiAgICB9O1xuICAgIHBsdWdpblN0YXRlLmNvbW1hbmQgPSAodHlwZSwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgbWVudUNvbW1hbmRzLnB1c2goeyB0eXBlLCBjYWxsYmFjayB9KTtcbiAgICB9O1xuICAgIC8vIE92ZXJyaWRlIGRlZmF1bHQgcGFnZSBuYW1lIGlmIHNldFxuICAgIHZhciBwYWdlTWFubnVhbGx5U2V0ID0gZmFsc2U7XG4gICAgcGx1Z2luU3RhdGUuc2V0U3RhcnRQYWdlID0gKG5hbWUpID0+IHtcbiAgICAgICAgcGx1Z2luU3RhdGUudWkucGFnZSA9IG5hbWU7XG4gICAgICAgIHBhZ2VNYW5udWFsbHlTZXQgPSB0cnVlO1xuICAgIH07XG4gICAgLy8gcGx1Z2luU3RhdGUudXBkYXRlID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgLy8gXHRmb3IgKGxldCBbdmVyc2lvbiwgY2hhbmdlc10gb2YgT2JqZWN0LmVudHJpZXModmVyc2lvbkhpc3RvcnkpKSB7XG4gICAgLy8gXHRcdGlmICh2ZXJzaW9uID09PSBwa2cudmVyc2lvbikge1xuICAgIC8vIFx0XHRcdC8vIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgIC8vIFx0XHRcdC8vIFx0dmFyIGNoYW5nZSA9IGNoYW5nZXNbaV1cbiAgICAvLyBcdFx0XHQvLyB9XG4gICAgLy8gXHRcdFx0Y2FsbGJhY2soeyB2ZXJzaW9uLCBjaGFuZ2VzIH0pXG4gICAgLy8gXHRcdH1cbiAgICAvLyBcdH1cbiAgICAvLyB9XG4gICAgdmFyIHBsdWdpbkNvbW1hbmRzID0gcGx1Z2luKHBsdWdpblN0YXRlKTtcbiAgICAvLyAvLyBPdmVycmlkZSBkZWZhdWx0IHBhZ2UgbmFtZSBpZiBzZXRcbiAgICAvLyBpZiAocGFnZU5hbWVbMF0pIHtcbiAgICAvLyBcdHBsdWdpblN0YXRlLnVpLnBhZ2UgPSBwYWdlTmFtZVswXVxuICAgIC8vIH1cbiAgICAvLyBjb25zb2xlLmxvZyhcInBhZ2VOYW1lXCIsIHBsdWdpblN0YXRlLnVpLnBhZ2UpXG4gICAgT2JqZWN0LmFzc2lnbih7fSwgcGx1Z2luU3RhdGUsIHsgY29tbWFuZHM6IHBsdWdpbkNvbW1hbmRzIH0pO1xuICAgIGlmIChwbHVnaW5Db21tYW5kcykge1xuICAgICAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocGx1Z2luQ29tbWFuZHMpKSB7XG4gICAgICAgICAgICAvLyBJZiBjb21tYW5kIGV4aXN0cyBpbiBtYW5pZmVzdFxuICAgICAgICAgICAgaWYgKGZpZ21hLmNvbW1hbmQgPT09IGtleSkge1xuICAgICAgICAgICAgICAgIC8vIFBhc3MgZGVmYXVsdCBwYWdlIGZvciB1aVxuICAgICAgICAgICAgICAgIGlmICghcGFnZU1hbm51YWxseVNldCkge1xuICAgICAgICAgICAgICAgICAgICBwbHVnaW5TdGF0ZS51aS5wYWdlID0ga2V5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBPdmVycmlkZSBkZWZhdWx0IHBhZ2UgbmFtZSBpZiBzZXRcbiAgICAgICAgICAgICAgICAvLyBpZiAocGFnZU5hbWVbMF0pIHtcbiAgICAgICAgICAgICAgICAvLyBcdHBsdWdpblN0YXRlLnVpLnBhZ2UgPSBwYWdlTmFtZVswXVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAvLyBDYWxsIGZ1bmN0aW9uIGZvciB0aGF0IGNvbW1hbmRcbiAgICAgICAgICAgICAgICB2YWx1ZShwbHVnaW5TdGF0ZSk7XG4gICAgICAgICAgICAgICAgLy8gU2hvdyBVST9cbiAgICAgICAgICAgICAgICBpZiAocGx1Z2luU3RhdGUudWkub3Blbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wZW4/XCIpO1xuICAgICAgICAgICAgICAgICAgICBmaWdtYS5zaG93VUkocGx1Z2luU3RhdGUudWkuaHRtbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZpZ21hLnVpLm9ubWVzc2FnZSA9IG1lc3NhZ2UgPT4ge1xuICAgICAgICBmb3IgKGxldCBldmVudExpc3RlbmVyIG9mIGV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKVxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gZXZlbnRMaXN0ZW5lci50eXBlKVxuICAgICAgICAgICAgICAgIGV2ZW50TGlzdGVuZXIuY2FsbGJhY2sobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHBsdWdpblN0YXRlLnVpLnNob3cgPSAoZGF0YSkgPT4ge1xuICAgICAgICBmaWdtYS5zaG93VUkocGx1Z2luU3RhdGUudWkuaHRtbCwgeyB3aWR0aDogcGx1Z2luU3RhdGUudWkud2lkdGgsIGhlaWdodDogcGx1Z2luU3RhdGUudWkuaGVpZ2h0IH0pO1xuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZShkYXRhKTtcbiAgICB9O1xuICAgIGZvciAobGV0IGNvbW1hbmQgb2YgbWVudUNvbW1hbmRzKSB7XG4gICAgICAgIGlmIChmaWdtYS5jb21tYW5kID09PSBjb21tYW5kLnR5cGUpIHtcbiAgICAgICAgICAgIGNvbW1hbmQuY2FsbGJhY2socGx1Z2luU3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKHBsdWdpbk9iamVjdClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwbHVnbWE7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHBsdWdtYSBmcm9tICdwbHVnbWEnO1xuLy8gdmFyIHByb2Nlc3MgPSByZXF1aXJlKCdwcm9jZXNzJylcbi8vIHZhciBwa2cgPSByZXF1aXJlKHByb2Nlc3MuY3dkKCkgKyBcInBhY2thZ2UuanNvblwiKTtcbi8vIGNvbnNvbGUubG9nKHBrZy52ZXJzaW9uKVxucGx1Z21hKChwbHVnaW4pID0+IHtcbiAgICBjb25zb2xlLmxvZyhwbHVnaW4udmVyc2lvbik7XG4gICAgcGx1Z2luLnVpID0ge1xuICAgICAgICBodG1sOiBfX2h0bWxfXyxcbiAgICAgICAgd2lkdGg6IDI1MCxcbiAgICAgICAgaGVpZ2h0OiAzMDBcbiAgICB9O1xuICAgIHBsdWdpbi5jb21tYW5kKCdjcmVhdGVSZWN0YW5nbGVzJywgKHsgdWksIGRhdGEgfSkgPT4ge1xuICAgICAgICB1aS5zaG93KGRhdGEpO1xuICAgICAgICBwbHVnaW4ub24oJ2NyZWF0ZS1yZWN0YW5nbGVzJywgKG1zZykgPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbXNnLmNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWN0ID0gZmlnbWEuY3JlYXRlUmVjdGFuZ2xlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVjdDIgPSBmaWdtYS5jcmVhdGVSZWN0YW5nbGUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWN0Mik7XG4gICAgICAgICAgICAgICAgcmVjdC54ID0gaSAqIDE1MDtcbiAgICAgICAgICAgICAgICByZWN0LmZpbGxzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3I6IHsgcjogMSwgZzogMC41LCBiOiAwIH0gfV07XG4gICAgICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQocmVjdCk7XG4gICAgICAgICAgICAgICAgbm9kZXMucHVzaChyZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IG5vZGVzO1xuICAgICAgICAgICAgZmlnbWEudmlld3BvcnQuc2Nyb2xsQW5kWm9vbUludG9WaWV3KG5vZGVzKTtcbiAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBwbHVnaW4ub24oJ2NhbmNlbCcsICgpID0+IHtcbiAgICAgICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9