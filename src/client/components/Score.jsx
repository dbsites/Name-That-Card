import React from 'react';

const Score = (props) => {
  const { score, questionNumber } = props;
  return (
    <div className="scoreFooter">
      <div className="center">
         {questionNumber} / 20
      </div>
      <div className="center">
        ~ {score} CORRECT MANG ~
      </div>
    </div>
  );
};

export default Score;
