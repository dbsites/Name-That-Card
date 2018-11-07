import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../components/Card.jsx';
import Results from '../components/Results.jsx';
import * as gameConfigActions from '../actions/gameConfigActions';
import * as gamePlayActions from '../actions/gamePlayActions';


const mapStateToProps = store => ({
  selectedGame: store.gameListReducer.selectedGame,
  selectedCategories: store.gameMenuReducer.selectedCategories,
  cards: store.gameReducer.cards,
  wrongAnswers: store.gameReducer.wrongAnswers,
  displayResults: store.gameReducer.displayResults,
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
  finishGame: () => {
    dispatch(gamePlayActions.finishGame());
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
    const { selectedGame, cards, wrongAnswers, selectAnswer, goToNext, finishGame, displayResults } = this.props;
    const cardInfo = cards[0];
    let clickFunc = goToNext;
    let title = 'GAME';
    let buttonText = 'NEXT';
    let content = <Card selectedDifficulty={selectedDifficulty} selectedGame={selectedGame} wrongAnswers={wrongAnswers} cardInfo={cardInfo} selectAnswer={selectAnswer} />;

    if (cards.length === 1) {
      clickFunc = finishGame;
      buttonText = 'FINISH';
    }
    
    if (displayResults) {
      title = `YOUR MF'N RESULTS`;
      content = <Results />;
    }

    const buttonStyle = {
      display: 'flex',
      width: '200px',
      lineHeight: '1.8em !important',
      margin: '20px',
      border: '5px solid black',
      justifyContent: 'center',
      borderRadius: '15px',
      color: 'white',
      backgroundColor: 'pink',
      userSelect: 'none',
      textShadow: '0 0 45px #6fcbdc',
    };

    return (
      <div className="GameContainer">
        <h4>{title}</h4>
        {content}
        <div style={buttonStyle} onClick={clickFunc}>{buttonText}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
