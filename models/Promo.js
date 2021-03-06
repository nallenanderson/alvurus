const mongoose = require('mongoose');
const validator = require('validator');
const { Schema }  = mongoose;

const Status = {
  Active: 0,
  Inactive: 1,
  Deleted: 2
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

modelSchema.statics.excludeDeleted = function(query) {
  return Object.assign(query, {
    status: {
      $ne : Status.Deleted
    }
  });
};

const Model = mongoose.model('Promo', modelSchema);

module.exports = { PromoStatus: Status, Promo: Model };
