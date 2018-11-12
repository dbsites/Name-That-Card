import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import * as gameConfigActions from '../actions/gameConfigActions';
import * as gamePlayActions from '../actions/gamePlayActions';


const mapStateToProps = store => ({
  categoryList: store.gameMenuReducer.categoryList,
  ableToStartGame: store.gameMenuReducer.ableToStartGame,
  startClicked: store.gameMenuReducer.startClicked,
  selectedCategories: store.gameMenuReducer.selectedCategories,
  selectedDifficulty: store.gameMenuReducer.selectedDifficulty,
  selectedGame: store.gameListReducer.selectedGame,
  years: store.gameMenuReducer.years,
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
    const { getGameMenuContents, setSelectedGame, resetGame, resetGameMenu, years } = this.props;
    const urlSelectedGame = window.location.pathname.split('').slice(10).join('');
    console.log('selectedGameRoute***********', urlSelectedGame);
    setSelectedGame(urlSelectedGame);
    getGameMenuContents(window.location.pathname);
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
      selectedCategories,
      selectedDifficulty,
      selectedGame,
    } = this.props;
  
    const underscore = string => string.split('').map(char => char === ' ' ? '_' : char).join('');

    const categories = categoryList.map((gameCatObj, ind) => {
      if (gameCatObj.game_category) {
        const category = gameCatObj.game_category;
        if (selectedCategories.includes(underscore(category))) {
          return (
            <div className="listButtonStyle activated" onClick={() => toggleGameCategory(category)} key={ind}>{category}</div>
            );
        } 
        return (
          <div className="listButtonStyle" onClick={() => toggleGameCategory(category)} key={ind}>{category}</div>
        );
      }
      return (
        <div className="listButtonStyle" onClick={() => toggleGameCategory(category)} key={ind}>{category}</div>
      );
    });
   
    if (ableToStartGame && startClicked) {
      resetGameInitiation();
      return <Redirect to={{ pathname: '/game' }} />;
    }
    let allBtn = <div className="listButtonStyle" onClick={toggleAllGameCategories}>ALL</div>
    if (selectedCategories.length === categoryList.length) {
      allBtn = <div className="listButtonStyle activated" onClick={toggleAllGameCategories}>ALL</div>
    }

    let easyBtn = <div className="difficultyStyleE" onClick={() => setGameDifficulty('EASY')}>EASY</div>;
    if (selectedDifficulty === 'EASY') {
      easyBtn = <div className="difficultyStyleE difficultyActivated" onClick={() => setGameDifficulty('EASY')}>EASY</div>;
    }

    let medBtn = <div className="difficultyStyleM" onClick={() => setGameDifficulty('MEDIUM')}>MED.</div>;
    if (selectedDifficulty === 'MEDIUM') {
      medBtn = <div className="difficultyStyleM difficultyActivated" onClick={() => setGameDifficulty('MEDIUM')}>MED.</div>;
    }

    let hardBtn = <div className="difficultyStyleH" onClick={() => setGameDifficulty('HARD')}>HARD</div>;
    if (selectedDifficulty === 'HARD') {
      hardBtn = <div className="difficultyStyleH difficultyActivated" onClick={() => setGameDifficulty('HARD')}>HARD</div>;
    }

    return (
      <div className="MainContainer">
        <div className="right-menu">
          <div className="menu-item">
            <NavLink to="/leaderBoard">Leaderboard</NavLink>
          </div>
        </div>
        <h3 className="headers"> {selectedGame} -- CHOOSE CATEGORIES </h3>
        <div className="list">
            {categories}
        </div>
        <div className="container">
            {allBtn}
        </div>
        {/* <div>
          <form className="sliderForm">
            <div data-role="rangeslider">
                <label htmlFor="range-1a">Rangeslider:</label>
                <input type="range" name="range-1a" id="range-1a" min="1900" max="2017" value="1900" data-popup-enabled="true" data-show-value="true" />
                <label htmlFor="range-1b">Rangeslider:</label>
                <input type="range" name="range-1b" id="range-1b" min="1900" max="2017" value="2017" data-popup-enabled="true" data-show-value="true" />
            </div>
          </form>
        </div> */}
        <h3 className="headers">-- CHOOSE DIFFICULTY --</h3>
        <div className="container">
          <div className="difficultyBoxStyle">
            {easyBtn}
            {medBtn}
            {hardBtn}
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
