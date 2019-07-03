const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Path = require('path');

module.exports = {
  // Put your normal webpack config below here
  // entry: Path.resolve(__dirname, './src/renderer.js'),
  module: {
    rules: require('./webpack.rules')
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
};
