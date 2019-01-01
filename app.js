const app = require('express')();
const PORT = process.env.PORT || 5000;
const { User } = require('./models');
const googleAuthRoute = require('./authRoutes/google');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('./keys');

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, cb) => {
      const {
        name: { givenName, familyName },
        gender
      } = profile;
      const googleId = profile.id;
      const picture = profile.photos[0].value;
      const emails = profile.emails;

      const foundUser = await User.findOne({ googleId });
      if (!foundUser) {
        await User.create(
          {
            googleId,
            givenName,
            familyName,
            gender,
            picture,
            emails
          },
          (err, newU) => {
            if (err) {
              console.log(err);
              throw err;
            } else {
              console.log(newU);
            }
          }
        );
      } else {
        console.log(foundUser);
      }
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth/google', googleAuthRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
