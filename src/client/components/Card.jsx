import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCardFlip from 'react-card-flip';

const mapStateToProps = store => ({
  flipped: store.gameReducer.flipped,
  ableToNext: store.gameReducer.ableToNext,
});

class Card extends Component {
  render() {
    console.log('card rendered')
    const { cardInfo, selectAnswer, selectedDifficulty, flipped, ableToNext } = this.props;

    let picture = '';
    let coverImg = '';
    let cardAnswers =[];

    if (cardInfo) {
      cardAnswers = cardInfo.allAnswers;
      let imgSrc = 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-295078398723/CARDS/' + cardInfo.image;
      let coverImgSrc;
      if (cardInfo.mask) {
        coverImgSrc = 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-295078398723/masks/' + selectedDifficulty.toLowerCase() + '_' + cardInfo.mask + '.png';
      } else {
        coverImgSrc = 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-295078398723/CARDS/' + cardInfo.image;
        imgSrc = 'https://s3-us-west-2.amazonaws.com/elasticbeanstalk-us-west-2-295078398723/CARDS/' + cardInfo.image_after;
      }
      
      picture = <img className="card" src={imgSrc} alt="" />;
      coverImg = <img className="cardReveal" src={coverImgSrc} alt="" />;
    }

    let answer1 = <div className="answer1" onClick={() => selectAnswer(cardAnswers[0])}>{cardAnswers[0]}</div>;
    let answer2 = <div className="answer2" onClick={() => selectAnswer(cardAnswers[1])}>{cardAnswers[1]}</div>;
    let answer3 = <div className="answer3" onClick={() => selectAnswer(cardAnswers[2])}>{cardAnswers[2]}</div>;
    let answer4 = <div className="answer4" onClick={() => selectAnswer(cardAnswers[3])}>{cardAnswers[3]}</div>;

    if(ableToNext) {
      coverImg = '';
      if(cardInfo.card_name === cardAnswers[0]) {
        answer1 = <div className="answer1" id="correctAnswer" onClick={() => selectAnswer(cardAnswers[0])}>{cardAnswers[0]}</div>;
        answer2 = <div className="answer2" id="wrongAnswer" onClick={() => selectAnswer(cardAnswers[1])}>{cardAnswers[1]}</div>;
        answer3 = <div className="answer3" id="wrongAnswer" onClick={() => selectAnswer(cardAnswers[2])}>{cardAnswers[2]}</div>;
        answer4 = <div className="answer4" id="wrongAnswer" onClick={() => selectAnswer(cardAnswers[3])}>{cardAnswers[3]}</div>;
      } else if (cardInfo.card_name === cardAnswers[1]) {
        answer1 = <div className="answer1" id="wrongAnswer" onClick={() => selectAnswer(cardAnswers[0])}>{cardAnswers[0]}</div>;
        answer2 = <div className="answer2" id="correctAnswer" onClick={() => selectAnswer(cardAnswers[1])}>{cardAnswers[1]}</div>;
        answer3 = <div className="answer3" id="wrongAnswer" onClick={() => selectAnswer(cardAnswers[2])}>{cardAnswers[2]}</div>;
        answer4 = <div className="answer4" id="wrongAnswer" onClick={() => selectAnswer(cardAnswers[3])}>{cardAnswers[3]}</div>;
      } else if (cardInfo.card_name === cardAnswers[2]) {
        answer1 = <div className="answer1" id="wrongAnswer" onClick={() => selectAnswer(cardAnswers[0])}>{cardAnswers[0]}</div>;
        answer2 = <div className="answer2" id="wrongAnswer" onClick={() => selectAnswer(cardAnswers[1])}>{cardAnswers[1]}</div>;
        answer3 = <div className="answer3" id="correctAnswer" onClick={() => selectAnswer(cardAnswers[2])}>{cardAnswers[2]}</div>;
        answer4 = <div className="answer4" id="wrongAnswer" onClick={() => selectAnswer(cardAnswers[3])}>{cardAnswers[3]}</div>;
      } else if (cardInfo.card_name === cardAnswers[3]) {
        answer1 = <div className="answer1" id="wrongAnswer" onClick={() => selectAnswer(cardAnswers[0])}>{cardAnswers[0]}</div>;
        answer2 = <div className="answer2" id="wrongAnswer" onClick={() => selectAnswer(cardAnswers[1])}>{cardAnswers[1]}</div>;
        answer3 = <div className="answer3" id="wrongAnswer" onClick={() => selectAnswer(cardAnswers[2])}>{cardAnswers[2]}</div>;
        answer4 = <div className="answer4" id="correctAnswer" onClick={() => selectAnswer(cardAnswers[3])}>{cardAnswers[3]}</div>;
      }
    }

    return (
      <div className="cardContainer">
        <ReactCardFlip isFlipped={flipped} infinite={false}>
          <div className="cards" key="front">
            {picture}
            {coverImg}
          </div>
          <div className="cards" key="back">
            {picture}
          </div>
        </ReactCardFlip>
        <div className="answersBox">
          <div className="answersLeft">
            {answer1}
            {answer2}
          </div>
          <div className="answersRight">
            {answer3}
            {answer4}
          </div>
        </div>
      </div>
    );
  };
}

export default connect(mapStateToProps, null)(Card);
