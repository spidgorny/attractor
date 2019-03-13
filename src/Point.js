"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector2D_1 = require("./Vector2D");
var Point = /** @class */ (function () {
    function Point(width, height) {
        this.radius = 2;
        this.speed = new Vector2D_1.Vector2D(Math.random() * 1, Math.random() * 1);
        this.width = width;
        this.height = height;
        this.init();
    }
    Point.prototype.init = function () {
        var radius = this.width;
        this.x = this.x1 = Math.random() * radius - radius / 2;
        this.y = this.y1 = Math.random() * radius - radius / 2;
        this.z = this.z1 = Math.random() * radius - radius / 2;
        this.r = 128 + Math.random() * 128;
        this.g = 128 + Math.random() * 128;
        this.b = 128 + Math.random() * 128;
    };
    Point.prototype.draw = function (canvas) {
        var zoom = 1;
        canvas.setParticle(this.x / (10 / this.z) * zoom, this.y / (10 / this.z) * zoom, this.r, this.g, this.b, 1, this.radius);
    };
    Point.prototype.next = function (t, dt) {
        // let {x, y} = this.func1(this.x1, this.y1, t*100);
        // let {x, y} = this.func2(this.x1, this.y1, t*10);
        // let {x, y} = this.func3(this.x, this.y, t);
        // let {x, y, z} = this.funcL(this.x1, this.y1, this.z1, t);
        var _a = this.funcL(this.x, this.y, this.z, t / 10000), x = _a.x, y = _a.y, z = _a.z;
        this.x = x;
        this.y = y;
        this.z = z;
        if (Math.abs(this.x) > this.width) {
            this.init();
        }
        if (Math.abs(this.y) > this.height) {
            this.init();
        }
    };
    Point.prototype.func1 = function (x, y, t) {
        return {
            x: x ^ 2 + x * t + y * t - x,
            y: -y ^ 2 - t ^ 2 - x * y - x * t - y * t - y,
            z: 0,
        };
    };
    Point.prototype.func2 = function (x, y, t) {
        return {
            x: -y ^ 2 - t ^ 2 + t * x,
            y: y * t + x * y,
            z: 0,
        };
    };
    Point.prototype.func3 = function (x, y, t) {
        return {
            x: x + t,
            y: y + t,
            z: 0,
        };
    };
    Point.prototype.funcL = function (x, y, z, t) {
        var s = 10;
        var r = 28;
        var b = 8 / 3;
        return {
            x: x + s * (y - x) * t,
            y: y + (x * (r - z) - y) * t,
            z: z + (x * y - b * z) * t
        };
    };
    Object.defineProperty(Point.prototype, "vector", {
        get: function () {
            return new Vector2D_1.Vector2D(this.x, this.y);
        },
        enumerable: true,
        configurable: true
    });
    Point.prototype.distanceTo = function (p2) {
        return Math.sqrt((this.x - p2.x) + (this.y + p2.y));
    };
    Point.prototype.nudge = function (v) {
        this.speed = this.speed.add(v);
    };
    Point.prototype.applySpeed = function (dt) {
        var n = this.vector.add(this.speed.scale(dt));
        this.x = n.x;
        this.y = n.y;
    };
    return Point;
}());
exports.Point = Point;
