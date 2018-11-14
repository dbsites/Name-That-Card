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
      <td className="leaderboardEntry">{rankIncrement}</td>
      <td className="leaderboardEntry">{entryContents.user}</td>
      <td className="leaderboardEntry">{entryContents.sum}</td>
      <td className="leaderboardEntry">{average}</td>
      <td className="leaderboardEntry">{entryContents.gamecount}</td>
    </tr>
  )
}

export default LeaderboardEntry;
