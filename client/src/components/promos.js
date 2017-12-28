import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import MyPromos from './myPromos';
import InputField from './inputField';

const FIELDS = [
  {
    id: 'asb1c23',
    label: 'Promotion name',
    fieldName: 'promo_name',
    fieldType: 'text',
  },
  {
    id: 'asb12c3',
    label: 'Promo description',
    fieldName: 'promo_description',
    fieldType: 'text',
  },
  {
    id: 'hghfka123',
    label: 'Promo expiration date',
    fieldName: 'promo_date',
    fieldType: 'date'
  }
]

class Promos extends Component {

  state = { createText: 'Create Promo' }
  
  renderInputs = () => {
    return FIELDS.map(input => {
      return <InputField key={input.id} {...input} updateField={this.updateField} />
    });
  }

  updateField = (value, name) => {
    if (!value) return;

    this.setState({ [name]: value });
  }

  render() {
    if (!this.props.auth_token) return <Redirect to="/" />

    return(
      <div className="main__section row">
        <MyPromos />
        <div className="col s6">
          <div className="reservation__form">
            <h1>Create Promotion</h1>
            { this.renderInputs() }
            <button type="submit" className="submit__button">{this.state.createText}</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth_token: auth.auth_token };
}

export default connect(mapStateToProps)(Promos);
