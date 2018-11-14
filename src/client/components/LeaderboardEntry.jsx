import React from 'react';

const LeaderboardEntry = (props) => {
  const { entryContents, rank } = props;
  const average = Number(entryContents.avg).toFixed(1);
  return (
    <tr>
      <td className="leaderboardEntry">{rank + 1}</td>
      <td className="leaderboardEntry">{entryContents.user}</td>
      <td className="leaderboardEntry">{entryContents.sum}</td>
      <td className="leaderboardEntry">{average}</td>
      <td className="leaderboardEntry">{entryContents.gamecount}</td>
    </tr>
  )
}

export default LeaderboardEntry;
