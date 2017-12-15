const mongoose = require('mongoose');
const User = mongoose.model('User');
const Company = mongoose.model('Company');
const passport = require('passport');
const escapeStringRegexp = require('escape-string-regexp');

const {UserStatus, UserScope} = require('../models/User.js');
const {CompanyStatus, BusinessType} = require('../models/Company.js');

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports.validateUser = (req, res, next) => {

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

    if (err) {
      console.error(err);
      return res.status(500);
    }

    if (user) {
      console.warn(`User already registered: ${email}`);
      return res.status(400).send({ message: 'Email already registered.' });
    }
    next()

  });
};

module.exports.validateCompany = (req, res, next) => {

  const { company_name, company_address, business_type } = req.body;

  if (!company_name || !company_name.trim()) {
    return res.status(400).send({ message: 'You must supply a company_name. Try again.' });
  }

  if (!company_address || !company_address.trim()) {
    return res.status(400).send({ message: 'You must supply a company_address. Try again.' });
  }

  if (!business_type || !Company.validBusinessType(business_type)) {
    return res.status(400).send({ message: 'You must supply a business_type. Try again.' });
  }

  // search for other businesses with same name (case insensitive)
  const companyRegExp = new RegExp(escapeStringRegexp(company_name), 'i');

  Company.findOne({ name: companyRegExp }, (err, comp) => {

    if (err) {
      console.error(err);
      return res.status(500);
    }

    if (comp) {
      console.warn(`Company already registered: ${company_name}`);
      return res.status(400).send({ message: 'Company already registered.' });
    }
    next()

  });
}

exports.signupRegularPassword = (req, res) => {

  const { email, password, first_name, last_name } = req.body;

  new User({ email, first_name, last_name, status: UserStatus.Active, scope: UserScope.Customer })
    .create(password)
    .then(({auth_token}) => {
      res.status(201).send({auth_token});
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

exports.signupOwnerPassword = (req, res) => {

  const { email, password, first_name, last_name, company_name, company_address, business_type } = req.body;

  new Company({ business_type, name: company_name, address: company_address, status: CompanyStatus.Active })
    .save()
    .then(company => {
      return new User({ company, email, first_name, last_name, status: UserStatus.Active, scope: UserScope.Owner })
        .create(password);
    })
    .then((user) => {
      const {auth_token, company} = user;
      const {_id: company_id} = company;
      res.status(201).send({auth_token, company_id});
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

exports.signup = async (req, res, next) => {
  const { email, first_name, last_name, password } = req.body;
  const user = new User({ email, first_name, last_name });
  await User.register(user, password, (err, user) => {
    if (err) return console.log(err);
    next();
  });
};

exports.loginWithPassword = (req, res) => {
  const {email, scan_code, scope} = req.user;
  res.status(200).json({email, scan_code, scope});
};

exports.getMe = (req, res, next) => {
  const {auth_token, scan_code, scope} = req.user;
  res.status(200).json({auth_token, scan_code, scope});
};

exports.logout = (req, res, next) => {
  req.logout();
  res.status(200).send({ message: 'You are logged out.' });
};
