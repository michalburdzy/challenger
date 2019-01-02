const app = require('express')();
const passport = require('passport');
// require('./services/passport');
const cookieSession = require('cookie-session');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const RedditStrategy = require('passport-reddit').Strategy;
const bodyParser = require('body-parser');
const {
  // GOOGLE_CLIENT_ID,
  // GOOGLE_CLIENT_SECRET,
  cookieKey,
} = require('./config/keys');
// const { User } = require('./models');
const googleAuthRoutes = require('./authRoutes/google');
const redditAuthRoutes = require('./authRoutes/reddit');
const logger = require('./services/winston');

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  }),
);

require('./services/passport')(app);

// app.use('/auth/google', googleAuthRoutes);
// app.use('/auth/reddit', redditAuthRoutes);
require('./authRoutes/google')(app);
require('./authRoutes/reddit')(app);

app.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

app.get('/', (req, res) => {
  res.send(req.user);
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
