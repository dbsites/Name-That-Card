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
      gameDisclaimer = <span className="disclaimer">"NAME THAT CARD: " IS UNOFFICIAL FAN CONTENT PERMITTED UNDER THE FAN CONTENT POLICY. NOT APPROVED/ENDORSED BY WIZARDS/PORTIONS OF THE MATERIALS USED ARE PROPERTY OF WIZARDS OF THE COAST. WIZARDS OF THE COAST LLC.</span>;
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
      disclaimer = <span>"NAME THAT CARD: " IS UNOFFICIAL FAN CONTENT PERMITTED UNDER THE FAN CONTENT POLICY. NOT APPROVED/ENDORSED BY WIZARDS/PORTIONS OF THE MATERIALS USED ARE PROPERTY OF WIZARDS OF THE COAST. WIZARDS OF THE COAST LLC.</span>;
      footerScore = '';
      gameDisclaimer =' ';
    }

    return (
      <div className="footerContainer">
        <div className="disclaimer">
          {disclaimer}
        </div>
        <div className="footer">
          {about}
          {privacyPolicy}
          {termsOfService}
          {contact}
          {footerScore}
        </div>
        <br/>
        <div className="disclaimerFooter">
          {gameDisclaimer}
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
