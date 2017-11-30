const apiController = require('../controllers/apiController');

module.exports = (app) => {
  app.get('/api', apiController.home);
}
