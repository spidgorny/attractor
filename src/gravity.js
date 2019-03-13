"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CanvasPlus_1 = require("./CanvasPlus");
var createFps = require("fps-indicator");
var Swarm_1 = require("./Swarm");
createFps();
var Gravity = /** @class */ (function () {
    function Gravity() {
        this.canvas = new CanvasPlus_1.CanvasPlus();
        this.swarm = new Swarm_1.Swarm(this.canvas);
        this.time = 0;
    }
    Gravity.prototype.start = function () {
        this.frameDone = performance.now();
        this.loop();
    };
    Gravity.prototype.loop = function () {
        this.canvas.reset();
        var dt = performance.now() - this.frameDone;
        this.time += dt;
        this.swarm.draw();
        this.swarm.next(this.time, dt);
        requestAnimationFrame(this.loop.bind(this));
        this.frameDone = performance.now();
    };
    return Gravity;
}());
new Gravity().start();
