// https://evanw.github.io/lightgl.js/docs/vector.html
// http://victorjs.org/#cross

export class Vector2D {
    constructor(public x = 0, public y = 0) {
    }

    add(v: Vector2D) {
        if (v instanceof Vector2D) return new Vector2D(this.x + v.x, this.y + v.y);
        else return new Vector2D(this.x + v, this.y + v);
    }

    multiply(v: Vector2D) {
        return new Vector2D(this.x * v.x, this.y * v.y);
    }

    scale(v: number) {
        return new Vector2D(this.x * v, this.y * v);
    }

    direction(vec2: Vector2D) {
        return new Vector2D(vec2.x - this.x, vec2.y - this.y);
    }
}