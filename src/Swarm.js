"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = require("./Point");
var Vector2D_1 = require("./Vector2D");
var Swarm = /** @class */ (function () {
    function Swarm(canvas) {
        this.canvas = canvas;
        this.pixels = [];
        this.setSize = 50;
        this.planets = [];
        var range = Math.min(this.canvas.width, this.canvas.height) / 10 * 8;
        for (var i = 0; i < 3; i++) {
            this.addPlanet(Math.random() * range - range / 2, Math.random() * range - range / 2);
        }
    }
    Swarm.prototype.addPlanet = function (x, y) {
        var p1 = new Point_1.Point(this.canvas.width, this.canvas.height);
        p1.x = x;
        p1.y = y;
        p1.radius = 10;
        p1.speed = new Vector2D_1.Vector2D(0, 0);
        this.planets.push(p1);
    };
    Swarm.prototype.add = function (amount) {
        for (var i = 0; i < amount; i++) {
            var point = new Point_1.Point(this.canvas.width, this.canvas.height);
            var force = Math.random() * 10;
            point.speed = new Vector2D_1.Vector2D((Math.random() - 0.5) * force, (Math.random() - 0.5) * force);
            this.pixels.push(point);
        }
    };
    Swarm.prototype.remove = function (amount) {
        for (var i = 0; i < amount; i++) {
            this.pixels.shift();
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
            // for (let g of this.pixels) {
            //     if (p == g) continue;
            //     p.affectedBy(g);
            // }
            for (var _b = 0, _c = this.planets; _b < _c.length; _b++) {
                var g = _c[_b];
                var distance = p.affectedBy(g, 1);
                if (distance < 10) {
                    // fall to the planet
                    p.init();
                }
                // wind
                // p.nudge(new Vector2D(1, 1).scale(0.01));
                p.applySpeed(dt / 1000);
            }
            if (p.speed.length > 2) {
                p.speed.scale(0.9); // slow down
            }
        }
        // planets affecting each other
        for (var _d = 0, _e = this.planets; _d < _e.length; _d++) {
            var g = _e[_d];
            for (var _f = 0, _g = this.planets; _f < _g.length; _f++) {
                var g2 = _g[_f];
                if (g == g2) {
                    continue;
                }
                g.affectedBy(g2, 10);
            }
            g.applySpeed(dt / 10000);
        }
        for (var gIndex in this.planets) {
            var g = this.planets[gIndex];
            var xFar = Math.abs(g.x) > this.canvas.width * 2;
            var yFar = Math.abs(g.y) > this.canvas.height * 2;
            if (xFar || yFar) {
                this.planets.splice(gIndex, 1);
            }
        }
        this.adjustSwarmSize();
    };
    Swarm.prototype.adjustSwarmSize = function () {
        var dur = performance.now() - this.start;
        if (dur < 10) {
            this.add(this.setSize *= 0.95);
        }
        if (dur > 16) {
            this.remove(10);
            this.setSize /= 2;
        }
    };
    return Swarm;
}());
exports.Swarm = Swarm;
