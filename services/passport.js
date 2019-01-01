const passport = require('passport');
const app = require('express')();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const RedditStrategy = require('passport-reddit').Strategy;
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = require('../config/keys');
const { User } = require('../models');


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  User.findOne({ googleId: user.id }).then((usr) => {
    done(null, usr);
  });
});


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
