const path = require("path");
const merge = require("webpack-merge");

module.exports = merge(require("./webpack.config")("development"), {
  mode: "development",
  module: {
    rules: [
    ]
  },
  output: {
    filename: "scripts/DocLAN-W.[name].js",
    chunkFilename: "scripts/DocLAN-W.[id].chunk.js",
    path: path.resolve(__dirname, "./build/dist")
  },
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "build/dist"),
    port: 3000,
    compress: true,
    publicPath: "/",
    stats: "minimal",
    open: true
  }
});
