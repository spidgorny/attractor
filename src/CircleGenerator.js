"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CircleGenerator = /** @class */ (function () {
    function CircleGenerator() {
        this.x = 1;
        this.y = 0;
        this.r = 100;
    }
    CircleGenerator.prototype.frame = function (t, dt) {
        this.x = this.r * Math.sin(t * 3);
        this.y = this.r * Math.cos(t * 3);
    };
    CircleGenerator.prototype.draw = function (canvas) {
        canvas.setParticle(this.x, this.y, 255, 255, 0, 1);
    };
    CircleGenerator.prototype.toString = function () {
        return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ")";
    };
    return CircleGenerator;
}());
exports.CircleGenerator = CircleGenerator;
