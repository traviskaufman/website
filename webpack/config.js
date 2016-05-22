var webpack = require('webpack')
var DEBUG = process.env.NODE_ENV !== 'production'
var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
  }),
]

if (!DEBUG)
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }))

var config = {
  entry: {
    app: ['babel-polyfill', './src/client/index.jsx']
  },
  module: {
    noParse: [],
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'style!css' },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          cacheDirectory: DEBUG
        }
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: plugins,
  output: {
    filename: 'bundle.js',
    path: './build/assets/js/',
    publicPath: '/assets/'
  }
}

if (process.env.NODE_ENV === 'development') {
  config.devtool = '#inline-source-map'
} else if (process.env.NODE_ENV === 'production') {
  config.devtool = 'source-map'
}

module.exports = config
