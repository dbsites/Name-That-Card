import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Loader from 'react-loader-advanced';
import GameType from '../components/GameType.jsx';
import * as gameConfigActions from '../actions/gameConfigActions';
import * as leaderboardActions from '../actions/leaderboardActions';


const mapStateToProps = store => ({
  gameList: store.gameListReducer.gameList,
  ableToProceed: store.gameListReducer.ableToProceed,
  playClicked: store.gameListReducer.playClicked,
  selectedGame: store.gameListReducer.selectedGame,
  gameListLoadingContent: store.gameListReducer.gameListLoadingContent,
  isLoggedIn: store.userReducer.isLoggedIn,
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
  resetLeaderboardLoadingContent: () => {
    dispatch(leaderboardActions.resetLeaderboardLoadingContent());
  },
});

class GameListContainer extends Component {
  componentDidMount() {
    const { getGameList, resetGameSelection, resetGameMenu, resetLeaderboardLoadingContent } = this.props;
    resetGameSelection();
    getGameList();
    resetGameMenu();
    resetLeaderboardLoadingContent();
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
      isLoggedIn,
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

    let loginPrompt = <span><NavLink to="/login">Login</NavLink> to be able to join the leaderboard!</span>;

    if(isLoggedIn) {
      loginPrompt = '';
    }

    const spinningCircles =
      <div className="sk-circle">
        <div className="sk-circle1 sk-child"></div>
        <div className="sk-circle2 sk-child"></div>
        <div className="sk-circle3 sk-child"></div>
        <div className="sk-circle4 sk-child"></div>
        <div className="sk-circle5 sk-child"></div>
        <div className="sk-circle6 sk-child"></div>
        <div className="sk-circle7 sk-child"></div>
        <div className="sk-circle8 sk-child"></div>
        <div className="sk-circle9 sk-child"></div>
        <div className="sk-circle10 sk-child"></div>
        <div className="sk-circle11 sk-child"></div>
        <div className="sk-circle12 sk-child"></div>
      </div>;

    const rotatingSquares = <div className="rotatingSquares"></div>;

    const movingCubes =
      <div className="movingCubes">
        <div className="cube1"></div>
        <div className="cube2"></div>
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
      display: 'block',
      position: 'absolute',
      top: '-12.5vh',
      backgroundColor: 'black',
      opacity: 1,
      height: '100vh',
    }

    return (
      <Loader show={gameListLoadingContent} message={spinningCircles} foregroundStyle={foregroundStyle} backgroundStyle={backgroundStyle}>
        <div className="HomescreenContainer">
          <h3 className="pick-a-game">PICK A GAME</h3>
          <div className="gameList">
            {games}
          </div>
          <div className="enterContainer">
            <div className="enterButtonStyle" onClick={() => successPlay(selectedGame)}>ENTER</div>
          </div>
          <div className="homeLoginPrompt--text--center">
            {loginPrompt}
          </div>
        </div>
      </Loader>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameListContainer);
