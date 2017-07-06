const webpack = require('webpack')
const path = require('path')
const BabiliPlugin = require('babili-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    'add': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'bundles'),
    publicPath: '/',
    filename: '[name].umd.min.js',
    sourceMapFilename: '[file].map',
    libraryTarget: 'umd',
    library: 'add'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/, use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['add']
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new BabiliPlugin()
  ]
}
