import React from 'react';
import { NavLink } from 'react-router-dom';

const Leaderboard = (props) => {
  const { selectedGame } = props;
  const selectedGameRoute = `/gameMenu/${selectedGame}`

  return (
    <div>
      <h1>{selectedGame}</h1>
      <div className=""><NavLink to={selectedGameRoute}>X</NavLink></div>
      <div>Leader Board</div>
    </div>
  );
}

export default Leaderboard;
