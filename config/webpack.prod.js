const merge = require("webpack-merge");
const base = require("../webpack.config.js");


const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(base, {
  mode: "production",

  plugins: [
    new CleanWebpackPlugin(),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true,
        }
      }
    })
  ],
});
