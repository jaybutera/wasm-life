const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  devServer: {
    host: '0.0.0.0'
  },
  entry: "./bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bootstrap.js",
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin(['index.html'])
  ],
};
