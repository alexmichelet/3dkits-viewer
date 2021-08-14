(function(e){function t(t){for(var r,o,s=t[0],u=t[1],c=t[2],d=0,f=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&f.push(i[o][0]),i[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);l&&l(t);while(f.length)f.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,s=1;s<n.length;s++){var u=n[s];0!==i[u]&&(r=!1)}r&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},i={app:0},a=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/3dkits-viewer/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var l=u;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"02dd":function(e,t,n){"use strict";n("b3fd")},"034f":function(e,t,n){"use strict";n("85ec")},"15dd":function(e,t,n){"use strict";n("bdf7")},"170f":function(e,t,n){"use strict";n("98c9")},"28c4":function(e,t,n){"use strict";n("705d")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"},on:{drop:e.onDrop,dragenter:e.onDragEnter,dragleave:e.onDragLeave,dragover:function(e){e.preventDefault()}}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.isDropActive,expression:"isDropActive"}],attrs:{id:"drop-bg"}},[e._m(0)]),n("Viewer",{ref:"viewer"}),n("VersionInfo"),n("HelpWidget")],1)},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"drop-bg-wrapper"}},[n("div",{attrs:{id:"drop-bg-text"}},[e._v(" Drag and drop .PNG file ")])])}],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._m(0),n("div",{attrs:{id:"scene-config"}},[n("TextureLoader",{ref:"textureLoader"}),n("ConfigurationSetter",{ref:"configuration"})],1),n("div",{attrs:{id:"three-scene-canvas"}})])},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{attrs:{id:"config-toggle",onclick:"toggleConfig();"}},[n("div",{attrs:{id:"toggle-icon"}})])}],u=(n("c975"),n("ac1f"),n("1276"),n("2ca0"),n("5a89")),c=n("4721"),l=n("e642"),d=n("4086"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"texture-loader"}},[n("div",{staticClass:"upload-btn-wrapper"},[n("button",{staticClass:"btn btn-primary"},[e._v("Upload .PNG file")]),n("input",{ref:"input",attrs:{type:"file"},on:{change:e.loadTexture}})])])},v=[],h=(n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),n("b562")),p={name:"TextureLoader",data:function(){return{canvas:document.createElement("canvas"),currentTextureData:null}},created:function(){var e=this;this.$bus.on("updated-configuration",(function(t){t.textureRefresh&&e.refreshTexture()}))},mounted:function(){this.canvas.width=1024,this.canvas.height=1024},methods:{refreshTexture:function(){this.drawTexture(this.currentTextureData)},loadTexture:function(e){this.doLoadTexture(e.target.files[0])},doLoadTexture:function(e){var t=this,n=new FileReader;n.onloadend=function(e){t.drawTexture(e.target.result)},n.readAsDataURL(e),this.$refs.input.value=""},drawTexture:function(e){var t=this;this.currentTextureData=e;var n=this.canvas.getContext("2d"),r=new Image;r.onload=function(){if(n.clearRect(0,0,t.canvas.width,t.canvas.height),n.scale(1,-1),n.drawImage(r,0,-1024),t.$root.$children[0].$refs.viewer.$refs.configuration.numbersOverlay){var e=new Image;e.onload=function(){n.drawImage(e,0,-1024),n.resetTransform(),t.computeBlobUrl()};var i=t.$root.$children[0].$refs.viewer.$refs.configuration.fm;e.src="model/fm"+i+"/numbers.png"}else n.resetTransform(),t.computeBlobUrl()},r.src=e},computeBlobUrl:function(){var e=h["a"](this.canvas.toDataURL());this.$bus.emit("loaded-texture",{textureUrl:URL.createObjectURL(e)})}}},m=p,g=(n("170f"),n("2877")),b=Object(g["a"])(m,f,v,!1,null,null,null),w=b.exports,x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"configuration"}},[n("div",{staticClass:"config-field config-field-last"},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.fm,expression:"fm"}],on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.fm=t.target.multiple?n:n[0]},e.updateConfigurationWithTextureRefresh]}},[n("option",{attrs:{value:"21"}},[e._v("FM20/21 Kit")]),n("option",{attrs:{value:"19"}},[e._v("FM18/19 Kit")]),n("option",{attrs:{value:"ball"}},[e._v("FM21 Ball")])])]),n("div",{directives:[{name:"show",rawName:"v-show",value:21==e.fm||19==e.fm,expression:"fm == 21 || fm == 19"}],attrs:{id:"config-shirt"}},[n("div",{staticClass:"config-field"},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.sleeves,expression:"sleeves"}],on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.sleeves=t.target.multiple?n:n[0]},e.updateConfiguration]}},[n("option",{attrs:{value:"short"}},[e._v("Short sleeves")]),n("option",{attrs:{value:"long"}},[e._v("Long sleeves")])])]),n("div",{staticClass:"config-field checkbox"},[n("ol",{staticClass:"switches"},[n("li",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.tucked,expression:"tucked"}],attrs:{id:"tucked-option",type:"checkbox"},domProps:{checked:Array.isArray(e.tucked)?e._i(e.tucked,null)>-1:e.tucked},on:{change:[function(t){var n=e.tucked,r=t.target,i=!!r.checked;if(Array.isArray(n)){var a=null,o=e._i(n,a);r.checked?o<0&&(e.tucked=n.concat([a])):o>-1&&(e.tucked=n.slice(0,o).concat(n.slice(o+1)))}else e.tucked=i},e.updateConfiguration]}}),e._m(0)])])]),n("div",{staticClass:"config-field config-field-last checkbox"},[n("ol",{staticClass:"switches"},[n("li",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.numbersOverlay,expression:"numbersOverlay"}],attrs:{id:"numbers-overlay-option",type:"checkbox"},domProps:{checked:Array.isArray(e.numbersOverlay)?e._i(e.numbersOverlay,null)>-1:e.numbersOverlay},on:{change:[function(t){var n=e.numbersOverlay,r=t.target,i=!!r.checked;if(Array.isArray(n)){var a=null,o=e._i(n,a);r.checked?o<0&&(e.numbersOverlay=n.concat([a])):o>-1&&(e.numbersOverlay=n.slice(0,o).concat(n.slice(o+1)))}else e.numbersOverlay=i},e.updateConfigurationWithTextureRefresh]}}),e._m(1)])])])])])},_=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",{attrs:{for:"tucked-option"}},[n("span",[e._v("Tucked")]),n("span")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",{attrs:{for:"numbers-overlay-option"}},[n("span",[e._v("Show numbers/name position")]),n("span")])}],y={name:"ConfigurationSetter",data:function(){return{fm:"21",tucked:!1,sleeves:"short",numbersOverlay:!1}},computed:{modelName:function(){return"ball"===this.fm?"ball/ball21":"fm"+this.fm+"/"+this.sleeves+"-"+(this.tucked?"tucked":"untucked")}},methods:{updateConfiguration:function(){this.$bus.emit("updated-configuration",{textureRefresh:!1})},updateConfigurationWithTextureRefresh:function(){"ball"!==this.fm?(null===this.$root.$children[0].$refs.viewer.$refs.textureLoader.currentTextureData&&this.$bus.emit("updated-configuration",{textureRefresh:!1}),this.$bus.emit("updated-configuration",{textureRefresh:!0})):this.$bus.emit("updated-configuration",{textureRefresh:!1})}}},T=y,C=(n("28c4"),Object(g["a"])(T,x,_,!1,null,null,null)),$=C.exports,k={name:"Viewer",components:{TextureLoader:w,ConfigurationSetter:$},data:function(){return{sceneCanvas:null,scene:null,camera:null,renderer:null,controls:null,publicPath:"/3dkits-viewer/",model:null,currentTextureUrl:null,loadingManager:null}},created:function(){var e=this;this.$bus.on("updated-configuration",(function(t){t.textureRefresh||e.updateTexture(null)})),this.$bus.on("loaded-texture",(function(t){return e.updateTexture(t.textureUrl)}))},mounted:function(){var e=this;this.loadingManager=new u["o"]((function(){}),this.updateRender),this.loadingManager.setURLModifier((function(t){var n;n=t.startsWith("model/")?"model/":"/model/";var r=t.split(n),i=r[0],a=r[1];if(-1!==a.indexOf("$TEXTURE$")){if(null===e.currentTextureUrl){var o=a.substr(0,4);return i+n+o+"/textures/default.png"}return e.currentTextureUrl}return t})),this.initScene(),this.updateTexture()},methods:{updateRender:function(){this.renderer.render(this.scene,this.camera)},initScene:function(){var e=this;this.sceneCanvas=document.getElementById("three-scene-canvas"),this.scene=new u["z"],this.camera=new u["t"](40,this.sceneCanvas.getBoundingClientRect().width/this.sceneCanvas.getBoundingClientRect().height,.1,1e3),this.renderer=new u["F"]({antialias:!0,powerPreference:"high-performance"}),this.renderer.outputEncoding=u["G"],this.renderer.setSize(this.sceneCanvas.offsetWidth,this.sceneCanvas.offsetHeight),this.renderer.setClearColor("#adadad"),this.sceneCanvas.append(this.renderer.domElement),this.controls=new c["a"](this.camera,this.renderer.domElement),this.controls.addEventListener("change",this.updateRender);var t=new u["i"](100,100);this.scene.add(t);var n=new u["a"](16777215,.5);this.scene.add(n);var r=new u["u"](16777215,.4,100);r.position.set(0,5,-2),r.castShadow=!0,r.shadow.radius=1,r.shadow.mapSize.width=2048,r.shadow.mapSize.height=2048,this.scene.add(r),window.addEventListener("resize",(function(){e.camera.aspect=e.sceneCanvas.getBoundingClientRect().width/e.sceneCanvas.getBoundingClientRect().height,e.camera.updateProjectionMatrix(),e.renderer.setSize(e.sceneCanvas.offsetWidth,e.sceneCanvas.offsetHeight),e.updateRender()}))},updateTexture:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=this.$refs.configuration.modelName;null!==t&&(this.currentTextureUrl=t);var r=new d["a"](this.loadingManager);r.load(this.publicPath+"model/"+n+".mtl",(function(t){t.preload(),e.loadModel(t,n)}))},loadModel:function(e,t){var n=this;this.scene.remove(this.model),(new l["a"]).setMaterials(e).load(this.publicPath+"model/"+t+".obj",(function(e){n.model=e,n.scene.add(n.model),n.initNewKitView()}))},initNewKitView:function(){this.camera.position.set(0,1.6,-3),this.controls.target.set(0,1.1,0),this.controls.update(),this.updateRender()}}},O=k,R=(n("15dd"),Object(g["a"])(O,o,s,!1,null,null,null)),D=R.exports,E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"version-info"}},[e._v("FM 3D Kits Viewer "),n("div",{attrs:{id:"version-number"}},[e._v("v"+e._s(e.version))])])},L=[],A={name:"VersionInfo",data:function(){return{version:"1.4.0"}}},j=A,M=(n("02dd"),Object(g["a"])(j,E,L,!1,null,null,null)),S=M.exports,P={name:"App",data:function(){return{isDropActive:!1}},components:{VersionInfo:S,Viewer:D},methods:{onDrop:function(e){e.preventDefault(),this.isDropActive=!1,this.$refs.viewer.$refs.textureLoader.doLoadTexture(e.dataTransfer.files[0])},onDragEnter:function(e){e.preventDefault(),this.isDropActive=!0},onDragLeave:function(e){e.preventDefault(),this.isDropActive=!1}}},U=P,N=(n("034f"),Object(g["a"])(U,i,a,!1,null,null,null)),B=N.exports,V=n("b828");r["a"].config.productionTip=!1,r["a"].use(V["a"]),new r["a"]({render:function(e){return e(B)}}).$mount("#app")},"705d":function(e,t,n){},"85ec":function(e,t,n){},"98c9":function(e,t,n){},b3fd:function(e,t,n){},bdf7:function(e,t,n){}});
//# sourceMappingURL=app.444adff1.js.map