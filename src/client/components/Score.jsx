import React from 'react';

const Score = (props) => {
  const { score, questionNumber } = props;
  return (
    <div className="scoreFooter">
      <div className="gameScore">
         {questionNumber} / 20
      </div>
      <div className="totalScore">
        {score} CORRECT
      </div>
    </div>
  );
};

export default Score;
