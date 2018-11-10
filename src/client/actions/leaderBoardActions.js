import * as types from '../constants/actionTypes';

export const changeLeaderboardDifficulty = event => ({
  type: types.CHANGE_LEADERBOARD_DIFFICULTY,
  payload: event,
});