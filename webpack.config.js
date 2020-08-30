const path = require('path');

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'ifrone.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ifrone',
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
