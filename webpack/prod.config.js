/**
 * ************************************
 *
 * @module  webpack.config.js
 * @description Webpack Configuration
 *
 * ************************************
 */

const HTMLWebpack = require('html-webpack-plugin');
const path = require('path');

const HTMLWebPackPlugin = new HTMLWebpack({
  template: path.resolve(__dirname, '../src/index.html'),
  filename: 'index.html',
});

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),             // Output bundle file to root/dist
    filename: 'bundle.js',                                // Bundle file name
    publicPath: '/',                                      // Specify base path for all assets as root
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    //   {
    //     enforce: 'pre',
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     use: {
    //       loader: 'source-map-loader',
    //     },
    //   },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [HTMLWebPackPlugin],
};
