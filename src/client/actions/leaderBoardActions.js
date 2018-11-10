import * as types from '../constants/actionTypes';

export const changeLeaderboardDifficulty = difficulty => ({
  type: types.CHANGE_LEADERBOARD_DIFFICULTY,
  payload: difficulty,
});