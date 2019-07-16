const VueTemplateCompiler = require('vue-template-compiler');

module.exports = [
  {
    test: /\.(j|t)s$/,
    use: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.vue$/,
    use: {
      loader: 'vue-loader',
      options: {
        loaders: {
          sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
        },
      },
    },
  },
  {
    test: /\.s(c|a)ss$/,
    use: [
      {
        loader: 'vue-style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'sass-loader',
        options: {
          // eslint-disable-next-line
          implementation: require('sass'),
        },
      },
    ],
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.(png|jpe?g|gif|tif?f|bmp|webp|svg)(\?.*)?$/,
    use: {
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'imgs/[name]--[folder].[ext]',
      },
    },
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    use: {
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'fonts/[name]--[folder].[ext]',
      },
    },
  },
];
