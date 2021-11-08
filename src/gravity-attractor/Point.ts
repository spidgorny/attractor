import {CanvasPlus} from "./CanvasPlus";
import {Vector2D} from "./Vector2D";

export class Point {
	width: number;
	height: number;

	radius = 2;

	x1: number;
	y1: number;
	z1: number;

	x: number;
	y: number;
	z: number;

	r: number;
	g: number;
	b: number;

	speed: Vector2D = new Vector2D(Math.random() * 1, Math.random() * 1);

	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.init();
	}

	init() {
		const radius = this.width;
		this.x = this.x1 = Math.random() * radius - radius / 2;
		this.y = this.y1 = Math.random() * radius - radius / 2;
		this.z = this.z1 = Math.random() * radius - radius / 2;
		// not too dark
		this.r = 128 + Math.random() * 128;
		this.g = 128 + Math.random() * 128;
		this.b = 128 + Math.random() * 128;
	}

	draw(canvas: CanvasPlus) {
		canvas.setParticle(
			this.x,
			this.y,
			this.r, this.g, this.b, 1,
			this.radius
		);
	}

	draw3D(canvas: CanvasPlus) {
		const zoom = 1;
		canvas.setParticle(
			this.x / (10 / this.z) * zoom,
			this.y / (10 / this.z) * zoom,
			this.r, this.g, this.b, 1, this.radius
		);
	}

	next(t: number, dt: number) {
		// let {x, y} = this.func1(this.x1, this.y1, t*100);
		// let {x, y} = this.func2(this.x1, this.y1, t*10);
		// let {x, y} = this.func3(this.x, this.y, t);
		// let {x, y, z} = this.funcL(this.x1, this.y1, this.z1, t);
		let {x, y, z} = this.funcL(this.x, this.y, this.z, t / 10000);
		this.x = x;
		this.y = y;
		this.z = z;
		if (Math.abs(this.x) > this.width) {
			this.init();
		}
		if (Math.abs(this.y) > this.height) {
			this.init();
		}
	}

	func1(x, y, t) {
		return {
			x: x ^ 2 + x * t + y * t - x,
			y: -y ^ 2 - t ^ 2 - x * y - x * t - y * t - y,
			z: 0,
		};
	}

	func2(x, y, t) {
		return {
			x: -y ^ 2 - t ^ 2 + t * x,
			y: y * t + x * y,
			z: 0,
		};
	}

	func3(x, y, t) {
		return {
			x: x + t,
			y: y + t,
			z: 0,
		};
	}

	funcL(x, y, z, t) {
		const s = 10;
		const r = 28;
		const b = 8 / 3;
		return {
			x: x + s * (y - x) * t,
			y: y + (x * (r - z) - y) * t,
			z: z + (x * y - b * z) * t
		};
	}

	get vector() {
		return new Vector2D(this.x, this.y);
	}

	distanceTo(p2: Point) {
		return Math.sqrt(Math.pow(this.x - p2.x, 2) + Math.pow(this.y - p2.y, 2));
	}

	nudge(v: Vector2D) {
		this.speed = this.speed.add(v);
	}

	applySpeed(dt) {
		const n = this.vector.add(this.speed.scale(dt));
		this.x = n.x;
		this.y = n.y;
	}

	affectedBy(g: Point, gravity = 1) {
		let distance = this.distanceTo(g);
		const cross = this.vector.direction(g.vector);
		// p.nudge(cross.scale(1));
		// don't fly too fast
		if (distance < g.radius) {
			distance /= 10;
		}
		this.nudge(cross.unit.scale(gravity / Math.sqrt(distance)));
		return distance;
	}
}

