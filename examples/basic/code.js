"use strict";var e="1.0.39";(function(a){var o={version:e,updateAvailable:!1,ui:{}},t=[];o.on=(e,a)=>{t.push({type:e,callback:a})};var l=!1;o.setStartPage=e=>{o.ui.page=e,l=!0};var c=a(o);if(Object.assign({},o,{commands:c}),c)for(let[e,a]of Object.entries(c))figma.command===e&&(l||(o.ui.page=e),a(o),o.ui.open&&(console.log("open?"),figma.showUI(o.ui.html)));figma.ui.onmessage=e=>{for(let a of t)e.type===a.type&&a.callback(e)}})((e=>(console.log(e),figma.showUI(__html__),e.on("create-rectangles",(e=>{const a=[];for(let o=0;o<e.count;o++){const e=figma.createRectangle(),t=figma.createRectangle();e.setPluginData("version", "1.0.39");t.setPluginData("version", "1.0.39");console.log(t),e.x=150*o,e.fills=[{type:"SOLID",color:{r:1,g:.5,b:0}}],figma.currentPage.appendChild(e),a.push(e)}figma.currentPage.selection=a,figma.viewport.scrollAndZoomIntoView(a),figma.closePlugin()})),e.on("cancel",(()=>{figma.closePlugin()})),{createRectangles:()=>{console.log("test")}})));
