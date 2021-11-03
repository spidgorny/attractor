import {CanvasPlus} from "./CanvasPlus";
import * as createFps from "fps-indicator";
import {Swarm} from "./Swarm";

// createFps();

class Gravity {

	canvas: CanvasPlus;
	swarm: Swarm;
	time: number;
	frameDone: number;
	debug: HTMLDivElement;

	constructor() {
		this.canvas = new CanvasPlus();
		this.swarm = new Swarm(this.canvas);
		this.time = 0;
		this.canvas.canvas.addEventListener('click', this.click.bind(this));
		this.debug = document.querySelector('div#debug');
	}

	start() {
		this.frameDone = performance.now();
		this.loop();
	}

	loop() {
		const startTime = new Date();
		this.canvas.reset();
		let dt = performance.now() - this.frameDone;
		this.time += dt;
		this.swarm.draw();
		this.swarm.next(this.time, dt);


		let dTime = new Date().getTime() - startTime.getTime();
		this.debug.innerText = dTime.toFixed(2) + 'ms ' + (1000 / dTime).toFixed(2) + ' fps';

		requestAnimationFrame(this.loop.bind(this));
		this.frameDone = performance.now();
	}

	click(e) {
		this.swarm.addPlanet(e.clientX - this.canvas.width / 2, e.clientY - this.canvas.height / 2);
	}

}

new Gravity().start();
