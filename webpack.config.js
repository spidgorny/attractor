const path = require("path");
module.exports = {
	mode: 'development',
	entry: {
		main: './tsout/src/index.js',
		gravity: './tsout/src/gravity.js'
	},
	devServer: {
		port: 3000,
		host: "127.0.0.1",
		hot: true,
		liveReload: true,
		compress: true,
		http2: true,
		magicHtml: true,
		watchFiles: ['tsout/**/*.ts'],
		static: {
			directory: path.join(__dirname, '.'),
			serveIndex: {
				icons: true,
			},
			watch: true,
		},
		client: {
			overlay: true,
			progress: true,
		},
		devMiddleware: {
			index: true,
			mimeTypes: {'text/html': ['phtml']},
			publicPath: '/publicPathForDevServe',
			serverSideRender: true,
			writeToDisk: true,
		}
	}
};
