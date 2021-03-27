/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../dist/index.js":
/*!***************************!*\
  !*** ../../dist/index.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n// TODO: Check package from working directory\n// TODO: Check versions from working directory\n// TODO: How to fix issue of referenceing file when used as depency\nvar versionHistory, pkg;\nvar process = process;\nif ((process === null || process === void 0 ? void 0 : process.env.NODE_ENV) === \"TEST\") ;\nelse {\n    try {\n        versionHistory = __webpack_require__(\"../../dist sync recursive ^.*\\\\.plugma\\\\/versions\\\\.json$\")(process.cwd() + \".plugma/versions.json\");\n    }\n    catch (_a) {\n        versionHistory = {};\n    }\n    pkg = __webpack_require__(\"../../dist sync recursive ^.*package\\\\.json$\")(process.cwd() + \"package.json\");\n}\n// fs.readFile(\"../package.json\", (err, data) => {\n// \tconsole.log(err, data)\n// })\n// const file = require(\"package.json\")\n// console.log(file)\n// function updateAvailable() {\n// \tvar currentVersion = figma.root.getPluginData(\"pluginVersion\") || pkg.version;\n// \tvar newVersion = pkg.version;\n// \tif (semver.gt(newVersion, currentVersion)) {\n// \t\treturn true\n// \t}\n// \telse {\n// \t\tfalse\n// \t}\n// }\nfunction plugma(plugin) {\n    var pluginState = {\n        version: pkg.version,\n        updateAvailable: false,\n        ui: {}\n    };\n    // pluginState.updateAvailable = updateAvailable()\n    var eventListeners = [];\n    var menuCommands = [];\n    pluginState.on = (type, callback) => {\n        eventListeners.push({ type, callback });\n    };\n    pluginState.command = (type, callback) => {\n        menuCommands.push({ type, callback });\n    };\n    // Override default page name if set\n    var pageMannuallySet = false;\n    pluginState.setStartPage = (name) => {\n        pluginState.ui.page = name;\n        pageMannuallySet = true;\n    };\n    // pluginState.update = (callback) => {\n    // \tfor (let [version, changes] of Object.entries(versionHistory)) {\n    // \t\tif (version === pkg.version) {\n    // \t\t\t// for (let i = 0; i < changes.length; i++) {\n    // \t\t\t// \tvar change = changes[i]\n    // \t\t\t// }\n    // \t\t\tcallback({ version, changes })\n    // \t\t}\n    // \t}\n    // }\n    var pluginCommands = plugin(pluginState);\n    // // Override default page name if set\n    // if (pageName[0]) {\n    // \tpluginState.ui.page = pageName[0]\n    // }\n    // console.log(\"pageName\", pluginState.ui.page)\n    Object.assign({}, pluginState, { commands: pluginCommands });\n    if (pluginCommands) {\n        for (let [key, value] of Object.entries(pluginCommands)) {\n            // If command exists in manifest\n            if (figma.command === key) {\n                // Pass default page for ui\n                if (!pageMannuallySet) {\n                    pluginState.ui.page = key;\n                }\n                // Override default page name if set\n                // if (pageName[0]) {\n                // \tpluginState.ui.page = pageName[0]\n                // }\n                // Call function for that command\n                value(pluginState);\n                // Show UI?\n                if (pluginState.ui.open) {\n                    console.log(\"open?\");\n                    figma.showUI(pluginState.ui.html);\n                }\n            }\n        }\n    }\n    figma.ui.onmessage = message => {\n        for (let eventListener of eventListeners) {\n            // console.log(message)\n            if (message.type === eventListener.type)\n                eventListener.callback(message);\n        }\n    };\n    pluginState.ui.show = (data) => {\n        figma.showUI(pluginState.ui.html, { width: pluginState.ui.width, height: pluginState.ui.height });\n        figma.ui.postMessage(data);\n    };\n    for (let command of menuCommands) {\n        if (figma.command === command.type) {\n            command.callback(pluginState);\n        }\n    }\n    // console.log(pluginObject)\n}\n\nmodule.exports = plugma;\n\n\n//# sourceURL=webpack://figma-webpack/../../dist/index.js?");

/***/ }),

/***/ "../../dist sync recursive ^.*\\.plugma\\/versions\\.json$":
/*!*****************************************************!*\
  !*** ../../dist/ sync ^.*\.plugma\/versions\.json$ ***!
  \*****************************************************/
/***/ ((module) => {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = () => ([]);\nwebpackEmptyContext.resolve = webpackEmptyContext;\nwebpackEmptyContext.id = \"../../dist sync recursive ^.*\\\\.plugma\\\\/versions\\\\.json$\";\nmodule.exports = webpackEmptyContext;\n\n//# sourceURL=webpack://figma-webpack/../../dist/_sync_^.*\\.plugma\\/versions\\.json$?");

/***/ }),

/***/ "../../dist sync recursive ^.*package\\.json$":
/*!******************************************!*\
  !*** ../../dist/ sync ^.*package\.json$ ***!
  \******************************************/
/***/ ((module) => {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = () => ([]);\nwebpackEmptyContext.resolve = webpackEmptyContext;\nwebpackEmptyContext.id = \"../../dist sync recursive ^.*package\\\\.json$\";\nmodule.exports = webpackEmptyContext;\n\n//# sourceURL=webpack://figma-webpack/../../dist/_sync_^.*package\\.json$?");

/***/ }),

/***/ "./code.ts":
/*!*****************!*\
  !*** ./code.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var plugma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! plugma */ \"../../dist/index.js\");\n/* harmony import */ var plugma__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(plugma__WEBPACK_IMPORTED_MODULE_0__);\n\nplugma__WEBPACK_IMPORTED_MODULE_0___default()((plugin) => {\n    console.log(plugin);\n    plugin.ui = {\n        html: __html__,\n        width: 250,\n        height: 300\n    };\n    plugin.command('createRectangles', ({ ui, data }) => {\n        ui.show(data);\n        plugin.on('create-rectangles', (msg) => {\n            const nodes = [];\n            for (let i = 0; i < msg.count; i++) {\n                const rect = figma.createRectangle();\n                const rect2 = figma.createRectangle();\n                console.log(rect2);\n                rect.x = i * 150;\n                rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];\n                figma.currentPage.appendChild(rect);\n                nodes.push(rect);\n            }\n            figma.currentPage.selection = nodes;\n            figma.viewport.scrollAndZoomIntoView(nodes);\n            figma.closePlugin();\n        });\n        plugin.on('cancel', () => {\n            figma.closePlugin();\n        });\n    });\n});\n\n\n//# sourceURL=webpack://figma-webpack/./code.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./code.ts");
/******/ 	
/******/ })()
;