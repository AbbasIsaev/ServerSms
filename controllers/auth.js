const jwt = require('jsonwebtoken');

module.exports.googleCallback = function (req, res) {
  if (req.session && req.session.socketId) {
    const io = req.app.get('io');

    // Генерация токена
    const token = jwt.sign({
      user: req.user
    }, process.env.SECRET_JWT, {expiresIn: process.env.EXPIRES_IN});

    const data = {
      user: req.user,
      token: `Bearer ${token}`
    };

    io.in(req.session.socketId).emit('auth:google', data);
    res.end()
  } else {
    res.redirect('/api/profile');
  }
};

module.exports.logout = function (req, res) {
  req.logout();
  res.clearCookie(process.env.COOKIE_NAME);
  res.clearCookie(process.env.COOKIE_NAME + ".sig");
  res.json({
    success: true,
    message: 'Пользователь успешно разлогинился'
  });
};
