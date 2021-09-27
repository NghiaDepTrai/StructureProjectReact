const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = env => {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);

  // Create the fallback path (the production .env)
  const basePath = currentPath + "/.env";

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + "." + env;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({
    path: finalPath
  }).parsed;
  console.log(finalPath)
  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {

    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    context: path.resolve(__dirname),
    entry: {
      vendor: ["react", "react-dom", "react-redux", "react-router", "react-router-dom", "redux", "redux-saga", "babel-polyfill"],
      app: "./src/index.tsx"
    },
    output: {
      publicPath: "/"
    },
    resolve: {
      extensions: [".webpack.js", ".web.js", ".mjs", ".json", ".js", ".jsx", ".ts", ".tsx"],
      modules: [path.resolve(__dirname, "./src"), "./node_modules"]
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          }
        }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: "file-loader"
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf|woff|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/"
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      }
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["./build/*.*"]
      }),
      new CopyWebpackPlugin([{
        from: "./public/index.html"
      },
      {
        from: "./src/assets"
      },
      ]),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html"),
        title: "DocLAN-W",
        favicon: "./public/favicon.ico"
      }),
      new webpack.DefinePlugin(envKeys)
    ]
  };
};