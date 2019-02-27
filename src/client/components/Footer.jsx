import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Score from './Score.jsx';

const mapStateToProps = store => ({
  score: store.gameReducer.score,
  questionNumber: store.gameReducer.questionNumber,
  renderScoreFooter: store.gameMenuReducer.renderScoreFooter,
  selectedGame: store.gameListReducer.selectedGame,
  footerBool: store.gameListReducer.footerBool,
});

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
      privacyPolicy = '';
      termsOfService = '';
      contact = '';
      disclaimer = '';
      gameDisclaimer = <span className="gameDisclaimer">Name that Card is unofficial Fan Content. Other products and/or company names, trademarks and logos referenced on this site may be trademarked or copyrighted by their respective owners. We have no affiliation with these companies or their owners, and our services are not endorsed by them.</span>;
    } else if (window.location.pathname === '/admin') {
      footerScore = '';
      privacyPolicy = '';
      termsOfService = '';
      contact = '';
      disclaimer = '';
      gameDisclaimer = '';
    } else if (window.location.pathname === '/') {
      privacyPolicy = <span className="hoverStyle"><NavLink to="/privacy-policy">Privacy Policy</NavLink></span>;
      termsOfService = <span className="hoverStyle"><NavLink to="/terms-of-service">Terms of Service</NavLink></span>;
      contact = <span><a className="hoverStyle" href="mailto:info@namethatcard.com" target="_top">Contact</a></span>;
      disclaimer = <span>Name that Card is unofficial Fan Content. Other products and/or company names, trademarks and logos referenced on this site may be trademarked or copyrighted by their respective owners. We have no affiliation with these companies or their owners, and our services are not endorsed by them.</span>;
      footerScore = '';
      gameDisclaimer = '';
    } else if (window.location.pathname.slice(0,6) === '/reset') {
      privacyPolicy = <span className="hoverStyle"><NavLink to="/privacy-policy">Privacy Policy</NavLink></span>;
      termsOfService = <span className="hoverStyle"><NavLink to="/terms-of-service">Terms of Service</NavLink></span>;
      contact = <span><a className="hoverStyle" href="mailto:info@namethatcard.com" target="_top">Contact</a></span>;
      disclaimer = <span>Name that Card is unofficial Fan Content. Other products and/or company names, trademarks and logos referenced on this site may be trademarked or copyrighted by their respective owners. We have no affiliation with these companies or their owners, and our services are not endorsed by them.</span>;
      footerScore = '';
      gameDisclaimer = '';
    } else if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
      privacyPolicy = <span className="hoverStyle"><NavLink to="/privacy-policy">Privacy Policy</NavLink></span>;
      termsOfService = <span className="hoverStyle"><NavLink to="/terms-of-service">Terms of Service</NavLink></span>;
      contact = <span><a className="hoverStyle" href="mailto:info@namethatcard.com" target="_top">Contact</a></span>;
      disclaimer = <span>Name that Card is unofficial Fan Content. Other products and/or company names, trademarks and logos referenced on this site may be trademarked or copyrighted by their respective owners. We have no affiliation with these companies or their owners, and our services are not endorsed by them.</span>;
      footerScore = '';
      gameDisclaimer = '';
    } else {
      privacyPolicy = <span className="hoverStyle"><NavLink to="/privacy-policy">Privacy Policy</NavLink></span>;
      termsOfService = <span className="hoverStyle"><NavLink to="/terms-of-service">Terms of Service</NavLink></span>;
      contact = <span><a className="hoverStyle" href="mailto:info@namethatcard.com" target="_top">Contact</a></span>;
      disclaimer = <span>Name that Card is unofficial Fan Content. Other products and/or company names, trademarks and logos referenced on this site may be trademarked or copyrighted by their respective owners. We have no affiliation with these companies or their owners, and our services are not endorsed by them.</span>;
      footerScore = '';
      gameDisclaimer = '';
    }

    return (
      <div className="footerContainer">
        <div className="footer">
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
}

export default connect(mapStateToProps, null)(Footer);
