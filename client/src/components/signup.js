import React, { Component } from 'react';

import SignUpForm from './signupForm';

export default class Signup extends Component {
  async componentDidMount() {
    const user = await fetch('/api/user/me', {
      headers: {
        'Authorization': 'Bearer 7bcee5cc-253e-47d4-af00-1a6443eae2cd'
      }
    }).then(data => data.json());
    console.log(user);
  }
  render() {
    return(
      <div className="infinity__section">
        <SignUpForm />
      </div>
    )
  }
}
