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
  };
}

export const displayGameList = (data) => ({
  type: types.DISPLAY_GAME_LIST,
  payload: data,
})

export const getGameList = () => {
  return (dispatch) => {
    return fetch('/gameList')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(' getGameList -> data', data);
        dispatch(displayListing(data));
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
