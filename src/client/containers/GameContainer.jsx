import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../components/Card.jsx';
import * as gameConfigActions from '../actions/gameConfigActions';
import * as gamePlayActions from '../actions/gamePlayActions';


const mapStateToProps = store => ({
  selectedGame: store.gameListReducer.selectedGame,
  selectedCategories: store.gameMenuReducer.selectedCategories,
  cards: store.gameReducer.cards,
  wrongAnswers: store.gameReducer.wrongAnswers,
});

const mapDispatchToProps = dispatch => ({
  getCardsInfo: (info) => {
    dispatch(gameConfigActions.getCardsInfo(info));
  },
  selectAnswer: (answer) => {
    dispatch(gamePlayActions.selectAnswer(answer));
  },
  goToNext: () => {
    dispatch(gamePlayActions.goToNext());
  },
});

class GameContainer extends Component {

  componentWillMount() {
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
  }


  render() {
    const { selectedGame, cards, wrongAnswers, selectAnswer, goToNext } = this.props;
    const cardInfo = cards[0];

    return (
      <div className="GameContainer">
        <h4>{selectedGame}</h4>
        <Card wrongAnswers={wrongAnswers} cardInfo={cardInfo} selectAnswer={selectAnswer} />
        <button type="button" onClick={goToNext}>NEXT</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
