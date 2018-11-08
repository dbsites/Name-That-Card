import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../components/Card.jsx';
import Results from '../components/Results.jsx';
import * as gameConfigActions from '../actions/gameConfigActions';
import * as gamePlayActions from '../actions/gamePlayActions';


const mapStateToProps = store => ({
  selectedGame: store.gameListReducer.selectedGame,
  selectedCategories: store.gameMenuReducer.selectedCategories,
  selectedDifficulty: store.gameMenuReducer.selectedDifficulty,
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
  getWrongAnswers: () => {
    dispatch(gameConfigActions.getWrongAnswers());
  },
});
class GameContainer extends Component {
  componentWillMount() {
    const {
      selectedGame,
      selectedCategories,
      getCardsInfo,
    } = this.props;
    
    function getQueryString(arr) {
      let output = '';
      arr.forEach((category, index) => {
        if(index === 0) {
          output += "card_category like '%" + arr[index] + "%'";
        } else {
          output += " or card_category like '%" + arr[index] + "%'";
        }
      })
      return output;
    }

    const queryString = getQueryString(selectedCategories)

    const cardParameters = {
      game: selectedGame,
      query: queryString 
    };
 
    getCardsInfo(cardParameters);
  }

  render() {
    const { selectedGame, cards, wrongAnswers, selectAnswer, goToNext, finishGame, displayResults, selectedDifficulty, getWrongAnswers } = this.props;
    const cardInfo = cards[0];
    let clickFunc = goToNext;
    let title = 'GAME';
    let buttonText = 'NEXT';
    let content = <Card getWrongAnswers={getWrongAnswers} selectedDifficulty={selectedDifficulty} selectedGame={selectedGame} wrongAnswers={wrongAnswers} cardInfo={cardInfo} selectAnswer={selectAnswer} />;

    if (cards.length === 1) {
      clickFunc = finishGame;
      buttonText = 'FINISH';
    }
    
    if (displayResults) {
      title = `YOUR MF'N RESULTS`;
      content = <Results />;
      clickFunc = 
      buttonText = 'PLAY AGAIN';
    }

    return (
      <div>
        <h4 className="headers">{title}</h4>
        <div className="list">
          {content}
        </div>
        <div className="container">
          <div className="gameButton" onClick={clickFunc}>{buttonText}</div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
