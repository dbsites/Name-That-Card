import React, {Component} from 'react';

const GameType = (props) => {
  const { game, setSelectedGame } = props;

  const divStyle = {
    margin: '40px',
    border: '5px solid pink'
  };

  return(
    <div className="gameType" style={divStyle} onClick={() => setSelectedGame(game)} >
      {game}
    </div>
  );
}

export default GameType;
