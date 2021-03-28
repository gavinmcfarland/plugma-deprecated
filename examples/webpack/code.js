/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
var process = process;
if ((process === null || process === void 0 ? void 0 : process.env.NODE_ENV) === "TEST") ;
else {
    try {
        versionHistory = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './.plugma/versions.json'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
    }
    catch (_a) {
        versionHistory = {};
    }
    pkg = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './package.json'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maWdtYS13ZWJwYWNrLy4uL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZmlnbWEtd2VicGFjay93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9maWdtYS13ZWJwYWNrL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2ZpZ21hLXdlYnBhY2svd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ZpZ21hLXdlYnBhY2svd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9maWdtYS13ZWJwYWNrL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZmlnbWEtd2VicGFjay8uL2NvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLG1CQUFPLENBQUMsc0pBQXlCO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxtQkFBTyxDQUFDLDZJQUFnQjtBQUNsQztBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsaUJBQWlCO0FBQzlDO0FBQ0E7QUFDQSwyQkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG9CQUFvQjtBQUNoRDtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0JBQWdCLDJCQUEyQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsNkRBQTZEO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztVQ3BIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ040QjtBQUM1Qiw2Q0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxXQUFXO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixlQUFlO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHdCQUF3QixxQkFBcUIsRUFBRTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0wsQ0FBQyIsImZpbGUiOiIuL2NvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vIFRPRE86IENoZWNrIHBhY2thZ2UgZnJvbSB3b3JraW5nIGRpcmVjdG9yeVxuLy8gVE9ETzogQ2hlY2sgdmVyc2lvbnMgZnJvbSB3b3JraW5nIGRpcmVjdG9yeVxuLy8gVE9ETzogSG93IHRvIGZpeCBpc3N1ZSBvZiByZWZlcmVuY2VpbmcgZmlsZSB3aGVuIHVzZWQgYXMgZGVwZW5jeVxuLy8gaW1wb3J0IHBrZyBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuLy8gaW1wb3J0IHZlcnNpb25IaXN0b3J5IGZyb20gJy4vdmVyc2lvbnMuanNvbic7XG4vLyBpbXBvcnQgc2VtdmVyIGZyb20gJ3NlbXZlcic7XG4vLyBpbXBvcnQgZnMgZnJvbSAnZnMnO1xuLy8gaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG52YXIgdmVyc2lvbkhpc3RvcnksIHBrZztcbnZhciBwcm9jZXNzID0gcHJvY2VzcztcbmlmICgocHJvY2VzcyA9PT0gbnVsbCB8fCBwcm9jZXNzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcm9jZXNzLmVudi5OT0RFX0VOVikgPT09IFwiVEVTVFwiKSA7XG5lbHNlIHtcbiAgICB0cnkge1xuICAgICAgICB2ZXJzaW9uSGlzdG9yeSA9IHJlcXVpcmUoXCIuLy5wbHVnbWEvdmVyc2lvbnMuanNvblwiKTtcbiAgICB9XG4gICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgIHZlcnNpb25IaXN0b3J5ID0ge307XG4gICAgfVxuICAgIHBrZyA9IHJlcXVpcmUoXCIuL3BhY2thZ2UuanNvblwiKTtcbn1cbi8vIGZzLnJlYWRGaWxlKFwiLi4vcGFja2FnZS5qc29uXCIsIChlcnIsIGRhdGEpID0+IHtcbi8vIFx0Y29uc29sZS5sb2coZXJyLCBkYXRhKVxuLy8gfSlcbi8vIGNvbnN0IGZpbGUgPSByZXF1aXJlKFwicGFja2FnZS5qc29uXCIpXG4vLyBjb25zb2xlLmxvZyhmaWxlKVxuLy8gZnVuY3Rpb24gdXBkYXRlQXZhaWxhYmxlKCkge1xuLy8gXHR2YXIgY3VycmVudFZlcnNpb24gPSBmaWdtYS5yb290LmdldFBsdWdpbkRhdGEoXCJwbHVnaW5WZXJzaW9uXCIpIHx8IHBrZy52ZXJzaW9uO1xuLy8gXHR2YXIgbmV3VmVyc2lvbiA9IHBrZy52ZXJzaW9uO1xuLy8gXHRpZiAoc2VtdmVyLmd0KG5ld1ZlcnNpb24sIGN1cnJlbnRWZXJzaW9uKSkge1xuLy8gXHRcdHJldHVybiB0cnVlXG4vLyBcdH1cbi8vIFx0ZWxzZSB7XG4vLyBcdFx0ZmFsc2Vcbi8vIFx0fVxuLy8gfVxuZnVuY3Rpb24gcGx1Z21hKHBsdWdpbikge1xuICAgIHZhciBwbHVnaW5TdGF0ZSA9IHtcbiAgICAgICAgdmVyc2lvbjogcGtnLnZlcnNpb24sXG4gICAgICAgIHVwZGF0ZUF2YWlsYWJsZTogZmFsc2UsXG4gICAgICAgIHVpOiB7fVxuICAgIH07XG4gICAgLy8gcGx1Z2luU3RhdGUudXBkYXRlQXZhaWxhYmxlID0gdXBkYXRlQXZhaWxhYmxlKClcbiAgICB2YXIgZXZlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgICB2YXIgbWVudUNvbW1hbmRzID0gW107XG4gICAgcGx1Z2luU3RhdGUub24gPSAodHlwZSwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgZXZlbnRMaXN0ZW5lcnMucHVzaCh7IHR5cGUsIGNhbGxiYWNrIH0pO1xuICAgIH07XG4gICAgcGx1Z2luU3RhdGUuY29tbWFuZCA9ICh0eXBlLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICBtZW51Q29tbWFuZHMucHVzaCh7IHR5cGUsIGNhbGxiYWNrIH0pO1xuICAgIH07XG4gICAgLy8gT3ZlcnJpZGUgZGVmYXVsdCBwYWdlIG5hbWUgaWYgc2V0XG4gICAgdmFyIHBhZ2VNYW5udWFsbHlTZXQgPSBmYWxzZTtcbiAgICBwbHVnaW5TdGF0ZS5zZXRTdGFydFBhZ2UgPSAobmFtZSkgPT4ge1xuICAgICAgICBwbHVnaW5TdGF0ZS51aS5wYWdlID0gbmFtZTtcbiAgICAgICAgcGFnZU1hbm51YWxseVNldCA9IHRydWU7XG4gICAgfTtcbiAgICAvLyBwbHVnaW5TdGF0ZS51cGRhdGUgPSAoY2FsbGJhY2spID0+IHtcbiAgICAvLyBcdGZvciAobGV0IFt2ZXJzaW9uLCBjaGFuZ2VzXSBvZiBPYmplY3QuZW50cmllcyh2ZXJzaW9uSGlzdG9yeSkpIHtcbiAgICAvLyBcdFx0aWYgKHZlcnNpb24gPT09IHBrZy52ZXJzaW9uKSB7XG4gICAgLy8gXHRcdFx0Ly8gZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gXHRcdFx0Ly8gXHR2YXIgY2hhbmdlID0gY2hhbmdlc1tpXVxuICAgIC8vIFx0XHRcdC8vIH1cbiAgICAvLyBcdFx0XHRjYWxsYmFjayh7IHZlcnNpb24sIGNoYW5nZXMgfSlcbiAgICAvLyBcdFx0fVxuICAgIC8vIFx0fVxuICAgIC8vIH1cbiAgICB2YXIgcGx1Z2luQ29tbWFuZHMgPSBwbHVnaW4ocGx1Z2luU3RhdGUpO1xuICAgIC8vIC8vIE92ZXJyaWRlIGRlZmF1bHQgcGFnZSBuYW1lIGlmIHNldFxuICAgIC8vIGlmIChwYWdlTmFtZVswXSkge1xuICAgIC8vIFx0cGx1Z2luU3RhdGUudWkucGFnZSA9IHBhZ2VOYW1lWzBdXG4gICAgLy8gfVxuICAgIC8vIGNvbnNvbGUubG9nKFwicGFnZU5hbWVcIiwgcGx1Z2luU3RhdGUudWkucGFnZSlcbiAgICBPYmplY3QuYXNzaWduKHt9LCBwbHVnaW5TdGF0ZSwgeyBjb21tYW5kczogcGx1Z2luQ29tbWFuZHMgfSk7XG4gICAgaWYgKHBsdWdpbkNvbW1hbmRzKSB7XG4gICAgICAgIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhwbHVnaW5Db21tYW5kcykpIHtcbiAgICAgICAgICAgIC8vIElmIGNvbW1hbmQgZXhpc3RzIGluIG1hbmlmZXN0XG4gICAgICAgICAgICBpZiAoZmlnbWEuY29tbWFuZCA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgLy8gUGFzcyBkZWZhdWx0IHBhZ2UgZm9yIHVpXG4gICAgICAgICAgICAgICAgaWYgKCFwYWdlTWFubnVhbGx5U2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHBsdWdpblN0YXRlLnVpLnBhZ2UgPSBrZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE92ZXJyaWRlIGRlZmF1bHQgcGFnZSBuYW1lIGlmIHNldFxuICAgICAgICAgICAgICAgIC8vIGlmIChwYWdlTmFtZVswXSkge1xuICAgICAgICAgICAgICAgIC8vIFx0cGx1Z2luU3RhdGUudWkucGFnZSA9IHBhZ2VOYW1lWzBdXG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIC8vIENhbGwgZnVuY3Rpb24gZm9yIHRoYXQgY29tbWFuZFxuICAgICAgICAgICAgICAgIHZhbHVlKHBsdWdpblN0YXRlKTtcbiAgICAgICAgICAgICAgICAvLyBTaG93IFVJP1xuICAgICAgICAgICAgICAgIGlmIChwbHVnaW5TdGF0ZS51aS5vcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3Blbj9cIik7XG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLnNob3dVSShwbHVnaW5TdGF0ZS51aS5odG1sKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmlnbWEudWkub25tZXNzYWdlID0gbWVzc2FnZSA9PiB7XG4gICAgICAgIGZvciAobGV0IGV2ZW50TGlzdGVuZXIgb2YgZXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UpXG4gICAgICAgICAgICBpZiAobWVzc2FnZS50eXBlID09PSBldmVudExpc3RlbmVyLnR5cGUpXG4gICAgICAgICAgICAgICAgZXZlbnRMaXN0ZW5lci5jYWxsYmFjayhtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcGx1Z2luU3RhdGUudWkuc2hvdyA9IChkYXRhKSA9PiB7XG4gICAgICAgIGZpZ21hLnNob3dVSShwbHVnaW5TdGF0ZS51aS5odG1sLCB7IHdpZHRoOiBwbHVnaW5TdGF0ZS51aS53aWR0aCwgaGVpZ2h0OiBwbHVnaW5TdGF0ZS51aS5oZWlnaHQgfSk7XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKGRhdGEpO1xuICAgIH07XG4gICAgZm9yIChsZXQgY29tbWFuZCBvZiBtZW51Q29tbWFuZHMpIHtcbiAgICAgICAgaWYgKGZpZ21hLmNvbW1hbmQgPT09IGNvbW1hbmQudHlwZSkge1xuICAgICAgICAgICAgY29tbWFuZC5jYWxsYmFjayhwbHVnaW5TdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2cocGx1Z2luT2JqZWN0KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBsdWdtYTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgcGx1Z21hIGZyb20gJ3BsdWdtYSc7XG5wbHVnbWEoKHBsdWdpbikgPT4ge1xuICAgIGNvbnNvbGUubG9nKHBsdWdpbi52ZXJzaW9uKTtcbiAgICBwbHVnaW4udWkgPSB7XG4gICAgICAgIGh0bWw6IF9faHRtbF9fLFxuICAgICAgICB3aWR0aDogMjUwLFxuICAgICAgICBoZWlnaHQ6IDMwMFxuICAgIH07XG4gICAgcGx1Z2luLmNvbW1hbmQoJ2NyZWF0ZVJlY3RhbmdsZXMnLCAoeyB1aSwgZGF0YSB9KSA9PiB7XG4gICAgICAgIHVpLnNob3coZGF0YSk7XG4gICAgICAgIHBsdWdpbi5vbignY3JlYXRlLXJlY3RhbmdsZXMnLCAobXNnKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtc2cuY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBmaWdtYS5jcmVhdGVSZWN0YW5nbGUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZWN0MiA9IGZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlY3QyKTtcbiAgICAgICAgICAgICAgICByZWN0LnggPSBpICogMTUwO1xuICAgICAgICAgICAgICAgIHJlY3QuZmlsbHMgPSBbeyB0eXBlOiAnU09MSUQnLCBjb2xvcjogeyByOiAxLCBnOiAwLjUsIGI6IDAgfSB9XTtcbiAgICAgICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5hcHBlbmRDaGlsZChyZWN0KTtcbiAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKHJlY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXM7XG4gICAgICAgICAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcobm9kZXMpO1xuICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBsdWdpbi5vbignY2FuY2VsJywgKCkgPT4ge1xuICAgICAgICAgICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=