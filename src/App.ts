import {Point} from "./Point.js";
import {CanvasPlus} from "./CanvasPlus.js";
import {CircleGenerator} from "./CircleGenerator.js";

export class App {

	c: CanvasPlus;
	t: number = 1;
	prevT: number;
	pixels: Point[] = [];
	debug: HTMLDivElement;
	circle: CircleGenerator;

	constructor() {
		this.c = new CanvasPlus();
		this.c.canvas.addEventListener('click', this.click.bind(this));
		this.debug = document.querySelector('div#debug');
		// this.circle = new CircleGenerator();
	}

	start() {
		for (let i = 0; i < 1000; i++) {
			this.pixels.push(new Point(this.c.width, this.c.height));
		}
	}

	frame(canvas: CanvasPlus) {
		const dt = this.t - this.prevT;
		// this.c.fade(5);
		for (let p of this.pixels) {
			p.draw3D(canvas);
			p.next(this.t, dt);
		}
		// let p = this.pixels[0];
		// this.debug.innerHTML = `t: ${this.t}<br />${this.circle}`;
	}

	loop() {
		const startTime = new Date();
		// this.c.beforeFrame();
		this.c.reset();
		this.frame(this.c);
		// this.circle.draw(this.c);
		// this.c.afterFrame();

		// this.circle.frame(this.t, this.t - this.prevT);

		this.prevT = this.t;
		this.t += 0.01;

		let dTime = new Date().getTime() - startTime.getTime();
		this.debug.innerText = dTime.toFixed(2) + 'ms ' + (1000 / dTime).toFixed(2) + ' fps';
		// setTimeout(this.loop.bind(this), 1);
		requestAnimationFrame(this.loop.bind(this));
	}

	click(e) {
		//console.log(e);
		this.c.setParticle(e.clientX, e.clientY, 255, 255, 255, 1);
	}

}
