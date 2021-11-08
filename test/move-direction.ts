import {MoveDirection} from "../src/gravity-attractor/MoveDirection";

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
