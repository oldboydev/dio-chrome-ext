const webbpack = require('webpack');
const path = require("path");
const srcDir = "../src/";
let glob = require("glob");

module.exports = {
  entry: glob
        .sync(path.join(__dirname, srcDir + "*.ts"))
        .reduce(function (obj, el) {
            obj[path.parse(el).name] = el;
            return obj;
        }, {}),

  output: {
    path: path.join(__dirname, "../dist/js"),
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
  }
};