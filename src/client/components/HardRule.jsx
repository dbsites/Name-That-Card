import React from 'react';

const HardRule = (props) => {
  const { category } = props;
  return (
    <li onclick={() => removeHardCategory(category)}>{category}</li>
  );
};

export default HardRule;