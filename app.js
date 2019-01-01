const app = require('express')();
const passport = require('passport');
// require('./services/passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const RedditStrategy = require('passport-reddit').Strategy;
const bodyParser = require('body-parser');
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  cookieKey,
} = require('./config/keys');
const { User } = require('./models');
const googleAuthRoutes = require('./authRoutes/google');
const redditAuthRoutes = require('./authRoutes/reddit');
require('./services/passport');
const logger = require('./services/winston');


const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  }),
);

app.use('/auth/google', googleAuthRoutes);
app.use('/auth/reddit', redditAuthRoutes);

app.get('/api/current_user', (req, res) => {
  res.send(req.session.passport);
});

app.get('/', (req, res) => {
  res.send('oki');
});

app.get('/privacy', (req, res) => {
  res.render('privacy');
});

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
