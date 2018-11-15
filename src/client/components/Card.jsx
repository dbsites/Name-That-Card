import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
  selectedAnswer: store.gameReducer.selectedAnswer,
});

const mapDispatchToProps = dispatch => ({

});

class Card extends Component {
  render() {
    console.log('card rendered')
    const { cardInfo, selectAnswer, selectedDifficulty } = this.props;

    let picture = '';
    let coverImg = '';
    let cardAnswers =[];

    if (cardInfo) {
      cardAnswers = cardInfo.allAnswers;
      const imgSrc = 'https://s3-us-west-1.amazonaws.com/namethatcard/CARDS/' + cardInfo.image;
      let coverImgSrc;
      if (cardInfo.mask) {
        coverImgSrc = 'https://s3-us-west-1.amazonaws.com/namethatcard/masks/' + selectedDifficulty.toLowerCase() + '_' + cardInfo.mask + '.png';
      } else {
        coverImgSrc = 'https://s3-us-west-1.amazonaws.com/namethatcard/masks/' + selectedDifficulty.toLowerCase() + '_' + cardInfo.imagename;
      }
      
      picture = <img className="card" src={imgSrc} alt="MASK OFF" />;
      coverImg = <img className="cardReveal" src={coverImgSrc} alt="MASK ON" />;
    }

    // if(selectedAnswer !== ''){
    //   coverImg = '';
    // }

    return (
      <div className="cardContainer">
        <div className="cards">
          {picture}
          {coverImg}
        </div>
        <div className="answersBox">
          <div className="answers">
            <div id="answer1" onClick={() => selectAnswer(cardAnswers[0])}>{cardAnswers[0]}</div>
            <div id="answer2" onClick={() => selectAnswer(cardAnswers[1])}>{cardAnswers[1]}</div>
          </div>
          <div>
            <div id="answer3" onClick={() => selectAnswer(cardAnswers[2])}>{cardAnswers[2]}</div>
            <div id="answer4" onClick={() => selectAnswer(cardAnswers[3])}>{cardAnswers[3]}</div>
          </div>
        </div>
      </div>
    );
  };
}

  export default connect(mapStateToProps, mapDispatchToProps)(Card);
