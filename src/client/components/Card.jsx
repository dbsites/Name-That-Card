import React from 'react';

const Card = (props) => {
  const { cardInfo, selectAnswer, selectedDifficulty, selectedAnswer } = props;

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
  let coverImg = '';
  let answers =[];

  if (cardInfo) {
    console.log('cardInfo ', cardInfo)
    answers = cardInfo.wrongAnswers.map((card) => {
      return card.card_name;
    })
    answers.push(cardInfo.card_name)
    answers = shuffledAnswers(answers);
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

  if(selectedAnswer !== ''){
    coverImg = '';
  }

  return (
    <div className="cardContainer">
      <div className="cards">
        {picture}
        {coverImg}
      </div>
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
