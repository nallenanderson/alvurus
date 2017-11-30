import React, { Component } from 'react';

import infinity from '../assets/images/infinity.png';

class App extends Component {
  render() {
    return (
      <div className="infinity__section">
        <img src={infinity} className="infinity__image" />
        <h1 className="infinity__title">DOCKING</h1>
      </div>
    );
  }
}

export default App;
