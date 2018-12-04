import React from 'react';

const MediumRule = (props) => {
  const { category, removeRuleFromCategory } = props;
  const infoObj = {
    category: category,
    difficulty: 'medium'
  }
  return (
    <li className="adminRule" onClick={() => removeRuleFromCategory(infoObj)}>{category}</li>
  );
};

export default MediumRule;