import React from 'react';
import { connect } from 'react-redux';
import Leaderboard from '../components/Leaderboard.jsx';
import * as leaderboardActions from '../actions/leaderboardActions';

const mapStateToProps = store => ({
  leaderboardDifficulty: store.leaderboardReducer.leaderboardDifficulty,
  sortCategory: store.leaderboardReducer.sortCategory,
  selectedGame: store.gameListReducer.selectedGame,
});

const mapDispatchToProps = dispatch => ({
  changeLeaderboardDifficulty: (difficulty) => {
    dispatch(leaderboardActions.changeLeaderboardDifficulty(difficulty));
  },
});

const LeaderboardContainer = (props) => {

  const { leaderboardDifficulty, sortCategory, selectedGame, changeLeaderboardDifficulty } = props;

  return (
    <div>
      <Leaderboard changeLeaderboardDifficulty={changeLeaderboardDifficulty} leaderboardDifficulty={leaderboardDifficulty} sortCategory={sortCategory} selectedGame={selectedGame} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardContainer);