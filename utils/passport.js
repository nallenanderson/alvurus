const passport = require('passport');
const mongoose = require('mongoose');
const { Strategy: LocalStrategy } = require('passport-local').Strategy;
const { Strategy: BearerStrategy } = require('passport-http-bearer').Strategy;
const User = mongoose.model('User');
const {UserStatus} = require('../models/User.js');

// passport.use('local', new LocalStrategy({
//   usernameField : 'email',
//   passwordField : 'password',
//   passReqToCallback : true
// },
//   async (req, email, password, done) => {
//     const { first_name, last_name } = req.body;
//
//     User.findOne({ email }, (err, user) => {
//       if (err) return done(err);
//
//       if (user) {
//         return done(null, false);
//       } else {
//         const newUser = new User({ email, first_name, last_name });
//         newUser.password = newUser.generateHash(password);
//
//         newUser.save((err) => {
//           if (err) throw(err);
//           return done(null, newUser);
//         });
//       }
//     });
//   }
// ));

passport.use('bearer', new BearerStrategy(
  (auth_token, cb) => {
    User.findOne({ auth_token, status: UserStatus.Active }, (err, user) => {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.use('local', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
  async (req, email, password, done) => {
    User.findOne({ email, status: UserStatus.Active }, (err, user) => {
      if (err) return done(err);

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
