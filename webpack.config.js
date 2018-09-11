const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
	'axios',
	'react',
	'react-dom',
	'redux',
	'redux-thunk'
];
const devServer = {
	port: 3000,
	open: true,
	disableHostCheck: true,
	historyApiFallback: true,
	overlay: true,
	stats: 'minimal',
	inline: true,
	compress: true,
	contentBase: '/'
};

module.exports = {
	entry: {
		bundle: './src/index.js',
		vendor: VENDOR_LIBS,
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash].js'
	},
	module: {
		rules: [
			{
				use: 'babel-loader',
				test: /\.js$/,
				exclude: '/node_modules'
			},
			{
				use: [
					'style-loader',
					'css-loader',
				],
				test: /\.css$/,
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	],
	optimization: {
    runtimeChunk: "single", // enable "runtime" chunk
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
	},
	devServer
}