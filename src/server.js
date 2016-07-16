import {resolve} from 'path';
import {readFileSync} from 'fs';

var express = require('express');

var app = express();

if (process.env.NODE_ENV === 'production') {
  const prepare = require('prepare-response');
  const client = prepare(readFileSync(__dirname + '/index.js'), {'content-type': 'js'})
  app.get('/client.js', (req, res, next) => {
    client.send(req, res, next);
  });
} else {
  var browserify = require('browserify-middleware');
  app.get('/client.js', browserify(__dirname + '/index.js', {transform: require('babelify')}))
}



app.get('/', (req, res, next) => {
  res.sendFile(resolve(__dirname + '/../index.html'));
});

module.exports = app.listen(process.env.PORT || 3000);
