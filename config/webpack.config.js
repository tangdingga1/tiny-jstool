const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { commonPackConfig, version } = require('./webpack.common');
const mode = 'development';

module.exports = {
  ...commonPackConfig,
  entry: './packages/entry.js',
  mode,
  devtool: "source-map",
  devServer: {
    contentBase: '../dist',
    port: 8080,
    hot: false,
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `tiny-jstool-${version}-${mode}.js`,
  },
  plugins: [new HtmlWebpackPlugin({ title: 'sand-box-html' })],
}
