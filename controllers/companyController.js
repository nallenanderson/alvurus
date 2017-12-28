const mongoose = require('mongoose');
const config = require('config');
const Company = mongoose.model('Company');
const User = mongoose.model('User');
const escapeStringRegexp = require('escape-string-regexp');
const { CompanyStatus, BusinessType } = require('../models/Company');

const ListPageSize = config.get('modules.companies.list.pageSize');

exports.validate = (req, res, next) => {

  const { company_name, business_type } = req.body;

  if (!company_name || !company_name.trim()) {
    return res.status(400).send({ message: 'You must supply a company_name. Try again.' });
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

exports.list = (req, res) => {

  const { page, status, business_type } = req.query;
  const skip = page >= 0 ? ListPageSize * page : 0;
  let query = { };

  if (status >= 0) {
    query = Object.assign(query, { status });
  }

  if (business_type) {
    query = Object.assign(query, { business_type });
  }

  Company
    .find(query, 'name address business_type',{ skip, limit: ListPageSize })
    .exec()
    .then((companies) => {

      res.status(200).json(companies.map(({_id: id, name, address, business_type}) => {
        return {id, name, address, business_type}
      }));

    })
    .catch((err) => {
      console.error(err);
      return res.status(500);
    })
};

exports.enforceCompanyAccess = async (req, res, next) => {

    const { company } = req.user;
    let companyId;

    if (req.params.companyId) {
      companyId = req.params.companyId;
    }
    else {
      companyId = req.body.company;
    }

    if (company && String(company._id) === companyId) {
      return next();
    }
    res.status(401).end();

};
