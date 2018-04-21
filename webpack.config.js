'use strict'

const path = require('path')

const publicPath = path.join(__dirname, 'public')
const config = {
  mode: process.env.NODE_ENV,
  entry: './src/js/index.jsx',
  devtool: process.env.NODE_ENV === 'production' ? false : 'eval',
  output: {
    filename: 'bundle.js',
    publicPath: 'js/assets',
    path: path.join(publicPath, 'js/assets'),
  },
  resolve: {
    extensions: [ '.js', '.json', '.jsx' ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: publicPath,
    compress: true,
  }
}

module.exports = config
