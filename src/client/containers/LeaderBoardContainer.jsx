import React from 'react';
import { connect } from 'react-redux';
import * as leaderBoardActions from '../actions/leaderBoardActions';
import Leaderboard from '../components/Leaderboard.jsx';

const mapStateToProps = store => ({
  leaderBoardDifficulty: store.leaderboardReducer.leaderBoardDifficulty,
  sortCategory: store.leaderboardReducer.sortCategory,
});

const mapDispatchToProps = dispatch => ({
  changeLeaderboardDifficulty: (event) => {
    dispatch(leaderBoardActions.changeLeaderboardDifficulty(event));
  },
});

const LeaderBoardContainer = (props) => {

  const { leaderBoardDifficulty, sortCategory } = props;

  return (
    <div>
      <Leaderboard leaderBoardDifficulty={leaderBoardDifficulty} sortCategory={sortCategory}/>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardContainer);