export class CanvasPlus {

	canvas: HTMLCanvasElement;
	width: number;
	height: number;
	c: CanvasRenderingContext2D;
	imageData;

	constructor() {
		this.canvas = document.querySelector('canvas');
		this.width = this.canvas.width = this.canvas.clientWidth;
		this.height = this.canvas.height = this.canvas.clientHeight;
		this.c = this.canvas.getContext('2d');

		this.c.fillStyle = '#000000';
		this.c.fillRect(0, 0, this.width, this.height);

		this.c.beginPath();
		this.c.fillStyle = '#ffffff';
		this.c.strokeStyle = '#ffffff';
		this.c.arc(this.width/10, this.height/10, this.width/10, 0, 2*Math.PI);
		this.c.stroke();
	}

	beforeFrame() {
		this.imageData = this.c.getImageData(0, 0, this.width, this.height);
	}

	afterFrame() {
		this.c.putImageData(this.imageData, 0, 0);
	}

	setPixel(x, y, r, g, b, a) {
		let index = (x + y * this.imageData.width) * 4;
		this.imageData.data[index+0] = r;
		this.imageData.data[index+1] = g;
		this.imageData.data[index+2] = b;
		this.imageData.data[index+3] = a;
	}

	getPixel(x, y) {
		let index = (x + y * this.imageData.width) * 4;
		return {
			r: this.imageData.data[index+0],
			g: this.imageData.data[index+1],
			b: this.imageData.data[index+2],
			a: this.imageData.data[index+3],
		}
	}

	fade(speed: number = 1) {
		this.beforeFrame();
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				let {r, g, b, a} = this.getPixel(x, y);
				this.setPixel(x, y, r-speed, g-speed, b-speed, a+1);
			}
		}
		this.afterFrame();
	}

	setParticle(x, y, r, g, b, a) {
		this.c.beginPath();
		this.c.fillStyle = `rgba(${r},${g},${b},${a})`;
		this.c.strokeStyle = `rgba(${r},${g},${b},${a})`;
		this.c.arc(this.width/2+x, this.height/2+y, 2, 0, 2*Math.PI);
		this.c.fill();
	}

}
