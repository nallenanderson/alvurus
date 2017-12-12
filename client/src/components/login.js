import React, { Component } from 'react';

import LoginForm from './loginForm';

export default class Login extends Component {
  state = {};

  componentDidMount () {
    fetch('/api/penis')
      .then(data => data.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div className="infinity__section">
        <LoginForm />
      </div>
    )
  }
}
