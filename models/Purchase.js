const mongoose = require('mongoose');
const validator = require('validator');
const { Schema }  = mongoose;

const Status = {
  Active: 0
};

const modelSchema = new Schema({
  amount: {
    type: String,
    trim: true,
    require: 'Please provide purchase amount.'
  },
  date: {
    type: Number,
    require: 'Please provide purchase date.'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  status: {
    type: Number,
    require: 'Please provide purchase status.'
  },
  description: {
    type: String,
    trim: true,
    require: 'Please provide purchase description.'
  }
});

const Model = mongoose.model('Purchase', modelSchema);

module.exports = { PurchaseStatus: Status, Purchase: Model };
