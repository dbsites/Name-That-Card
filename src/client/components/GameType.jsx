import React from 'react';

const GameType = (props) => {
  const { game, selectedGame, setSelectedGame, title } = props;
  if (selectedGame === game) {
    return (
      <div className="gameListButtonStyle activated" onClick={() => setSelectedGame(game)}>
        {title + ' Edition'}
      </div>
    );
  }
  return (
    <div className="gameListButtonStyle" onClick={() => setSelectedGame(game)}>
      {title + ' Edition'}
    </div>
  );
};

export default GameType;
