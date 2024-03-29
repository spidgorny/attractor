import {CanvasPlus} from "./CanvasPlus";
import {Swarm} from "./Swarm";
import {AvgFps} from "./avg-fps";
import {oncePerSecond} from "../lib/once-per-second";

export class Gravity {

	canvas: CanvasPlus;
	swarm: Swarm;
	time: number;
	frameDone: number;
	debug: HTMLDivElement;
	fps: AvgFps;

	constructor() {
		this.canvas = new CanvasPlus();
		this.swarm = new Swarm(this.canvas);
		this.time = 0;
		this.canvas.canvas.addEventListener('click', this.click.bind(this));
		this.debug = document.querySelector('div#debug');
		this.fps = new AvgFps();
	}

	start() {
		this.frameDone = performance.now();
		this.loop();
	}

	loop() {
		this.canvas.reset();
		let dt = performance.now() - this.frameDone;
		this.time += dt;
		this.swarm.draw();
		this.swarm.next(this.time, dt);

		this.fps.loop();
		oncePerSecond(() => {
			console.log(this.fps.getFPS() + ' fps');
			this.debug.innerText = this.fps.getFrameDuration() + 'ms ' + this.fps.getFPS() + ' fps';
		});

		requestAnimationFrame(this.loop.bind(this));
		this.frameDone = performance.now();
	}

	click(e) {
		this.swarm.addPlanet(e.clientX - this.canvas.width / 2, e.clientY - this.canvas.height / 2);
	}

}
