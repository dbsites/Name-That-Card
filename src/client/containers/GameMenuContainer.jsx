import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import noUiSlider from 'nouislider';
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
    const { getGameMenuContents, setSelectedGame, resetGame, resetGameMenu } = this.props;
    getGameMenuContents(window.location.pathname);
    const urlSelectedGame = window.location.pathname.split('').slice(10).join('');
    console.log('selectedGameRoute***********', urlSelectedGame);
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
      selectedCategories,
      selectedDifficulty,
      selectedGame,
    } = this.props;
  
    const underscore = string => string.split('').map(char => char === ' ' ? '_' : char).join('');

    const categories = categoryList.map((gameCatObj, ind) => {
      const category = gameCatObj.game_category;
      if (selectedCategories.includes(underscore(category))) {
        return (
          <div className="listButtonStyle activated" onClick={() => toggleGameCategory(category)} key={ind}>{category}</div>
        );
      }
      return (
        <li className="listButtonStyle" onClick={() => toggleGameCategory(category)} key={ind}>{category}</li>
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
    if (selectedDifficulty === 'easy') {
      easyBtn = <div className="difficultyStyleE difficultyActivated" onClick={() => setGameDifficulty('EASY')}>EASY</div>;
    }

    let medBtn = <div className="difficultyStyleM" onClick={() => setGameDifficulty('MEDIUM')}>MED.</div>;
    if (selectedDifficulty === 'med') {
      medBtn = <div className="difficultyStyleM difficultyActivated" onClick={() => setGameDifficulty('MEDIUM')}>MED.</div>;
    }

    let hardBtn = <div className="difficultyStyleH" onClick={() => setGameDifficulty('HARD')}>HARD</div>;
    if (selectedDifficulty === 'hard') {
      hardBtn = <div className="difficultyStyleH difficultyActivated" onClick={() => setGameDifficulty('HARD')}>HARD</div>;
    }

    // const yearSlider = <div id="slider-handles"></div>

    // let handlesSlider = document.querySelector('slider-handles');
    // noUiSlider.create(handlesSlider, {
    //   start: [1900, 2017],
    //   range: {
    //     'min': 1900,
    //     'max': 2017,
    //   }
    // });

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
        <div>
          {/* {handlesSlider} */}
          {/* {yearSlider} */}
        </div>
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
