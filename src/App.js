"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = require("./Point");
var CanvasPlus_1 = require("./CanvasPlus");
var App = /** @class */ (function () {
    function App() {
        this.t = 1;
        this.pixels = [];
        this.c = new CanvasPlus_1.CanvasPlus();
        this.c.canvas.addEventListener('click', this.click.bind(this));
        this.debug = document.querySelector('div#debug');
        // this.circle = new CircleGenerator();
    }
    App.prototype.start = function () {
        for (var i = 0; i < 2000; i++) {
            this.pixels.push(new Point_1.Point(this.c.width, this.c.height));
        }
    };
    App.prototype.frame = function (canvas) {
        var dt = this.t - this.prevT;
        // this.c.fade(5);
        for (var _i = 0, _a = this.pixels; _i < _a.length; _i++) {
            var p = _a[_i];
            p.draw(canvas);
            p.next(this.t, dt);
        }
        // let p = this.pixels[0];
        // this.debug.innerHTML = `t: ${this.t}<br />${this.circle}`;
    };
    App.prototype.loop = function () {
        var startTime = new Date();
        // this.c.beforeFrame();
        this.c.reset();
        this.frame(this.c);
        // this.circle.draw(this.c);
        // this.c.afterFrame();
        // this.circle.frame(this.t, this.t - this.prevT);
        this.prevT = this.t;
        this.t += 0.01;
        this.debug.innerText = (new Date().getTime() - startTime.getTime()).toFixed(2) + 'ms';
        // setTimeout(this.loop.bind(this), 1);
        requestAnimationFrame(this.loop.bind(this));
    };
    App.prototype.click = function (e) {
        //console.log(e);
        this.c.setParticle(e.clientX, e.clientY, 255, 255, 255, 1);
    };
    return App;
}());
exports.App = App;
