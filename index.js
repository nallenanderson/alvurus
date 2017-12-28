const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');
const { connections, cookies } = require('config');

require('./models/Company');
require('./models/Location');
require('./models/Promo');
require('./models/User');
require('./models/Purchase');
require('./utils/passport');

mongoose.Promise = global.Promise;
mongoose.connect(connections.core, { useMongoClient: true });

const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

// ROUTES
require('./routes/apiRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/companyRoutes')(app);
require('./routes/locationRoutes')(app);
require('./routes/promoRoutes')(app);
require('./routes/purchaseRoutes')(app);

// PROD VS. DEV
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(process.env.PORT || 5000);
