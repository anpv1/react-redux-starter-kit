var webpack =require('webpack');
console.log('Running on production environment');
var config = require('./base.js');

config.mode = 'production';
config.entry = {app: ['./app.js']};
config.plugins.push(
    new webpack.DefinePlugin({
      'API_BASE_URL': JSON.stringify('https://api.yourdomain.com'),
    }),
);

module.exports = config;