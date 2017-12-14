const mongoose = require('mongoose');
const validator = require('validator');
const config = require('config');
const crypto = require('crypto');
const { Schema }  = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please provide an email address.'
  },
  first_name: {
    type: String,
    trim: true,
    require: 'Please provide your first name.'
  },
  last_name: {
    type: String,
    trim: true,
    require: 'Please provide your last name.'
  },
  auth_token: {
    type: String,
  },
  password: {
    type: String,
    trim: true,
    required: 'Please provide a password.'
  },
  scan_code: {
    type: String,
    trim: true,
  }
});

const {hash, hashInputEncoding, hashOutputEncoding} = config.get('modules.users.password');

const generateHash = (email, password) => {

  const passHash = crypto.createHash(hash);

  passHash.update(`${email}${password}`, hashInputEncoding)
  return passHash.digest(hashOutputEncoding);
};

userSchema.methods.generateHash = function(password) {
  debugger
  const model = this.toObject();
  return generateHash(model.email, password);
};

userSchema.methods.validPassword = function(password) {
  debugger
  const model = this.toObject();
  return generateHash(model.email, password) === model.password;
};

module.exports = mongoose.model('User', userSchema);
