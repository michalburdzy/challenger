const router = require('express').Router();
const passport = require('passport');

router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/callback', passport.authenticate('google'), (req, res) => {
  res.json('OKI ');
});

module.exports = router;
