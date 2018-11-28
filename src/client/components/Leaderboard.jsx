import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LeaderboardEntry from './LeaderboardEntry.jsx';
import * as leaderboardActions from '../actions/leaderboardActions';

const mapStateToProps = store => ({
  results: store.leaderboardReducer.results,
  sortDirection: store.leaderboardReducer.sortDirection,
  sortCategory: store.leaderboardReducer.sortCategory,
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
  const selectedGameRoute = `/gameMenu/${window.location.pathname.slice(13)}`;
  let difficultyFilteredResults = [];

  results.forEach((resultsObj, i) => {
    if(resultsObj.difficulty_level === leaderboardDifficulty) {
      difficultyFilteredResults.push(resultsObj)
    }
  });

  console.log('results ', difficultyFilteredResults)

  function sortResults(arr) {
    if (sortCategory === 'user') {
      if (sortDirection) {
        return arr.sort((a, b) => {
          if(a.user === null) {
            a.user = '';
          }
          if(b.user === null) {
            b.user = '';
          }
          const x = a.user.toLowerCase();
          const y = b.user.toLowerCase();
          if(x < y) {return -1;}
          if(x > y) {return 1;}
          return 0;
        })
      }
      return arr.sort((a, b) => {
        if(a.user === null) {
          a.user = '';
        }
        if(b.user === null) {
          b.user = '';
        }
        const x = a.user.toLowerCase();
        const y = b.user.toLowerCase();
        if(x > y) {return -1;}
        if(x < y) {return 1;}
        return 0;
      })
    }
    if (sortDirection) {
      return arr.sort((a, b) => Number(b[sortCategory]) - Number(a[sortCategory]));
    }
    return arr.sort((a, b) => Number(a[sortCategory]) - Number(b[sortCategory]));
  }

  difficultyFilteredResults = sortResults(difficultyFilteredResults);

  const leaderboardEntries = difficultyFilteredResults.map((resultObj, i) => {
    return <LeaderboardEntry numEntries={difficultyFilteredResults.length} key={i} entryContents={resultObj} rank={i} sortDirection={sortDirection}/>;
  })

  return (
    <div className="LeaderboardContainer">
      <h1 className="leaderboardTitle">LEADERBOARD</h1>
      <div className="leaderboard-right-menu">
        <div className="xButton"><NavLink to={selectedGameRoute}>x</NavLink></div>
      </div>
      <div>
        <div className="center-leaderboardFilter">
          <span className="leaderboardFilter" onClick={() => changeLeaderboardDifficulty('ALL')}>ALL</span>
          <span className="leaderboardFilter" onClick={() => changeLeaderboardDifficulty('EASY')}>EASY</span>
          <span className="leaderboardFilter" onClick={() => changeLeaderboardDifficulty('MEDIUM')}>MEDIUM</span>
          <span className="leaderboardFilter" onClick={() => changeLeaderboardDifficulty('HARD')}>HARD</span>
        </div>
      </div>
      <div className="leaderboardPosition">
        <table className="leaderboard">
          <tbody>
            <tr>
              <th className="leaderboardHeaders">RANK</th>
              <th className="leaderboardHeaders" onClick={() => changeLeaderboardSortCategory('user')}>PLAYER</th>
              <th className="leaderboardHeaders" onClick={() => changeLeaderboardSortCategory('sum')}>TOTAL POINTS</th>
              <th className="leaderboardHeaders" onClick={() => changeLeaderboardSortCategory('avg')}>AVG SCORE</th>
              <th className="leaderboardHeaders" onClick={() => changeLeaderboardSortCategory('gamecount')}> TOTAL GAMES PLAYED</th>
            </tr>
            {leaderboardEntries}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
