const apiController = require('../controllers/apiController');

module.exports = (app) => {
  app.get('/', apiController.home);
}
