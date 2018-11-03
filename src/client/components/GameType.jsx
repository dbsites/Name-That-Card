import React, {Component} from 'react';

const GameType = (props) => {
  const { game, setSelectedGame } = props;
  return(
    <div className="gameType" onClick={() => setSelectedGame(game)} >
      {game}
    </div>
  );
}


export default GameType;
