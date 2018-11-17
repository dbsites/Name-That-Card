import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../components/Card.jsx';
import Results from '../components/Results.jsx';
import BuyAndNextBtns from '../components/BuyAndNextBtns.jsx';
import * as gameConfigActions from '../actions/gameConfigActions';
import * as gamePlayActions from '../actions/gamePlayActions';


const mapStateToProps = store => ({
  selectedGame: store.gameListReducer.selectedGame,
  selectedCategories: store.gameMenuReducer.selectedCategories,
  selectedDifficulty: store.gameMenuReducer.selectedDifficulty,
  cards: store.gameReducer.cards,
  displayResults: store.gameReducer.displayResults,
  isLoggedIn: store.userReducer.isLoggedIn,
  loggedInUser: store.userReducer.loggedInUser,
  years: store.gameMenuReducer.years,
  selectedMinYear: store.gameMenuReducer.selectedMinYear,
  selectedMaxYear: store.gameMenuReducer.selectedMaxYear,
});

const mapDispatchToProps = dispatch => ({
  getCardsInfo: (info) => {
    dispatch(gameConfigActions.getCardsInfo(info));
  },
  selectAnswer: (answer) => {
    dispatch(gamePlayActions.selectAnswer(answer));
  },
});
class GameContainer extends Component {
  componentWillMount() {
    const {
      selectedGame,
      selectedCategories,
      getCardsInfo,
      selectedDifficulty,
      years,
      selectedMinYear,
      selectedMaxYear,
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
      query: queryString,
      level: selectedDifficulty,
      years: years,
      startDate: selectedMinYear,
      endDate: selectedMaxYear,
    };
    console.log('cardparams ', cardParameters)
    getCardsInfo(cardParameters);
  }

  render() {
    console.log('game container rendered')
    const shuffledAnswers = (answersArr) => {
      let counter = answersArr.length;
      while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter -= 1;
        const temp = answersArr[counter];
        answersArr[counter] = answersArr[index];
        answersArr[index] = temp;
      }
      return answersArr;
    };

    const { selectedGame, cards, selectAnswer, displayResults, selectedDifficulty } = this.props;
    const cardInfo = cards[0];
    const answers = [];
  
    if (cardInfo) {
      cardInfo.wrongAnswers.forEach((answer) => {
        answers.push(answer.card_name);
      })
      answers.push(cardInfo.card_name);
      cardInfo.allAnswers = shuffledAnswers(answers);
    }

    let content = <Card selectedDifficulty={selectedDifficulty} selectedGame={selectedGame} cardInfo={cardInfo} selectAnswer={selectAnswer} />;

    if (displayResults) {
      content = <Results />;
    }

    return (
      <div className="GameContainer">
        <div>
          {content}
        </div>
        <BuyAndNextBtns />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
