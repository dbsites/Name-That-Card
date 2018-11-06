import React from 'react';
import { connect } from 'react-redux';
import * as gamePlayActions from '../actions/gamePlayActions';

const mapStateToProps = store => ({
  score: store.gameReducer.score,
  loggedInUser: store.userReducer.loggedInUser,
  selectedGame: store.gameListReducer.selectedGame,
  selectedDifficulty: store.gameMenuReducer.selectedDifficulty,
});

const mapDispatchToProps = dispatch => ({
  sendResult: (gameResultInfo) => {
    dispatch(gamePlayActions.sendResult(gameResultInfo));
  },
});

const Results = (props) => {
  const { score, sendResult, loggedInUser, selectedGame, selectedDifficulty } = props;

  const gameResultInfo = {
    loggedInUser,
    score,
    selectedGame,
    selectedDifficulty,
  };

  sendResult(gameResultInfo);

  return (
    <div>
      <div>Results</div>
      <div> you got {score} </div>
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(Results);
