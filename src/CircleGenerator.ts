import {CanvasPlus} from "./CanvasPlus";

export class CircleGenerator {

	x = 1;
	y = 0;

	constructor() {
	}

	frame(t) {
		this.x = Math.sin(t);
		this.y = Math.cos(t);
	}

	draw(canvas: CanvasPlus) {
		canvas.setPixel(this.x, this.y, 255, 255, 0, 0);
	}

}
