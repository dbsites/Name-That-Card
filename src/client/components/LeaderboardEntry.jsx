import React from 'react';

const LeaderboardEntry = (props) => {
  const { entryContents, rank } = props;
  const average = Number(entryContents.avg).toFixed(1);
  return (
    <tr>
      <td>{rank + 1}</td>
      <td>{entryContents.user}</td>
      <td>{entryContents.sum}</td>
      <td>{average}</td>
      <td>{entryContents.gamecount}</td>
    </tr>
  )
}

export default LeaderboardEntry;
