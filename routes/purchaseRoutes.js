const passport = require('passport');
const { enforceScope } = require('../controllers/userController');
const { enforceCompanyAccess } = require('../controllers/companyController');
const { save, validate } = require('../controllers/purchaseController');
const { UserScope } = require('../models/User.js');

module.exports = (app) => {

  app.post('/api/user/:userId/purchase/',
    passport.authenticate('bearer', {session: false}),
    enforceScope(UserScope.Owner, UserScope.Employee),
    enforceCompanyAccess,
    validate,
    save
  );
}
