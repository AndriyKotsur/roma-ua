const merge = require("webpack-merge");
const base = require("../webpack.config.js");

var config={
  mode: "development",
  devtool: "source-map",
  stats: 'errors-warnings',
  target: 'node',
  watch:true,
  watchOptions: {
    aggregateTimeout: 100,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader','eslint-loader']
      }
    ]
  },
  plugins:[ ]
}

module.exports = merge(base, config)
