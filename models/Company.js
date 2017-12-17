const mongoose = require('mongoose');
const validator = require('validator');
const { Schema }  = mongoose;

const CompanyStatus = {
  Active: 0
};

const BusinessType = {
  Restaurant: 0
};

const companySchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: 'Please provide company name.'
  },

  // Creo que podemos incluir company address con los locales, no?
  address: {
    type: String,
    trim: true,
    require: 'Please provide company address.'
  },
  status: {
    type: Number,
    require: 'Please provide company status.'
  },
  business_type: {
    type: Number,
    require: 'Please provide business type.'
  }
});

companySchema.statics.validBusinessType = function(businessType) {
  return Number(businessType) < Object.keys(BusinessType).length && Number(businessType) >= 0;
};

const Company = mongoose.model('Company', companySchema);

module.exports = { CompanyStatus, BusinessType, Company };
