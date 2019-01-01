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

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  User.findOne({ googleId: user.id }).then((usr) => {
    done(null, usr);
  });
});


app.use(passport.initialize());
app.use(passport.session());


passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, cb) => {
      const {
        name: { givenName, familyName },
        gender,
        emails,
      } = profile;
      const googleId = profile.id;
      const picture = profile.photos[0].value;

      const foundUser = await User.findOne({ googleId });
      if (!foundUser) {
        const newUser = await User.create(
          {
            googleId,
            name: `${givenName} ${familyName}`,
            gender,
            picture,
            emails,
          },
          (err) => {
            if (err) {
              throw err;
            }
          },
        );
        return cb(null, newUser);
      }
      return cb(null, foundUser);
    },
  ),
);

passport.use(new RedditStrategy({
  clientID: 'cTG3AZw18CbBDg',
  clientSecret: 'WYZNkYyo4Pp7CYCpSMEwlx-_WBA',
  callbackURL: '/auth/reddit/callback',
},
async (accessToken, refreshToken, profile, cb) => {
  const {
    name,
    // gender,
    // emails,
  } = profile;
  const redditId = profile.id;

  const foundUser = await User.findOne({ redditId });
  if (!foundUser) {
    const newUser = await User.create(
      {
        redditId,
        name,
      },
      (err) => {
        if (err) {
          throw err;
        }
      },
    );
    return cb(null, newUser);
  }
  return cb(null, foundUser);
}));

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
  console.log(`Server listening on port ${PORT}`);
});
