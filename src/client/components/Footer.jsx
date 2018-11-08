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

let about;// = <span className=""><NavLink to="/about">About</NavLink></span>;
let privacyPolicy;// = <span className=""><NavLink to="/privacy-policy">Privacy Policy</NavLink></span>;
let termsOfService;// = <span className=""><NavLink to="/terms-of-service">Terms of Service</NavLink></span>;
let contact;// = <span>Contact</span>;
let disclaimer;// = <span>DISCLAIMER</span>;
let footerScore;//= '';
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
    } else if (window.location.pathname === '/admin') {
      footerScore = '';
      about = '';
      privacyPolicy = '';
      termsOfService = '';
      contact = '';
      disclaimer = '';
    } else {
      about = <span className=""><NavLink to="/about">About</NavLink></span>;
      privacyPolicy = <span className=""><NavLink to="/privacy-policy">Privacy Policy</NavLink></span>;
      termsOfService = <span className=""><NavLink to="/terms-of-service">Terms of Service</NavLink></span>;
      contact = <span>Contact</span>;
      disclaimer = <span>DISCLAIMER</span>;
      footerScore = '';
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
