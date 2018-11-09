import React from 'react';

const Card = (props) => {
  const { wrongAnswers, cardInfo, selectAnswer, selectedGame, selectedDifficulty, getWrongAnswers } = props;

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

  let picture = '';
  let mask = '';
  let answers =[];

  if (cardInfo) {
    console.log('cardInfo ', cardInfo)
    answers = cardInfo.wrongAnswers.map((card) => {
      return card.card_name;
    })
    answers.push(cardInfo.card_name)
    answers = shuffledAnswers(answers);
    const imgSrc = cardInfo.image_location_temp;
    const maskImgSrc = cardInfo.mask;
    const ebayLink = cardInfo.ebay_link
    picture = <img className="cardReveal" src={imgSrc} alt="MASK ON" />;
    mask = <img src={maskImgSrc} alt="MASK OFF MASK OFF" />;
  }

  return (
    <div className="cardContainer">
      <div className="card">
        {picture}
      </div>
      {/* {mask} */}
      <div className="answersBox">
        <div className="answers">
          <div id="answer1" onClick={() => selectAnswer(answers[0])}>{answers[0]}</div>
          <div id="answer2" onClick={() => selectAnswer(answers[1])}>{answers[1]}</div>
        </div>
        <div>
          <div id="answer3" onClick={() => selectAnswer(answers[2])}>{answers[2]}</div>
          <div id="answer4" onClick={() => selectAnswer(answers[3])}>{answers[3]}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
