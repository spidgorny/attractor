import {Point} from "./Point";
import {CanvasPlus} from "./CanvasPlus";

export class Swarm {

    pixels: Point[] = [];
    start: number;
    setSize = 1;

    planets: Point[] = [];

    constructor(protected canvas: CanvasPlus) {
        const p1 = new Point(this.canvas.width/2, this.canvas.height/2);
        p1.radius = 10;
        console.log(p1);
        this.planets.push(p1);
    }

    add(amount: number) {
        for (let i = 0; i < amount; i++) {
            this.pixels.push(new Point(this.canvas.width, this.canvas.height));
        }
    }

    remove(amount: number) {
        for (let i = 0; i < amount; i++) {
            this.pixels.pop();
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
            for (let g of this.planets) {
                const distance = p.distanceTo(g);
                const cross = p.vector.direction(g.vector);
                p.nudge(cross.scale(0.001/Math.sqrt(distance)));
            }
            p.applySpeed(dt/1000);
        }

        const dur = performance.now() - this.start;
        if (dur < 12) {
            this.add(this.setSize *= 1.01);
        }
        if (dur > 16) {
            this.remove(10);
            // this.setSize /= 2;
        }
    }

}