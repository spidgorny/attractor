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
    Point.prototype.next = function (imageData, t) {
        var _a = this.func(this.x, this.y, t), x = _a.x, y = _a.y;
        //this.x = x;
        //this.y = y;
        if (Math.abs(this.x) > this.width) {
            this.init();
        }
        if (Math.abs(this.y) > this.height) {
            this.init();
        }
    };
    return Point;
}());
var App = /** @class */ (function () {
    function App() {
        this.t = 1;
        this.pixels = [];
        var canvas = document.querySelector('canvas');
        this.width = canvas.width = canvas.clientWidth;
        this.height = canvas.height = canvas.clientHeight;
        this.c = canvas.getContext('2d');
        canvas.addEventListener('click', this.click.bind(this));
        this.debug = document.querySelector('div#debug');
    }
    App.prototype.setPixel = function (imageData, x, y, r, g, b, a) {
        var index = (x + y * imageData.width) * 4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    };
    App.prototype.getPixel = function (imageData, x, y) {
        var index = (x + y * imageData.width) * 4;
        return {
            r: imageData.data[index + 0],
            g: imageData.data[index + 1],
            b: imageData.data[index + 2],
            a: imageData.data[index + 3],
        };
    };
    App.prototype.frame = function (imageData) {
        var speed = 30;
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                var _a = this.getPixel(imageData, x, y), r = _a.r, g = _a.g, b = _a.b, a = _a.a;
                this.setPixel(imageData, x, y, r - speed, g - speed, b - speed, a + 1);
            }
        }
        for (var _i = 0, _b = this.pixels; _i < _b.length; _i++) {
            var p_1 = _b[_i];
            this.setPixel(imageData, this.width / 2 + p_1.x, this.height / 2 + p_1.y, 255, 255, 255, 0);
            p_1.next(imageData, this.t);
        }
        var p = this.pixels[0];
        this.debug.innerHTML = "t: " + this.t + ", p: " + p.x + ", " + p.y;
        this.t += 0.00000000001;
    };
    App.prototype.start = function () {
        this.c.beginPath();
        this.c.color = '000000';
        this.c.fillRect(0, 0, this.width, this.height);
        this.c.stroke();
        for (var i = 0; i < 10; i++) {
            this.pixels.push(new Point(this.width, this.height));
        }
    };
    App.prototype.loop = function () {
        var imageData = this.c.getImageData(0, 0, this.width, this.height);
        this.frame(imageData);
        this.c.putImageData(imageData, 0, 0);
        setTimeout(this.loop.bind(this), 1);
    };
    App.prototype.click = function (e) {
        //console.log(e);
        var imageData = this.c.getImageData(0, 0, this.width, this.height);
        this.setPixel(imageData, e.clientX, e.clientY, 255, 255, 255, 255);
        this.c.putImageData(imageData, 0, 0);
    };
    return App;
}());
var app = new App();
app.start();
app.loop();
