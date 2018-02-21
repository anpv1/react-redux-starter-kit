var webpack =require('webpack');
console.log('Running on production environment');
var config = require('./base.js');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const OfflinePlugin = require('offline-plugin')

config.entry = {app: ['./app.js']};
config.plugins.push(
    new MinifyPlugin(),
    new webpack.DefinePlugin({
      'API_BASE_URL': JSON.stringify('https://api.yourdomain.com'),
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new OfflinePlugin({
      publicPath: '/', 
      responseStrategy: 'network-first',
      externals: [
        'https://fonts.googleapis.com/css?family=Roboto', 
        'https://fonts.gstatic.com/s/roboto/v18/CWB0XYA8bzo0kSThX0UTuA.woff2'
      ],
      ServiceWorker: {
        navigateFallbackURL: '/'
      },
    }),
);

module.exports = config;