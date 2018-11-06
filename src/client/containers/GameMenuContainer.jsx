import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as gameConfigActions from '../actions/gameConfigActions';

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
});

class GameMenuContainer extends Component {
  componentDidMount() {
    const { getGameMenuContents, setSelectedGame } = this.props;
    getGameMenuContents(window.location.pathname);
    const urlSelectedGame = window.location.pathname.split('').slice(10).join('');
    console.log(urlSelectedGame);
    setSelectedGame(urlSelectedGame);
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
    // console.log(' GameMenuContainer -> render -> categoryList', categoryList);

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

    const difficultyBoxStyle = {
      display: 'flex',
      width: '400px',
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

    const difficultyStyle = {
      display: 'inline',
      width: '200px',
      lineHeight: '1.3em !important',
      margin: '1px',
      justifyContent: 'center',
      textAlign: 'center',
      borderRadius: '15px',
      color: 'white',
      backgroundColor: 'black',
      userSelect: 'none',
      textShadow: '0 0 45px #6fcbdc',
    };

    const categories = categoryList.map((gameCatObj) => {
      const category = gameCatObj.game_category;
      return (
        <div onClick={() => toggleGameCategory(category)} style={divStyle}>{category}</div>
      );
    });

    if (ableToStartGame && startClicked) {
      resetGameInitiation();
      // let gameRoute = `/gameMenu/${selectedGame}`;
      return <Redirect to={{ pathname: '/game' }} />;
    }

    return (
      <div className="GameMenuContainer">
        <h3>Game Menu Container</h3>
        {categories}
        <div onClick={toggleAllGameCategories} style={divStyle}>ALL</div>           
        <div style={difficultyBoxStyle}>
          <div style={difficultyStyle} onClick={() => setGameDifficulty('easy')}>EASY</div>
          <div style={difficultyStyle} onClick={() => setGameDifficulty('med')}>MED.</div>
          <div style={difficultyStyle} onClick={() => setGameDifficulty('hard')}>HARD</div>
        </div>
        <button type="button" onClick={() => startGame()}>START</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenuContainer);
