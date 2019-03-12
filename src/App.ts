import {Point} from "./Point";
import {CanvasPlus} from "./CanvasPlus";
import {CircleGenerator} from "./CircleGenerator";

export class App {

	c: CanvasPlus;
	width: number;
	height: number;
	t: number = 1;
	pixels: Point[] = [];
	debug: HTMLDivElement;
	circle: CircleGenerator;

	constructor() {
		this.c = new CanvasPlus();
		this.c.canvas.addEventListener('click', this.click.bind(this));
		this.debug = document.querySelector('div#debug');
		this.circle = new CircleGenerator();
	}

	frame() {
		let speed = 30;
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				let {r, g, b, a} = this.c.getPixel(x, y);
				this.c.setPixel(x, y, r-speed, g-speed, b-speed, a+1);
			}
		}
		for (let p of this.pixels) {
			this.c.setPixel(this.width/2+p.x, this.height/2+p.y, 255, 255, 255, 0);
			p.next(this.t);
		}
		let p = this.pixels[0];
		this.debug.innerHTML = `t: ${this.t}, p: ${p.x}, ${p.y}`;
	}

	start() {
		for (let i = 0; i < 10; i++) {
			this.pixels.push(new Point(this.width, this.height));
		}
	}

	loop() {
		this.c.beforeFrame();
		this.frame();
		this.circle.draw(this.c);
		this.c.afterFrame();

		this.circle.frame(this.t);

		this.t += 0.000000001;

		setTimeout(this.loop.bind(this), 1);
	}

	click(e) {
		//console.log(e);
		this.c.setPixel(e.clientX, e.clientY, 255, 255, 255, 255);
	}

}
