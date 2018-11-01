import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
  render() {
    const { isLoggedIn, loggedInUser, logoutUser, gameLogo, selectedGame, location } = this.props;
    console.log('Nav navigation pathname: ', window.location.pathname);

    let logInOutButton = isLoggedIn ?
      <div className=""><button className="" onClick={() => { logoutUser(); }}>Logout</button></div> :
      <div className=""><NavLink to="/login">Login</NavLink></div>;

    let navUsername = isLoggedIn ?
      <div className="nav-item nav-user-item"><span id="loginuser-text">Welcome, {loggedInUser}</span></div> :
      '';

    let signUpButton = isLoggedIn ?
      '' :
      <div className="nav-item nav-button-item"><NavLink to="/signup">Sign Up</NavLink></div>;

    let homeBtn = <div className=""><NavLink to="/">Home</NavLink></div>;

    let xBtn = <div className="" ><NavLink to="/gameMenu">X</NavLink></div>;
    
    let logo = <p>General Logo</p>;

    let leaderBoard = '';

    if (window.location.pathname === '/') {
      leaderBoard = '';
      homeBtn = '';
      xBtn = '';
    } else if (window.location.pathname === '/gameMenu') {
      logo = <p>Game Logo</p>;
      leaderBoard = '<LeaderBoard selectedGame={selectedGame}/>';
      xBtn = '';
    } else if (window.location.pathname === '/game') {
      logo = <p>Game Logo</p>;
      logInOutButton = '';
      homeBtn = '';
      signUpButton = '';
    } else if(window.location.pathname === '/login') {
      leaderBoard = ''
      logInOutButton = '';
      xBtn = '';    
    } else if (window.location.pathname === '/signup') {
      leaderBoard = '';
      signUpButton = '';
      xBtn = '';
    }            
    return(
      <div className="navigation">
        {logo}
        {homeBtn} 
        {xBtn}               
        <div id="menu-container">
          <div id="right-menu">
            {navUsername}
            {logInOutButton}
            {signUpButton}
            {leaderBoard}
          </div>
        </div>
      </div>
    );
  }
}


export default Navigation;
