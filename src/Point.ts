export class Point {
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

	next(t: number) {
		let {x, y} = this.func(this.x, this.y, t);
		this.x = x;
		this.y = y;
		if (Math.abs(this.x) > this.width) {
			this.init();
		}
		if (Math.abs(this.y) > this.height) {
			this.init();
		}
	}

}

