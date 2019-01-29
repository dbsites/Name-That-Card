import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import * as gamePlayActions from '../actions/gamePlayActions';
import * as gameConfigActions from '../actions/gameConfigActions';

const mapStateToProps = store => ({
  score: store.gameReducer.score,
  isLoggedIn: store.userReducer.isLoggedIn,
  loggedInUser: store.userReducer.loggedInUser,
  selectedGame: store.gameListReducer.selectedGame,
  selectedDifficulty: store.gameMenuReducer.selectedDifficulty,
  answeredQuestions: store.gameReducer.answeredQuestions,
});

const mapDispatchToProps = dispatch => ({
  sendResult: (gameInfo) => {
    dispatch(gamePlayActions.sendResult(gameInfo));
  },
  resetRenderScoreFooter: () => {
    dispatch(gameConfigActions.resetRenderScoreFooter());
  },
});

class Results extends Component {
  componentDidMount() {
    const { resetRenderScoreFooter } = this.props;
    resetRenderScoreFooter();
  }

  emitGoogleAnalyticShare(socialNetwork) {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Share',
      eventAction: socialNetwork
    });
  }

  render() {
    const { score, sendResult, loggedInUser, selectedGame, selectedDifficulty, isLoggedIn, answeredQuestions } = this.props;

    const gameResultInfo = {
      username: loggedInUser,
      game: selectedGame,
      level: selectedDifficulty,
      score: score,
    };

    let joinLeaderboardMsg = <div className="text--center resultsLoginPrompt"><NavLink className="loginSignupLink hoverStyle" to="/login">Login</NavLink> to join the leaderboard!</div>;

    if (isLoggedIn) {
      sendResult(gameResultInfo);
      joinLeaderboardMsg = '';
    }

    const cardNames = [answeredQuestions[0].card_name, answeredQuestions[1].card_name, answeredQuestions[2].card_name].map((name) => {
      return name.split('').filter((char) => {
        return char === ' ' ? '' : char;
      }).join('');
    });

    const socialMediaDialog = `I scored ${score} out of 20 on @namethatcard : ${selectedGame} Edition! Test your skills at www.namethatcard.com`;

    const socialMediaHashtags = [`${selectedGame}`, 'namethatcard', `${cardNames[0]}`, `${cardNames[1]}`, `${cardNames[2]}`];

    const selectedGameRoute = `/gameMenu/${selectedGame}`;

    return (
      <div className="results-container">
        <h1 className="resultHeader--center">You got {score} points!</h1>
        <div className="result--center">
          <h2 className="text--center">Click Below to Share Your Results on Twitter or Facebook!</h2>
          <div className="socialmedia--center">
            <FacebookShareButton beforeOnClick={() => this.emitGoogleAnalyticShare('Facebook')} url={'https://www.namethatcard.com'} quote={socialMediaDialog} hashtag={'#namethatcard'}>
              <FacebookIcon round={true} />
            </FacebookShareButton>
            <TwitterShareButton beforeOnClick={() => this.emitGoogleAnalyticShare('Twitter')} url={'www.namethatcard.com'} title={socialMediaDialog} hashtags={socialMediaHashtags}>
              <TwitterIcon round={true} />
            </TwitterShareButton>
          </div>
        </div>
        <div>
          <div className="gameButton text--center"><NavLink to={selectedGameRoute}>PLAY AGAIN</NavLink></div>
        </div>
        <div>
          {joinLeaderboardMsg}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
