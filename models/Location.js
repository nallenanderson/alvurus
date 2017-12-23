const mongoose = require('mongoose');
const validator = require('validator');
const { Schema }  = mongoose;

const LocationStatus = {
  Active: 0
};

const modelSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: 'Please provide Location name.'
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  address: {
    type: String,
    trim: true,
    require: 'Please provide Location address.'
  },
  status: {
    type: Number,
    require: 'Please provide Location status.'
  }
});

const Model = mongoose.model('Location', modelSchema);

module.exports = { LocationStatus, Location: Model };
