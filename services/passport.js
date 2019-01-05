const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const RedditStrategy = require('passport-reddit').Strategy;
const {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	REDDIT_CLIENT_ID,
	REDDIT_CLIENT_SECRET,
} = require('../config/keys');
const { User } = require('../models');

module.exports = () => {
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
					User.create(
						{
							googleId,
							name: `${givenName} ${familyName}`,
							gender,
							picture,
							emails,
						},
						(err, user) => {
							if (err) {
								throw err;
							}
							return cb(null, user);
						},
					);
				} else {
					return cb(null, foundUser);
				}
			},
		),
	);

	passport.use(
		new RedditStrategy(
			{
				clientID: REDDIT_CLIENT_ID,
				clientSecret: REDDIT_CLIENT_SECRET,
				callbackURL: '/auth/reddit/callback'
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
					User.create(
						{
							redditId,
							name,
						},
						(err, user) => {
							if (err) {
								throw err;
							}
							return cb(null, user);
						},
					);
				} else {
					return cb(null, foundUser);
				}
			},
		),
	);
	// passport.serializeUser((user, done) => {
	//   done(null, user.id);
	// });

	// passport.deserializeUser((id, done) => {
	//   console.log(id);
	//   User.findById(id).then((usr) => {
	//     done(null, usr);
	//   });
	// });
	// app.use(passport.initialize());
	// app.use(passport.session());
};
