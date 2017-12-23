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
      <div className="fixed__header">
        <div className="container">
          <Link to="/" className="brand__link">Fidelify</Link>
            {
              this.props.auth_token ?
              <ul>
                <li>
                  <Link to="/account">Account</Link>
                </li>
                <li>
                  <a onClick={this.logoutUser}>Logout</a>
                </li>
              </ul> :
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>
              </ul>
            }
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth_token: auth.auth_token };
}
export default connect(mapStateToProps, actions)(FixedHeader);
