!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=15)}([function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this.x=t,this.y=e}return t.prototype.add=function(e){return e instanceof t?new t(this.x+e.x,this.y+e.y):new t(this.x+e,this.y+e)},t.prototype.multiply=function(e){return new t(this.x*e.x,this.y*e.y)},t.prototype.scale=function(e){return new t(this.x*e,this.y*e)},t.prototype.direction=function(e){return new t(e.x-this.x,e.y-this.y)},t.prototype.dot=function(t){return this.x*t.x+this.y*t.y},Object.defineProperty(t.prototype,"length",{get:function(){return Math.sqrt(this.dot(this))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"unit",{get:function(){return this.scale(1/this.length)},enumerable:!0,configurable:!0}),t}();e.Vector2D=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),r=function(){function t(t,e){this.radius=2,this.speed=new i.Vector2D(1*Math.random(),1*Math.random()),this.width=t,this.height=e,this.init()}return t.prototype.init=function(){var t=this.width;this.x=this.x1=Math.random()*t-t/2,this.y=this.y1=Math.random()*t-t/2,this.z=this.z1=Math.random()*t-t/2,this.r=128+128*Math.random(),this.g=128+128*Math.random(),this.b=128+128*Math.random()},t.prototype.draw=function(t){t.setParticle(this.x,this.y,this.r,this.g,this.b,1,this.radius)},t.prototype.draw3D=function(t){t.setParticle(this.x/(10/this.z)*1,this.y/(10/this.z)*1,this.r,this.g,this.b,1,this.radius)},t.prototype.next=function(t,e){var n=this.funcL(this.x,this.y,this.z,t/1e4),i=n.x,r=n.y,o=n.z;this.x=i,this.y=r,this.z=o,Math.abs(this.x)>this.width&&this.init(),Math.abs(this.y)>this.height&&this.init()},t.prototype.func1=function(t,e,n){return{x:t^2+t*n+e*n-t,y:-e^2-n^2-t*e-t*n-e*n-e,z:0}},t.prototype.func2=function(t,e,n){return{x:-e^2-n^2+n*t,y:e*n+t*e,z:0}},t.prototype.func3=function(t,e,n){return{x:t+n,y:e+n,z:0}},t.prototype.funcL=function(t,e,n,i){return{x:t+10*(e-t)*i,y:e+(t*(28-n)-e)*i,z:n+(t*e-8/3*n)*i}},Object.defineProperty(t.prototype,"vector",{get:function(){return new i.Vector2D(this.x,this.y)},enumerable:!0,configurable:!0}),t.prototype.distanceTo=function(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))},t.prototype.nudge=function(t){this.speed=this.speed.add(t)},t.prototype.applySpeed=function(t){var e=this.vector.add(this.speed.scale(t));this.x=e.x,this.y=e.y},t.prototype.affectedBy=function(t,e){void 0===e&&(e=1);var n=this.distanceTo(t),i=this.vector.direction(t.vector);return n<t.radius&&(n/=10),this.nudge(i.unit.scale(e/Math.sqrt(n))),n},t}();e.Point=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){this.canvas=document.querySelector("canvas"),this.width=this.canvas.width=this.canvas.clientWidth,this.height=this.canvas.height=this.canvas.clientHeight,this.c=this.canvas.getContext("2d"),this.reset()}return t.prototype.reset=function(){this.c.fillStyle="#000000",this.c.fillRect(0,0,this.width,this.height)},t.prototype.drawTestCircle=function(){this.c.beginPath(),this.c.fillStyle="#ffffff",this.c.strokeStyle="#ffffff",this.c.arc(this.width/10,this.height/10,this.width/10,0,2*Math.PI),this.c.stroke()},t.prototype.beforeFrame=function(){this.imageData=this.c.getImageData(0,0,this.width,this.height)},t.prototype.afterFrame=function(){this.c.putImageData(this.imageData,0,0)},t.prototype.setPixel=function(t,e,n,i,r,o){var a=4*(t+e*this.imageData.width);this.imageData.data[a+0]=n,this.imageData.data[a+1]=i,this.imageData.data[a+2]=r,this.imageData.data[a+3]=o},t.prototype.getPixel=function(t,e){var n=4*(t+e*this.imageData.width);return{r:this.imageData.data[n+0],g:this.imageData.data[n+1],b:this.imageData.data[n+2],a:this.imageData.data[n+3]}},t.prototype.fade=function(t){void 0===t&&(t=1),this.beforeFrame();for(var e=0;e<this.width;e++)for(var n=0;n<this.height;n++){var i=this.getPixel(e,n),r=i.r,o=i.g,a=i.b,s=i.a;this.setPixel(e,n,r-t,o-t,a-t,s+1)}this.afterFrame()},t.prototype.setParticle=function(t,e,n,i,r,o,a){void 0===a&&(a=2),this.c.beginPath(),this.c.fillStyle="rgba("+n+","+i+","+r+","+o+")",this.c.strokeStyle="rgba("+n+","+i+","+r+","+o+")",this.c.arc(this.width/2+t,this.height/2+e,a,0,2*Math.PI),this.c.fill()},t}();e.CanvasPlus=i},function(t,e,n){"use strict";var i=n(5),r=n(8),o=n(9);t.exports=function t(e){if(!(this instanceof t))return new t(e);"string"==typeof e&&(e=a[e]?{position:e}:{container:e});e=e||{};e.container?"string"==typeof e.container?this.container=document.querySelector(e.container):this.container=e.container:this.container=document.body||document.documentElement;this.element=document.createElement("div");this.element.className="fps";this.element.innerHTML=['<div class="fps-bg"></div>','<canvas class="fps-canvas"></canvas>','<span class="fps-text">fps <span class="fps-value">60.0</span></span>'].join("");this.container.appendChild(this.element);this.canvas=this.element.querySelector(".fps-canvas");this.textEl=this.element.querySelector(".fps-text");this.valueEl=this.element.querySelector(".fps-value");this.bgEl=this.element.querySelector(".fps-bg");var n=e.css||e.style||"";"object"==typeof n&&(n=o(n));var s="";s=a[e.position]||a["top-left"];this.element.style.cssText=["line-height: 1;","position: fixed;","font-family: Roboto, sans-serif;","z-index: 1;","font-weight: 300;","font-size: small;","padding: 1rem;",s,e.color?"color:"+e.color:"",n].join("");this.canvas.style.cssText=["position: relative;","width: 2em;","height: 1em;","display: block;","float: left;","margin-right: .333em;"].join("");this.bgEl.style.cssText=["position: absolute;","height: 1em;","width: 2em;","background: currentcolor;","opacity: .1;"].join("");this.canvas.width=parseInt(getComputedStyle(this.canvas).width)||1;this.canvas.height=parseInt(getComputedStyle(this.canvas).height)||1;this.context=this.canvas.getContext("2d");var c=this.context;var h=this.canvas.width;var u=this.canvas.height;var f=0;var l=0;var p=e.values||Array(this.canvas.width);var d=e.period||1e3;var y=e.max||100;var v=this;i(function t(){f++;var e=r();if(e-l>d){l=e,p.push(f/(y*d*.001)),p=p.slice(-h),f=0,c.clearRect(0,0,h,u),c.fillStyle=getComputedStyle(v.canvas).color;for(var n=h;n--;){var o=p[n];if(null==o)break;c.fillRect(n,u-u*o,1,u*o)}v.valueEl.innerHTML=(p[p.length-1]*y).toFixed(1)}i(t)})};var a={"top-left":"left: 0; top: 0;","top-right":"right: 0; top: 0;","bottom-right":"right: 0; bottom: 0;","bottom-left":"left: 0; bottom: 0;"}},function(t,e,n){(function(e){for(var i=n(6),r="undefined"==typeof window?e:window,o=["moz","webkit"],a="AnimationFrame",s=r["request"+a],c=r["cancel"+a]||r["cancelRequest"+a],h=0;!s&&h<o.length;h++)s=r[o[h]+"Request"+a],c=r[o[h]+"Cancel"+a]||r[o[h]+"CancelRequest"+a];if(!s||!c){var u=0,f=0,l=[];s=function(t){if(0===l.length){var e=i(),n=Math.max(0,1e3/60-(e-u));u=n+e,setTimeout(function(){var t=l.slice(0);l.length=0;for(var e=0;e<t.length;e++)if(!t[e].cancelled)try{t[e].callback(u)}catch(t){setTimeout(function(){throw t},0)}},Math.round(n))}return l.push({handle:++f,callback:t,cancelled:!1}),f},c=function(t){for(var e=0;e<l.length;e++)l[e].handle===t&&(l[e].cancelled=!0)}}t.exports=function(t){return s.call(r,t)},t.exports.cancel=function(){c.apply(r,arguments)},t.exports.polyfill=function(t){t||(t=r),t.requestAnimationFrame=s,t.cancelAnimationFrame=c}}).call(this,n(0))},function(t,e,n){(function(e){(function(){var n,i,r,o,a,s;"undefined"!=typeof performance&&null!==performance&&performance.now?t.exports=function(){return performance.now()}:null!=e&&e.hrtime?(t.exports=function(){return(n()-a)/1e6},i=e.hrtime,o=(n=function(){var t;return 1e9*(t=i())[0]+t[1]})(),s=1e9*e.uptime(),a=o-s):Date.now?(t.exports=function(){return Date.now()-r},r=Date.now()):(t.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this)}).call(this,n(7))},function(t,e){var n,i,r=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(t){if(n===setTimeout)return setTimeout(t,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o}catch(t){n=o}try{i="function"==typeof clearTimeout?clearTimeout:a}catch(t){i=a}}();var c,h=[],u=!1,f=-1;function l(){u&&c&&(u=!1,c.length?h=c.concat(h):f=-1,h.length&&p())}function p(){if(!u){var t=s(l);u=!0;for(var e=h.length;e;){for(c=h,h=[];++f<e;)c&&c[f].run();f=-1,e=h.length}c=null,u=!1,function(t){if(i===clearTimeout)return clearTimeout(t);if((i===a||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(t);try{i(t)}catch(e){try{return i.call(null,t)}catch(e){return i.call(this,t)}}}(t)}}function d(t,e){this.fun=t,this.array=e}function y(){}r.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];h.push(new d(t,e)),1!==h.length||u||s(p)},d.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=y,r.addListener=y,r.once=y,r.off=y,r.removeListener=y,r.removeAllListeners=y,r.emit=y,r.prependListener=y,r.prependOnceListener=y,r.listeners=function(t){return[]},r.binding=function(t){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(t){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},function(t,e,n){(function(e){t.exports=e.performance&&e.performance.now?function(){return performance.now()}:Date.now||function(){return+new Date}}).call(this,n(0))},function(t,e,n){"use strict";var i=n(10),r=n(11),o=n(12);function a(t,e){var n={};return n[t]=e,n}function s(t){return t}function c(t,e){return t?i(t,e):""}function h(t){return t?" ":""}function u(t){return t?"\n":""}function f(t,e,n,i){for(var r=c(n,i+1),o=u(n),a=h(n),s="",f=0,l=t.length;f<l;f++)for(var p=0,d=e.length;p<d;p++)s+=r+t[f]+(0===t[f].indexOf("@")?" ":":")+a+e[p]+";"+o;return s}t.exports=function(t,e){function n(t,n){return o(t).reduce(function(t,i){return t.concat(e.property(i,n))},[])}function l(t,n){return o(t).reduce(function(t,i){return t.concat(e.value(i,n))},[])}function p(t,i){var r="";return Object.keys(t).forEach(function(s){var d,y=t[s];"string"==typeof(d=y)||Array.isArray(d)&&d.length&&"object"!=typeof d[0]?r+=f(n(s,y),l(y,s),e.indent,i-1):Array.isArray(y)?y.forEach(function(t){r+=p(a(s,t),i)}):function(t,n){return o(t).reduce(function(t,i){return t.concat(e.selector(i,n))},[])}(s,y).forEach(function(o){r+=function(t,e,n){return c(e,n)+t+h(e)+"{"+u(e)}(o,e.indent,i),Object.keys(y).forEach(function(o){var c,h=t[s][o];"object"!=typeof(c=h)||Array.isArray(c)?r+=f(n(o,h),l(h,o),e.indent,i):r+=p(a(o,h),i+1)}),r+=function(t,e){return c(t,e)+"}"+u(t)}(e.indent,i)})}),r}return"number"==typeof(e=r({indent:"",property:s,value:s,selector:s},e)).indent&&(e.indent=i(" ",e.indent)),o(t).map(function(t){return p(t,0)}).join(u(e.indent))}},function(t,e,n){"use strict";
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
*/var i=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var i={};return"abcdefghijklmnopqrst".split("").forEach(function(t){i[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},i)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var n,a,s=function(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}(t),c=1;c<arguments.length;c++){for(var h in n=Object(arguments[c]))r.call(n,h)&&(s[h]=n[h]);if(i){a=i(n);for(var u=0;u<a.length;u++)o.call(n,a[u])&&(s[a[u]]=n[a[u]])}}return s}},function(t,e,n){"use strict";t.exports=function(t){return null==t?[]:Array.isArray(t)?t:[t]}},,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(3),r=n(4),o=n(16);r(),(new(function(){function t(){this.canvas=new i.CanvasPlus,this.swarm=new o.Swarm(this.canvas),this.time=0,this.canvas.canvas.addEventListener("click",this.click.bind(this))}return t.prototype.start=function(){this.frameDone=performance.now(),this.loop()},t.prototype.loop=function(){this.canvas.reset();var t=performance.now()-this.frameDone;this.time+=t,this.swarm.draw(),this.swarm.next(this.time,t),requestAnimationFrame(this.loop.bind(this)),this.frameDone=performance.now()},t.prototype.click=function(t){this.swarm.addPlanet(t.clientX-this.canvas.width/2,t.clientY-this.canvas.height/2)},t}())).start()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),r=n(1),o=function(){function t(t){this.canvas=t,this.pixels=[],this.setSize=50,this.planets=[];for(var e=Math.min(this.canvas.width,this.canvas.height)/10*8,n=0;n<3;n++)this.addPlanet(Math.random()*e-e/2,Math.random()*e-e/2)}return t.prototype.addPlanet=function(t,e){var n=new i.Point(this.canvas.width,this.canvas.height);n.x=t,n.y=e,n.radius=10,n.speed=new r.Vector2D(0,0),this.planets.push(n)},t.prototype.add=function(t){for(var e=0;e<t;e++){var n=new i.Point(this.canvas.width,this.canvas.height),o=10*Math.random();n.speed=new r.Vector2D((Math.random()-.5)*o,(Math.random()-.5)*o),this.pixels.push(n)}},t.prototype.remove=function(t){for(var e=0;e<t;e++)this.pixels.shift()},t.prototype.draw=function(){this.start=performance.now();for(var t=0,e=this.pixels;t<e.length;t++){e[t].draw(this.canvas)}for(var n=0,i=this.planets;n<i.length;n++){i[n].draw(this.canvas)}},t.prototype.next=function(t,e){for(var n=0,i=this.pixels;n<i.length;n++){for(var r=i[n],o=0,a=this.planets;o<a.length;o++){var s=a[o];r.affectedBy(s,1)<10&&r.init(),r.applySpeed(e/1e3)}r.speed.length>2&&r.speed.scale(.9)}for(var c=0,h=this.planets;c<h.length;c++){s=h[c];for(var u=0,f=this.planets;u<f.length;u++){var l=f[u];s!=l&&s.affectedBy(l,10)}s.applySpeed(e/1e4)}for(var p in this.planets){s=this.planets[p];var d=Math.abs(s.x)>2*this.canvas.width,y=Math.abs(s.y)>2*this.canvas.height;(d||y)&&this.planets.splice(p,1)}this.adjustSwarmSize()},t.prototype.adjustSwarmSize=function(){var t=performance.now()-this.start;t<10&&this.add(this.setSize*=.95),t>16&&(this.remove(10),this.setSize/=2)},t}();e.Swarm=o}]);