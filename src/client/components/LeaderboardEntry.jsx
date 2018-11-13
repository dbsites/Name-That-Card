import React from 'react';

const LeaderboardEntry = (props) => {
  const { entryContents, rank, sortDirection, numEntries } = props;
  const average = Number(entryContents.avg).toFixed(1);
  let rankIncrement = rank + 1;
  if (!sortDirection) {
    rankIncrement = numEntries - rank;
  }
  return (
    <tr>
      <td>{rankIncrement}</td>
      <td>{entryContents.user}</td>
      <td>{entryContents.sum}</td>
      <td>{average}</td>
      <td>{entryContents.gamecount}</td>
    </tr>
  )
}

export default LeaderboardEntry;
