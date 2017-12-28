import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import InputField from './inputField';
import Locations from './locations';
import CheckList from './checkList';

const FIELDS = [
  {
    id: 'asb1c23',
    label: 'Company name',
    fieldName: 'company_name',
    fieldType: 'text',
  },
  {
    id: 'asb12c3',
    label: 'Company description',
    fieldName: 'company_description',
    fieldType: 'text',
  }
]

class Account extends Component {
  state = { createText: 'Save', businessTypes: {} }

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
      company_description: this.state.company_address,
      business_type: this.state.business_type,
      auth_token: this.props.auth_token
    };

    const response = await this.props.createCompany('/api/user/company/create', 'POST', body);

    console.log(response);
  }

  assignType = (type) => {
    const { businessTypes } = this.state;

    if (businessTypes[type]) {
      businessTypes[type] = false;
    } else {
      businessTypes[type] = true;
    }

    this.setState({ businessTypes });
  }

  render() {
    if (!this.props.auth_token) return <Redirect to="/" />

    return(
      <div className="main__section row">

        <div className="col s6">
          <form className="reservation__form" onSubmit={this.handleSubmit}>
            
            <h1>Company Info</h1>

            { this.renderInput() }

            <CheckList />

            <button type="submit" className="submit__button">{this.state.createText}</button>

          </form>
        </div>
        <Locations />
      </div>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth_token: auth.auth_token };
}

export default connect(mapStateToProps, actions)(Account);
