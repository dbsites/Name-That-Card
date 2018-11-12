import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LeaderboardEntry from './LeaderboardEntry.jsx';
import * as leaderboardActions from '../actions/leaderboardActions';

const mapStateToProps = store => ({
  results: store.leaderboardReducer.results,
  sortDirection: store.leaderboardReducer.sortDirection,

});

const mapDispatchToProps = dispatch => ({
  changeLeaderboardSortCategory: (category) => {
    dispatch(leaderboardActions.changeLeaderboardSortCategory(category));
  },
  toggleSortDirection: () => {
    dispatch(leaderboardActions.toggleSortDirection());
  },
});

const Leaderboard = (props) => {
  const { selectedGame, changeLeaderboardDifficulty, leaderboardDifficulty, results, sortCategory, changeLeaderboardSortCategory, sortDirection } = props;
  const selectedGameRoute = `/gameMenu/${selectedGame}`;
  const difficultyFilteredResults = [];

  results.forEach((resultsObj, i) => {
    if(resultsObj.difficulty_level === leaderboardDifficulty) {
      difficultyFilteredResults.push(resultsObj)
    }
  });

  function sortResults(arr) {
    if (sortCategory === 'user') {
      if (sortDirection) {
        return arr.sort((a, b) => b.user.toLowerCase() > a.user.toLowerCase());
      }
      return arr.sort((a, b) => b.user.toLowerCase() > a.user.toLowerCase());
    }
    if (sortDirection) {
      return arr.sort((a, b) => Number(b[sortCategory]) - Number(a[sortCategory]));
    }
    return arr.sort((a, b) => Number(a[sortCategory]) - Number(b[sortCategory]));
  }

  sortResults(difficultyFilteredResults);

  const leaderboardEntries = difficultyFilteredResults.map((resultObj, i) => {
    return <LeaderboardEntry key={i} entryContents={resultObj} />;
  })

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
            <th onClick={() => changeLeaderboardSortCategory('user')}>PLAYER</th>
            <th onClick={() => changeLeaderboardSortCategory('sum')}>TOTAL POINTS</th>
            <th onClick={() => changeLeaderboardSortCategory('avg')}>AVERAGE SCORE</th>
            <th onClick={() => changeLeaderboardSortCategory('gamecount')}> TOTAL GAMES PLAYED</th>
          </tr>
          {leaderboardEntries}
        </tbody>
      </table>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
