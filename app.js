const app = require('express')();
const passport = require('passport');
// require('./services/passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bodyParser = require('body-parser');
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  cookieKey,
} = require('./config/keys');
const { User } = require('./models');
const googleAuthRoute = require('./authRoutes/google');

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());


passport.serializeUser((user, done) => {
  done(null, user.id);
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
            givenName,
            familyName,
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

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  }),
);

app.use('/auth/google', googleAuthRoute);

app.get('/api/current_user', (req, res) => {
  res.send(req.session.passport.user);
});

app.get('/', (req, res) => {
  res.send('oki');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
