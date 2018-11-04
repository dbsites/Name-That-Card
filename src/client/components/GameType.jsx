import React, {Component} from 'react';

const GameType = (props) => {
  const { game, setSelectedGame } = props;

  const divStyle = {
    display: 'flex',
    width: '200px',
    lineHeight: '1.8em !important',
    margin: '20px',
    border: '5px solid pink',
    justifyContent: 'center',
    borderRadius: '15px',
    color: 'white',
    backgroundColor: 'black',
    userSelect: 'none',
    textShadow: '0 0 45px #6fcbdc',
  };

  return(
    <div className="gameType" style={divStyle} onClick={() => setSelectedGame(game)} >
      {game}
    </div>
  );
}

export default GameType;
