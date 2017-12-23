const passport = require('passport');
const userController = require('../controllers/userController');
const companyController = require('../controllers/companyController');
const { UserScope } = require('../models/User.js');

module.exports = (app) => {

  app.get('/api/company',
    passport.authenticate('bearer', {session: false}),
    companyController.list
  );

  app.post('/api/company/:companyId/location/',
    passport.authenticate('bearer', {session: false}),
    userController.enforceScope(UserScope.Owner),
    companyController.enforceCompanyAccess,
    companyController.validateLocation,
    companyController.saveLocation
  );

  app.post('/api/company/:companyId/location/:locationId',
    passport.authenticate('bearer', {session: false}),
    userController.enforceScope(UserScope.Owner),
    companyController.enforceCompanyAccess,
    companyController.validateLocation,
    companyController.saveLocation
  );

};
