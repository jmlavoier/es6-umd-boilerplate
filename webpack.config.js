var webpack = require('webpack');

module.exports = {
    entry: {
    	main: "./src/js/main"
    },
    output: {
        path: __dirname + "/dist/js",
        filename: "bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jQuery",
            "windows.jQuery": "jquery"
        }), 
        new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }
		})
    ],
    module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				query: {
					plugins: ['transform-decorators-legacy'],
					presets: ['es2015']
				}
			}
		]
	}
}
