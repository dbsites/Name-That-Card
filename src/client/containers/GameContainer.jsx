import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-advanced';
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
  gameLoadingContent: store.gameReducer.gameLoadingContent,
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
  componentDidMount() {
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

    const { selectedGame, cards, selectAnswer, displayResults, selectedDifficulty, gameLoadingContent } = this.props;
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
      backgroundColor: 'black',
      opacity: 1,
    }

    return (
      <Loader show={gameLoadingContent} message={rotatingSquares} foregroundStyle={foregroundStyle} backgroundStyle={backgroundStyle}>
        <div className="GameContainer">
          <div>
            {content}
          </div>
          <BuyAndNextBtns />
        </div>
      </Loader>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
