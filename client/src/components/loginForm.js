import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FacebookAuth from 'react-facebook-auth';
import { connect } from 'react-redux';

import * as actions from '../actions';

import InputField from './inputField';
import FBLoginButton from './fbLoginButton';

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

class LoginForm extends Component {
  state = {
    loginText: 'Login'
  };

  componentDidMount() {
    this.props.ownerLogin();
  }

  updateField = (value, name) => {
    if (!value) return;

    this.setState({ [name]: value });
  }

  renderInput = () => {
    return FIELDS.map(field => <InputField key={field.id} {...field} updateField={this.updateField} />);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loginText: 'Logging in...', error: null });

    const body = {
      email: this.state.email,
      password: this.state.password
    }

    const loginMessage = await this.props.getOwnerLogin('/api/user/login/password', 'POST', body);

    if (loginMessage.message) return this.setState({ error: loginMessage.message, loginText: 'Login' });
  }

  render() {
    if (this.props.auth_token) return <Redirect to="/account" />

    return(
      <div>
        <form className="reservation__form" onSubmit={this.handleSubmit}>
          <h1 className="centered">Login</h1>
          { this.renderInput() }
          <button type="submit" className="submit__button">{this.state.loginText}</button>
          <div className="separator"></div>
            <FacebookAuth
              appId="410759349341376"
              callback={(res) => this.props.loginFB(res)}
              component={FBLoginButton}
            />
          {
            this.state.error ?
            <p className="error__message">{this.state.error}</p> : null
          }
        </form>

      </div>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth_token: auth.auth_token };
}

export default connect(mapStateToProps, actions)(LoginForm);
