'use strict'

const path = require('path')

const publicPath = path.join(__dirname, 'public')
const config = {
  entry: './src/js/app.js',
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
