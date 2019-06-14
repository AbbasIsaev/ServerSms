const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google/callback',
  passport.authenticate('google', {failureRedirect: '/auth/google'}),
  function (req, res) {
    if (req.session && req.session.socketId) {
      console.log('callback->>' + req.session.socketId);
      const io = req.app.get('io');
      const data = {
        user: req.user,
        cookie: req.headers.cookie
      };

      io.in(req.session.socketId).emit('auth:google', data);
      res.end()
    } else {
      res.redirect('/profile');
    }
  });

router.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie(process.env.COOKIE_NAME);
  res.clearCookie(process.env.COOKIE_NAME + ".sig");
  res.json({
    success: true,
    message: 'Пользователь успешно разлогинился'
  });
});

// This custom middleware allows us to attach the socket id to the session
// With that socket id we can send back the right user info to the right
// socket
router.use((req, res, next) => {
  req.session.socketId = req.query.socketId;
  next()
});

router.get('/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  })
);

module.exports = router;
