import React from 'react';

const Score = (props) => {
  const { score, questionNumber } = props;
  return (
    <div>
      <div>
         {questionNumber} / 20
      </div>
      <div>
        {score} CORRECT MANG~
      </div>
      <br />
      <span>DISCLAIMER</span>
    </div>
  );
};

export default Score;
