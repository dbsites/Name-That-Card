import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {
  const { isLoggedIn, loggedInUser, logoutUser, gameLogo, selectedGame } = props;

  let logInOutButton = isLoggedIn
    ? <div className="menu-item"><NavLink onClick={() => logoutUser()} to="">Logout</NavLink></div>
    : <div className="menu-item"><NavLink to="/login">Login</NavLink></div>;

  let navUsername = isLoggedIn
    ? <div className="menu-item"><span id="loginuser-text">Welcome, {loggedInUser}</span></div>
    : '';

  let signUpButton = isLoggedIn
    ? ''
    : <div className="menu-item"><NavLink to="/signup">Sign Up</NavLink></div>;

  let homeBtn = <div className="menu-item"><NavLink to="/">Home</NavLink></div>;

  let xBtn;

  let logo = <div className="logo">NTC</div>;

  if (window.location.pathname === '/') {
    homeBtn = '';
    xBtn = '';
  } else if (window.location.pathname === '/gameMenu') {
    logo;
    xBtn = '';
  } else if (window.location.pathname === '/game') {
    logo;
    logInOutButton = '';
    homeBtn = '';
    signUpButton = '';
    navUsername = '';
    const selectedGameRoute = `/gameMenu/${selectedGame}`
    console.log('selectedGameRoute', selectedGameRoute)
    xBtn = <div className="menu-item"><NavLink to={selectedGameRoute}>X</NavLink></div>;
  } else if (window.location.pathname === '/login') {
    logInOutButton = '';
    xBtn = '';
  } else if (window.location.pathname === '/signup') {
    signUpButton = '';
    xBtn = '';
  } else if (window.location.pathname === '/admin') {
    signUpButton = '';
    xBtn = '';
    logInOutButton = '';
    logo = '';
  }

  return (
    <div className="navigation">
      {logo}
      <div className="right-menu">
        {homeBtn}
        {xBtn}
        {navUsername}
        {logInOutButton}
        {signUpButton}
      </div>
    </div>
  );
};

export default Navigation;
