import * as types from '../constants/actionTypes';

const initialState = {
  gameList: [],
  selectedGame: '',
  ableToProceed: false,
  playClicked: false,
};

export default function (previousState = initialState, action) {
  let stateCopy;

  switch (action.type) {
    case types.SET_SELECTED_GAME: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.selectedGame = action.payload;
      stateCopy.ableToProceed = true;
      return stateCopy;
    }
    case types.SUCCESS_PLAY: {
      stateCopy = Object.assign({}, previousState);
      if (stateCopy.selectedGame !== '') {
        stateCopy.playClicked = true;
      }
      return stateCopy;
    }
    case types.DISPLAY_GAME_LIST: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.gameList = action.payload;
      return stateCopy;
    }
    case types.RESET_GAME_SELECTION: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.ableToProceed = false;
      stateCopy.playClicked = false;
      stateCopy.selectedGame = '';
      stateCopy.years = false;
      return stateCopy;
    }

    default:
      return previousState;
  }
}
