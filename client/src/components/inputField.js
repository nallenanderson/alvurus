import React, { Component } from 'react';
import { Input, Row } from 'react-materialize';

export default class InputField extends Component {
  state = {
    focus: false,
    dirty: false,
    value: ''
  }

  updateField = (e) => {
    const { value } = e.target;

    this.setState({ value });
    this.props.updateField(value, this.props.fieldName)
  }

  render() {
    const dirty = this.state.value.length > 0 || this.state.focus ? 'active' : null;

    if (this.props.fieldType === 'date') {
      return (
        <div className="input-field">
          <Row>
            <Input name='on' className="col-s12" type='date' onChange={this.updateField} />
            <label className={dirty}>{this.props.label}</label>
          </Row>
        </div>
      )
    }
    return(
      <div className="input-field">
        <input
          type={this.props.fieldType}
          onChange={this.updateField}
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
        />
      <label className={dirty}>{this.props.label}</label>
      </div>
    )
  }
}
