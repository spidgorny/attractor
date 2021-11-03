let startTime = new Date();

export function runDuration() {
	if (process) {
		return process.uptime();
	}

	return (new Date().getTime() - startTime.getTime()) / 1000;
}
