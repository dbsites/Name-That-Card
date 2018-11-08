import React from 'react';

const Score = (props) => {
  const { score, questionNumber } = props;
  return (
    <div className="scoreFooter">
      <div>
         {questionNumber} / 20
      </div>
      <div>
        ~ {score} CORRECT MANG ~
      </div>
    </div>
  );
};

export default Score;
