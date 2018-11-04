import * as types from '../constants/actionTypes';

const initialState = {
  categoryList: [],
  selectedDifficulty: '',
  selectedCategories: [],
  yearRange: [],
  selectedYearRange: [],
  ableToStartGame: false,
  startClicked: false,
};

export default function (previousState = initialState, action) {
  let stateCopy;

  switch (action.type) {
    case types.DISPLAY_GAME_MENU: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.categoryList = action.payload;
      return stateCopy;
    }
    case types.TOGGLE_GAME_CATEGORY: {
      stateCopy = Object.assign({}, previousState);
      const newSelectedCategories = stateCopy.selectedCategories.slice();
      if (newSelectedCategories.includes(action.payload)) {
        newSelectedCategories.splice(newSelectedCategories.indexOf(action.payload), 1);
      } else {
        newSelectedCategories.push(action.payload);
      }
      if (stateCopy.selectedDifficulty !== '' && stateCopy.selectedCategories.length !== 0) {
        stateCopy.ableToStartGame = true;
      } else {
        stateCopy.ableToStartGame = false;
      }
      stateCopy.selectedCategories = newSelectedCategories;
      return stateCopy;
    }
    case types.TOGGLE_ALL_GAME_CATEGORIES: {
      stateCopy = Object.assign({}, previousState);
      const numCategories = stateCopy.categoryList.length;
      const allCategoriesSelected = [];
      stateCopy.categoryList.forEach((category) => {
        allCategoriesSelected.push(category.game_category);
      });
      let newSelectedCategories = [];
      if (stateCopy.selectedCategories.length !== numCategories) {
        newSelectedCategories = allCategoriesSelected;
      }
      if (stateCopy.selectedDifficulty !== '' && stateCopy.selectedCategories.length !== 0) {
        stateCopy.ableToStartGame = true;
      } else {
        stateCopy.ableToStartGame = false;
      }
      stateCopy.selectedCategories = newSelectedCategories;
      return stateCopy;
    }
    case types.SET_GAME_DIFFICULTY: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.selectedDifficulty = action.payload;
      if (stateCopy.selectedCategories.length !== 0) {
        stateCopy.ableToStartGame = true;
      } else {
        stateCopy.ableToStartGame = false;
      }
      return stateCopy;
    }
    case types.START_GAME: {
      stateCopy = Object.assign({}, previousState);
      if (stateCopy.ableToStartGame) {
        stateCopy.startClicked = true;
      }
      return stateCopy;
    }
    case types.RESET_GAME_INITIATION: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.ableToStartGame = false;
      stateCopy.startClicked = false;
      return stateCopy;
    }

    default:
      return previousState;
  }
}
