const path = require("path");
module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.ts',
		gravity: './src/gravity.ts',
		"three-box": './src/three-box.ts',
		"three-box-dots": './src/three-box-dots.ts',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	devServer: {
		port: 3000,
		host: "127.0.0.1",
		hot: true,
		liveReload: true,
		compress: true,
		http2: true,
		magicHtml: true,
		watchFiles: ['src/**/*.ts', 'test/**/*.ts'],
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
