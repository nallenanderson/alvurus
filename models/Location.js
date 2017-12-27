const mongoose = require('mongoose');
const validator = require('validator');
const { Schema }  = mongoose;

const Status = {
  Active: 0,
  Deleted: 1
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

modelSchema.statics.excludeDeleted = function(query) {
  return Object.assign(query, {
    status: {
      $ne : Status.Deleted
    }
  });
};

const Model = mongoose.model('Location', modelSchema);


module.exports = { LocationStatus: Status, Location: Model };
