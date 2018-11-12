import React from 'react';
import { connect } from 'react-redux';
import * as gamePlayActions from '../actions/gamePlayActions';

const mapStateToProps = store => ({
  score: store.gameReducer.score,
  isLoggedIn: store.userReducer.isLoggedIn,
  loggedInUser: store.userReducer.loggedInUser,
  selectedGame: store.gameListReducer.selectedGame,
  selectedDifficulty: store.gameMenuReducer.selectedDifficulty,
});

const mapDispatchToProps = dispatch => ({
  sendResult: (gameInfo) => {
    dispatch(gamePlayActions.sendResult(gameInfo));
  },
});

const Results = (props) => {
  const { score, sendResult, loggedInUser, selectedGame, selectedDifficulty, isLoggedIn } = props;

  const gameResultInfo = {
    username: loggedInUser,
    game: selectedGame,
    level: selectedDifficulty,
    score: score,
  };

  if (isLoggedIn) {
    sendResult(gameResultInfo);
  }

  return (
    <div>
      {/* <div>Results</div> */}
      <h2>You got {score} points!</h2>
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(Results);
