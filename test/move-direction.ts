import {MoveDirection} from "../src/MoveDirection.js";

function testMe() {
	const md = new MoveDirection();
	md.destination.set(100, 100);
	console.log('init', md.offset())
	while (md.offset() > 1) {
		md.loop();
		console.log(this.current);
	}
}

testMe();
