const mongoose = require('mongoose');
const config = require('config');
const Company = mongoose.model('Company');
const Location = mongoose.model('Location');
const escapeStringRegexp = require('escape-string-regexp');
const { CompanyStatus, BusinessType } = require('../models/Company');
const { LocationStatus } = require('../models/Location');
const { pick } = require('lodash');

const ListPageSize = config.get('modules.companies.list.pageSize');

const saveCompany = ({ company_name, company_address, business_type }) => {

  const status = CompanyStatus.Active;

  return new Company({ business_type, status, name: company_name, address: company_address }).save();
};

exports.validateCompany = (req, res, next) => {

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

  const { page, business_type } = req.params
  const skip = ListPageSize * page;
  const status = CompanyStatus.Active;
  const query = { status };

  if (business_type) {
    query = Object.assign(query, {business_type});
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

    const { companyId } = req.params;
    const { company } = req.user;

    if (company && String(company._id) === companyId) {
      return next();
    }
    res.status(401);

};

exports.validateLocation = (req, res, next) => {

  const { id, name, address } = req.body;
  const creating = !id;

  if (creating) {

    if (!name || !name.trim()) {
      return res.status(400).send({ message: 'You must supply a name. Try again.' });
    }

    if (!address) {
      return res.status(400).send({ message: 'You must supply a address. Try again.' });
    }
  }
  next();
};

exports.saveLocation = async (req, res) => {

  const { name, address } = req.body;
  const { companyId: company, id: _id } = req.params;
  const creating = !_id;
  const status = LocationStatus.Active;
  let location;

  if (creating) {
    location = new Location({ company, name, address, status });
  }
  else {

    location = await Location.findOne({ company, _id }).populate('company');

    if (!location) {
      return res.status(404).send({ message: 'Location not found.' });
    }

    if (name && name.trim()) location.name = name;
    if (address && address.trim()) location.address = address;

  }
  await location.save();

  const { id } = location;

  res.status(200).json(Object.assign({ id } , pick(location, ['address', 'name', 'status'])));

};
