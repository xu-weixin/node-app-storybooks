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
    req.flash('success', '登录成功！');
    res.redirect('/dashboard');
  }
);

router.get('/verify', (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send('not auth');
  }
});

module.exports = router;
