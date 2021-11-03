import {AvgFps} from "../src/avg-fps";
import {runDuration} from "../src/lib/run-duration";
import {sleep} from "../src/lib/sleep";

// must be around 100ms, 10 fps
async function testMe() {
	const fps = new AvgFps();
	while (runDuration() < 15) {
		fps.loop();
		console.log(runDuration(), fps.getFrameDuration(), fps.getFPS());
		await sleep(100);
	}
}

testMe();
