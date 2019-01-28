import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {
  const { isLoggedIn, loggedInUser, logout, selectedGame, questionNumber } = props;
  let logInOutButton = isLoggedIn
  ? <div className="menu-item hoverStyle"><NavLink onClick={() => logout()} to="">Logout</NavLink></div>
  : <div className="menu-item hoverStyle"><NavLink to="/login">Login</NavLink></div>;
  
  let about = <span className="menu-item hoverStyle"><NavLink to="/about">About</NavLink></span>;
  
  let homeBtn = <div className="menu-item hoverStyle"><NavLink to="/">Home</NavLink></div>;
  
  let xBtn;
  
  let logoUrl = 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-295078398723/Logos+%2B+Icons/' + selectedGame + 'LogoWhite.png';
  
  let logo = <div className="logo"> <img className="gameLogo" src={logoUrl}></img> </div>;
  let homeLogo = <div className="homeLogo"> <img className="homeImgLogo" src='https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-295078398723/Logos+%2B+Icons/GENERALIconWhite.png'></img> </div>; 
  
  if (window.location.pathname === '/') {
    about = '';
    homeBtn = '';
    xBtn = '';
    logo = '';
    document.body.style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-295078398723/Background/ntc-homescreen.jpg')";
  } else if (window.location.pathname === '/gameMenu/' + selectedGame) {
    xBtn = '';
    homeLogo = '';
    document.body.style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-295078398723/Background/" + selectedGame + "Background.jpg')";
  } else if (window.location.pathname === '/privacy-policy' || window.location.pathname === '/terms-of-service' || window.location.pathname === '/forgot-pw' || window.location.pathname.slice(0,6) === '/reset') {
    about = '';
    xBtn = '';
    logo = '';
    document.body.style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-295078398723/Background/ntc-homescreen.jpg')";
  } else if (window.location.pathname === '/about') {
    xBtn = '';
    logo = '';
    document.body.style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-295078398723/Background/" + selectedGame + "Background.jpg')";
  } else if (window.location.pathname === '/game') {
    about = '';
    logInOutButton = '';
    homeBtn = '';
    homeLogo = '';
    document.body.style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-295078398723/Background/" + selectedGame + "Background.jpg')";
    const selectedGameRoute = `/gameMenu/${selectedGame}`
    xBtn = <div className="xButton hoverStyle"><NavLink to={selectedGameRoute}>x</NavLink></div>;
    if (questionNumber === 20) {
      xBtn = <div className="xButton hoverStyle"><NavLink to='/'>x</NavLink></div>;
    }
  } else if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
    about = '';
    logInOutButton = '';
    xBtn = '';
    logo = '';
    document.body.style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-295078398723/Background/ntc-homescreen.jpg')";
  } else if (window.location.pathname === '/admin') {
    about = '';
    xBtn = '';
    logInOutButton = '';
    logo = '';
  } else if (window.location.pathname === '/leaderboard/' + window.location.pathname.slice(13)) {
    xBtn = '';
    homeLogo = '';
    logoUrl = 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-295078398723/Logos+%2B+Icons/' + window.location.pathname.slice(13) + 'LogoWhite.png';
    logo = <div className="logo"> <img className="gameLogo" src={logoUrl}></img> </div>;
    document.body.style.backgroundImage = "url('https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-295078398723/Background/" + window.location.pathname.slice(13) + "Background.jpg')";
  } 
  return (
    <div className="navigation">
      <div className="left-menu">
        {homeLogo}
        {logo}
      </div>
      <div className="right-menu">
        {homeBtn}
        {about}
        {xBtn}
        {logInOutButton}
      </div>
    </div>
  );
};

export default Navigation;
