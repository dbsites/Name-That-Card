import * as types from '../constants/actionTypes';

const initialState = {
  gameList: ['mtg', 'sports', 'cars', 'ed'],
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
      stateCopy.playClicked = true;
      return stateCopy;
    }

    default:
      return previousState;
  }
}