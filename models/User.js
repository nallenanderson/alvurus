const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');
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
  password: {
    type: String,
    trim: true,
    required: 'Please provide a password.'
  }
});

userSchema.methods.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

userSchema.methods.validPassword = (password) => bcrypt.compareSync(password, this.password);

module.exports = mongoose.model('User',userSchema);
