const passport = require('passport');
const userController = require('../controllers/userController');
const companyController = require('../controllers/companyController');

module.exports = (app) => {

  app.post('/api/user/regular/signup/password',
    userController.validateUser,
    userController.signupRegularPassword
  );

  app.post('/api/user/owner/signup/password',
    userController.validateUser,
    companyController.validateCompany,
    userController.signupOwnerPassword
  );

  app.post('/api/user/login/password',
    passport.authenticate('local', {session: false}),
    userController.loginWithPassword
  );

  app.get('/api/user/me',
    passport.authenticate('bearer', {session: false}),
    userController.getMe
  );

  app.get('/api/logout', userController.logout);
}
