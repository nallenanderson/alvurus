import React, { Component } from 'react';

export default class InputField extends Component {
  state = {
    focus: false,
    dirty: false
  }

  render() {
    const dirty = this.state.dirty ? 'dirty__input' : '';
    return(
      <div className="input__field">
        <input
          type={this.props.fieldType}
          onChange={(e) => this.props.updateField(e.target.value, this.props.fieldName)}
          onFocus={() => this.setState({ focus: true, dirty: true })}
          onBlur={() => this.setState({ focus: false })}
        />
      <label className={dirty}>{this.props.label}</label>
      </div>
    )
  }
}
