const passport = require('passport');
const userController = require('../controllers/userController');

module.exports = (app) => {

  app.post('/api/user/regular/signup/password',
    userController.signupRegularPassword
  );

  app.post('/api/user/login/password',
    passport.authenticate('local', {session: false}),
    userController.loginWithPassword
  );

  app.post('/api/user/login/token',
    passport.authenticate('bearer', {session: false}),
    userController.loginWithToken
  );

  app.get('/api/logout', userController.logout);
}
