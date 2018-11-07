import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import * as gameConfigActions from '../actions/gameConfigActions';
import * as gamePlayActions from '../actions/gamePlayActions';


const mapStateToProps = store => ({
  categoryList: store.gameMenuReducer.categoryList,
  ableToStartGame: store.gameMenuReducer.ableToStartGame,
  startClicked: store.gameMenuReducer.startClicked,
});

const mapDispatchToProps = dispatch => ({
  setSelectedGame: (game) => {
    dispatch(gameConfigActions.setSelectedGame(game));
  },
  toggleGameCategory: (category) => {
    dispatch(gameConfigActions.toggleGameCategory(category));
  },
  toggleAllGameCategories: (category) => {
    dispatch(gameConfigActions.toggleAllGameCategories(category));
  },
  setGameDifficulty: (difficulty) => {
    dispatch(gameConfigActions.setGameDifficulty(difficulty));
  },
  getGameMenuContents: (url) => {
    dispatch(gameConfigActions.getGameMenuContents(url));
  },
  resetGameInitiation: () => {
    dispatch(gameConfigActions.resetGameInitiation());
  },
  startGame: () => {
    dispatch(gameConfigActions.startGame());
  },
  resetGame: () => {
    dispatch(gamePlayActions.resetGame());
  },
  resetGameMenu: () => {
    dispatch(gameConfigActions.resetGameMenu());
  },
});

class GameMenuContainer extends Component {
  componentDidMount() {
    const { getGameMenuContents, setSelectedGame, resetGame, resetGameMenu } = this.props;
    getGameMenuContents(window.location.pathname);
    const urlSelectedGame = window.location.pathname.split('').slice(10).join('');
    setSelectedGame(urlSelectedGame);
    resetGame();
    resetGameMenu();
  }

  render() {
    const {
      categoryList,
      toggleGameCategory,
      toggleAllGameCategories,
      setGameDifficulty,
      ableToStartGame,
      startClicked,
      startGame,
      resetGameInitiation,
    } = this.props;

    const categories = categoryList.map((gameCatObj, ind) => {
      const category = gameCatObj.game_category;
      return (
        <div className="listButtonStyle" onClick={() => toggleGameCategory(category)} key={ind}>{category}</div>
      );
    });

    if (ableToStartGame && startClicked) {
      resetGameInitiation();
      return <Redirect to={{ pathname: '/game' }} />;
    }

    return (
      <div className="container">
        <span className=""><NavLink to="/leaderBoard">Leaderboard</NavLink></span>
        <h3>Game Menu Container</h3>
        <div className="listContainer">
          {categories}
        </div>
        <div className="listButtonStyle" onClick={toggleAllGameCategories}>ALL</div>
        <div className="difficultyBoxStyle">
          <div className="difficultyStyle" onClick={() => setGameDifficulty('easy')}>EASY</div>
          <div className="difficultyStyle" onClick={() => setGameDifficulty('med')}>MED.</div>
          <div className="difficultyStyle" onClick={() => setGameDifficulty('hard')}>HARD</div>
        </div>
        <div className="buttonStyle" onClick={() => startGame()}>START</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenuContainer);
