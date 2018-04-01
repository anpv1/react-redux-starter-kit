const webpack = require('webpack');
console.log('Running on dev environment');
var config = require('./base.js');

config.watch = true;
config.mode = 'development';
config.entry = {app: ['./store.js']};
config.devtool = 'inline-source-map';
config.devServer = {
  contentBase: './',
  historyApiFallback: true,
  port: 9000,
  before: function(app){
    // register bodyParser
    var bodyParser = require('body-parser');
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    // check online route
    app.get('/ping', function(req, res) {
      res.json({ status: 'ok' });
    });

    app.post('/login', function(req, res) {
      if(req.body.email == 'test@test.com' && req.body.password == '112233'){
        res.json({
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpI6IjVhNTJlNTdlLThlYTMtNDgwOC04ZGM3LWI1NWQxMDliODVkMCIsImV4cCI6MTUxNTY1MDEzMDQ1MSwiaWF0IjoxNTE1NjQ4MzMwfQ.aoWZSw1hpMs7CgCKCUlZuKTpdn14w8RQSH--Gom7MuI",
          "userName": "test@test.com"
        });
      } else {
        res.json({
          "statusCode":404,
          "error":"User not found",
          "message":"Invalid email or password"
        });
      }
    });
  }
};

config.plugins.push(
  new webpack.DefinePlugin({
    'API_BASE_URL': JSON.stringify(''),
  })
);

module.exports = config;