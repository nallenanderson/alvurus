const mongoose = require('mongoose');
const config = require('config');
const Promo = mongoose.model('Promo');
const { PromoStatus } = require('../models/Promo');
const { pick, indexOf } = require('lodash');
const { ObjectId } = mongoose.Types;

const ListPageSize = config.get('modules.promos.list.pageSize');

exports.validate = (req, res, next) => {

  const { name, company, description } = req.body;
  const { id } = req.params;
  const creating = !id;

  if (creating) {

    if (!name || !name.trim()) {
      return res.status(400).send({ message: 'You must supply a name. Try again.' });
    }

    if (!description) {
      return res.status(400).send({ message: 'You must supply an description. Try again.' });
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

  const { name, description } = req.body;
  const { companyId: company, id: _id } = req.params;
  const creating = !_id;
  const status = PromoStatus.Inactive;
  let promo;

  if (creating) {
    promo = new Promo({ company, name, description, status });
  }
  else {

    // const query = Promo.excludeDeleted({ company, _id });
    //
    // promo = await Promo.findOne(query).populate('company');
    //
    // if (!promo) {
    //   return res.status(404).promo;
    // }
    //
    // if (name && name.trim()) promo.name = name;
    // if (address && address.trim()) promo.address = address;

  }
  await promo.save();

  const { id } = promo;

  res.status(200).json(Object.assign({ id } , pick(promo, ['name', 'company', 'description', 'status', 'date'])));

};

exports.list = async (req, res) => {

  const { page, status } = req.query;
  const skip = page >= 0 ? ListPageSize * page : 0;
  let query = { };

  if (status >= 0) {
    query = Object.assign(query, { status });
  }

  const promos = await Promo.find(query, 'name description status company date', { skip, limit: ListPageSize });

  res.status(200).json(promos.map(({ _id: id, name, description, status, company, date }) => {
    return { id, name, description, status, company, date }
  }));
};

exports.get = async (req, res) => {

  const { id: _id } = req.params;

  if (!ObjectId.isValid(_id)) {
    return res.status(400).send({ message: 'You must supply a valid id.' });
  }

  const query = Promo.excludeDeleted({_id});
  const promo = await Promo.findOne(query);

  if (!promo) {
    res.status(404).end();
  }
  res.status(200).json(({ id, name, description, status, company, date } = promo));
};

exports.delete = async (req, res) => {

  const { id: _id } = req.params;

  if (!ObjectId.isValid(_id)) {
    return res.status(400).send({ message: 'You must supply a valid id.' });
  }

  const query = Promo.excludeDeleted({_id});
  const promo = await Promo.findOne(query);

  if (!promo) {
    res.status(404).end();
  }
  promo.status = PromoStatus.Deleted;
  await promo.save();
  res.status(200).json(({id, name, address, status, company} = promo));
};

exports.activate = async (req, res) => {

  const { id: _id } = req.params;

  if (!ObjectId.isValid(_id)) {
    return res.status(400).send({ message: 'You must supply a valid id.' });
  }

  const query = Promo.excludeDeleted({_id});
  const promo = await Promo.findOne(query);

  if (!promo) {
    res.status(404).end();
  }
  // check current stattus allows activating
  if (indexOf([PromoStatus.Inactive], promo.status) == -1) {
    return res.status(409).send({ message: 'Current status does not allow this operation.' });
  }
  promo.status = PromoStatus.Active;
  await promo.save();
  res.status(200).end();
};

exports.deactivate = async (req, res) => {

  const { id: _id } = req.params;

  if (!ObjectId.isValid(_id)) {
    return res.status(400).send({ message: 'You must supply a valid id.' });
  }

  const query = Promo.excludeDeleted({_id});
  const promo = await Promo.findOne(query);

  if (!promo) {
    res.status(404).end();
  }
  // check current stattus allows activating
  if (indexOf([PromoStatus.Active], promo.status) == -1) {
    return res.status(409).send({ message: 'Current status does not allow this operation.' });
  }
  promo.status = PromoStatus.Inactive;
  await promo.save();
  res.status(200).end();
};
