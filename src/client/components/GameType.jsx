import React from 'react';

const GameType = (props) => {
  const { game, selectedGame, setSelectedGame } = props;
  if (selectedGame === game) {
    return (
      <li className="listButtonStyle activated" onClick={() => setSelectedGame(game)}>
        {game}
      </li>
    );
  }
  return (
    <li className="listButtonStyle" onClick={() => setSelectedGame(game)}>
      {game}
    </li>
  );
};

export default GameType;
