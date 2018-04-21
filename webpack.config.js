'use strict'

const path = require('path')
const webpack = require('webpack')

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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [ '.js', '.json', '.jsx' ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            plugins: ['react-hot-loader/babel'],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: publicPath,
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
}

module.exports = config
