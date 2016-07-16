'use strict';

var _path = require('path');

var express = require('express');

var app = express();

if (process.env.NODE_ENV === 'production') {} else {
  var browserify = require('browserify-middleware');
  app.get('/client.js', browserify(__dirname + '/index.js', { transform: require('babelify') }));
}

app.get('/', function (req, res, next) {
  res.sendFile((0, _path.resolve)(__dirname + '/../index.html'));
});

module.exports = app.listen(process.env.PORT || 3000);