const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require("../controllers/auth");

router.get('/google/callback',
  passport.authenticate('google', {failureRedirect: '/auth/google'}),
  controller.googleCallback
);

router.get('/logout', controller.logout);

// This custom middleware allows us to attach the socket id to the session
// With that socket id we can send back the right user info to the right
// socket
router.use((req, res, next) => {
  req.session.socketId = req.query.socketId;
  next()
});

router.get('/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'email']
  })
);

module.exports = router;
