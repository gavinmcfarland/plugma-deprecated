'use strict';

var name = "Test-Plugin";
var version = "1.0.0";
var description = "Your Figma plugin";
var main = "code.js";
var scripts = {
	build: "rollup -c",
	dev: "rollup -c -w"
};
var author = "";
var license = "";
var devDependencies = {
	"@figma/plugin-typings": "^1.19.2",
	"@rollup/plugin-commonjs": "^17.1.0",
	"@rollup/plugin-replace": "^2.4.1",
	"@rollup/plugin-typescript": "^8.2.0",
	"@types/node": "^14.14.35",
	rollup: "^2.41.5",
	"rollup-plugin-node-globals": "^1.4.0",
	"rollup-plugin-node-polyfills": "^0.2.1",
	"rollup-plugin-terser": "^7.0.2",
	typescript: "^4.2.3"
};
var e = {
	name: name,
	version: version,
	description: description,
	main: main,
	scripts: scripts,
	author: author,
	license: license,
	devDependencies: devDependencies
};

var dist=function(a){var o={version:e.version,updateAvailable:!1,ui:{}},i=[];o.on=(e,a)=>{i.push({type:e,callback:a});};var s=!1;o.setStartPage=e=>{o.ui.page=e,s=!0;};var r=a(o);if(Object.assign({},o,{commands:r}),r)for(let[e,a]of Object.entries(r))figma.command===e&&(s||(o.ui.page=e),a(o),o.ui.open&&(console.log("open?"),figma.showUI(o.ui.html)));figma.ui.onmessage=e=>{for(let a of i)e.type===a.type&&a.callback(e);};};

dist((plugin) => {
    console.log(plugin);
    figma.showUI(__html__);
    plugin.on('create-rectangles', (msg) => {
        const nodes = [];
        for (let i = 0; i < msg.count; i++) {
            const rect = figma.createRectangle();
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
    return {
        'createRectangles': () => {
            console.log("test");
        }
    };
});
