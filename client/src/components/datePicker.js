import React, { Component } from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

export default class DatePicker extends Component {
  state = {
    date: null,
    focused: false
  }

  render() {
    const BAD_DATES = [moment('12/4/2017'), moment('12/7/2017')];

    const isDayBlocked = day => BAD_DATES.filter(d => d.isSame(day, 'day')).length > 0;

    return <SingleDatePicker
      date={this.state.date}
      onDateChange={date => this.setState({ date })}
      focused={this.state.focused}
      onFocusChange={({ focused }) => this.setState({ focused })}
      numberOfMonths={1}
      daySize={50}
      withPortal={true}
      isDayBlocked={isDayBlocked}
      hideKeyboardShortcutsPanel
      />
  }
}
