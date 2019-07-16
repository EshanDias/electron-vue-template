module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/main.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules')
  },
  externals: [
    function (context, request, callback) {
      if (request.match(/devtron|vue-devtools/)) {
        return callback(null, 'commonjs ' + request)
      }
      callback()
    }
  ]
};
