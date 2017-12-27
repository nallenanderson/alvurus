import React, { Component } from 'react';
import { Collapsible, CollapsibleItem } from 'react-materialize';

import InputField from './inputField';

const FIELDS = [
  {
    id: 'jjhfi123',
    label: 'Location name',
    fieldName: 'location_name',
    fieldType: 'text',
  },
  {
    id: 'asdfads99',
    label: 'Location address',
    fieldName: 'location_address',
    fieldType: 'text',
  }
]

export default class Locations extends Component {

  state = { addLocation: false, locations: [] };

  renderInputs = () => {
    return FIELDS.map(field => <InputField key={field.id} {...field} updateField={this.updateField} />)
  }

  updateField = (value, name) => {
    if (!value) return;

    this.setState({ [name]: value });
  }

  renderLocations = () => {
    return this.state.locations.map(location => {
      return (
        <CollapsibleItem header={location.location_name} key={location.id}>
      		<div>
            Morther fucker
          </div>
          <i className="material-icons">delete</i>
      	</CollapsibleItem>
      )
    });
  }

  addLocation = () => {
    const locations = [...this.state.locations,
      {
        id: new Date(),
        location_name: this.state.location_name,
        location_address: this.state.location_address
      }
    ];

    this.setState({ locations, location_name: '', location_address: '', addLocation: false });
  }

  render() {
    return(
      <div className="row">
        <div className="col s6">
          <div className="reservation__form">
            <h1>Company Locations</h1>
            <p>Add any physical locations that you may have.</p>
            {
              this.state.addLocation ?
              <div>
                { this.renderInputs() }
                <button className="submit__button secondary__button"
                  onClick={this.addLocation}
                  disabled={!this.state.location_name || !this.state.location_address}
                >
                  Add
                </button>
              </div>
              :
              <div className="input-field">
                <button className="submit__button secondary__button" onClick={() => this.setState({ addLocation: !this.state.addLocation })} >Add Location</button>
              </div>
            }

            {
              this.state.locations.length > 0 ?
              <div className="input-field">
                <Collapsible accordion>
                  { this.renderLocations() }
                </Collapsible>
              </div> : null
            }


          </div>
        </div>
      </div>
    )
  }
}
