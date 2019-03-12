class Point {
    width: number;
    height: number;
    x: number;
    y: number;

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.init();
    }

    init() {
        this.x = Math.random() * 50;
        this.y = Math.random() * 50;
    }

    func(x, y, t) {
        return {
            x: x ^ 2 + x * t + y * t - x,
            y: -y ^ 2 - t ^ 2 - x * y - x * t - y * t - y,
        };
        // return {
        //     x: -y ^ 2 - t ^ 2 + t * x,
        //     y: y * t + x * y,
        // };
        return {
            x: x+t,
            y: y+t,
        };
    }

    next(imageData, t) {
        let {x, y} = this.func(this.x, this.y, t);
        //this.x = x;
        //this.y = y;
        if (Math.abs(this.x) > this.width) {
            this.init();
        }
        if (Math.abs(this.y) > this.height) {
            this.init();
        }
    }

}

class App {

    c;
    width: number;
    height: number;
    t: number = 1;
    pixels: Point[] = [];
    debug: HTMLDivElement;

    constructor() {
        let canvas = document.querySelector('canvas');
        this.width = canvas.width = canvas.clientWidth;
        this.height = canvas.height = canvas.clientHeight;
        this.c = canvas.getContext('2d');
        canvas.addEventListener('click', this.click.bind(this));
        this.debug = document.querySelector('div#debug');
    }

    setPixel(imageData, x, y, r, g, b, a) {
        let index = (x + y * imageData.width) * 4;
        imageData.data[index+0] = r;
        imageData.data[index+1] = g;
        imageData.data[index+2] = b;
        imageData.data[index+3] = a;
    }

    getPixel(imageData, x, y) {
        let index = (x + y * imageData.width) * 4;
        return {
            r: imageData.data[index+0],
            g: imageData.data[index+1],
            b: imageData.data[index+2],
            a: imageData.data[index+3],
        }
    }

    frame(imageData) {
        let speed = 30;
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let {r, g, b, a} = this.getPixel(imageData, x, y);
                this.setPixel(imageData, x, y, r-speed, g-speed, b-speed, a+1);
            }
        }
        for (let p of this.pixels) {
            this.setPixel(imageData, this.width/2+p.x, this.height/2+p.y, 255, 255, 255, 0);
            p.next(imageData, this.t);
        }
        let p = this.pixels[0];
        this.debug.innerHTML = `t: ${this.t}, p: ${p.x}, ${p.y}`;
        this.t += 0.00000000001;
    }

    start() {
        this.c.beginPath();
        this.c.color = '000000';
        this.c.fillRect(0, 0, this.width, this.height);
        this.c.stroke();
        for (let i = 0; i < 10; i++) {
            this.pixels.push(new Point(this.width, this.height));
        }
    }

    loop() {
        let imageData = this.c.getImageData(0, 0, this.width, this.height);
        this.frame(imageData);
        this.c.putImageData(imageData, 0, 0);
        setTimeout(this.loop.bind(this), 1);
    }

    click(e) {
        //console.log(e);
        let imageData = this.c.getImageData(0, 0, this.width, this.height);
        this.setPixel(imageData, e.clientX, e.clientY, 255, 255, 255, 255);
        this.c.putImageData(imageData, 0, 0);
    }

}

const app = new App();
app.start();
app.loop();