import * as types from '../constants/actionTypes';

const initialState = {
  categoryList: [],
  selectedDifficulty: '',
  selectedCategories: [],
  yearRange: [],
  selectedYearRange: [],
  ableToStartGame: false,
  gameStarted: false,
};

export default function (previousState = initialState, action) {
  let stateCopy;

  switch (action.type) {
    case types.START_GAME: {
      console.log('clicked');
      stateCopy = Object.assign({}, previousState);
      stateCopy.gameStarted = true;
      return stateCopy;
    }
    default:
      return previousState;
  }
}
