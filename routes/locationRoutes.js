const passport = require('passport');
const userController = require('../controllers/userController');
const companyController = require('../controllers/companyController');
const locationController = require('../controllers/locationController');
const { UserScope } = require('../models/User.js');

module.exports = (app) => {

  app.get('/api/company/:companyId/location/',
    passport.authenticate('bearer', {session: false}),
    userController.enforceScope(UserScope.Owner, UserScope.Employee),
    companyController.enforceCompanyAccess,
    locationController.list
  );

  app.get('/api/company/:companyId/location/:id',
    passport.authenticate('bearer', {session: false}),
    userController.enforceScope(UserScope.Owner),
    companyController.enforceCompanyAccess,
    locationController.get
  );

  app.post('/api/company/:companyId/location/',
    passport.authenticate('bearer', {session: false}),
    userController.enforceScope(UserScope.Owner),
    companyController.enforceCompanyAccess,
    locationController.validate,
    locationController.save
  );

  app.post('/api/company/:companyId/location/:id',
    passport.authenticate('bearer', {session: false}),
    userController.enforceScope(UserScope.Owner),
    companyController.enforceCompanyAccess,
    locationController.validate,
    locationController.save
  );

  app.delete('/api/company/:companyId/location/:id',
    passport.authenticate('bearer', {session: false}),
    userController.enforceScope(UserScope.Owner),
    companyController.enforceCompanyAccess,
    locationController.delete
  );

};
