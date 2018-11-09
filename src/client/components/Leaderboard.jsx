import React from 'react';
import { NavLink } from 'react-router-dom';

const Leaderboard = (props) => {
  const { selectedGame } = props;
  const selectedGameRoute = `/gameMenu/${selectedGame}`

  return (
    <div className="leaderboard">
      <h1 className="headers">{selectedGame}</h1>
      <div className=""><NavLink to={selectedGameRoute}>X</NavLink></div>
      <div>
        Leader Board
      </div>
    </div>
  );
}

export default Leaderboard;
