import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FacebookAuth from 'react-facebook-auth';
import { connect } from 'react-redux';

import * as actions from '../actions';
import InputField from './inputField';
import FBLoginButton from './fbLoginButton';

const FIELDS = [
  {
    id: 'asb1c23',
    label: 'First name',
    fieldName: 'first_name',
    fieldType: 'text',
  },
  {
    id: 'asb12c3',
    label: 'Last name',
    fieldName: 'last_name',
    fieldType: 'text',
  },
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

class SignupForm extends Component {
  state = { submitting: false };

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
    this.setState({ loginText: 'Signing up...', error: null });

    const body = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };

    const user = await this.props.getOwnerLogin(
      '/api/user/regular/signup/password',
      'POST',
      body
    );

    if (user.message) {
      return this.setState({ error: user.message, submitting: false });
    } else {
      this.setState({ submitting: false });
    }
  }

  render() {
    if (this.props.auth_token) return <Redirect to="/account" />

    return(
      <form className="reservation__form" onSubmit={this.handleSubmit}>
        <h1 className="centered">Sign up</h1>

        { this.renderInput() }

        <button type="submit" className="submit__button">Sign up</button>

        <div className="progress">
          {
            this.state.submitting ?
            <div className="indeterminate"/> : <div className="determinate grey"/>
          }
        </div>

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
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth_token: auth.auth_token };
}

export default connect(mapStateToProps, actions)(SignupForm)
