const mongoose = require('mongoose');
const config = require('config');
const Location = mongoose.model('Location');
const { LocationStatus } = require('../models/Location');
const { pick } = require('lodash');
const { ObjectId } = mongoose.Types;

const ListPageSize = config.get('modules.locations.list.pageSize');

exports.validate = (req, res, next) => {

  const { name, address } = req.body;
  const { id } = req.params;
  const creating = !id;

  if (creating) {

    if (!name || !name.trim()) {
      return res.status(400).send({ message: 'You must supply a name. Try again.' });
    }

    if (!address) {
      return res.status(400).send({ message: 'You must supply an address. Try again.' });
    }
  }
  else {

    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'You must supply a valid id.' });
    }
  }
  next();
};

exports.save = async (req, res) => {

  const { name, address } = req.body;
  const { companyId: company, id: _id } = req.params;
  const creating = !_id;
  const status = LocationStatus.Active;
  let location;

  if (creating) {
    location = new Location({ company, name, address, status });
  }
  else {

    const query = Location.excludeDeleted({ company, _id });

    location = await Location.findOne(query).populate('company');

    if (!location) {
      return res.status(404).end();
    }

    if (name && name.trim()) location.name = name;
    if (address && address.trim()) location.address = address;

  }
  await location.save();

  const { id } = location;

  res.status(200).json(Object.assign({ id } , pick(location, ['address', 'name', 'status'])));

};

exports.list = async (req, res) => {

  const { page, status } = req.query;
  const skip = page >= 0 ? ListPageSize * page : 0;
  let query = { };

  if (status >= 0) {
    query = Object.assign(query, { status });
  }

  const locations = await Location.find(query, 'name address status company', { skip, limit: ListPageSize });

  res.status(200).json(locations.map(({_id: id, name, address, status, company}) => {
    return {id, name, address, status, company}
  }));
};

exports.get = async (req, res) => {

  const { id: _id } = req.params;

  if (!ObjectId.isValid(_id)) {
    return res.status(400).send({ message: 'You must supply a valid id.' });
  }

  const query = Location.excludeDeleted({_id});
  const location = await Location.findOne(query);

  if (!location) {
    res.status(404).end();
  }
  res.status(200).json(({id, name, address, status, company} = location));
};

exports.delete = async (req, res) => {

  const { id: _id } = req.params;

  if (!ObjectId.isValid(_id)) {
    return res.status(400).send({ message: 'You must supply a valid id.' });
  }

  const query = Location.excludeDeleted({_id});
  const location = await Location.findOne(query);

  if (!location) {
    res.status(404).end();
  }
  location.status = LocationStatus.Deleted;
  await location.save();
  res.status(200).json(({id, name, address, status, company} = location));
};
