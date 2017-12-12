import React, { Component } from 'react';

import DatePicker from './datePicker';
import HourPicker from './hourPicker';

export default class App extends Component {

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
