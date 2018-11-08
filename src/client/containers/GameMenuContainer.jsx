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
        <li className="listButtonStyle" onClick={() => toggleGameCategory(category)} key={ind}>{category}</li>
      );
    });

    if (ableToStartGame && startClicked) {
      resetGameInitiation();
      return <Redirect to={{ pathname: '/game' }} />;
    }

    return (
      <div>
        <span className="right-menu"><NavLink to="/leaderBoard">Leaderboard</NavLink></span>
        <h3 className="headers">Game Menu Container</h3>
        <div className="list">
            {categories}
        </div>
        <div className="container">
          <div className="listButtonStyle" onClick={toggleAllGameCategories}>ALL</div>
        </div>
        <div className="container">
          <div className="difficultyBoxStyle">
            <div className="difficultyStyleE" onClick={() => setGameDifficulty('easy')}><span>EASY</span></div>
            <div className="difficultyStyleM" onClick={() => setGameDifficulty('med')}><span>MED.</span></div>
            <div className="difficultyStyleH" onClick={() => setGameDifficulty('hard')}><span>HARD</span></div>
          </div>
        </div>
        <div className="container">
          <div className="buttonStyle" onClick={() => startGame()}>START</div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenuContainer);
