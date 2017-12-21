import React, { Component } from 'react';

import LoginForm from './loginForm';

export default class Login extends Component {
  state = {};

  render() {
    return(
      <div className="infinity__section">
        <LoginForm />
      </div>
    )
  }
}
