const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path')


const isDevMode = process.env.NODE_ENV === 'development'

module.exports = {
  // Put your normal webpack config below here
  // entry: Path.resolve(__dirname, './src/renderer.js'),
  module: {
    rules: require('./webpack.rules')
  },
  node: {
    __dirname: isDevMode,
    __filename: isDevMode,
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
      '@': path.join(__dirname, './src/'),
      src: path.join(__dirname, './src/'),
      icons: path.join(__dirname, '../_icons/'),
    },
    extensions: ['.ts', '.js', '.vue', '.json'],
  },
  target: 'electron-renderer',
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
};
