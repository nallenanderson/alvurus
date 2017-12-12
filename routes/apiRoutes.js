const apiController = require('../controllers/apiController');

module.exports = (app) => {
  app.get('/api/penis', apiController.home);
}
