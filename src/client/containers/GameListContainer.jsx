import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameType from '../components/GameType';

const mapStateToProps = store => ({
  gameList: store.gameList,
});

// const mapDispatchToProps = dispatch => ({

// });

class GameListContainer extends Component {
  render() {
    const { gameList } = this.props;
    let gameLists = gameList.map((game) => {
      return(
        <GameType game={game} />
      )
    })
    return (
      <div className="GameListContainer" >
        <h2>Game List Container</h2>
        {gameLists}
        <button type="button">NEXT</button>
      </div>
    );
  }
}


export default connect(/*mapStateToProps, mapDispatchToProps*/)(GameListContainer);
