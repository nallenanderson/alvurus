import React, { Component } from 'react';

import SignUpForm from './signupForm';

export default class Signup extends Component {
  state = {}

  componentDidMount () {
    fetch('/api/current_user')
      .then(data => data.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div className="infinity__section">
        <SignUpForm />
      </div>
    )
  }
}
