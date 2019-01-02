const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate(
      'google',
      { scope: ['profile', 'email'] },
      { failureRedirect: '/login' },
    ),
  );

  app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    });
};
