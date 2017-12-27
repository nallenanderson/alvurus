import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions';

class FixedHeader extends Component {

  logoutUser = () => {
    this.props.userLogout();
  }

  render() {
    return(
      <div className="navbar-fixed">
        <nav className="black__back">
          <div className="nav-wrapper container">
            <Link className="brand-logo left" to="/">Fidelify</Link>
            {
              this.props.auth_token ?
              <ul id="nav-mobile" className="right hide-on-small-and-down">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/promos">Promotions</Link></li>
                <li><Link to="/account">Account</Link></li>
                <li><a onClick={this.logoutUser}>Logout</a></li>
              </ul> :
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </ul>
            }
          </div>
        </nav>
      </div>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth_token: auth.auth_token };
}

export default connect(mapStateToProps, actions)(FixedHeader);
