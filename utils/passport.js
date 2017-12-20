const passport = require('passport');
const mongoose = require('mongoose');
const config = require('config');
const { Strategy: LocalStrategy } = require('passport-local').Strategy;
const { Strategy: BearerStrategy } = require('passport-http-bearer').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const User = mongoose.model('User');
const {UserStatus} = require('../models/User');

const FacebookConfig = config.get("apps.facebook");

passport.use('facebook', new FacebookTokenStrategy(

  FacebookConfig, (res, accessToken, refreshToken, profile, done) => {

    debugger
    const fb = { facebook: { user_id: profile.id } };

    User
      .findOne(fb)
      .then((user) => done(null, user || {}, {accessToken, refreshToken, profile}))
      .catch((err) => {
          console.error(err);
          return done(err);
      });

}));

passport.use('bearer', new BearerStrategy(
  (auth_token, cb) => {
    User
      .findOne({ auth_token, status: UserStatus.Active })
      .populate('company')
      .exec((err, user) => {
        if (err) {
          console.error(err);
          return done(err);
        }
        if (!user) { return done(null, false); }
        return done(null, user);
      });
  }));

passport.use('local', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
  (req, email, password, done) => {
    User
      .findOne({ email, status: UserStatus.Active })
      .populate('company')
      .exec((err, user) => {

        if (err) {
          console.error(err);
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (!user.validPassword(password)) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      });
    }
));
