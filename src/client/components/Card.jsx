import React from 'react';

const Card = (props) => {
  const { wrongAnswers, cardInfo, selectAnswer } = props;
  let answers = wrongAnswers.slice();
  console.log('cardInfo on card comp ', cardInfo);

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
    answers.push(cardInfo.card_name);
    answers = shuffledAnswers(answers);
    const imgSrc = cardInfo.image_location_temp;
    const maskImgSrc = cardInfo.mask;
    picture = <img src={imgSrc} alt="MASK ON" />;
    mask = <img src={maskImgSrc} alt="MASK OFF MASK OFF" />;
  }

  const divStyle = {
    display: 'flex',
    width: '200px',
    lineHeight: '1.8em !important',
    margin: '20px',
    border: '5px solid pink',
    justifyContent: 'center',
    borderRadius: '15px',
    color: 'white',
    backgroundColor: 'black',
    userSelect: 'none',
    textShadow: '0 0 45px #6fcbdc',
  };

  return (
    <div>
      <div>CARD</div>
      {picture}
      {mask}
      <div>
        <div onClick={() => selectAnswer(answers[0])} style={divStyle}>{answers[0]}</div>
        <div onClick={() => selectAnswer(answers[1])} style={divStyle}>{answers[1]}</div>
        <div onClick={() => selectAnswer(answers[2])} style={divStyle}>{answers[2]}</div>
        <div onClick={() => selectAnswer(answers[3])} style={divStyle}>{answers[3]}</div>
      </div>
    </div>
  );
};

export default Card;
