import React, { Component } from 'react'

export default class CheckList extends Component {
  state = {
    restaurant: false,
    bar: false,
    saloon: false,
    drugs: false,
    other: false
  };

  updateState = (item) => {
    this.setState({ [item]: !this.state[item] });
  }

  render() {
    return(
      <div className="row">
        <div className="col s12">
          <p className="faux__label">Business type (select all that apply)</p>
        </div>

        <div className="col s4">
          <p>
            <input
              type="checkbox"
              checked={this.state.restaurant}
              onClick={() => this.updateState('restaurant')}
            />
            <label onClick={() => this.updateState('restaurant')}>Restaurant</label>
          </p>
        </div>
        <div className="col s4">
          <p>
            <input type="checkbox"
              checked={this.state.bar}
              onClick={() => this.updateState('bar')}
            />
            <label onClick={() => this.updateState('bar')}>Bar</label>
          </p>
        </div>
        <div className="col s4">
          <p>
            <input type="checkbox"
              checked={this.state.saloon}
              onClick={() => this.updateState('saloon')}
            />
            <label onClick={() => this.updateState('saloon')}>Saloon</label>
          </p>
        </div>
        <div className="col s4">
          <p>
            <input type="checkbox"
              checked={this.state.drugs}
              onClick={() => this.updateState('drugs')}
            />
            <label onClick={() => this.updateState('drugs')}>Drugs</label>
          </p>
        </div>
        <div className="col s4">
          <p>
            <input type="checkbox"
              checked={this.state.other}
              onClick={() => this.updateState('other')}
            />
            <label onClick={() => this.updateState('other')}>Other</label>
          </p>
        </div>
      </div>
    )
  }
}
