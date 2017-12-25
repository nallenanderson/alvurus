const mongoose = require('mongoose');
const validator = require('validator');
const { Schema }  = mongoose;

const Status = {
  Active: 0
};

const modelSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: 'Please provide promo name.'
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  description: {
    type: String,
    trim: true,
    require: 'Please provide promo description.'
  },
  status: {
    type: Number,
    require: 'Please provide promo status.'
  },
  date: {
    type: Number,
    require: 'Please provide promo date.'
  }
});

const Model = mongoose.model('Promo', modelSchema);

module.exports = { PromoStatus: Status, Promo: Model };
