import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
 },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
      // Generate external CSS file with hash
      new ExtractTextPlugin('[name].[contenthash].css'),

      // Hash the files using MD5
      new WebpackMd5Hash(),

      // Use CommonsChunkPlugin to create a separate bundle of vendor libraries
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),

      // Create HTML file that includes reference to bundled JS
      new HtmlWebpackPlugin({
          template: 'src/index.html',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          },
          inject: true,
          // Properties defined here will be available in index.html
          trackJSToken: 'someToken'
      }),

      // Eliminate deplicate packages
      new webpack.optimize.DedupePlugin(),

      // Minify JS
      new webpack.optimize.UglifyJsPlugin()
    ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
