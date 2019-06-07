const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  }));

router.get('/google/callback',
  passport.authenticate('google', {failureRedirect: '/auth/google'}),
  function (req, res) {
    // res.json(req.user);
    res.redirect('/profile');
  });

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
