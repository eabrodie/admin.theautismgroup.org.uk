'use strict';

var _path = require('path');

var _fs = require('fs');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGithub = require('passport-github2');

var _cookieSession = require('cookie-session');

var _cookieSession2 = _interopRequireDefault(_cookieSession);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

if (process.env.NODE_ENV === 'production') {
  (function () {
    var prepare = require('prepare-response');
    var client = prepare((0, _fs.readFileSync)(__dirname + '/bundle.js'), { 'content-type': 'js' });
    app.get('/client.js', function (req, res, next) {
      client.send(req, res, next);
    });
  })();
} else {
  var browserify = require('browserify-middleware');
  app.get('/client.js', browserify(__dirname + '/index.js', { transform: require('babelify') }));
}

_passport2.default.serializeUser(function (user, done) {
  done(null, user);
});

_passport2.default.deserializeUser(function (user, done) {
  done(null, user);
});

_passport2.default.use(new _passportGithub.Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
}, function (accessToken, refreshToken, profile, done) {
  profile.accessToken = accessToken;
  done(null, profile);
}));

app.use((0, _cookieSession2.default)({
  keys: [process.env.SESSION_KEYS],
  // session expires after 1 hour
  maxAge: 60 * 60 * 1000,
  // session is not accessible from JavaScript
  httpOnly: true
}));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    res.sendFile((0, _path.resolve)(__dirname + '/../index.html'));
  } else {
    res.redirect('/auth/github');
  }
});

app.get('/auth/github', _passport2.default.authenticate('github', {
  scope: ['user:email', 'public_repo']
}));

app.get('/auth/github/callback', _passport2.default.authenticate('github'), function (req, res) {
  res.redirect('/');
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = app.listen(process.env.PORT || 3000);