import React from 'react';

const GameType = (props) => {
  const { game, setSelectedGame } = props;



  return (
    <li className="listButtonStyle" onClick={() => setSelectedGame(game)}>
      {game}
    </li>
  );
};

export default GameType;
