// LeaderboardContainer

import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-advanced';
import Leaderboard from '../components/Leaderboard.jsx';
import * as leaderboardActions from '../actions/leaderboardActions';

const mapStateToProps = store => ({
  leaderboardDifficulty: store.leaderboardReducer.leaderboardDifficulty,
  selectedGame: store.gameListReducer.selectedGame,
  leaderboardLoadingContent: store.leaderboardReducer.leaderboardLoadingContent,
});

const mapDispatchToProps = dispatch => ({
  changeLeaderboardDifficulty: (difficulty) => {
    dispatch(leaderboardActions.changeLeaderboardDifficulty(difficulty));
  },
  getGameHistory: (gameObj) => {
    dispatch(leaderboardActions.getGameHistory(gameObj));
  },
});

const LeaderboardContainer = (props) => {
  const { leaderboardDifficulty, selectedGame, changeLeaderboardDifficulty, getGameHistory, leaderboardLoadingContent } = props;
  
  const gameObj = {
    game: window.location.pathname.slice(13)
  }

  getGameHistory(gameObj);

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
    <Loader show={leaderboardLoadingContent} message={spinningCircles} foregroundStyle={foregroundStyle} backgroundStyle={backgroundStyle}>
      <div>
        <Leaderboard changeLeaderboardDifficulty={changeLeaderboardDifficulty} leaderboardDifficulty={leaderboardDifficulty} selectedGame={selectedGame} />
      </div>
    </Loader>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardContainer);
