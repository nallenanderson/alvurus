const mongoose = require('mongoose');
const config = require('config');
const Purchase = mongoose.model('Purchase');
const Location = mongoose.model('Location');
const { PurchaseStatus } = require('../models/Purchase');
const { pick } = require('lodash');
const { ObjectId } = mongoose.Types;

const ListPageSize = config.get('modules.purchase.list.pageSize');

exports.validate = (req, res, next) => {

  const { amount, location, company, description } = req.body;
  const { userId } = req.params;

  if (!amount || amount <= 0) {
    return res.status(400).send({ message: 'You must supply an amount. Try again.' });
  }

  if (!description || description <= 0) {
    return res.status(400).send({ message: 'You must supply an description. Try again.' });
  }

  if (!ObjectId.isValid(location)) {
    return res.status(400).send({ message: 'You must supply a valid location.' });
  }

  if (!ObjectId.isValid(company)) {
    return res.status(400).send({ message: 'You must supply a valid company.' });
  }

  if (!ObjectId.isValid(userId)) {
    return res.status(400).send({ message: 'You must supply a valid user.' });
  }
  next();
};

exports.save = async (req, res) => {

  const { amount, location, company, description } = req.body;
  const { userId: user } = req.params;
  const status = PurchaseStatus.Active;

  const loc = await Location.findById(location).populate('company');

  if (!loc) {
    return res.status(404).send({ message: 'Location not found.' });
  }
  else if (String(loc.company._id) !== String(req.user.company._id)) {
    return res.status(401).send({ message: 'Location outside postee\'s company.' });
  }

  const purchase = new Purchase({ amount, location, company, description, user, status });

  await purchase.save();

  const { id } = purchase;

  res.status(200).json(Object.assign({ id } , pick(purchase, ['amount', 'location', 'company', 'description', 'user', 'status'])));

};

// exports.list = async (req, res) => {
//
//   const { page, status } = req.query;
//   const skip = page >= 0 ? ListPageSize * page : 0;
//   let query = { };
//
//   if (status >= 0) {
//     query = Object.assign(query, { status });
//   }
//
//   const locations = await Location.find(query, 'name address status company', { skip, limit: ListPageSize });
//
//   res.status(200).json(locations.map(({_id: id, name, address, status, company}) => {
//     return {id, name, address, status, company}
//   }));
// };
//
// exports.get = async (req, res) => {
//
//   const { id: _id } = req.params;
//
//   if (!ObjectId.isValid(_id)) {
//     return res.status(400).send({ message: 'You must supply a valid id.' });
//   }
//
//   const query = Location.excludeDeleted({_id});
//   const location = await Location.findOne(query);
//
//   if (!location) {
//     res.status(404).end();
//   }
//   res.status(200).json(({id, name, address, status, company} = location));
// };
//
// exports.delete = async (req, res) => {
//
//   const { id: _id } = req.params;
//
//   if (!ObjectId.isValid(_id)) {
//     return res.status(400).send({ message: 'You must supply a valid id.' });
//   }
//
//   const query = Location.excludeDeleted({_id});
//   const location = await Location.findOne(query);
//
//   if (!location) {
//     res.status(404).end();
//   }
//   location.status = LocationStatus.Deleted;
//   await location.save();
//   res.status(200).json(({id, name, address, status, company} = location));
// };
