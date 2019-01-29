import * as types from '../constants/actionTypes';

export const changeLeaderboardDifficulty = difficulty => ({
  type: types.CHANGE_LEADERBOARD_DIFFICULTY,
  payload: difficulty,
});

export const changeLeaderboardSortCategory = category => ({
  type: types.CHANGE_LEADERBOARD_SORT_CATEGORY,
  payload: category,
});

export const populateResultsArray = array => ({
  type: types.POPULATE_RESULTS_ARRAY,
  payload: array,
});

export const toggleSortDirection = () => ({
  type: types.TOGGLE_SORT_DIRECTION,
});

export const resetLeaderboardLoadingContent = () => ({
  type: types.RESET_LEADERBOARD_LOADING_CONTENT,
});

export const resetLeaderboardConfig = () => ({
  type: types.RESET_LEADERBOARD_CONFIG,
});

export const getGameHistory = (obj) => {
  return (dispatch) => {
    return fetch('/api/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(populateResultsArray(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
