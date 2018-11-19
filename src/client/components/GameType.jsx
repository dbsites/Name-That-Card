import React from 'react';

const GameType = (props) => {
  const { game, selectedGame, setSelectedGame } = props;
  if (selectedGame === game) {
    return (
      <div className="gameListButtonStyle mqActivated" onClick={() => setSelectedGame(game)}>
        {game + ' EDITION'}
      </div>
    );
  }
  return (
    <div className="gameListButtonStyle" onClick={() => setSelectedGame(game)}>
      {game + ' EDITION'}
    </div>
  );
};

export default GameType;
