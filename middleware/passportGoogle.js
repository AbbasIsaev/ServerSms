const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const models = require('../models');
const errorHandler = require('../utils/errorHandler');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    models.users.findByPk(id, {attributes: ['id', 'displayName']})
      .then((user) => {
        done(null, user);
      })
      .catch(error => {
        return done(error, false);
      });
  });

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      const newData = {
        googleId: profile.id,
        displayName: profile.displayName
      };

      models.users.findOrCreate({
        where: {googleId: profile.id},
        defaults: newData
      })
        .then(([user, created]) => {
          const userNew = {
            id: user.id,
            displayName: user.displayName
          };
          return done(null, userNew);
        })
        .catch(error => {
          return done(error, false);
        });
    }
  ));
};

module.exports.authCheck = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // if (req.user) {
  //   return next();
  // }
  errorHandler.unauthorized(res);
};
