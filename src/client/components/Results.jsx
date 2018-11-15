import React from 'react';
import { connect } from 'react-redux';
import * as gamePlayActions from '../actions/gamePlayActions';
import { NavLink } from 'react-router-dom';

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

  let joinLeaderboardMsg = <div><NavLink to="/signup">Sign up</NavLink> or <NavLink to="/login">login</NavLink> to join the leaderboard!</div>;

  if (isLoggedIn) {
    sendResult(gameResultInfo);
    joinLeaderboardMsg = '';
  }

  return (
    <div>
      {/* <div>Results</div> */}
      <h2>You got {score} points!</h2>
      {joinLeaderboardMsg}
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(Results);
