import {Vector2D} from "./Vector2D";

export class MoveDirection {
	current: Vector2D;
	destination: Vector2D;
	damping: 0.1;
	velocity: Vector2D;

	constructor() {
		this.current = new Vector2D();
		this.destination = this.current;  // don't move
		this.velocity = new Vector2D();
		this.loop();
	}

	loop() {
		this.velocity = this.current.direction(this.destination)
		this.current = this.destination.multiply(this.velocity.scale(this.damping));
	}

	offset() {
		return this.current.length;
	}

}
