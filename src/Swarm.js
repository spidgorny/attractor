"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = require("./Point");
var Swarm = /** @class */ (function () {
    function Swarm(canvas) {
        this.canvas = canvas;
        this.pixels = [];
        this.setSize = 1;
        this.planets = [];
        var p1 = new Point_1.Point(this.canvas.width / 2, this.canvas.height / 2);
        p1.radius = 10;
        console.log(p1);
        this.planets.push(p1);
    }
    Swarm.prototype.add = function (amount) {
        for (var i = 0; i < amount; i++) {
            this.pixels.push(new Point_1.Point(this.canvas.width, this.canvas.height));
        }
    };
    Swarm.prototype.remove = function (amount) {
        for (var i = 0; i < amount; i++) {
            this.pixels.pop();
        }
    };
    Swarm.prototype.draw = function () {
        this.start = performance.now();
        for (var _i = 0, _a = this.pixels; _i < _a.length; _i++) {
            var p = _a[_i];
            p.draw(this.canvas);
        }
        for (var _b = 0, _c = this.planets; _b < _c.length; _b++) {
            var p = _c[_b];
            p.draw(this.canvas);
        }
    };
    Swarm.prototype.next = function (t, dt) {
        for (var _i = 0, _a = this.pixels; _i < _a.length; _i++) {
            var p = _a[_i];
            for (var _b = 0, _c = this.planets; _b < _c.length; _b++) {
                var g = _c[_b];
                var distance = p.distanceTo(g);
                var cross = p.vector.direction(g.vector);
                p.nudge(cross.scale(0.001 / Math.sqrt(distance)));
            }
            p.applySpeed(dt / 1000);
        }
        var dur = performance.now() - this.start;
        if (dur < 12) {
            this.add(this.setSize *= 1.01);
        }
        if (dur > 16) {
            this.remove(10);
            // this.setSize /= 2;
        }
    };
    return Swarm;
}());
exports.Swarm = Swarm;
