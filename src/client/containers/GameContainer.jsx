import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
  isLoggedIn: store.userReducer.isLoggedIn,
  loggedInUser: store.userReducer.loggedInUser,
  years: store.gameMenuReducer.years,
  minYear: store.gameMenuReducer.minYear,
  maxYear: store.gameMenuReducer.maxYear,
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
      selectedDifficulty,
      years,
      minYear,
      maxYear,
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
      startDate: minYear,
      endDate: maxYear,
    };
    getCardsInfo(cardParameters);
  }

  render() {
    const { selectedGame, cards, wrongAnswers, selectAnswer, goToNext, finishGame, displayResults, selectedDifficulty, getWrongAnswers } = this.props;
    const cardInfo = cards[0];
    let clickFunc = goToNext;
    let title = '';
    let buttonText = 'NEXT';
    let ebayLink; 
    let buyBtn;
    if (cardInfo) {
      if(cardInfo.ebay_link) {
        ebayLink = cardInfo.ebay_link;
        buyBtn = <div className="gameButton"><a href={ebayLink} target="_blank">BUY NOW</a></div>
      }
    }

    let content = <Card getWrongAnswers={getWrongAnswers} selectedDifficulty={selectedDifficulty} selectedGame={selectedGame} wrongAnswers={wrongAnswers} cardInfo={cardInfo} selectAnswer={selectAnswer} />;

    if (cards.length === 1) {
      clickFunc = finishGame;
      buttonText = 'FINISH';
    }
    
    let nextBtn = <div className="gameButton" onClick={clickFunc}>{buttonText}</div>;
    
    if (displayResults) {
      title = `YOUR RESULTS`;
      content = <Results />;
      buttonText = 'PLAY AGAIN';
      let selectedGameRoute = `/gameMenu/${selectedGame}`
      nextBtn = <div className="gameButton"><NavLink to={selectedGameRoute}>{buttonText}</NavLink></div>;
    }

    return (
      <div className="MainContainer">
        <h4 className="headers">{title}</h4>
        <div className="container">
          {content}
        </div>
        <div className="container">
          {buyBtn}
          {nextBtn}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
