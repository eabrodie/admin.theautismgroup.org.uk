import {resolve} from 'path';

var express = require('express');

var app = express();

app.get('/', (req, res, next) => {
  res.sendFile(resolve(__dirname + '/../index.html'));
});

module.exports = app.listen(process.env.PORT || 3000);
