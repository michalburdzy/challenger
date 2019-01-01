const router = require('express').Router();
const passport = require('passport');

router.get(
  '/',
  passport.authenticate(
    'google',
    { scope: ['profile', 'email'] },
    { failureRedirect: '/login' },
  ),
);
router.get('/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/api/current_user');
});

module.exports = router;
