"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CanvasPlus = /** @class */ (function () {
    function CanvasPlus() {
        this.canvas = document.querySelector('canvas');
        this.width = this.canvas.width = this.canvas.clientWidth;
        this.height = this.canvas.height = this.canvas.clientHeight;
        this.c = this.canvas.getContext('2d');
        this.reset();
    }
    CanvasPlus.prototype.reset = function () {
        this.c.fillStyle = '#000000';
        this.c.fillRect(0, 0, this.width, this.height);
    };
    CanvasPlus.prototype.drawTestCircle = function () {
        this.c.beginPath();
        this.c.fillStyle = '#ffffff';
        this.c.strokeStyle = '#ffffff';
        this.c.arc(this.width / 10, this.height / 10, this.width / 10, 0, 2 * Math.PI);
        this.c.stroke();
    };
    CanvasPlus.prototype.beforeFrame = function () {
        this.imageData = this.c.getImageData(0, 0, this.width, this.height);
    };
    CanvasPlus.prototype.afterFrame = function () {
        this.c.putImageData(this.imageData, 0, 0);
    };
    CanvasPlus.prototype.setPixel = function (x, y, r, g, b, a) {
        var index = (x + y * this.imageData.width) * 4;
        this.imageData.data[index + 0] = r;
        this.imageData.data[index + 1] = g;
        this.imageData.data[index + 2] = b;
        this.imageData.data[index + 3] = a;
    };
    CanvasPlus.prototype.getPixel = function (x, y) {
        var index = (x + y * this.imageData.width) * 4;
        return {
            r: this.imageData.data[index + 0],
            g: this.imageData.data[index + 1],
            b: this.imageData.data[index + 2],
            a: this.imageData.data[index + 3],
        };
    };
    CanvasPlus.prototype.fade = function (speed) {
        if (speed === void 0) { speed = 1; }
        this.beforeFrame();
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                var _a = this.getPixel(x, y), r = _a.r, g = _a.g, b = _a.b, a = _a.a;
                this.setPixel(x, y, r - speed, g - speed, b - speed, a + 1);
            }
        }
        this.afterFrame();
    };
    CanvasPlus.prototype.setParticle = function (x, y, r, g, b, a, radius) {
        if (radius === void 0) { radius = 2; }
        this.c.beginPath();
        this.c.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        this.c.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        this.c.arc(this.width / 2 + x, this.height / 2 + y, radius, 0, 2 * Math.PI);
        this.c.fill();
    };
    return CanvasPlus;
}());
exports.CanvasPlus = CanvasPlus;
