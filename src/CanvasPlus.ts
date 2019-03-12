export class CanvasPlus {

	canvas: HTMLCanvasElement;
	width: number;
	height: number;
	c;
	imageData;

	constructor() {
		this.canvas = document.querySelector('canvas');
		this.width = this.canvas.width = this.canvas.clientWidth;
		this.height = this.canvas.height = this.canvas.clientHeight;
		this.c = this.canvas.getContext('2d');

		this.c.beginPath();
		this.c.color = '000000';
		this.c.fillRect(0, 0, this.width, this.height);
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

}
