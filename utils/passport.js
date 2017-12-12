const passport = require('passport');
const mongoose = require('mongoose');
const { Strategy: LocalStrategy } = require('passport-local').Strategy;
const User = mongoose.model('User');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('local-signup', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
  async (req, email, password, done) => {
    const { first_name, last_name } = req.body;

    User.findOne({ email }, (err, user) => {
      if (err) return done(err);

      if (user) {
        return done(null, false);
      } else {
        const newUser = new User({ email, first_name, last_name });
        newUser.password = newUser.generateHash(password);

        newUser.save((err) => {
          if (err) throw(err);
          return done(null, newUser);
        });
      }
    });
  }
));

passport.use('local-login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
  async (req, email, password, done) => {
    console.log('here', password);
    User.findOne({ email }, (err, user) => {
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
