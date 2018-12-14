import React from 'react';

const LeaderboardEntry = (props) => {
  const { entryContents, rank, sortDirection, numEntries } = props;
  const average = Number(entryContents.avg).toFixed(1);
  let rankIncrement = rank + 1;
  if (!sortDirection) {
    rankIncrement = numEntries - rank;
  }
  return (
    <tr className="leaderboardEntriesRow">
      <td className="leaderboardEntry1">{rankIncrement}</td>
      <td className="leaderboardEntry2">{entryContents.user}</td>
      <td className="leaderboardEntry3">{entryContents.sum}</td>
      <td className="leaderboardEntry4">{average}</td>
      <td className="leaderboardEntry5">{entryContents.gamecount}</td>
    </tr>
  );
};

export default LeaderboardEntry;
