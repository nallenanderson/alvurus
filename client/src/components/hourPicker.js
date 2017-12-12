import React, { Component } from 'react';
import ReactMaterialSelect from 'react-material-select';

import 'react-material-select/lib/css/reactMaterialSelect.css'

export default class HourPicker extends Component {
  state = {
    time: null
  }

  render() {
    return (
      <ReactMaterialSelect
        onChange={(time) => this.setState({ time })}
        defaultValue="0"
        resetLabel={false}
      >
        <option dataValue="0" className="hidden">Select time</option>
        <option dataValue="good">12:30 p.m.</option>
        <option dataValue="cool">1:30 p.m.</option>
        <option dataValue="less">4:00 p.m.</option>
      </ReactMaterialSelect>
    )
  }
}
