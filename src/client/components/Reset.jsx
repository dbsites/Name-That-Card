import React from 'react';

const Reset = (props) => {
  const { category } = props;
  return (
    <li onclick={() => removeHardCategory(category)}>{category}</li>
  );
};

export default Reset;