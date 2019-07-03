const VueTemplateCompiler = require('vue-template-compiler');

module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader'
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules'
      }
    }
  },
  {
    test: /\.html$/,
    use: 'vue-html-loader'
  },
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@vue/app']
      }
    }
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      extractCSS: true,
      loaders: {
        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
        scss: 'vue-style-loader!css-loader!sass-loader'
      },
      compiler: VueTemplateCompiler,
      compilerOptions: {
        type: Object,
        default: {
          preserveWhitespace: false
        }
      },
      hotReload: true
    }
  },
  {
    test: /\.css$/,
    use: [
      'vue-style-loader',
      {
        loader: 'css-loader',
        options: {
          // enable CSS Modules
          modules: true
        }
      }
    ]
  },
  {
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      {
        loader: 'css-loader',
        options: { modules: true }
      },
      'sass-loader'
    ]
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: {
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'imgs/[name].[ext]'
      }
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    use: {
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'fonts/[name].[ext]'
      }
    }
  }
];
