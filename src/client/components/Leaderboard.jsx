import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LeaderboardEntry from './LeaderboardEntry.jsx';
import * as leaderboardActions from '../actions/leaderboardActions';

const mapStateToProps = store => ({
  results: store.leaderboardReducer.results,
});

const mapDispatchToProps = dispatch => ({
  getGameHistory: () => {
    dispatch(leaderboardActions.getGameHistory());
  },
});

const Leaderboard = (props) => {
  const { selectedGame, changeLeaderboardDifficulty, leaderboardDifficulty, results, getGameHistory, sortCategory } = props;
  const selectedGameRoute = `/gameMenu/${selectedGame}`;
  const leaderboardEntries = [];
  results.forEach((resultsObj, i) => {
    if(resultsObj.difficulty_level === leaderboardDifficulty) {
      leaderboardEntries.push(<LeaderboardEntry key={i} entryContents={resultObj} />);
    }
  });
  getGameHistory();

  return (
    <div className="leaderboard">
      <h1 className="headers">{selectedGame}</h1>
      <div className=""><NavLink to={selectedGameRoute}>X</NavLink></div>
      <div>
        Leaderboard
      </div>
      <span onClick={() => changeLeaderboardDifficulty('ALL')}>All</span> <span onClick={() => changeLeaderboardDifficulty('EASY')}>EASY</span> <span onClick={() => changeLeaderboardDifficulty('MEDIUM')}>MEDIUM</span> <span onClick={() => changeLeaderboardDifficulty('HARD')}>HARD</span>
      <table>
        <tbody>
          <tr>
            <th>PLAYER</th>
            <th>TOTAL POINTS</th>
            <th>AVERAGE SCORE</th>
            <th>TOTAL GAMES PLAYED</th>
          </tr>
          {leaderboardEntries}
        </tbody>
      </table>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
