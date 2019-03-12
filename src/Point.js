"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(width, height) {
        this.width = width;
        this.height = height;
        this.init();
    }
    Point.prototype.init = function () {
        this.x = Math.random() * 50;
        this.y = Math.random() * 50;
    };
    Point.prototype.func = function (x, y, t) {
        return {
            x: x ^ 2 + x * t + y * t - x,
            y: -y ^ 2 - t ^ 2 - x * y - x * t - y * t - y,
        };
        // return {
        //     x: -y ^ 2 - t ^ 2 + t * x,
        //     y: y * t + x * y,
        // };
        return {
            x: x + t,
            y: y + t,
        };
    };
    Point.prototype.draw = function (canvas) {
        canvas.setParticle(canvas.width / 2 + this.x, canvas.height / 2 + this.y, 255, 255, 255, 1);
    };
    Point.prototype.next = function (t) {
        var _a = this.func(this.x, this.y, t), x = _a.x, y = _a.y;
        this.x = x;
        this.y = y;
        if (Math.abs(this.x) > this.width) {
            this.init();
        }
        if (Math.abs(this.y) > this.height) {
            this.init();
        }
    };
    return Point;
}());
exports.Point = Point;
