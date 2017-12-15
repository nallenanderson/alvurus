const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('config');

const {connections, cookies } = config;

require('./models/Company');
require('./models/User');
require('./utils/passport');

mongoose.Promise = global.Promise;
mongoose.connect(connections.core, { useMongoClient: true });

const app = express();

app.use(bodyParser.json());

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [cookies.key]
//   })
// );

app.use(passport.initialize());
//app.use(passport.session());

// ROUTES
require('./routes/apiRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/companyRoutes')(app);

// PROD VS. DEV
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(process.env.PORT || 5000);
