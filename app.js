const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const logger = require('./services/winston');
const { cookieKey } = require('./config/keys');
const { User } = require('./models');

const PORT = process.env.PORT || 5000;

const googleAuthRoutes = require('./authRoutes/google');
const redditAuthRoutes = require('./authRoutes/reddit');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((usr) => {
    done(null, usr);
  });
});
const app = express();
require('./services/passport')(app);

app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: cookieKey, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

require('./authRoutes/google')(app);
require('./authRoutes/reddit')(app);

app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

app.get('/', (req, res) => {
  res.send(`User: ${req.user},
  cookiesUser: ${req.session.passport}`);
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/privacy', (req, res) => {
  res.render('privacy');
});

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
