"use strict";

var webpack = require("webpack");
var path = require("path");

var plugins = [
	new webpack.DefinePlugin({
		"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
	}),
	new webpack.optimize.OccurenceOrderPlugin()
];

//	"babel-plugin-transform-es2015-destructuring", 
//	"babel-plugin-transform-es2015-parameters",
//	"babel-plugin-transform-object-rest-spread"


if (process.env.NODE_ENV === "production") {
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				screw_ie8: true,
				warnings: false
			}
		})
	);
}

module.exports = {
	module: {
		loaders: [
			{ test: /\.(js|jsx)$/, loader: "babel-loader", exclude: /node_modules/ ,
				query: { presets: ['es2015', 'react'] }
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]',
			},
		]
	},
	entry: {
		app:['babel-polyfill', "./src/index.js"]
	},
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'public'),
		public:'/public'
	},
	debug: true,
	devtool: "eval-source-map",
	plugins: plugins,
	resolve: {
		// Alias redux-api for using version from source instead of npm
		/*alias: {
      "redux-api/lib": path.resolve(
	path.join(__dirname, "..", "..", "src")
      ),
      "redux-api": path.resolve(
	path.join(__dirname, "..", "..", "src")
      )
    },*/
		extensions: ["", ".js", ".jsx"]
	}
};
