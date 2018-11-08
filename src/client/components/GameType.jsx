import React from 'react';

const GameType = (props) => {
  const { game, selectedGame, setSelectedGame } = props;
  if (selectedGame === game) {
    return (
      <div className="listButtonStyle active" onClick={() => setSelectedGame(game)}>
        {game}
      </div>
    );
  }
  return (
    <li className="listButtonStyle" onClick={() => setSelectedGame(game)}>
      {game}
    </li>
  );
};

export default GameType;
