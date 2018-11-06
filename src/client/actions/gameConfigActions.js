import * as types from '../constants/actionTypes';

export const displayGameList = data => ({
  type: types.DISPLAY_GAME_LIST,
  payload: data,
});

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
      });
  };
};

export const setSelectedGame = game => ({
  type: types.SET_SELECTED_GAME,
  payload: game,
});

export const successPlay = () => ({
  type: types.SUCCESS_PLAY,
});

export const displayGameMenu = data => ({
  type: types.DISPLAY_GAME_MENU,
  payload: data,
});

export const getGameMenuContents = (url) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000${url}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(displayGameMenu(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const resetGameSelection = () => ({
  type: types.RESET_GAME_SELECTION,
});

export const toggleGameCategory = category => ({
  type: types.TOGGLE_GAME_CATEGORY,
  payload: category,
});

export const toggleAllGameCategories = () => ({
  type: types.TOGGLE_ALL_GAME_CATEGORIES,
});

export const setGameDifficulty = difficulty => ({
  type: types.SET_GAME_DIFFICULTY,
  payload: difficulty,
});

export const resetGameInitiation = () => ({
  type: types.RESET_GAME_INITIATION,
});

export const startGame = () => ({
  type: types.START_GAME,
});

export const populateCardsArray = cardsData => ({
  type: types.POPULATE_CARDS_ARRAY,
  payload: cardsData,
});

export const getCardsInfo = (cardInfoObj) => {
  console.log('cards info actions', cardInfoObj);
  return (dispatch) => {
    return fetch('http://localhost:3000/loadGame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(cardInfoObj),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(populateCardsArray(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
