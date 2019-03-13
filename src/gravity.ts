import {CanvasPlus} from "./CanvasPlus";
import * as createFps from "fps-indicator";
import {Swarm} from "./Swarm";

createFps();

class Gravity {

    canvas: CanvasPlus;
    swarm: Swarm;
    time: number;
    frameDone: number;

    constructor() {
        this.canvas = new CanvasPlus();
        this.swarm = new Swarm(this.canvas);
        this.time = 0;
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

        requestAnimationFrame(this.loop.bind(this));
        this.frameDone = performance.now();
    }

}

new Gravity().start();