const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../config/keys');
const { User } = require('../models');

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: '/auth/google/callback'
//     },
//     async (accessToken, refreshToken, profile, cb) => {
//       const {
//         name: { givenName, familyName },
//         gender
//       } = profile;
//       const googleId = profile.id;
//       const picture = profile.photos[0].value;
//       const emails = profile.emails;

//       const foundUser = await User.findOne({ googleId });
//       if (!foundUser) {
//         await User.create(
//           {
//             googleId,
//             givenName,
//             familyName,
//             gender,
//             picture,
//             emails
//           },
//           (err, newU) => {
//             if (err) {
//               console.log(err);
//               throw err;
//             } else {
//               console.log(newU);
//             }
//           }
//         );
//       } else {
//         console.log('found user!');
//       }
//     }
//   )
// );
