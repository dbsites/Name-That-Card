import React from 'react';

const HardRule = (props) => {
  const { category, removeRuleFromCategory } = props;
  const infoObj = {
    category: category,
    difficulty: 'hard'
  }
  return (
    <li className="adminRule" onClick={() => removeRuleFromCategory(infoObj)}>{category}</li>
  );
};

export default HardRule;