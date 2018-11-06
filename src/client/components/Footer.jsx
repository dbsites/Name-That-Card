import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Score from './Score.jsx';

const mapStateToProps = store => ({
  score: store.gameReducer.score,
  questionNumber: store.gameReducer.questionNumber,
});

const mapDispatchToProps = dispatch => ({

});

const Footer = (props) => {
  const { score, questionNumber } = props;

  let about = <span className=""><NavLink to="/about">About</NavLink></span>;
  let privacyPolicy = <span className=""><NavLink to="/privacy-policy">Privacy Policy</NavLink></span>;
  let termsOfService = <span className=""><NavLink to="/terms-of-service">Terms of Service</NavLink></span>;
  let contact = <span>Contact</span>;
  let disclaimer = <span>DISCLAIMER</span>;
  let footerScore;

  if (window.location.pathname === '/game') {
    footerScore = <Score questionNumber={questionNumber} score={score} />;
    about = '';
    privacyPolicy = '';
    termsOfService = '';
    contact = '';
    disclaimer = '';
  }

  return (
    <div className="footer">
      <br />
      <br />
      <div>
        <span>{disclaimer}</span>
      </div>
      <br />
      <span>{about}</span>
      <span>{privacyPolicy}</span>
      <span>{termsOfService}</span>
      <span>{contact}</span>
      <div>
        <div>
          {footerScore}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
