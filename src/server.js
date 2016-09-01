import {resolve} from 'path';
import {readFileSync} from 'fs';
import passport from 'passport';
import {Strategy as GitHubStrategy} from 'passport-github2';
import cookieSession from 'cookie-session';
import express from 'express';
import github from 'github-basic';
import base64decode from 'base64-decode';
import toml from 'toml';
import bodyParser from 'body-parser';
import slug from 'slug';

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

app.use( (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/auth/github');
    return;
  }
  req.githubclient = github({
    version: 3,
    auth: req.user.accessToken
  });
  next()
})

app.get('/content-types', (req, res) => {
  //https://api.github.com/repos/eabrodie/theautismgroup.org.uk/contents/content
  req.githubclient.get('/repos/:owner/:repo/contents/:path', {
    owner:'eabrodie',
    repo:'theautismgroup.org.uk',
    path:'content-types'
  }).then(
    files => Promise.all(
      files.filter(
        file => /\.toml$/.test(file.name)
      ).map(
        file => req.githubclient.get('/repos/:owner/:repo/contents/:path', {
          owner:'eabrodie',
          repo:'theautismgroup.org.uk',
          path:'content-types/' + file.name
        }).then(file =>
          ({id:file.name.replace(/\.toml$/, ''), ...toml.parse(base64decode(file.content))})
        )
      )
    )
  ).done(result => res.json(result));
});
// get the names of all the files in the folder for that content type
app.get('/get-content/:contentType', bodyParser.json(), (req, res) => {
  req.githubclient.get('/repos/:owner/:repo/contents/:path', {
    owner:'eabrodie',
    repo:'theautismgroup.org.uk',
    path:'content/' + req.params.contentType
  }).then(
    files => Promise.all(
      files.map(
        file => req.githubclient.get('/repos/:owner/:repo/contents/:path', {
          owner:'eabrodie',
          repo:'theautismgroup.org.uk',
          path:'content/' + req.params.contentType + '/'+ file.name
        }).then(file =>
          ({id:file.name, ...JSON.parse(base64decode(file.content))})
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

app.post('/create', bodyParser.json(), (req, res, next) => {
  req.githubclient.get('/repos/:owner/:repo/contents/:path', {
    owner:'eabrodie',
    repo:'theautismgroup.org.uk',
    path:'content/' +  req.body.contentType + '/' + slug(req.body.title)
  }).then(
    ()=>{
      const err = new Error('Content already exists with this title');
      err.code = 'ALREADY_EXISTS';
      throw err;
    },
    ()=>null
  ).then(
    () => req.githubclient.commit('eabrodie', 'theautismgroup.org.uk', {
      message: 'Editor',
      updates: [
        {
          path:'content/' +  req.body.contentType + '/' + slug(req.body.title),
          content: JSON.stringify(req.body, null, '  ')
        }
      ]
    })
  ).done(
    ()=>res.json({success: true}),
    (err) => {
      if (err.code === 'ALREADY_EXISTS') {
        res.json({success: false, message: 'Content already exists with this title'});
      } else {
        next(err);
      }
    }
  );
});

module.exports = app.listen(process.env.PORT || 3000);
