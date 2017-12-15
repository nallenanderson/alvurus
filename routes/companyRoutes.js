const passport = require('passport');
const userController = require('../controllers/userController');
const companyController = require('../controllers/companyController');

module.exports = (app) => {

  app.get('/api/company',
    passport.authenticate('bearer', {session: false}),
    companyController.list
  );
};
