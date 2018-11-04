import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as gameConfigActions from '../actions/gameConfigActions';

const mapStateToProps = store => ({
  selectedGame: store.gameListReducer.selectedGame,
  selectedCategories: store.gameListReducer.selectedCategories,
});

const mapDispatchToProps = dispatch => ({
  getCardsInfo: (info) => {
    dispatch(gameConfigActions.getCardsInfo(info));
  },
});

class GameContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const {
      selectedGame,
      selectedCategories,
      getCardsInfo,
    } = this.props;

    const cardParameters = {
      game: selectedGame,
    };

    selectedCategories.forEach((category) => {
      cardParameters[category] = 1;
    });
    getCardsInfo(cardParameters);
    //getWrongAnswers();
  }

  render() {
    const { selectedGame } = this.props;
    return (
      <div className="GameContainer">
        <h4>{selectedGame}</h4>
        <button type="button">NEXT</button>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
