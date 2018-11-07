import React from 'react';

const GameType = (props) => {
  const { game, setSelectedGame } = props;



  return (
    <div className="listButtonStyle" onClick={() => setSelectedGame(game)}>
      {game}
    </div>
  );
};

export default GameType;
