const FileManagerPlugin = require('filemanager-webpack-plugin');
const path = require("path");
const srcDir = "../src/";
const distDir = "../dist/";
let glob = require("glob");

module.exports = {
  entry: glob
        .sync(path.join(__dirname, srcDir + "*.ts"))
        .reduce(function (obj, el) {
            obj[path.parse(el).name] = el;
            return obj;
        }, {}),

  output: {
    path: path.join(__dirname, distDir + "js"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
        name: "vendor",
        chunks: "initial",
    },
  },
  module: {
    rules: [
        {
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/,
        },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [{ source: path.join(__dirname, srcDir + "manifest.json"), destination: path.join(__dirname, distDir + "manifest.json")}],
          delete: [path.join(__dirname, distDir +  "background.js")],
          move: [{ source: path.join(__dirname, distDir + "js/background.js"), destination: path.join(__dirname, distDir +  "background.js")}]
        }
      }
    })
  ]
};