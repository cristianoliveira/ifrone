const path = require('path');

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'iphrame.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'iphrame',
    libraryTarget: 'umd',
    globalObject: 'this'
    // auxiliaryComment: 'Test Comment'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
