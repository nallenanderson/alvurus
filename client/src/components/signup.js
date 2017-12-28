import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SignUpForm from './signupForm';

export default class Signup extends Component {
  render() {
    return(
      <div className="main__section row">
        <div className="col s6 offset-s3">
          <SignUpForm />
          <p className="centered">Already a member? <Link to="/login">Login</Link> here.</p>
        </div>
      </div>
    )
  }
}
