import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/app';
import Login from './components/login';
import Signup from './components/signup';
import NotFound from './components/notFound';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <div className="container">
          <Switch>
            <Route path="/" component={App} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={Signup} />
            <Route component={NotFound}/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Router;
