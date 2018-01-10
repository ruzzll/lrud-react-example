const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

let plugins = [
  new CleanWebpackPlugin([ 'public' ]),
  new HtmlWebpackPlugin({
    template: './src/index.html'
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins = [
    ...plugins,
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}

module.exports = {
  entry: [
    './node_modules/reset-css/reset.css',
    './src/main.css',
    './src/main.js'
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, './public')
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    }]
  },
  plugins,
  devtool: 'source-map',
  devServer: {
    contentBase: './public',
    disableHostCheck: true,
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0',
    https: !!process.env.HTTPS,
    historyApiFallback: true
  }
}
