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
  console.log('menu reducer hit')

  switch (action.type) {
    case types.DISPLAY_GAME_MENU: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.categoryList = action.payload;
      return stateCopy;
    }
    default:
      return previousState;
  }
}
