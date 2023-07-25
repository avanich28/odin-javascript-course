const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    // print: "./src/print.js",
    // another: "./src/another.js",
  },
  // Track Error
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  plugins: [
    // Create html in dist and automatically set the bundle
    new HtmlWebpackPlugin({
      title: "Development",
      filename: "index.html",
      template: "./src/template.html",
    }),
  ],
  output: {
    // filename: "bundle.js",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        // CSS
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // Image
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        // Font
        test: /\.(woff|woff2|eot|ttf|otf)/i,
        type: "asset/resource",
      },
      {
        // Data
        test: /\.(csv|tsv)/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  },
  // optimization: {
  //   runtimeChunk: "single",
  // },
};
