import React from 'react';

const LeaderboardEntry = (props) => {
  const { entryContents } = props;
  return (
    <tr>
      <td>entryContents.user</td>
      <td>entryContents.sum</td>
      <td>entryContents.avg</td>
      <td>entryContents.gamecount</td>
    </tr>
  )
}

export default LeaderboardEntry;
