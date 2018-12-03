import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Score from './Score.jsx';

const mapStateToProps = store => ({
  score: store.gameReducer.score,
  questionNumber: store.gameReducer.questionNumber,
  renderScoreFooter: store.gameMenuReducer.renderScoreFooter,
  selectedGame: store.gameListReducer.selectedGame,
});

const mapDispatchToProps = dispatch => ({

});

let about;
let privacyPolicy;
let termsOfService;
let contact;
let disclaimer;
let footerScore;
let gameDisclaimer;

class Footer extends Component {

  render() {
    const { score, questionNumber, renderScoreFooter } = this.props;
    if (renderScoreFooter) {
      footerScore = <Score questionNumber={questionNumber} score={score} />;
      about = '';
      privacyPolicy = '';
      termsOfService = '';
      contact = '';
      disclaimer = '';
      gameDisclaimer = <span className="gameDisclaimer">Name that Card is unofficial Fan Content. Other products and/or company names, trademarks and logos referenced on this site may be trademarked or copyrighted by their respective owners. We have no affiliation with these companies or their owners, and our services are not endorsed by them.</span>;
    } else if (window.location.pathname === '/admin') {
      footerScore = '';
      about = '';
      privacyPolicy = '';
      termsOfService = '';
      contact = '';
      disclaimer = '';
      gameDisclaimer =' ';
    } else if (window.location.pathname === '/') {
      about = '';
      privacyPolicy = <span className=""><NavLink to="/privacy-policy">Privacy Policy</NavLink></span>;
      termsOfService = <span className=""><NavLink to="/terms-of-service">Terms of Service</NavLink></span>;
      contact = <span><a href="mailto:info@namethatcard.com" target="_top">Contact</a></span>;
      disclaimer = <span>Name that Card is unofficial Fan Content. Other products and/or company names, trademarks and logos referenced on this site may be trademarked or copyrighted by their respective owners. We have no affiliation with these companies or their owners, and our services are not endorsed by them.</span>;
      footerScore = '';
      gameDisclaimer =' ';
    } else if (window.location.pathname.slice(0,6) === '/reset') {
      about = '';
      privacyPolicy = <span className=""><NavLink to="/privacy-policy">Privacy Policy</NavLink></span>;
      termsOfService = <span className=""><NavLink to="/terms-of-service">Terms of Service</NavLink></span>;
      contact = <span><a href="mailto:info@namethatcard.com" target="_top">Contact</a></span>;
      disclaimer = <span>Name that Card is unofficial Fan Content. Other products and/or company names, trademarks and logos referenced on this site may be trademarked or copyrighted by their respective owners. We have no affiliation with these companies or their owners, and our services are not endorsed by them.</span>;
      footerScore = '';
      gameDisclaimer =' '; 
    } else if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
      about = '';
      privacyPolicy = <span className=""><NavLink to="/privacy-policy">Privacy Policy</NavLink></span>;
      termsOfService = <span className=""><NavLink to="/terms-of-service">Terms of Service</NavLink></span>;
      contact = <span><a href="mailto:info@namethatcard.com" target="_top">Contact</a></span>;
      disclaimer = <span>Name that Card is unofficial Fan Content. Other products and/or company names, trademarks and logos referenced on this site may be trademarked or copyrighted by their respective owners. We have no affiliation with these companies or their owners, and our services are not endorsed by them.</span>;
      footerScore = '';
      gameDisclaimer =' ';
    } else {
      about = <span className=""><NavLink to="/about">About</NavLink></span>;
      privacyPolicy = <span className=""><NavLink to="/privacy-policy">Privacy Policy</NavLink></span>;
      termsOfService = <span className=""><NavLink to="/terms-of-service">Terms of Service</NavLink></span>;
      contact = <span><a href="mailto:info@namethatcard.com" target="_top">Contact</a></span>;
      disclaimer = <span>Name that Card is unofficial Fan Content. Other products and/or company names, trademarks and logos referenced on this site may be trademarked or copyrighted by their respective owners. We have no affiliation with these companies or their owners, and our services are not endorsed by them.</span>;
      footerScore = '';
      gameDisclaimer =' ';
    }

    return (
      <div className="footerContainer">
        <div className="footer">
          {about}
          {privacyPolicy}
          {termsOfService}
          {contact}
          {footerScore}
        </div>
        <div className="disclaimer">
          {disclaimer}
        </div>
        <div className="disclaimerFooter">
          {gameDisclaimer}
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
