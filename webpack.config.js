const path = require('path');
const webpack = require('webpack');

const PACKAGE = require('./package.json');

const banner = PACKAGE.name + ' - ' + PACKAGE.version + ' | (c) 2018, ' + new Date().getFullYear() + '  ' + PACKAGE.author + ' | ' + PACKAGE.license + ' | ' + PACKAGE.homepage;

const configuration = {
  cache: true,
  context: __dirname,
  entry: {
    lib: ["./source/index.js"]
  },
  devtool: "source-map",
  resolve: {
    enforceExtension: false,
    extensions: [".js"]
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      enforce: 'pre',
      use: [{
        loader: 'eslint-loader'
      }]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        query: {
          presets: [
            'env',
            'es2017',
            'flow'
          ],
          plugins: [
            'transform-decorators-legacy',
            'transform-flow-strip-types'
          ]
        }
      }]
    }, {
      test: /\.(json|geojson)$/,
      use: [{
        loader: 'json-loader'
      }]
    }]
  },
  output: {
    pathinfo: true,
    filename: "[name].js",
    path: path.resolve('./build'),
    libraryTarget: "commonjs2"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.BannerPlugin(banner)
  ],
  target: 'node',
  externals: [
    /^(?!\.|\/).+/i,
  ]
};

module.exports = configuration;
