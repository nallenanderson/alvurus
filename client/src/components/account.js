import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import InputField from './inputField';

const FIELDS = [
  {
    id: 'asb1c23',
    label: 'Company name',
    fieldName: 'company_name',
    fieldType: 'text',
  },
  {
    id: 'asb12c3',
    label: 'Company Address',
    fieldName: 'company_address',
    fieldType: 'text',
  },
  {
    id: 'asbc123',
    label: 'Business type',
    fieldName: 'business_type',
    fieldType: 'text',
  }
]

class Account extends Component {
  state = { createText: 'Create Company' }

  updateField = (value, name) => {
    if (!value) return;

    this.setState({ [name]: value });
  }

  renderInput = () => {
    return FIELDS.map(field => <InputField key={field.id} {...field} updateField={this.updateField} />);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      company_name: this.state.company_name,
      company_address: this.state.company_address,
      business_type: this.state.business_type,
      auth_token: this.props.auth_token
    };

    const response = await this.props.createCompany('/api/user/company/create', 'POST', body);

    console.log(response);
  }

  render() {
    if (!this.props.auth_token) return <Redirect to="/" />

    return(
      <div className="infinity__section">
        <form className="reservation__form" onSubmit={this.handleSubmit}>
          <h1>Company Info</h1>
          { this.renderInput() }
          <button type="submit" className="submit__button">{this.state.createText}</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth_token: auth.auth_token };
}

export default connect(mapStateToProps, actions)(Account);
