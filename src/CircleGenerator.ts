import {CanvasPlus} from "./CanvasPlus";

export class CircleGenerator {

	x = 1;
	y = 0;
	r = 100;

	constructor() {
	}

	frame(t, dt) {
		this.x = this.r * Math.sin(t*5);
		this.y = this.r * Math.cos(t*5);
	}

	draw(canvas: CanvasPlus) {
		canvas.setParticle(this.x, this.y, 255, 255, 0, 1);
	}

	toString() {
		return `(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
	}

}
