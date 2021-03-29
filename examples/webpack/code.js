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
var versionHistory, pkg;
// var process = require('process')
// // var process = process;
if (undefined === "TEST") ;
else {
    try {
        versionHistory = __webpack_require__(/*! ../../../../../../.plugma/versions.json */ "./.plugma/versions.json");
    }
    catch (_a) {
        versionHistory = {};
    }
    pkg = __webpack_require__(/*! ../../../../../../package.json */ "./package.json");
}
console.log("/" + "package.json");
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

module.exports = plugma;


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"figma-webpack","private":true,"version":"1.0.2","description":"","main":"code.js","scripts":{"build":"webpack --mode=production --stats-error-details","dev":"webpack --mode=development --stats-error-details --watch"},"devDependencies":{"@figma/plugin-typings":"^1.19.2","@types/node":"^14.14.35","json-loader":"^0.5.7","node-polyfill-webpack-plugin":"^1.1.0","node-process":"^1.0.1","plugma":"0.0.0-alpha0.2","process":"^0.11.10","string-replace-loader":"^3.0.1","ts-loader":"^8.0.18","typescript":"^4.2.3","webpack":"^5.28.0","webpack-cli":"^4.6.0","webpack-dev-server":"^3.11.2"},"author":"","license":"ISC"}');

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
// var pkg = require("/" + "package.json");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maWdtYS13ZWJwYWNrLy4vbm9kZV9tb2R1bGVzL3N0cmluZy1yZXBsYWNlLWxvYWRlci9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL2ZpZ21hLXdlYnBhY2svd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmlnbWEtd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9maWdtYS13ZWJwYWNrL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9maWdtYS13ZWJwYWNrL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZmlnbWEtd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ZpZ21hLXdlYnBhY2svLi9jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksU0FBb0I7QUFDeEI7QUFDQTtBQUNBLHlCQUF5QixtQkFBTyxDQUFDLHdFQUE2QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsbUJBQU8sQ0FBQyxzREFBb0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsaUJBQWlCO0FBQzlDO0FBQ0E7QUFDQSwyQkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG9CQUFvQjtBQUNoRDtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0JBQWdCLDJCQUEyQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsNkRBQTZEO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7VUN0SEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7QUNONEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsNkNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsV0FBVztBQUNwRDtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsZUFBZTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix3QkFBd0IscUJBQXFCLEVBQUU7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMLENBQUMiLCJmaWxlIjoiLi9jb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyBUT0RPOiBDaGVjayBwYWNrYWdlIGZyb20gd29ya2luZyBkaXJlY3Rvcnlcbi8vIFRPRE86IENoZWNrIHZlcnNpb25zIGZyb20gd29ya2luZyBkaXJlY3Rvcnlcbi8vIFRPRE86IEhvdyB0byBmaXggaXNzdWUgb2YgcmVmZXJlbmNlaW5nIGZpbGUgd2hlbiB1c2VkIGFzIGRlcGVuY3lcbi8vIGltcG9ydCBwa2cgZnJvbSAnLi4vcGFja2FnZS5qc29uJztcbi8vIGltcG9ydCB2ZXJzaW9uSGlzdG9yeSBmcm9tICcuL3ZlcnNpb25zLmpzb24nO1xuLy8gaW1wb3J0IHNlbXZlciBmcm9tICdzZW12ZXInO1xuLy8gaW1wb3J0IGZzIGZyb20gJ2ZzJztcbi8vIGltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xudmFyIHZlcnNpb25IaXN0b3J5LCBwa2c7XG4vLyB2YXIgcHJvY2VzcyA9IHJlcXVpcmUoJ3Byb2Nlc3MnKVxuLy8gLy8gdmFyIHByb2Nlc3MgPSBwcm9jZXNzO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcIlRFU1RcIikgO1xuZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgICAgdmVyc2lvbkhpc3RvcnkgPSByZXF1aXJlKFwiL1wiICsgXCIucGx1Z21hL3ZlcnNpb25zLmpzb25cIik7XG4gICAgfVxuICAgIGNhdGNoIChfYSkge1xuICAgICAgICB2ZXJzaW9uSGlzdG9yeSA9IHt9O1xuICAgIH1cbiAgICBwa2cgPSByZXF1aXJlKFwiL1wiICsgXCJwYWNrYWdlLmpzb25cIik7XG59XG5jb25zb2xlLmxvZyhcIi9cIiArIFwicGFja2FnZS5qc29uXCIpO1xuLy8gZnMucmVhZEZpbGUoXCIuLi9wYWNrYWdlLmpzb25cIiwgKGVyciwgZGF0YSkgPT4ge1xuLy8gXHRjb25zb2xlLmxvZyhlcnIsIGRhdGEpXG4vLyB9KVxuLy8gY29uc3QgZmlsZSA9IHJlcXVpcmUoXCJwYWNrYWdlLmpzb25cIilcbi8vIGNvbnNvbGUubG9nKGZpbGUpXG4vLyBmdW5jdGlvbiB1cGRhdGVBdmFpbGFibGUoKSB7XG4vLyBcdHZhciBjdXJyZW50VmVyc2lvbiA9IGZpZ21hLnJvb3QuZ2V0UGx1Z2luRGF0YShcInBsdWdpblZlcnNpb25cIikgfHwgcGtnLnZlcnNpb247XG4vLyBcdHZhciBuZXdWZXJzaW9uID0gcGtnLnZlcnNpb247XG4vLyBcdGlmIChzZW12ZXIuZ3QobmV3VmVyc2lvbiwgY3VycmVudFZlcnNpb24pKSB7XG4vLyBcdFx0cmV0dXJuIHRydWVcbi8vIFx0fVxuLy8gXHRlbHNlIHtcbi8vIFx0XHRmYWxzZVxuLy8gXHR9XG4vLyB9XG5mdW5jdGlvbiBwbHVnbWEocGx1Z2luKSB7XG4gICAgdmFyIHBsdWdpblN0YXRlID0ge1xuICAgICAgICB2ZXJzaW9uOiBwa2cudmVyc2lvbixcbiAgICAgICAgdXBkYXRlQXZhaWxhYmxlOiBmYWxzZSxcbiAgICAgICAgdWk6IHt9XG4gICAgfTtcbiAgICAvLyBwbHVnaW5TdGF0ZS51cGRhdGVBdmFpbGFibGUgPSB1cGRhdGVBdmFpbGFibGUoKVxuICAgIHZhciBldmVudExpc3RlbmVycyA9IFtdO1xuICAgIHZhciBtZW51Q29tbWFuZHMgPSBbXTtcbiAgICBwbHVnaW5TdGF0ZS5vbiA9ICh0eXBlLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICBldmVudExpc3RlbmVycy5wdXNoKHsgdHlwZSwgY2FsbGJhY2sgfSk7XG4gICAgfTtcbiAgICBwbHVnaW5TdGF0ZS5jb21tYW5kID0gKHR5cGUsIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIG1lbnVDb21tYW5kcy5wdXNoKHsgdHlwZSwgY2FsbGJhY2sgfSk7XG4gICAgfTtcbiAgICAvLyBPdmVycmlkZSBkZWZhdWx0IHBhZ2UgbmFtZSBpZiBzZXRcbiAgICB2YXIgcGFnZU1hbm51YWxseVNldCA9IGZhbHNlO1xuICAgIHBsdWdpblN0YXRlLnNldFN0YXJ0UGFnZSA9IChuYW1lKSA9PiB7XG4gICAgICAgIHBsdWdpblN0YXRlLnVpLnBhZ2UgPSBuYW1lO1xuICAgICAgICBwYWdlTWFubnVhbGx5U2V0ID0gdHJ1ZTtcbiAgICB9O1xuICAgIC8vIHBsdWdpblN0YXRlLnVwZGF0ZSA9IChjYWxsYmFjaykgPT4ge1xuICAgIC8vIFx0Zm9yIChsZXQgW3ZlcnNpb24sIGNoYW5nZXNdIG9mIE9iamVjdC5lbnRyaWVzKHZlcnNpb25IaXN0b3J5KSkge1xuICAgIC8vIFx0XHRpZiAodmVyc2lvbiA9PT0gcGtnLnZlcnNpb24pIHtcbiAgICAvLyBcdFx0XHQvLyBmb3IgKGxldCBpID0gMDsgaSA8IGNoYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBcdFx0XHQvLyBcdHZhciBjaGFuZ2UgPSBjaGFuZ2VzW2ldXG4gICAgLy8gXHRcdFx0Ly8gfVxuICAgIC8vIFx0XHRcdGNhbGxiYWNrKHsgdmVyc2lvbiwgY2hhbmdlcyB9KVxuICAgIC8vIFx0XHR9XG4gICAgLy8gXHR9XG4gICAgLy8gfVxuICAgIHZhciBwbHVnaW5Db21tYW5kcyA9IHBsdWdpbihwbHVnaW5TdGF0ZSk7XG4gICAgLy8gLy8gT3ZlcnJpZGUgZGVmYXVsdCBwYWdlIG5hbWUgaWYgc2V0XG4gICAgLy8gaWYgKHBhZ2VOYW1lWzBdKSB7XG4gICAgLy8gXHRwbHVnaW5TdGF0ZS51aS5wYWdlID0gcGFnZU5hbWVbMF1cbiAgICAvLyB9XG4gICAgLy8gY29uc29sZS5sb2coXCJwYWdlTmFtZVwiLCBwbHVnaW5TdGF0ZS51aS5wYWdlKVxuICAgIE9iamVjdC5hc3NpZ24oe30sIHBsdWdpblN0YXRlLCB7IGNvbW1hbmRzOiBwbHVnaW5Db21tYW5kcyB9KTtcbiAgICBpZiAocGx1Z2luQ29tbWFuZHMpIHtcbiAgICAgICAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHBsdWdpbkNvbW1hbmRzKSkge1xuICAgICAgICAgICAgLy8gSWYgY29tbWFuZCBleGlzdHMgaW4gbWFuaWZlc3RcbiAgICAgICAgICAgIGlmIChmaWdtYS5jb21tYW5kID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICAvLyBQYXNzIGRlZmF1bHQgcGFnZSBmb3IgdWlcbiAgICAgICAgICAgICAgICBpZiAoIXBhZ2VNYW5udWFsbHlTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2luU3RhdGUudWkucGFnZSA9IGtleTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gT3ZlcnJpZGUgZGVmYXVsdCBwYWdlIG5hbWUgaWYgc2V0XG4gICAgICAgICAgICAgICAgLy8gaWYgKHBhZ2VOYW1lWzBdKSB7XG4gICAgICAgICAgICAgICAgLy8gXHRwbHVnaW5TdGF0ZS51aS5wYWdlID0gcGFnZU5hbWVbMF1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgLy8gQ2FsbCBmdW5jdGlvbiBmb3IgdGhhdCBjb21tYW5kXG4gICAgICAgICAgICAgICAgdmFsdWUocGx1Z2luU3RhdGUpO1xuICAgICAgICAgICAgICAgIC8vIFNob3cgVUk/XG4gICAgICAgICAgICAgICAgaWYgKHBsdWdpblN0YXRlLnVpLm9wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvcGVuP1wiKTtcbiAgICAgICAgICAgICAgICAgICAgZmlnbWEuc2hvd1VJKHBsdWdpblN0YXRlLnVpLmh0bWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmaWdtYS51aS5vbm1lc3NhZ2UgPSBtZXNzYWdlID0+IHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnRMaXN0ZW5lciBvZiBldmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZSlcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09IGV2ZW50TGlzdGVuZXIudHlwZSlcbiAgICAgICAgICAgICAgICBldmVudExpc3RlbmVyLmNhbGxiYWNrKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBwbHVnaW5TdGF0ZS51aS5zaG93ID0gKGRhdGEpID0+IHtcbiAgICAgICAgZmlnbWEuc2hvd1VJKHBsdWdpblN0YXRlLnVpLmh0bWwsIHsgd2lkdGg6IHBsdWdpblN0YXRlLnVpLndpZHRoLCBoZWlnaHQ6IHBsdWdpblN0YXRlLnVpLmhlaWdodCB9KTtcbiAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoZGF0YSk7XG4gICAgfTtcbiAgICBmb3IgKGxldCBjb21tYW5kIG9mIG1lbnVDb21tYW5kcykge1xuICAgICAgICBpZiAoZmlnbWEuY29tbWFuZCA9PT0gY29tbWFuZC50eXBlKSB7XG4gICAgICAgICAgICBjb21tYW5kLmNhbGxiYWNrKHBsdWdpblN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhwbHVnaW5PYmplY3QpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGx1Z21hO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBwbHVnbWEgZnJvbSAncGx1Z21hJztcbi8vIHZhciBwcm9jZXNzID0gcmVxdWlyZSgncHJvY2VzcycpXG4vLyB2YXIgcGtnID0gcmVxdWlyZShcIi9cIiArIFwicGFja2FnZS5qc29uXCIpO1xuLy8gY29uc29sZS5sb2cocGtnLnZlcnNpb24pXG5wbHVnbWEoKHBsdWdpbikgPT4ge1xuICAgIGNvbnNvbGUubG9nKHBsdWdpbi52ZXJzaW9uKTtcbiAgICBwbHVnaW4udWkgPSB7XG4gICAgICAgIGh0bWw6IF9faHRtbF9fLFxuICAgICAgICB3aWR0aDogMjUwLFxuICAgICAgICBoZWlnaHQ6IDMwMFxuICAgIH07XG4gICAgcGx1Z2luLmNvbW1hbmQoJ2NyZWF0ZVJlY3RhbmdsZXMnLCAoeyB1aSwgZGF0YSB9KSA9PiB7XG4gICAgICAgIHVpLnNob3coZGF0YSk7XG4gICAgICAgIHBsdWdpbi5vbignY3JlYXRlLXJlY3RhbmdsZXMnLCAobXNnKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtc2cuY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBmaWdtYS5jcmVhdGVSZWN0YW5nbGUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZWN0MiA9IGZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlY3QyKTtcbiAgICAgICAgICAgICAgICByZWN0LnggPSBpICogMTUwO1xuICAgICAgICAgICAgICAgIHJlY3QuZmlsbHMgPSBbeyB0eXBlOiAnU09MSUQnLCBjb2xvcjogeyByOiAxLCBnOiAwLjUsIGI6IDAgfSB9XTtcbiAgICAgICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChyZWN0KTtcbiAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKHJlY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXM7XG4gICAgICAgICAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcobm9kZXMpO1xuICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBsdWdpbi5vbignY2FuY2VsJywgKCkgPT4ge1xuICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=