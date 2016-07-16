if (process.env.NODE_ENV === 'production') {
  require('./lib/server.js');
} else {
  require('babel-register')
  require('./src/server.js');
}
