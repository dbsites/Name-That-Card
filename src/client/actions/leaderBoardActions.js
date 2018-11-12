import * as types from '../constants/actionTypes';

export const changeLeaderboardDifficulty = difficulty => ({
  type: types.CHANGE_LEADERBOARD_DIFFICULTY,
  payload: difficulty,
});

export const populateResultsArray = array => ({
  type: types.POPULATE_RESULTS_ARRAY,
  payload: array,
});

export const getGameHistory = (obj) => {
  console.log('gameObj in actions ', obj);
  return (dispatch) => {
    return fetch('http://localhost:3000/leaderboard', {
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
