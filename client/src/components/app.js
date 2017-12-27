import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import DatePicker from './datePicker';
import HourPicker from './hourPicker';

class App extends Component {

  createUser = () => {
    const body = {
      first_name: 'Nathan',
      last_name: 'Anderson',
      email: 'nallenanderson@gmail.com',
      password: 'hello123',
      confirm_password: 'hello123'
    };

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(data => data.json())
      .then(res => console.log(res));
  }

  render() {
    // if (!this.props.auth_token) return <Redirect to="/" />

    return (
      <div className="infinity__section">
        <div className="reservation__form">
          <h1>Something</h1>
          <DatePicker />
          <HourPicker />
        </div>
        <button onClick={this.createUser}>Create</button>
      </div>
    );
  }
}

function mapStateToProps ({ auth }) {
  return { auth_token: auth.auth_token };
}

export default connect(mapStateToProps)(App);
