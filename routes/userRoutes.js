const passport = require('passport');
const userController = require('../controllers/userController');

module.exports = (app) => {
  app.post('/api/signup',
    userController.validateSignup,
    passport.authenticate('local-signup'),
    userController.login
  );

  app.post('/api/login',
    passport.authenticate('local-login'),
    userController.login
  )

  app.get('/getInfo', userController.isLogged);

  app.get('/api/logout', userController.logout);

  app.get('/api/current_user', (req, res) => {
    if (req.user) return res.json(req.user);
    return res.json({ message: 'You are not signed up' });
  });
}
