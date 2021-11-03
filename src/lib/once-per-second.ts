let lastSecond = Math.round(new Date().getTime() / 1000);

export function oncePerSecond(callback) {
	const newSecond = Math.round(new Date().getTime() / 1000);
	if (newSecond !== this.lastSecond) {
		callback();
		this.lastSecond = newSecond;
	}
}
