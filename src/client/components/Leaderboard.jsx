import React from 'react';
import { NavLink } from 'react-router-dom';

const Leaderboard = (props) => {
  const { selectedGame, changeLeaderboardDifficulty, leaderboardDifficulty, sortCategory } = props;
  const selectedGameRoute = `/gameMenu/${selectedGame}`

  return (
    <div className="leaderboard">
      <h1 className="headers">{selectedGame}</h1>
      <div className=""><NavLink to={selectedGameRoute}>X</NavLink></div>
      <div>
        Leaderboard
      </div>
      <span onClick={() => changeLeaderboardDifficulty('ALL')}>All</span> <span onClick={() => changeLeaderboardDifficulty('EASY')}>EASY</span> <span onClick={() => changeLeaderboardDifficulty('MEDIUM')}>MEDIUM</span> <span onClick={() => changeLeaderboardDifficulty('HARD')}>HARD</span>
      <LeaderboardEntry />
    </div>
  );
}

export default Leaderboard;
