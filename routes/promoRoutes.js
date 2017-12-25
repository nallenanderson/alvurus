const passport = require('passport');
const userController = require('../controllers/userController');
const companyController = require('../controllers/companyController');
const promoController = require('../controllers/promoController');
const { UserScope } = require('../models/User.js');

module.exports = (app) => {

  app.get('/api/company/:companyId/promo/',
    passport.authenticate('bearer', {session: false}),
    userController.enforceScope(UserScope.Owner, UserScope.Employee),
    companyController.enforceCompanyAccess,
    promoController.list
  );

  app.get('/api/company/:companyId/promo/:id',
    passport.authenticate('bearer', {session: false}),
    userController.enforceScope(UserScope.Owner),
    companyController.enforceCompanyAccess,
    promoController.get
  );

  app.post('/api/company/:companyId/promo/',
    passport.authenticate('bearer', {session: false}),
    userController.enforceScope(UserScope.Owner),
    companyController.enforceCompanyAccess,
    promoController.validate,
    promoController.save
  );

  // TODO: What rules applies to updating a promo?
  // app.post('/api/company/:companyId/promo/:id',
  //   passport.authenticate('bearer', {session: false}),
  //   userController.enforceScope(UserScope.Owner),
  //   companyController.enforceCompanyAccess,
  //   promoController.validate,
  //   promoController.save
  // );

  // app.delete('/api/company/:companyId/promo/:id',
  //   passport.authenticate('bearer', {session: false}),
  //   userController.enforceScope(UserScope.Owner),
  //   companyController.enforceCompanyAccess,
  //   promoController.delete
  // );

};
