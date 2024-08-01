const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    allowedHosts: "auto",
    static: {
      directory: path.join(__dirname),
    },
    compress: false,
    port: 3000,
  },
  mode: "development",
};
