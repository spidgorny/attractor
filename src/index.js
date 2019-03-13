"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("./App");
var createFps = require("fps-indicator");
createFps();
var app = new App_1.App();
app.start();
app.loop();
