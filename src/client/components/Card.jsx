import React from 'react';

const Card = (props) => {
  const { wrongAnswers, cardInfo, selectAnswer, selectedGame, selectedDifficulty, getWrongAnswers } = props;
  let answers = wrongAnswers.slice();

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

  if (cardInfo) {
    console.log('cardInfo ', cardInfo);
    answers.push(cardInfo.card_name);
    answers = shuffledAnswers(answers);
    const imgSrc = cardInfo.image_location_temp;
    const maskImgSrc = cardInfo.mask;
    picture = <img src={imgSrc} alt="MASK ON" />;
    mask = <img src={maskImgSrc} alt="MASK OFF MASK OFF" />;
    const wrongAnswerInfo = {
      card_id: cardInfo.card_id,
      game: selectedGame,
      difficulty_level: selectedDifficulty,
    }
    getWrongAnswers(wrongAnswerInfo);
  }

  return (
    <div className="container">
      <div>CARD</div>
      <div className="card">
        {picture}
      </div>
      {mask}
      <div className="answersBox">
        <div>
          <li id="answers" onClick={() => selectAnswer(answers[0])}>{answers[0]}</li>
          <li id="answers" onClick={() => selectAnswer(answers[1])}>{answers[1]}</li>
        </div>
        <div>
          <li id="answers" onClick={() => selectAnswer(answers[2])}>{answers[2]}</li>
          <li id="answers" onClick={() => selectAnswer(answers[3])}>{answers[3]}</li>
        </div>
      </div>
    </div>
  );
};

export default Card;
