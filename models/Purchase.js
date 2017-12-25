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
    require: 'Please provide Purchase date.'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  status: {
    type: Number,
    require: 'Please provide Purchase status.'
  }
});

const Model = mongoose.model('Purchase', modelSchema);

module.exports = { PurchaseStatus: Status, Purchase: Model };
