import {App} from './App';
import * as createFps from "fps-indicator";

createFps();

const app = new App();
app.start();
app.loop();

