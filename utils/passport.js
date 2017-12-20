const passport = require('passport');
const mongoose = require('mongoose');
const config = require('config');
const { Strategy: LocalStrategy } = require('passport-local').Strategy;
const { Strategy: BearerStrategy } = require('passport-http-bearer').Strategy;
const User = mongoose.model('User');
const {UserStatus} = require('../models/User');

passport.use('bearer', new BearerStrategy(
  (auth_token, done) => {
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
