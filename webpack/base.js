var webpack =require('webpack')
var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var src_dir = path.dirname(path.dirname(__filename)) + path.sep + 'src'
var base_dir = path.dirname(src_dir)

var environment = process.env.NODE_ENV === 'dev' ? 'dev' : 'production';

module.exports = {
    context: src_dir,
    output: {
     path: base_dir+'/build',
     filename: 'js/[name].build.js',
    },
    resolve: {
        modules: [src_dir, "node_modules"]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env', 'babel-preset-react'],
              plugins: ['transform-runtime', 'transform-class-properties'],
            }
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract("css-loader")
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: environment == 'dev' ? '[hash].[ext]': 'images/[name].[ext]',
              publicPath: '/'
            }
          }],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: environment == 'dev' ? '[hash].[ext]': 'fonts/[name].[ext]',
              publicPath: '/'
            }
          }]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("css/style.css"),
      new CopyWebpackPlugin([
        { from: './index.html' }
      ]),
    ]
}