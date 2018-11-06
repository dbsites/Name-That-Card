import * as types from '../constants/actionTypes';

export const selectAnswer = event => ({
  type: types.SELECT_ANSWER,
  payload: event,
});

export const goToNext = () => ({
  type: types.GO_TO_NEXT,
});

export const finishGame = () => ({
  type: types.FINISH_GAME,
});

export const resetGame = () => ({
  type: types.RESET_GAME,
});

export const sendResult = (gameResultInfo) => {
  return (dispatch) => {
    return fetch('http://localhost:3000/saveResult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(gameResultInfo),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(resestGame());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
