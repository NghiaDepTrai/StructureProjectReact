const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const time = new Date().getTime();
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = merge(require("./webpack.config")("production"), {
  mode: "production",
  module: {
    rules: [
    ]
  },
  output: {
    filename: "scripts/DocLAN-W.[name].[hash]" + time + ".bundle.js",
    sourceMapFilename: "scripts/DocLAN-W.[name].[chunkhash]" + time + ".bundle.map",
    chunkFilename: "scripts/DocLAN-W.[id].[chunkhash]" + time + ".chunk.js",
    path: path.resolve(__dirname, "./build/dist")
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new BundleAnalyzerPlugin(),
    new CompressionPlugin({
      test: /\.(css|js|html|scss|ts|tsx|svg)$/
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
  ]
});
