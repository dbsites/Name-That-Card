import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import RangeSlider from '../components/RangeSlider.jsx';

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
  minYear: store.gameMenuReducer.minYear,
  maxYear: store.gameMenuReducer.maxYear,
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
  setYearsBool: () => {
    dispatch(gameConfigActions.setYearsBool());
  },
  updateMinMaxYears: (event) => {
    dispatch(gameConfigActions.updateMinMaxYears(event));
  },
});

class GameMenuContainer extends Component {
  componentDidMount() {
    const { getGameMenuContents, setSelectedGame, resetGame, resetGameMenu } = this.props;
    const urlSelectedGame = window.location.pathname.split('').slice(10).join('');
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
      years,
      setYearsBool,
      minYear,
      maxYear,
      updateMinMaxYears,
    } = this.props;
  
    setYearsBool();

    const underscore = string => string.split('').map(char => char === ' ' ? '_' : char).join('');
    const categories = [];
    let modCategoryList = categoryList.slice();
    for(let i = 0; i < modCategoryList.length; i += 1) {
      if(!modCategoryList[i].game_category) {
        modCategoryList.pop();
      }
    }
    console.log('mod cats ', modCategoryList)

    modCategoryList.forEach((gameCatObj, ind) => {
      const category = gameCatObj.game_category;
      if (selectedCategories.includes(underscore(category))) {
        categories.push(<div className="listButtonStyle activated" onClick={() => toggleGameCategory(category)} key={ind}>{category}</div>);
      } else {
        categories.push(<div className="listButtonStyle" onClick={() => toggleGameCategory(category)} key={ind}>{category}</div>);
      }
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

    let slider = '';
    if (years) {
      slider = <RangeSlider updateMinMaxYears={updateMinMaxYears} maxYear={maxYear} minYear={minYear} />;
    }

    return (
      <div className="MainContainer">
        <div className="right-menu">
          <div className="menu-item">
            <NavLink to="/leaderBoard">Leaderboard</NavLink>
          </div>
        </div>
        <div className="categoryContainer">
          <h3 className="headers"> {selectedGame} -- CHOOSE CATEGORIES </h3>
          <div className="list">
              {categories}
          </div>
          <div className="container">
              {allBtn}
          </div>
          <div>
            {slider}
          </div>
        </div>
        <div className="bottomMenuContainer">
          <h3 className="headers">-- CHOOSE DIFFICULTY --</h3>
          <div className="container">
            <div className="difficultyBoxStyle">
              {easyBtn}
              {medBtn}
              {hardBtn}
            </div>
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