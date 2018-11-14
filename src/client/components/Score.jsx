import React from 'react';

const Score = (props) => {
  const { score, questionNumber } = props;
  return (
    <div className="scoreFooter">
      <div className="text--center">
         {questionNumber} / 20
      </div>
      <div className="text--center">
        ~ {score} CORRECT MANG ~
      </div>
    </div>
  );
};

export default Score;
