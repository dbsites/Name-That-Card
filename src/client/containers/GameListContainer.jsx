import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import GameType from '../components/GameType.jsx';
import * as gameConfigActions from '../actions/gameConfigActions';

const mapStateToProps = store => ({
  gameList: store.gameListReducer.gameList,
  ableToProceed: store.gameListReducer.ableToProceed,
  playClicked: store.gameListReducer.playClicked,
  selectedGame: store.gameListReducer.selectedGame,
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
});

class GameListContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getGameList, resetGameSelection } = this.props;
    resetGameSelection();
    getGameList();
  }

  render() {
    const {
      gameList,
      setSelectedGame,
      ableToProceed,
      playClicked,
      selectedGame,
      resetGameSelection,
      successPlay
    } = this.props;

    const games = gameList.map((gameObj, i) => {
      const game = gameObj.game_name;
      console.log(' GameListContainer -> render -> game', game);
      return (
        <GameType key={i} setSelectedGame={setSelectedGame} game={game} />
      );
    });

    if (ableToProceed && playClicked) {
      resetGameSelection();
      const gameMenuRoute = `/gameMenu/${selectedGame}`;
      return <Redirect to={{ pathname: gameMenuRoute }} />;
    }

    return (
      <div className="GameListContainer" >
        <h2>Game List Container</h2>
        {games}
        <button onClick={() => successPlay(selectedGame)} >PLAY</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameListContainer);
