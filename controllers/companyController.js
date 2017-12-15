const mongoose = require('mongoose');
const User = mongoose.model('User');
const Company = mongoose.model('Company');
const escapeStringRegexp = require('escape-string-regexp');

const {UserStatus, UserScope} = require('../models/User.js');
const {CompanyStatus, BusinessType} = require('../models/Company.js');

const saveCompany = ({company_name, company_address, business_type}) => {

  const status = CompanyStatus.Active;

  return new Company({ business_type, status, name: company_name, address: company_address }).save();
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

exports.getMe = (req, res, next) => {
  const {auth_token, scan_code, scope} = req.user;
  res.status(200).json({auth_token, scan_code, scope});
};
