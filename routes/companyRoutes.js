const passport = require('passport');
const companyController = require('../controllers/companyController');

module.exports = (app) => {

  app.get('/api/company',
    passport.authenticate('bearer', {session: false}),
    companyController.list
  );

};
