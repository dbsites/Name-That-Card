import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Score from './Score.jsx';

const mapStateToProps = store => ({
  score: store.gameReducer.score,
  questionNumber: store.gameReducer.questionNumber,
  renderScoreFooter: store.gameMenuReducer.renderScoreFooter,
});

const mapDispatchToProps = dispatch => ({

});

let about;
let privacyPolicy;
let termsOfService;
let contact;
let disclaimer;
let footerScore;//= '';
let gameDisclaimer;
class Footer extends Component {
  componentDidMount() {

  }

  render() {
    const { score, questionNumber, renderScoreFooter } = this.props;
    if (renderScoreFooter) {
      footerScore = <Score questionNumber={questionNumber} score={score} />;
      about = '';
      privacyPolicy = '';
      termsOfService = '';
      contact = '';
      disclaimer = '';
      gameDisclaimer = <span className="footer">DISCLAIMER</span>;
    } else if (window.location.pathname === '/admin') {
      footerScore = '';
      about = '';
      privacyPolicy = '';
      termsOfService = '';
      contact = '';
      disclaimer = '';
      gameDisclaimer =' ';
    } else {
      about = <span className=""><NavLink to="/about">About</NavLink></span>;
      privacyPolicy = <span className=""><NavLink to="/privacy-policy">Privacy Policy</NavLink></span>;
      termsOfService = <span className=""><NavLink to="/terms-of-service">Terms of Service</NavLink></span>;
      contact = <span>Contact</span>;
      disclaimer = <span>DISCLAIMER</span>;
      footerScore = '';
      gameDisclaimer =' ';
    }

    return (
      <div className="footerContainer">
        <br />
        <br />
        <div className="headers">
          <div>{disclaimer}</div>
        </div>
        <br />
        <div className="footer">
          {about}
          {privacyPolicy}
          {termsOfService}
          {contact}
          {footerScore}
        </div>
        <div>
          {gameDisclaimer}
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
