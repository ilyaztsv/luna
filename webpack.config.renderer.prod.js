/**
 * Build config for electron renderer process
 */

import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import merge from 'webpack-merge'
import BabiliPlugin from 'babili-webpack-plugin'
import baseConfig from './webpack.config.base'
import CheckNodeEnv from './internals/scripts/CheckNodeEnv'

CheckNodeEnv('production')

export default merge.smart(baseConfig, {
	devtool: 'source-map',

	target: 'electron-renderer',

	entry: './app/index',

	output: {
		path: path.join(__dirname, 'app/dist'),
		publicPath: '../dist/',
		filename: 'renderer.prod.js'
	},

	module: {
		rules: [
			// Extract all .global.css to style.css as is
			{
				test: /\.global\.css$/,
				use: ExtractTextPlugin.extract({
					use: 'css-loader',
					fallback: 'style-loader'
				})
			},
			// Pipe other styles through css modules and append to style.css
			{
				test: /^((?!\.global).)*\.css$/,
				use: ExtractTextPlugin.extract({
					use: {
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[name]__[local]__[hash:base64:5]'
						}
					}
				})
			},
			// Common Image Formats
			{
				test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
				use: 'url-loader'
			}
		]
	},

	plugins: [
		/**
		 * Create global constants which can be configured at compile time.
		 *
		 * Useful for allowing different behaviour between development builds and
		 * release builds
		 *
		 * NODE_ENV should be production so that modules do not perform certain
		 * development checks
		 */
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		}),

		/**
		 * Babli is an ES6+ aware minifier based on the Babel toolchain (beta)
		 */
		new BabiliPlugin(),

		new ExtractTextPlugin('style.css'),

		new BundleAnalyzerPlugin({
			analyzerMode: process.env.OPEN_ANALYZER === 'true' ? 'server' : 'disabled',
			openAnalyzer: process.env.OPEN_ANALYZER === 'true'
		})
	]
})
