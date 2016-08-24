import {resolve} from 'path';
import {readFileSync} from 'fs';
import passport from 'passport';
import {Strategy as GitHubStrategy} from 'passport-github2';
import cookieSession from 'cookie-session';
import express from 'express';
import github from 'github-basic';
import base64decode from 'base64-decode';
import toml from 'toml';

var client = github({version: 3});
var app = express();

if (process.env.NODE_ENV === 'production') {
  const prepare = require('prepare-response');
  const client = prepare(readFileSync(__dirname + '/bundle.js'), {'content-type': 'js'})
  app.get('/client.js', (req, res, next) => {
    client.send(req, res, next);
  });
} else {
  var browserify = require('browserify-middleware');
  app.get('/client.js', browserify(__dirname + '/index.js', {transform: require('babelify')}))
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK || "http://localhost:3000/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    profile.accessToken = accessToken;
    done(null, profile);
  }
));

app.use(cookieSession({
  keys: [process.env.SESSION_KEYS],
  // session expires after 1 hour
  maxAge: 60 * 60 * 1000,
  // session is not accessible from JavaScript
  httpOnly: true,
}));
app.use(passport.initialize());
app.use(passport.session());



app.get(
  '/auth/github',
  passport.authenticate('github', {
    scope: [ 'user:email', 'public_repo' ]
  })
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github'),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


app.get('/content-types', (req, res) => {
  //https://api.github.com/repos/eabrodie/theautismgroup.org.uk/contents/content
  client.get('/repos/:owner/:repo/contents/:path', {
    owner:'eabrodie',
    repo:'theautismgroup.org.uk',
    path:'content'
  }).then(
    files => Promise.all(
      files.filter(
        file => /\.toml$/.test(file.name)
      ).map(
        file => client.get('/repos/:owner/:repo/contents/:path', {
          owner:'eabrodie',
          repo:'theautismgroup.org.uk',
          path:'content/' + file.name
        }).then(file =>
          ({id:file.name.replace(/\.toml$/, ''), content:toml.parse(base64decode(file.content))})
        )
      )
    )
  ).done(result => res.json(result));
});

app.get('*', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(resolve(__dirname + '/../index.html'));
  } else {
    res.redirect('/auth/github');
  }
});
module.exports = app.listen(process.env.PORT || 3000);
