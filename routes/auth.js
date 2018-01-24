const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/github',
  passport.authenticate('github', { scope: ['profile', 'email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashbord');
  }
);

router.get('/verify', (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send('not auth');
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
