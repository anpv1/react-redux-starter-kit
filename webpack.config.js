var environment = process.env.NODE_ENV === 'dev' ? 'dev' : 'production';
var config = require('./webpack/webpack.'+environment+'.js');
module.exports = config;