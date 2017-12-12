const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const promisify = require('es6-promisify');

exports.validateSignup = (req, res, next) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const { email, password, confirm_password } = req.body;

  const validEmail = emailRegex.test(email);

  if (!validEmail) {
    return res.status(400).send({ message: 'Please enter a valid email address.' });
  }

  if (!password || !confirm_password) {
    return res.status(400).send({ message: 'You must supply a password. Try again.' });
  }

  if (password !== confirm_password) {
    return res.status(400).send({ message: 'Passwords do not match. Please try again.' })
  }

  next();
}

exports.signup = async (req, res, next) => {
  const { email, first_name, last_name, password } = req.body;
  const user = new User({ email, first_name, last_name });
  await User.register(user, password, (err, user) => {
    if (err) return console.log(err);
    next();
  });
}

exports.login = (req, res) => {
  res.status(200).send(req.user);
}

exports.logout = (req, res, next) => {
  console.log('Logging out.');
  req.logout();
  res.status(200).send({ message: 'You are logged out.' });
}

exports.other = (req, res) => {
  console.log('HELLO BITCHES');
  console.log(req.user);
  res.json(req.user);
}

exports.isLogged = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ message: 'You must be logged in!' });
  }
  return res.status(200).send({ message: 'Welcome aboard!' });
}
