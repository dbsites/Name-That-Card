import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {
  const { isLoggedIn, loggedInUser, logoutUser, gameLogo, selectedGame } = props;

  let logInOutButton = isLoggedIn
    ? <div className=""><NavLink onClick={() => logoutUser()} to="">Logout</NavLink></div>
    : <div className=""><NavLink to="/login">Login</NavLink></div>;

  const navUsername = isLoggedIn
    ? <div className="nav-item nav-user-item"><span id="loginuser-text">Welcome, {loggedInUser}</span></div>
    : '';

  let signUpButton = isLoggedIn
    ? ''
    : <div className="nav-item nav-button-item"><NavLink to="/signup">Sign Up</NavLink></div>;

  let homeBtn = <div className=""><NavLink to="/">Home</NavLink></div>;

  let xBtn;

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
    const selectedGameRoute = `/gameMenu/${selectedGame}`
    xBtn = <div className=""><NavLink to={selectedGameRoute}>X</NavLink></div>;
  } else if (window.location.pathname === '/login') {
    leaderBoard = '';
    logInOutButton = '';
    xBtn = '';
  } else if (window.location.pathname === '/signup') {
    leaderBoard = '';
    signUpButton = '';
    xBtn = '';
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
        {leaderBoard}
      </div>
    </div>
  );
};

export default Navigation;
