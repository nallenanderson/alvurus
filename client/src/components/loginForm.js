import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import InputField from './inputField';

const FIELDS = [
  {
    id: 'asbc123',
    label: 'User email',
    fieldName: 'email',
    fieldType: 'email',
  },
  {
    id: 'cdbe123',
    label: 'Password',
    fieldName: 'password',
    fieldType: 'password'
  }
]

export default class LoginForm extends Component {
  state = {};

  updateField = (value, name) => {
    if (!value) return;

    this.setState({ [name]: value });
  }

  renderInput = () => {
    return FIELDS.map(field => <InputField key={field.id} {...field} updateField={this.updateField} />);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const body = {...this.state}

    fetch('/api/user/login/password', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(data => data.json()).then(res => console.log(res))
  }

  render() {
    return(
      <form className="reservation__form" onSubmit={this.handleSubmit}>
        <h1 className="centered">Login</h1>
        { this.renderInput() }
        <button type="submit" className="submit__button">Sign in</button>
        <div className="separator"></div>
        <p>
          Don't have an account? <Link to="/signup" className="page__link">Sign up!</Link>
        </p>
        <a href="/api/logout" className="centered page__link">Logout</a>
      </form>
    )
  }
}
