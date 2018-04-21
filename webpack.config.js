'use strict'

const path = require('path')

const publicPath = path.join(__dirname, 'public')
const config = {
  entry: './src/js/app.js',
  devtool: process.env.NODE_ENV === 'production' ? false : 'eval',
  output: {
    filename: 'bundle.js',
    publicPath: 'js/assets',
    path: path.join(publicPath, 'js/assets'),
  },
  devServer: {
    contentBase: publicPath,
    compress: true,
  }
}

module.exports = config
