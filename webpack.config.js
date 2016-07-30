var webpack = require('webpack');

module.exports = {
    entry: {
    	main: "./src/js/index"
    },
    output: {
        path: __dirname + "/js",
        filename: "bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jQuery",
            "windows.jQuery": "jquery"
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
