const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
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
        displayName: profile.displayName,
        email: profile.emails[0].value
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

  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_JWT
  };

  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await models.users.findOne({
          attributes: ['id', 'displayName'],
          where: {
            id: payload.user.id
          }
        });

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        console.log(e);
      }
    })
  )
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
