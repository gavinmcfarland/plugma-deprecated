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
// var process = require('process')
// // var process = process;
// if (process.env.NODE_ENV === "TEST") {
// 	// 	// versionHistory = require(process.env.VERSIONS_PATH);
// 	// 	// pkg = require(process.env.PKG_PATH);
// }
// else {
try {
    versionHistory = __webpack_require__(/*! ../../../../../../package.json */ "./package.json");
}
catch (_a) {
    versionHistory = {};
}
pkg = __webpack_require__(/*! ../../../../../../package.json */ "./package.json");
// }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maWdtYS13ZWJwYWNrLy4vbm9kZV9tb2R1bGVzL3N0cmluZy1yZXBsYWNlLWxvYWRlci9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL2ZpZ21hLXdlYnBhY2svd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmlnbWEtd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9maWdtYS13ZWJwYWNrL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9maWdtYS13ZWJwYWNrL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZmlnbWEtd2VicGFjay93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ZpZ21hLXdlYnBhY2svLi9jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1CQUFPLENBQUMsc0RBQW9CO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxtQkFBTyxDQUFDLHNEQUFvQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixpQkFBaUI7QUFDOUM7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnQkFBZ0IsMkJBQTJCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyw2REFBNkQ7QUFDeEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztVQ3pIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ040QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQSw2Q0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxXQUFXO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixlQUFlO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHdCQUF3QixxQkFBcUIsRUFBRTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0wsQ0FBQyIsImZpbGUiOiIuL2NvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8vIFRPRE86IENoZWNrIHBhY2thZ2UgZnJvbSB3b3JraW5nIGRpcmVjdG9yeVxuLy8gVE9ETzogQ2hlY2sgdmVyc2lvbnMgZnJvbSB3b3JraW5nIGRpcmVjdG9yeVxuLy8gVE9ETzogSG93IHRvIGZpeCBpc3N1ZSBvZiByZWZlcmVuY2VpbmcgZmlsZSB3aGVuIHVzZWQgYXMgZGVwZW5jeVxuLy8gaW1wb3J0IHBrZyBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuLy8gaW1wb3J0IHZlcnNpb25IaXN0b3J5IGZyb20gJy4vdmVyc2lvbnMuanNvbic7XG4vLyBpbXBvcnQgc2VtdmVyIGZyb20gJ3NlbXZlcic7XG4vLyBpbXBvcnQgZnMgZnJvbSAnZnMnO1xuLy8gaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG52YXIgdmVyc2lvbkhpc3RvcnksIHBrZztcbi8vIHZhciBwcm9jZXNzID0gcmVxdWlyZSgncHJvY2VzcycpXG4vLyAvLyB2YXIgcHJvY2VzcyA9IHByb2Nlc3M7XG4vLyBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiVEVTVFwiKSB7XG4vLyBcdC8vIFx0Ly8gdmVyc2lvbkhpc3RvcnkgPSByZXF1aXJlKHByb2Nlc3MuZW52LlZFUlNJT05TX1BBVEgpO1xuLy8gXHQvLyBcdC8vIHBrZyA9IHJlcXVpcmUocHJvY2Vzcy5lbnYuUEtHX1BBVEgpO1xuLy8gfVxuLy8gZWxzZSB7XG50cnkge1xuICAgIHZlcnNpb25IaXN0b3J5ID0gcmVxdWlyZShcIi9cIiArIFwicGFja2FnZS5qc29uXCIpO1xufVxuY2F0Y2ggKF9hKSB7XG4gICAgdmVyc2lvbkhpc3RvcnkgPSB7fTtcbn1cbnBrZyA9IHJlcXVpcmUoXCIvXCIgKyBcInBhY2thZ2UuanNvblwiKTtcbi8vIH1cbmNvbnNvbGUubG9nKFwiL1wiICsgXCJwYWNrYWdlLmpzb25cIik7XG4vLyBmcy5yZWFkRmlsZShcIi4uL3BhY2thZ2UuanNvblwiLCAoZXJyLCBkYXRhKSA9PiB7XG4vLyBcdGNvbnNvbGUubG9nKGVyciwgZGF0YSlcbi8vIH0pXG4vLyBjb25zdCBmaWxlID0gcmVxdWlyZShcInBhY2thZ2UuanNvblwiKVxuLy8gY29uc29sZS5sb2coZmlsZSlcbi8vIGZ1bmN0aW9uIHVwZGF0ZUF2YWlsYWJsZSgpIHtcbi8vIFx0dmFyIGN1cnJlbnRWZXJzaW9uID0gZmlnbWEucm9vdC5nZXRQbHVnaW5EYXRhKFwicGx1Z2luVmVyc2lvblwiKSB8fCBwa2cudmVyc2lvbjtcbi8vIFx0dmFyIG5ld1ZlcnNpb24gPSBwa2cudmVyc2lvbjtcbi8vIFx0aWYgKHNlbXZlci5ndChuZXdWZXJzaW9uLCBjdXJyZW50VmVyc2lvbikpIHtcbi8vIFx0XHRyZXR1cm4gdHJ1ZVxuLy8gXHR9XG4vLyBcdGVsc2Uge1xuLy8gXHRcdGZhbHNlXG4vLyBcdH1cbi8vIH1cbmZ1bmN0aW9uIHBsdWdtYShwbHVnaW4pIHtcbiAgICB2YXIgcGx1Z2luU3RhdGUgPSB7XG4gICAgICAgIHZlcnNpb246IHBrZy52ZXJzaW9uLFxuICAgICAgICB1cGRhdGVBdmFpbGFibGU6IGZhbHNlLFxuICAgICAgICB1aToge31cbiAgICB9O1xuICAgIC8vIHBsdWdpblN0YXRlLnVwZGF0ZUF2YWlsYWJsZSA9IHVwZGF0ZUF2YWlsYWJsZSgpXG4gICAgdmFyIGV2ZW50TGlzdGVuZXJzID0gW107XG4gICAgdmFyIG1lbnVDb21tYW5kcyA9IFtdO1xuICAgIHBsdWdpblN0YXRlLm9uID0gKHR5cGUsIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGV2ZW50TGlzdGVuZXJzLnB1c2goeyB0eXBlLCBjYWxsYmFjayB9KTtcbiAgICB9O1xuICAgIHBsdWdpblN0YXRlLmNvbW1hbmQgPSAodHlwZSwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgbWVudUNvbW1hbmRzLnB1c2goeyB0eXBlLCBjYWxsYmFjayB9KTtcbiAgICB9O1xuICAgIC8vIE92ZXJyaWRlIGRlZmF1bHQgcGFnZSBuYW1lIGlmIHNldFxuICAgIHZhciBwYWdlTWFubnVhbGx5U2V0ID0gZmFsc2U7XG4gICAgcGx1Z2luU3RhdGUuc2V0U3RhcnRQYWdlID0gKG5hbWUpID0+IHtcbiAgICAgICAgcGx1Z2luU3RhdGUudWkucGFnZSA9IG5hbWU7XG4gICAgICAgIHBhZ2VNYW5udWFsbHlTZXQgPSB0cnVlO1xuICAgIH07XG4gICAgLy8gcGx1Z2luU3RhdGUudXBkYXRlID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgLy8gXHRmb3IgKGxldCBbdmVyc2lvbiwgY2hhbmdlc10gb2YgT2JqZWN0LmVudHJpZXModmVyc2lvbkhpc3RvcnkpKSB7XG4gICAgLy8gXHRcdGlmICh2ZXJzaW9uID09PSBwa2cudmVyc2lvbikge1xuICAgIC8vIFx0XHRcdC8vIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgIC8vIFx0XHRcdC8vIFx0dmFyIGNoYW5nZSA9IGNoYW5nZXNbaV1cbiAgICAvLyBcdFx0XHQvLyB9XG4gICAgLy8gXHRcdFx0Y2FsbGJhY2soeyB2ZXJzaW9uLCBjaGFuZ2VzIH0pXG4gICAgLy8gXHRcdH1cbiAgICAvLyBcdH1cbiAgICAvLyB9XG4gICAgdmFyIHBsdWdpbkNvbW1hbmRzID0gcGx1Z2luKHBsdWdpblN0YXRlKTtcbiAgICAvLyAvLyBPdmVycmlkZSBkZWZhdWx0IHBhZ2UgbmFtZSBpZiBzZXRcbiAgICAvLyBpZiAocGFnZU5hbWVbMF0pIHtcbiAgICAvLyBcdHBsdWdpblN0YXRlLnVpLnBhZ2UgPSBwYWdlTmFtZVswXVxuICAgIC8vIH1cbiAgICAvLyBjb25zb2xlLmxvZyhcInBhZ2VOYW1lXCIsIHBsdWdpblN0YXRlLnVpLnBhZ2UpXG4gICAgT2JqZWN0LmFzc2lnbih7fSwgcGx1Z2luU3RhdGUsIHsgY29tbWFuZHM6IHBsdWdpbkNvbW1hbmRzIH0pO1xuICAgIGlmIChwbHVnaW5Db21tYW5kcykge1xuICAgICAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocGx1Z2luQ29tbWFuZHMpKSB7XG4gICAgICAgICAgICAvLyBJZiBjb21tYW5kIGV4aXN0cyBpbiBtYW5pZmVzdFxuICAgICAgICAgICAgaWYgKGZpZ21hLmNvbW1hbmQgPT09IGtleSkge1xuICAgICAgICAgICAgICAgIC8vIFBhc3MgZGVmYXVsdCBwYWdlIGZvciB1aVxuICAgICAgICAgICAgICAgIGlmICghcGFnZU1hbm51YWxseVNldCkge1xuICAgICAgICAgICAgICAgICAgICBwbHVnaW5TdGF0ZS51aS5wYWdlID0ga2V5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBPdmVycmlkZSBkZWZhdWx0IHBhZ2UgbmFtZSBpZiBzZXRcbiAgICAgICAgICAgICAgICAvLyBpZiAocGFnZU5hbWVbMF0pIHtcbiAgICAgICAgICAgICAgICAvLyBcdHBsdWdpblN0YXRlLnVpLnBhZ2UgPSBwYWdlTmFtZVswXVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAvLyBDYWxsIGZ1bmN0aW9uIGZvciB0aGF0IGNvbW1hbmRcbiAgICAgICAgICAgICAgICB2YWx1ZShwbHVnaW5TdGF0ZSk7XG4gICAgICAgICAgICAgICAgLy8gU2hvdyBVST9cbiAgICAgICAgICAgICAgICBpZiAocGx1Z2luU3RhdGUudWkub3Blbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wZW4/XCIpO1xuICAgICAgICAgICAgICAgICAgICBmaWdtYS5zaG93VUkocGx1Z2luU3RhdGUudWkuaHRtbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZpZ21hLnVpLm9ubWVzc2FnZSA9IG1lc3NhZ2UgPT4ge1xuICAgICAgICBmb3IgKGxldCBldmVudExpc3RlbmVyIG9mIGV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKVxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gZXZlbnRMaXN0ZW5lci50eXBlKVxuICAgICAgICAgICAgICAgIGV2ZW50TGlzdGVuZXIuY2FsbGJhY2sobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHBsdWdpblN0YXRlLnVpLnNob3cgPSAoZGF0YSkgPT4ge1xuICAgICAgICBmaWdtYS5zaG93VUkocGx1Z2luU3RhdGUudWkuaHRtbCwgeyB3aWR0aDogcGx1Z2luU3RhdGUudWkud2lkdGgsIGhlaWdodDogcGx1Z2luU3RhdGUudWkuaGVpZ2h0IH0pO1xuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZShkYXRhKTtcbiAgICB9O1xuICAgIGZvciAobGV0IGNvbW1hbmQgb2YgbWVudUNvbW1hbmRzKSB7XG4gICAgICAgIGlmIChmaWdtYS5jb21tYW5kID09PSBjb21tYW5kLnR5cGUpIHtcbiAgICAgICAgICAgIGNvbW1hbmQuY2FsbGJhY2socGx1Z2luU3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKHBsdWdpbk9iamVjdClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwbHVnbWE7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHBsdWdtYSBmcm9tICdwbHVnbWEnO1xuLy8gdmFyIHByb2Nlc3MgPSByZXF1aXJlKCdwcm9jZXNzJylcbi8vIHZhciBwa2cgPSByZXF1aXJlKFwiL1wiICsgXCJwYWNrYWdlLmpzb25cIik7XG4vLyBjb25zb2xlLmxvZyhwa2cudmVyc2lvbilcbnBsdWdtYSgocGx1Z2luKSA9PiB7XG4gICAgY29uc29sZS5sb2cocGx1Z2luLnZlcnNpb24pO1xuICAgIHBsdWdpbi51aSA9IHtcbiAgICAgICAgaHRtbDogX19odG1sX18sXG4gICAgICAgIHdpZHRoOiAyNTAsXG4gICAgICAgIGhlaWdodDogMzAwXG4gICAgfTtcbiAgICBwbHVnaW4uY29tbWFuZCgnY3JlYXRlUmVjdGFuZ2xlcycsICh7IHVpLCBkYXRhIH0pID0+IHtcbiAgICAgICAgdWkuc2hvdyhkYXRhKTtcbiAgICAgICAgcGx1Z2luLm9uKCdjcmVhdGUtcmVjdGFuZ2xlcycsIChtc2cpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1zZy5jb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IGZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlY3QyID0gZmlnbWEuY3JlYXRlUmVjdGFuZ2xlKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVjdDIpO1xuICAgICAgICAgICAgICAgIHJlY3QueCA9IGkgKiAxNTA7XG4gICAgICAgICAgICAgICAgcmVjdC5maWxscyA9IFt7IHR5cGU6ICdTT0xJRCcsIGNvbG9yOiB7IHI6IDEsIGc6IDAuNSwgYjogMCB9IH1dO1xuICAgICAgICAgICAgICAgIGZpZ21hLmN1cnJlbnRQYWdlLmFwcGVuZENoaWxkKHJlY3QpO1xuICAgICAgICAgICAgICAgIG5vZGVzLnB1c2gocmVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBub2RlcztcbiAgICAgICAgICAgIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhub2Rlcyk7XG4gICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgcGx1Z2luLm9uKCdjYW5jZWwnLCAoKSA9PiB7XG4gICAgICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==