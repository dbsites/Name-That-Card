import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameType from '../components/GameType.jsx';

const mapStateToProps = store => ({
  gameList: store.gameListReducer.gameList,
});

const mapDispatchToProps = dispatch => ({

});

class GameListContainer extends Component {
  render() {
    const { gameList } = this.props;
    let gameLists = gameList.map((game, index) => {
      return(
        <GameType key={index} game={game} />
      )
    })
    return (
      <div className="GameListContainer" >
        <h2>Game List Container</h2>
        {gameLists}
        <button>NEXT</button>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GameListContainer);
