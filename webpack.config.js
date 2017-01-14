'use strict';

const env = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname + '/src',

  entry: {
    main: ['./index']
  },

  output: {
    path: __dirname + '/public/assets',
    publicPath: '/assets/',
    filename: '[name].js',
    library: '[name]'
  },

  devtool: env ? 'cheap-inline-module-source-map' : null,

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    },
    {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract('style', 'css-loader!resolve-url!sass-loader?sourceMap')
    },
    {
      test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      loader: 'file?name=[path][name].[ext]'
    }]
  },

  postcss: [
    autoprefixer({ browsers: ['last 15 versions', '> 1%'] })
  ],

  plugins: [
    new ExtractTextPlugin('[name].css', {allChunks: true, disable: env})
  ],

  devServer: {
    contentBase: __dirname + '/public',
    hot: true,
    historyApiFallback: true
  }
};

if (!env) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // don't show unreachable variables etc.
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}
