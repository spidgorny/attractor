import {Point} from "./Point.js";
import {CanvasPlus} from "./CanvasPlus.js";
import {Vector2D} from "./Vector2D.js";
import {oncePerSecond} from "../lib/once-per-second";

export class Swarm {

	pixels: Point[] = [];
	start: number;
	setSize = 50;
	timeStretch = 0.01

	planets: Point[] = [];

	constructor(protected canvas: CanvasPlus) {
		let range = Math.min(this.canvas.width, this.canvas.height) / 10 * 8;
		for (let i = 0; i < 3; i++) {
			this.addPlanet(Math.random() * range - range / 2, Math.random() * range - range / 2);
		}
	}

	addPlanet(x, y) {
		const p1 = new Point(this.canvas.width, this.canvas.height);
		p1.x = x;
		p1.y = y;
		p1.radius = 10;
		p1.speed = new Vector2D(0, 0);
		this.planets.push(p1);
	}

	add(amount: number) {
		for (let i = 0; i < amount; i++) {
			let point = new Point(this.canvas.width, this.canvas.height);
			const force = Math.random() * 10;
			point.speed = new Vector2D((Math.random() - 0.5) * force, (Math.random() - 0.5) * force);
			this.pixels.push(point);
		}
	}

	remove(amount: number) {
		for (let i = 0; i < amount; i++) {
			this.pixels.shift();
		}
	}

	draw() {
		this.start = performance.now();
		for (let p of this.pixels) {
			p.draw(this.canvas);
		}
		for (let p of this.planets) {
			p.draw(this.canvas);
		}
	}

	next(t, dt) {
		for (let p of this.pixels) {
			// for (let g of this.pixels) {
			//     if (p == g) continue;
			//     p.affectedBy(g);
			// }
			for (let g of this.planets) {
				const distance = p.affectedBy(g, 1);
				if (distance < 10) {
					// fall to the planet
					p.init();
				}
				// wind
				// p.nudge(new Vector2D(1, 1).scale(0.01));
				p.applySpeed(dt * this.timeStretch);
			}
			if (p.speed.length > 5) {
				p.speed.scale(0.9);    // slow down
			}
		}

		// planets affecting each other
		for (let g of this.planets) {
			for (let g2 of this.planets) {
				if (g == g2) {
					continue;
				}
				g.affectedBy(g2, 10);
			}
			g.applySpeed(dt * this.timeStretch);
		}

		for (let sIndex in this.planets) {
			let gIndex = parseInt(sIndex);
			const g = this.planets[gIndex];
			const xFar = Math.abs(g.x) > this.canvas.width * 2;
			const yFar = Math.abs(g.y) > this.canvas.height * 2;
			if (xFar || yFar) {
				this.planets.splice(gIndex, 1);
			}
		}

		this.adjustSwarmSize();
	}

	adjustSwarmSize() {
		const dur = performance.now() - this.start;
		if (dur < 10) {
			this.setSize += 1
			this.add(1);
		}
		if (dur > 16) {
			this.setSize -= 1;
			this.remove(1);
		}

		// oncePerSecond(() =>
		// 	console.log(this.setSize, dur)
		// )
	}

}
