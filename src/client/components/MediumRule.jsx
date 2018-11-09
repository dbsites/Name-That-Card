import React from 'react';

const MediumRule = (props) => {
  const { category } = props;
  return (
    <li onclick={() => removeMediumCategory(category)}>{category}</li>
  );
};

export default MediumRule;