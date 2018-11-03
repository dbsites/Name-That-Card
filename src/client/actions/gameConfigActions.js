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
    return fetch(`http://localhost:3000/gameMenu/${selectedGame}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log('submit data ', data)
      dispatch(successPlay());
      dispatch(displayGameMenu(data));
    })
    .catch((err) => {
      console.log(err);
    })
  };
}

export const displayGameMenu = (data) => ({
  type: types.DISPLAY_GAME_MENU,
  payload: data,
})

export const displayGameList = (data) => ({
  type: types.DISPLAY_GAME_LIST,
  payload: data,
})

export const getGameList = () => {
  return (dispatch) => {
    return fetch('http://localhost:3000/gameList')
    .then((res) => {
      console.log(' getGameList -> res', res);
      return res.json();
    })
    .then((data) => {
      console.log(' getGameList -> data', data);
      dispatch(displayGameList(data));
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export const resetGameSelection = () => ({
  type: types.RESET_GAME_SELECTION,
})
