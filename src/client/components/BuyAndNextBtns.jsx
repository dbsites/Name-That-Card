import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as gamePlayActions from '../actions/gamePlayActions';


const mapStateToProps = store => ({
  ableToNext: store.gameReducer.ableToNext,
  cards: store.gameReducer.cards,
  displayResults: store.gameReducer.displayResults,
  selectedGame: store.gameListReducer.selectedGame,
});

const mapDispatchToProps = dispatch => ({
  goToNext: () => {
    dispatch(gamePlayActions.goToNext());
  },
  finishGame: () => {
    dispatch(gamePlayActions.finishGame());
  },
});

const BuyAndNextBtns = (props) => {
  const { ableToNext, cards, goToNext, finishGame, displayResults, selectedGame } = props;
  
  const cardInfo = cards[0];
  let buttonText = 'NEXT';
  let clickFunc = goToNext;
  
  let buyBtn;
  let ebayLink;
  if (cardInfo) {
    if (cardInfo.ebay_link) {
      buyBtn = <div className="gameButton">BUY NOW</div>;
    }
    if (cardInfo.ebay_link && ableToNext) {
      ebayLink = cardInfo.ebay_link;
      buyBtn = <div className="gameButton activeBuyBtn"><a href={ebayLink} target="_blank">BUY NOW</a></div>;
    }
  }
  if (cards.length === 1) {
    clickFunc = finishGame;
    buttonText = 'FINISH';
  }
  let nextBtn = <div className="gameButton" onClick={clickFunc}>{buttonText}</div>;
  if (ableToNext) {
    nextBtn = <div className="gameButton" onClick={clickFunc}>{buttonText}</div>;
  }

  if (displayResults) {
    buttonText = 'PLAY AGAIN';
    let selectedGameRoute = `/gameMenu/${selectedGame}`
    nextBtn = <div className="gameButton"><NavLink to={selectedGameRoute}>{buttonText}</NavLink></div>;
  }

  return (
    <div className="gameButtonContainer">
      {buyBtn}
      {nextBtn}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyAndNextBtns);
