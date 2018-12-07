import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import RangeSlider from '../components/RangeSlider.jsx';
import Loader from 'react-loader-advanced';

import * as gameConfigActions from '../actions/gameConfigActions';
import * as gamePlayActions from '../actions/gamePlayActions';
import * as leaderboardActions from '../actions/leaderboardActions';



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
  menuLoadingContent: store.gameMenuReducer.menuLoadingContent,
  isLoggedIn: store.userReducer.isLoggedIn,
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
  resetLeaderboardLoadingContent: () => {
    dispatch(leaderboardActions.resetLeaderboardLoadingContent());
  },
});

class GameMenuContainer extends Component {
  componentDidMount() {
    const { getGameMenuContents, setSelectedGame, resetGame, resetGameMenu, resetLeaderboardLoadingContent } = this.props;
    const urlSelectedGame = window.location.pathname.split('').slice(10).join('');
    setSelectedGame(urlSelectedGame);
    getGameMenuContents(window.location.pathname);
    resetGame();
    resetGameMenu();
    resetLeaderboardLoadingContent();
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
      minYear,
      maxYear,
      updateMinMaxYears,
      setYearsBool,
      menuLoadingContent,
      isLoggedIn,
    } = this.props;
    
    setYearsBool();

    const underscore = string => string.split('').map(char => char === ' ' ? '_' : char).join('');
    const removeUnderscore = string => string.split('').map(char => char === '_' ? ' ' : char).join('');
    const categories = [];
    let modCategoryList = categoryList.slice();
    for(let i = 0; i < modCategoryList.length; i += 1) {
      if(!modCategoryList[i].game_category) {
        modCategoryList.pop();
      }
    }
    

    modCategoryList.forEach((gameCatObj, ind) => {
      const category = gameCatObj.game_category;
      if (selectedCategories.includes(underscore(category))) {
        categories.push(<div className="listButtonStyle activated" onClick={() => toggleGameCategory(category)} key={ind}>{category.toUpperCase()}</div>);
      } else {
        categories.push(<div className="listButtonStyle" onClick={() => toggleGameCategory(category)} key={ind}>{removeUnderscore(category).toUpperCase()}</div>);
      }
    });
   
    if (ableToStartGame && startClicked) {
      resetGameInitiation();
      return <Redirect to={{ pathname: '/game' }} />;
    }

    let allBtn = <div className="allButtonStyle" onClick={toggleAllGameCategories}>ALL</div>
    if (years) {
      if (selectedCategories.length === categoryList.length - 1) {
        allBtn = <div className="allButtonStyle activated" onClick={toggleAllGameCategories}>ALL</div>;
      }
    } else {
      if (selectedCategories.length === categoryList.length - 1) {
        allBtn = <div className="allButtonStyle activated" onClick={toggleAllGameCategories}>ALL</div>;
      }
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

    let slider;
    if (years) {
      slider = <div className="outerSliderContainer"><RangeSlider updateMinMaxYears={updateMinMaxYears} maxYear={maxYear} minYear={minYear} /></div>;
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
    };

    const backgroundStyle = {
      display: 'block',
      position: 'absolute',
      top: '-12.5vh',
      backgroundColor: 'black',
      opacity: 1,
      height: '100vh',
    };

    return (
      <Loader show={menuLoadingContent} message={spinningCircles} foregroundStyle={foregroundStyle} backgroundStyle={backgroundStyle}>
        <div className="MainContainer">
          <div className="leaderboard-menu">
            <div className="leaderboardButton">
              <NavLink to={"/leaderboard/" + selectedGame}>Leaderboard</NavLink>
            </div>
          </div>
          <h3 className="chooseCategories--text--center">CHOOSE CATEGORIES</h3>
          <div className="categoryContainer">
            <div className="list">
              {categories}
              {allBtn}
            </div>
          </div>
          {slider}
          <h3 className="chooseDifficulty--text--center">CHOOSE DIFFICULTY</h3>
          <div className="difficultyBoxStyle">
            {easyBtn}
            {medBtn}
            {hardBtn}
          </div>
          <div className="center">
            <div className="startButtonStyle" onClick={() => startGame()}>START</div>
          </div>
          <div className="gameMenuLoginPrompt--text--center">
            {loginPrompt}
          </div>
        </div>
      </Loader>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenuContainer);
