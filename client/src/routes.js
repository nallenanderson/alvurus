import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import FixedHeader from './components/header';
import App from './components/app';
import Account from './components/account';
import Login from './components/login';
import Signup from './components/signup';
import NotFound from './components/notFound';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <FixedHeader />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/app" component={App} />
              <Route exact path="/account" component={Account} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth_token: auth.auth_token };
}

export default connect(mapStateToProps)(Router);
