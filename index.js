const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const app = express();
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: 'n@SWOfIc14V9m6mPjzW9tHdT'
  })
);

// app.use(passport.initialize());
// app.use(passport.session());

// ROUTES
require('./routes/apiRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })

}

app.listen(process.env.PORT || 5000);
