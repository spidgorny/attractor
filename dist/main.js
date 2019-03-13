!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=13)}([function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this.x=t,this.y=e}return t.prototype.add=function(e){return e instanceof t?new t(this.x+e.x,this.y+e.y):new t(this.x+e,this.y+e)},t.prototype.multiply=function(e){return new t(this.x*e.x,this.y*e.y)},t.prototype.scale=function(e){return new t(this.x*e,this.y*e)},t.prototype.direction=function(e){return new t(e.x-this.x,e.y-this.y)},t.prototype.dot=function(t){return this.x*t.x+this.y*t.y},Object.defineProperty(t.prototype,"length",{get:function(){return Math.sqrt(this.dot(this))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"unit",{get:function(){return this.scale(1/this.length)},enumerable:!0,configurable:!0}),t}();e.Vector2D=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),r=function(){function t(t,e){this.radius=2,this.speed=new i.Vector2D(1*Math.random(),1*Math.random()),this.width=t,this.height=e,this.init()}return t.prototype.init=function(){var t=this.width;this.x=this.x1=Math.random()*t-t/2,this.y=this.y1=Math.random()*t-t/2,this.z=this.z1=Math.random()*t-t/2,this.r=128+128*Math.random(),this.g=128+128*Math.random(),this.b=128+128*Math.random()},t.prototype.draw=function(t){t.setParticle(this.x,this.y,this.r,this.g,this.b,1,this.radius)},t.prototype.draw3D=function(t){t.setParticle(this.x/(10/this.z)*1,this.y/(10/this.z)*1,this.r,this.g,this.b,1,this.radius)},t.prototype.next=function(t,e){var n=this.funcL(this.x,this.y,this.z,t/1e4),i=n.x,r=n.y,o=n.z;this.x=i,this.y=r,this.z=o,Math.abs(this.x)>this.width&&this.init(),Math.abs(this.y)>this.height&&this.init()},t.prototype.func1=function(t,e,n){return{x:t^2+t*n+e*n-t,y:-e^2-n^2-t*e-t*n-e*n-e,z:0}},t.prototype.func2=function(t,e,n){return{x:-e^2-n^2+n*t,y:e*n+t*e,z:0}},t.prototype.func3=function(t,e,n){return{x:t+n,y:e+n,z:0}},t.prototype.funcL=function(t,e,n,i){return{x:t+10*(e-t)*i,y:e+(t*(28-n)-e)*i,z:n+(t*e-8/3*n)*i}},Object.defineProperty(t.prototype,"vector",{get:function(){return new i.Vector2D(this.x,this.y)},enumerable:!0,configurable:!0}),t.prototype.distanceTo=function(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))},t.prototype.nudge=function(t){this.speed=this.speed.add(t)},t.prototype.applySpeed=function(t){var e=this.vector.add(this.speed.scale(t));this.x=e.x,this.y=e.y},t.prototype.affectedBy=function(t,e){void 0===e&&(e=1);var n=this.distanceTo(t),i=this.vector.direction(t.vector);return n<t.radius&&(n/=10),this.nudge(i.unit.scale(e/Math.sqrt(n))),n},t}();e.Point=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.canvas=document.querySelector("canvas"),this.width=this.canvas.width=this.canvas.clientWidth,this.height=this.canvas.height=this.canvas.clientHeight,this.c=this.canvas.getContext("2d"),this.reset()}return t.prototype.reset=function(){this.c.fillStyle="#000000",this.c.fillRect(0,0,this.width,this.height)},t.prototype.drawTestCircle=function(){this.c.beginPath(),this.c.fillStyle="#ffffff",this.c.strokeStyle="#ffffff",this.c.arc(this.width/10,this.height/10,this.width/10,0,2*Math.PI),this.c.stroke()},t.prototype.beforeFrame=function(){this.imageData=this.c.getImageData(0,0,this.width,this.height)},t.prototype.afterFrame=function(){this.c.putImageData(this.imageData,0,0)},t.prototype.setPixel=function(t,e,n,i,r,o){var s=4*(t+e*this.imageData.width);this.imageData.data[s+0]=n,this.imageData.data[s+1]=i,this.imageData.data[s+2]=r,this.imageData.data[s+3]=o},t.prototype.getPixel=function(t,e){var n=4*(t+e*this.imageData.width);return{r:this.imageData.data[n+0],g:this.imageData.data[n+1],b:this.imageData.data[n+2],a:this.imageData.data[n+3]}},t.prototype.fade=function(t){void 0===t&&(t=1),this.beforeFrame();for(var e=0;e<this.width;e++)for(var n=0;n<this.height;n++){var i=this.getPixel(e,n),r=i.r,o=i.g,s=i.b,a=i.a;this.setPixel(e,n,r-t,o-t,s-t,a+1)}this.afterFrame()},t.prototype.setParticle=function(t,e,n,i,r,o,s){void 0===s&&(s=2),this.c.beginPath(),this.c.fillStyle="rgba("+n+","+i+","+r+","+o+")",this.c.strokeStyle="rgba("+n+","+i+","+r+","+o+")",this.c.arc(this.width/2+t,this.height/2+e,s,0,2*Math.PI),this.c.fill()},t}();e.CanvasPlus=i},function(t,e,n){"use strict";var i=n(5),r=n(8),o=n(9);t.exports=function t(e){if(!(this instanceof t))return new t(e);"string"==typeof e&&(e=s[e]?{position:e}:{container:e});e=e||{};e.container?"string"==typeof e.container?this.container=document.querySelector(e.container):this.container=e.container:this.container=document.body||document.documentElement;this.element=document.createElement("div");this.element.className="fps";this.element.innerHTML=['<div class="fps-bg"></div>','<canvas class="fps-canvas"></canvas>','<span class="fps-text">fps <span class="fps-value">60.0</span></span>'].join("");this.container.appendChild(this.element);this.canvas=this.element.querySelector(".fps-canvas");this.textEl=this.element.querySelector(".fps-text");this.valueEl=this.element.querySelector(".fps-value");this.bgEl=this.element.querySelector(".fps-bg");var n=e.css||e.style||"";"object"==typeof n&&(n=o(n));var a="";a=s[e.position]||s["top-left"];this.element.style.cssText=["line-height: 1;","position: fixed;","font-family: Roboto, sans-serif;","z-index: 1;","font-weight: 300;","font-size: small;","padding: 1rem;",a,e.color?"color:"+e.color:"",n].join("");this.canvas.style.cssText=["position: relative;","width: 2em;","height: 1em;","display: block;","float: left;","margin-right: .333em;"].join("");this.bgEl.style.cssText=["position: absolute;","height: 1em;","width: 2em;","background: currentcolor;","opacity: .1;"].join("");this.canvas.width=parseInt(getComputedStyle(this.canvas).width)||1;this.canvas.height=parseInt(getComputedStyle(this.canvas).height)||1;this.context=this.canvas.getContext("2d");var c=this.context;var u=this.canvas.width;var h=this.canvas.height;var f=0;var l=0;var p=e.values||Array(this.canvas.width);var d=e.period||1e3;var y=e.max||100;var v=this;i(function t(){f++;var e=r();if(e-l>d){l=e,p.push(f/(y*d*.001)),p=p.slice(-u),f=0,c.clearRect(0,0,u,h),c.fillStyle=getComputedStyle(v.canvas).color;for(var n=u;n--;){var o=p[n];if(null==o)break;c.fillRect(n,h-h*o,1,h*o)}v.valueEl.innerHTML=(p[p.length-1]*y).toFixed(1)}i(t)})};var s={"top-left":"left: 0; top: 0;","top-right":"right: 0; top: 0;","bottom-right":"right: 0; bottom: 0;","bottom-left":"left: 0; bottom: 0;"}},function(t,e,n){(function(e){for(var i=n(6),r="undefined"==typeof window?e:window,o=["moz","webkit"],s="AnimationFrame",a=r["request"+s],c=r["cancel"+s]||r["cancelRequest"+s],u=0;!a&&u<o.length;u++)a=r[o[u]+"Request"+s],c=r[o[u]+"Cancel"+s]||r[o[u]+"CancelRequest"+s];if(!a||!c){var h=0,f=0,l=[];a=function(t){if(0===l.length){var e=i(),n=Math.max(0,1e3/60-(e-h));h=n+e,setTimeout(function(){var t=l.slice(0);l.length=0;for(var e=0;e<t.length;e++)if(!t[e].cancelled)try{t[e].callback(h)}catch(t){setTimeout(function(){throw t},0)}},Math.round(n))}return l.push({handle:++f,callback:t,cancelled:!1}),f},c=function(t){for(var e=0;e<l.length;e++)l[e].handle===t&&(l[e].cancelled=!0)}}t.exports=function(t){return a.call(r,t)},t.exports.cancel=function(){c.apply(r,arguments)},t.exports.polyfill=function(t){t||(t=r),t.requestAnimationFrame=a,t.cancelAnimationFrame=c}}).call(this,n(0))},function(t,e,n){(function(e){(function(){var n,i,r,o,s,a;"undefined"!=typeof performance&&null!==performance&&performance.now?t.exports=function(){return performance.now()}:null!=e&&e.hrtime?(t.exports=function(){return(n()-s)/1e6},i=e.hrtime,o=(n=function(){var t;return 1e9*(t=i())[0]+t[1]})(),a=1e9*e.uptime(),s=o-a):Date.now?(t.exports=function(){return Date.now()-r},r=Date.now()):(t.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this)}).call(this,n(7))},function(t,e){var n,i,r=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(t){if(n===setTimeout)return setTimeout(t,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o}catch(t){n=o}try{i="function"==typeof clearTimeout?clearTimeout:s}catch(t){i=s}}();var c,u=[],h=!1,f=-1;function l(){h&&c&&(h=!1,c.length?u=c.concat(u):f=-1,u.length&&p())}function p(){if(!h){var t=a(l);h=!0;for(var e=u.length;e;){for(c=u,u=[];++f<e;)c&&c[f].run();f=-1,e=u.length}c=null,h=!1,function(t){if(i===clearTimeout)return clearTimeout(t);if((i===s||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(t);try{i(t)}catch(e){try{return i.call(null,t)}catch(e){return i.call(this,t)}}}(t)}}function d(t,e){this.fun=t,this.array=e}function y(){}r.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];u.push(new d(t,e)),1!==u.length||h||a(p)},d.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=y,r.addListener=y,r.once=y,r.off=y,r.removeListener=y,r.removeAllListeners=y,r.emit=y,r.prependListener=y,r.prependOnceListener=y,r.listeners=function(t){return[]},r.binding=function(t){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(t){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},function(t,e,n){(function(e){t.exports=e.performance&&e.performance.now?function(){return performance.now()}:Date.now||function(){return+new Date}}).call(this,n(0))},function(t,e,n){"use strict";var i=n(10),r=n(11),o=n(12);function s(t,e){var n={};return n[t]=e,n}function a(t){return t}function c(t,e){return t?i(t,e):""}function u(t){return t?" ":""}function h(t){return t?"\n":""}function f(t,e,n,i){for(var r=c(n,i+1),o=h(n),s=u(n),a="",f=0,l=t.length;f<l;f++)for(var p=0,d=e.length;p<d;p++)a+=r+t[f]+(0===t[f].indexOf("@")?" ":":")+s+e[p]+";"+o;return a}t.exports=function(t,e){function n(t,n){return o(t).reduce(function(t,i){return t.concat(e.property(i,n))},[])}function l(t,n){return o(t).reduce(function(t,i){return t.concat(e.value(i,n))},[])}function p(t,i){var r="";return Object.keys(t).forEach(function(a){var d,y=t[a];"string"==typeof(d=y)||Array.isArray(d)&&d.length&&"object"!=typeof d[0]?r+=f(n(a,y),l(y,a),e.indent,i-1):Array.isArray(y)?y.forEach(function(t){r+=p(s(a,t),i)}):function(t,n){return o(t).reduce(function(t,i){return t.concat(e.selector(i,n))},[])}(a,y).forEach(function(o){r+=function(t,e,n){return c(e,n)+t+u(e)+"{"+h(e)}(o,e.indent,i),Object.keys(y).forEach(function(o){var c,u=t[a][o];"object"!=typeof(c=u)||Array.isArray(c)?r+=f(n(o,u),l(u,o),e.indent,i):r+=p(s(o,u),i+1)}),r+=function(t,e){return c(t,e)+"}"+h(t)}(e.indent,i)})}),r}return"number"==typeof(e=r({indent:"",property:a,value:a,selector:a},e)).indent&&(e.indent=i(" ",e.indent)),o(t).map(function(t){return p(t,0)}).join(h(e.indent))}},function(t,e,n){"use strict";
/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */var i,r="";t.exports=function(t,e){if("string"!=typeof t)throw new TypeError("expected a string");if(1===e)return t;if(2===e)return t+t;var n=t.length*e;if(i!==t||void 0===i)i=t,r="";else if(r.length>=n)return r.substr(0,n);for(;n>r.length&&e>1;)1&e&&(r+=t),e>>=1,t+=t;return r=(r+=t).substr(0,n)}},function(t,e,n){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var i=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var i={};return"abcdefghijklmnopqrst".split("").forEach(function(t){i[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},i)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var n,s,a=function(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}(t),c=1;c<arguments.length;c++){for(var u in n=Object(arguments[c]))r.call(n,u)&&(a[u]=n[u]);if(i){s=i(n);for(var h=0;h<s.length;h++)o.call(n,s[h])&&(a[s[h]]=n[s[h]])}}return a}},function(t,e,n){"use strict";t.exports=function(t){return null==t?[]:Array.isArray(t)?t:[t]}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(14);n(4)();var r=new i.App;r.start(),r.loop()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),r=n(3),o=function(){function t(){this.t=1,this.pixels=[],this.c=new r.CanvasPlus,this.c.canvas.addEventListener("click",this.click.bind(this)),this.debug=document.querySelector("div#debug")}return t.prototype.start=function(){for(var t=0;t<2e3;t++)this.pixels.push(new i.Point(this.c.width,this.c.height))},t.prototype.frame=function(t){for(var e=this.t-this.prevT,n=0,i=this.pixels;n<i.length;n++){var r=i[n];r.draw3D(t),r.next(this.t,e)}},t.prototype.loop=function(){var t=new Date;this.c.reset(),this.frame(this.c),this.prevT=this.t,this.t+=.01,this.debug.innerText=((new Date).getTime()-t.getTime()).toFixed(2)+"ms",requestAnimationFrame(this.loop.bind(this))},t.prototype.click=function(t){this.c.setParticle(t.clientX,t.clientY,255,255,255,1)},t}();e.App=o}]);