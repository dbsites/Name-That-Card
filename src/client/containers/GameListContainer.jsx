import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-advanced';
import GameType from '../components/GameType.jsx';
import * as gameConfigActions from '../actions/gameConfigActions';

const mapStateToProps = store => ({
  gameList: store.gameListReducer.gameList,
  ableToProceed: store.gameListReducer.ableToProceed,
  playClicked: store.gameListReducer.playClicked,
  selectedGame: store.gameListReducer.selectedGame,
  gameListLoadingContent: store.gameListReducer.gameListLoadingContent,
});

const mapDispatchToProps = dispatch => ({
  setSelectedGame: (game) => {
    dispatch(gameConfigActions.setSelectedGame(game));
  },
  submitGameSelection: (obj) => {
    dispatch(gameConfigActions.submitGameSelection(obj));
  },
  getGameList: () => {
    dispatch(gameConfigActions.getGameList());
  },
  resetGameSelection: () => {
    dispatch(gameConfigActions.resetGameSelection());
  },
  successPlay: () => {
    dispatch(gameConfigActions.successPlay());
  },
  resetGameMenu: () => {
    dispatch(gameConfigActions.resetGameMenu());
  },
});

class GameListContainer extends Component {
  componentDidMount() {
    const { getGameList, resetGameSelection, resetGameMenu } = this.props;
    resetGameSelection();
    getGameList();
    resetGameMenu();
  }

  render() {
    const {
      gameList,
      setSelectedGame,
      ableToProceed,
      playClicked,
      selectedGame,
      resetGameSelection,
      successPlay,
      gameListLoadingContent,
    } = this.props;

    const games = gameList.map((gameObj, i) => {
      const game = gameObj.game_name;
      return (
        <GameType key={i} selectedGame={selectedGame} setSelectedGame={setSelectedGame} game={game} />
      );
    });

    if (ableToProceed && playClicked) {
      resetGameSelection();
      const gameMenuRoute = `/gameMenu/${selectedGame}`;
      return <Redirect to={{ pathname: gameMenuRoute }} />;
    }

    const spinner =
      <div class="sk-fading-circle">
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
      </div>;

    const foregroundStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '2em',
      color: 'white',
    }

    const backgroundStyle = {
      backgroundColor: 'black',
      opacity: 1,
    }

    return (
      <Loader show={gameListLoadingContent} message={spinner} foregroundStyle={foregroundStyle} backgroundStyle={backgroundStyle}>
        <div className="HomescreenContainer">
          <h3 className="pick-a-deck">PICK A DECK</h3>
          <div className="list">
            {games}
          </div>
          <div className="enterContainer">
            <div className="enterButtonStyle" onClick={() => successPlay(selectedGame)}>ENTER</div>
          </div>
        </div>
      </Loader>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameListContainer);
