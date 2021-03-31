"use strict";var e;e={name:"Test-Plugin",version:"2.0.139",description:"Your Figma plugin",main:"code.ts",scripts:{webpack:"webpack",build:"rollup -c",dev:"rollup -c -w"},author:"",license:"",devDependencies:{"@figma/plugin-typings":"^1.19.2","@rollup/plugin-commonjs":"^17.1.0","@rollup/plugin-dynamic-import-vars":"^1.1.1","@rollup/plugin-replace":"^2.4.1","@rollup/plugin-typescript":"^8.2.0","@types/node":"^14.14.35",plugma:"0.0.0-alpha0.1",rollup:"^2.41.5","rollup-plugin-inject-process-env":"^1.3.1","rollup-plugin-node-globals":"^1.4.0","rollup-plugin-node-polyfills":"^0.2.1","rollup-plugin-terser":"^7.0.2",typescript:"^4.2.3",yargs:"^16.2.0"},dependencies:{browserify:"^17.0.0"}},function(l){var i={updateAvailable:!1,ui:{}};(null==e?void 0:e.version)&&(i.version=e.version);var o=[],a=[];i.on=(e,l)=>{o.push({type:e,callback:l})},i.command=(e,l)=>{a.push({type:e,callback:l})};var n=!1;i.setStartPage=e=>{i.ui.page=e,n=!0};var t=l(i);if(Object.assign({},i,{commands:t}),t)for(let[e,l]of Object.entries(t))figma.command===e&&(n||(i.ui.page=e),l(i),i.ui.open&&(console.log("open?"),figma.showUI(i.ui.html)));figma.ui.onmessage=e=>{for(let l of o)e.type===l.type&&l.callback(e)},i.ui.show=e=>{figma.showUI(i.ui.html,{width:i.ui.width,height:i.ui.height}),figma.ui.postMessage(e)};for(let e of a)figma.command===e.type&&e.callback(i)}((e=>{console.log(e),e.ui={html:__html__,width:250,height:300},e.command("createRectangles",(({ui:l,data:i})=>{l.show(i),e.on("create-rectangles",(e=>{const l=[];for(let i=0;i<e.count;i++){const e=figma.createRectangle(),o=figma.createRectangle();console.log(o),e.x=150*i,e.fills=[{type:"SOLID",color:{r:1,g:.5,b:0}}],figma.currentPage.appendChild(e),l.push(e)}figma.currentPage.selection=l,figma.viewport.scrollAndZoomIntoView(l),figma.closePlugin()})),e.on("cancel",(()=>{figma.closePlugin()}))}))}));
