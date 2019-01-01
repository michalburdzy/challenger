
const router = require('express').Router();
const passport = require('passport');
const crypto = require('crypto');

router.get('/', (req, res, next) => {
  req.session.state = crypto.randomBytes(32).toString('hex');
  passport.authenticate('reddit', {
    state: req.session.state,
    duration: 'permanent',
  })(req, res, next);
});

router.get('/callback', (req, res, next) => {
  // Check for origin via state token
  if (req.query.state === req.session.state) {
    passport.authenticate('reddit', {
      successRedirect: '/api/current_user',
      failureRedirect: '/login',
    })(req, res, next);
  } else {
    next(new Error());
  }
});

module.exports = router;
