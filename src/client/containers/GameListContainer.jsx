import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import GameType from '../components/GameType.jsx';
import * as gameConfigActions from '../actions/gameConfigActions';

const mapStateToProps = store => ({
  gameList: store.gameListReducer.gameList,
  ableToProceed: store.gameListReducer.ableToProceed,
  playClicked: store.gameListReducer.playClicked,
  selectedGame: store.gameListReducer.selectedGame,
});

const mapDispatchToProps = dispatch => ({
  setSelectedGame: (game) => {
    dispatch(gameConfigActions.setSelectedGame(game));
  },
  submitGameSelection: (obj) => {
    dispatch(gameConfigActions.submitGameSelection(obj));
  },
});

const GameListContainer = (props) => {
  const { gameList, setSelectedGame, submitGameSelection, ableToProceed, playClicked, selectedGame } = props;
  const gameSelectedObj = {

  };

  let gameLists = gameList.map((game, index) => {
    return(
      <GameType key={index} game={game} setSelectedGame={setSelectedGame} />
    )
  })

  if (ableToProceed && playClicked) {
    return <Redirect to='/gameMenu' />;
  }

  return (
    <div className="GameListContainer" >
      <h2>Game List Container</h2>
      {gameLists}
      <button onClick={() => submitGameSelection(selectedGame)} >PLAY</button>
    </div>
  );
}



export default connect(mapStateToProps, mapDispatchToProps)(GameListContainer);
