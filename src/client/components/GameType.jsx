import React from 'react';

const GameType = (props) => {
  const { game, selectedGame, setSelectedGame } = props;
  if (selectedGame === game) {
    return (
      <div className="listButtonStyle activated" onClick={() => setSelectedGame(game)}>
        {game + ' EDITION'}
      </div>
    );
  }
  return (
    <div className="listButtonStyle" onClick={() => setSelectedGame(game)}>
      {game + ' EDITION'}
    </div>
  );
};

export default GameType;
