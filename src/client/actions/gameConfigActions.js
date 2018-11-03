import * as types from '../constants/actionTypes';

export const setSelectedGame = game => ({
  type: types.SET_SELECTED_GAME,
  payload: game,
});

export const successPlay = () => ({
  type: types.SUCCESS_PLAY
});

export const submitGameSelection = (selectedGame) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/gameMenu/${selectedGame}` , {
      method: 'GET',
      headers: {"Content-Type": "application/json; charset=utf-8"},
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      dispatch(successPlay());
    })
    .catch((err) => {
      console.log(err);
    })
  }
}