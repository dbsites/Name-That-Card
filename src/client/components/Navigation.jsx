import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {

  render() {
    const { isLoggedIn, username, logoutUser } = this.props;
    const logInOutButton = false ?
      <div className="nav-item nav-button-item"><button className="navButton" onClick={() => { logoutUser(); }}>Logout</button></div> :
      <div className="nav-item nav-button-item"><NavLink to="/login">Login</NavLink></div>;
    const navUsername = isLoggedIn ? <div className="nav-item nav-user-item"><span id="loginuser-text">Welcome, paul</span></div> : '';
    const signUpButton = false ? '' : <div className="nav-item nav-button-item"><NavLink to="/signup">Sign Up</NavLink></div>;
    return(
      <div className="navigation">
        <div id="menu-container">
          <div id="right-menu">
            {navUsername}
            {logInOutButton}
            {signUpButton}
          </div>
        </div>
      </div>
    );
  }

}

export default Navigation;
