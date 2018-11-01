import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Score from '../components/Score.jsx';


const mapStateToProps = store => ({
  score: store.gameReducer.score,
  gameStarted: store.gameMenuReducer.gameStarted,
});

const mapDispatchToProps = dispatch => ({

});

const FooterContainer = (props) => {
  const { score, gameStarted } = props;

  let about = <span className=""><NavLink to="/about">About</NavLink></span>;
  let privacyPolicy = <span className=""><NavLink to="/privacy-policy">Privacy Policy</NavLink></span>;
  let termsOfService = <span className=""><NavLink to="/terms-of-service">Terms of Service</NavLink></span>;
  let contact = <span>Contact</span>;
  let footerScore = '';
  console.log('footer location ', window.location.pathname);

  if (gameStarted) {
    footerScore = <Score score={score} />;
    about = '';
    privacyPolicy = '';
    termsOfService = '';
    contact = '';
  }

  return (
    <div className="FooterContainer">
      <span>{about}</span>
      <span>{privacyPolicy}</span>
      <span>{termsOfService}</span>
      <span>{contact}</span>
      <div>{footerScore}</div>
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);
