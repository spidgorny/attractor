import {oncePerSecond} from "../lib/once-per-second";

export class AvgFps {

	buffer = [];
	lastTime = new Date();
	frameDuration = 0;

	loop() {
		let dTime = new Date().getTime() - this.lastTime.getTime();
		this.buffer.push(dTime);
		oncePerSecond(() => {
			this.reset();
		});
		this.lastTime = new Date();
	}

	reset() {
		this.frameDuration = this.buffer.reduce((a, dur) => a + dur, 0) / this.buffer.length;
		this.buffer = [];
	}

	getFrameDuration() {
		return this.frameDuration.toFixed(2);
	}

	getFPS() {
		return (1000 / this.frameDuration).toFixed(2);
	}

}
