var webpack =require('webpack')
var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');
var src_dir = path.dirname(path.dirname(__filename)) + path.sep + 'src'
var base_dir = path.dirname(src_dir)

module.exports = {
    context: src_dir,
    output: {
     path: base_dir+'/build',
     filename: 'js/[name].build.js',
    },
    resolve: {
        modules: [src_dir, "node_modules"]
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
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
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader"
          ]
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
              publicPath: '/'
            }
          }],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              publicPath: '/'
            }
          }]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/style.css",
      }),
      new CopyWebpackPlugin([
        { from: './index.html' }
      ]),
      new WorkboxPlugin.GenerateSW({
        // these options encourage the ServiceWorkers to get in there fast 
        // and not allow any straggling "old" SWs to hang around
        clientsClaim: true,
        skipWaiting: true
      }),
    ]
}