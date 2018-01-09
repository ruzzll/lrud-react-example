const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    './node_modules/reset-css/reset.css',
    './src/main.js'
  ],
  output: {
    filename: 'bundle.js',
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
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
