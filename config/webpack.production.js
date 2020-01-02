const path = require('path');
const { commonPackConfig } = require('./webpack.common');
const mode = 'production';

module.exports = {
  ...commonPackConfig,
  entry: './packages/index.js',
  mode,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `tiny-jstool.js`,
    libraryTarget: 'umd',
  },
}
