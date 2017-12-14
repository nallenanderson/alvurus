const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const uuidv4 = require('uuid/v4');

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

exports.signupRegularPassword = (req, res) => {

  const { email, password, first_name, last_name } = req.body;
  const validEmail = emailRegex.test(email);

  if (!validEmail) {
    return res.status(400).send({ message: 'Please enter a valid email address.' });
  }

  if (!password || !password.trim()) {
    return res.status(400).send({ message: 'You must supply a password. Try again.' });
  }

  if (!first_name || !first_name.trim()) {
    return res.status(400).send({ message: 'You must supply a first name. Try again.' });
  }

  if (!last_name || !last_name.trim()) {
    return res.status(400).send({ message: 'You must supply a last name. Try again.' });
  }

  User.findOne({ email }, (err, user) => {

    const auth_token = uuidv4()
    const scan_code = uuidv4()
    const newUser = new User({ email, first_name, last_name, auth_token, scan_code });

    newUser.password = newUser.generateHash(password);

    if (err) {
      console.error(err);
      return res.status(500);
    }

    if (user) {
      console.warn(`User already registered: ${email}`);
      return res.status(400).send({ message: 'Email already registered.' });
    }

    newUser.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500);
      }
      res.status(201).send({auth_token});
    });

  });

}

exports.signup = async (req, res, next) => {
  const { email, first_name, last_name, password } = req.body;
  const user = new User({ email, first_name, last_name });
  await User.register(user, password, (err, user) => {
    if (err) return console.log(err);
    next();
  });
};

exports.loginWithPassword = (req, res) => {
  const {auth_token} = req.user;
  res.status(200).json({email, scan_code});
};

exports.loginWithToken = (req, res, next) => {
  const {email, scan_code} = req.user;
  res.status(200).json({email, scan_code});
};

exports.logout = (req, res, next) => {
  console.log('Logging out.');
  req.logout();
  res.status(200).send({ message: 'You are logged out.' });
};
