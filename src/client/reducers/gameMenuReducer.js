import * as types from '../constants/actionTypes';

const initialState = {
  categoryList: [],
  selectedDifficulty: '',
  selectedCategories: [],
  yearRange: [],
  selectedYearRange: [],
  ableToStartGame: false,
  startClicked: false,
  renderScoreFooter: false,
  years: false,
};

export default function (previousState = initialState, action) {
  let stateCopy;
  const underscore = string => string.split('').map(char => char === ' ' ? '_' : char).join('');

  switch (action.type) {
    case types.DISPLAY_GAME_MENU: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.categoryList = action.payload;
      return stateCopy;
    }
    case types.TOGGLE_GAME_CATEGORY: {
      stateCopy = Object.assign({}, previousState);
      const newSelectedCategories = stateCopy.selectedCategories.slice();
      if (newSelectedCategories.includes(underscore(action.payload))) {
        newSelectedCategories.splice(newSelectedCategories.indexOf(underscore(action.payload)), 1);
      } else {
        newSelectedCategories.push(underscore(action.payload));
      }
      if (stateCopy.selectedDifficulty !== '' && newSelectedCategories.length !== 0) {
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
      const allCategoriesSelected = stateCopy.categoryList.map(category => underscore(category.game_category));
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
        stateCopy.renderScoreFooter = true;
      }
      return stateCopy;
    }
    case types.RESET_GAME_INITIATION: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.ableToStartGame = false;
      stateCopy.startClicked = false;
      return stateCopy;
    }
    case types.RESET_GAME_MENU: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.categoryList = [];
      stateCopy.selectedDifficulty = '';
      stateCopy.selectedCategories = [];
      stateCopy.yearRange = [];
      stateCopy.selectedYearRange = [];
      stateCopy.ableToStartGame = false;
      stateCopy.startClicked = false;
      stateCopy.renderScoreFooter = false;
      return stateCopy;
    }

    default:
      return previousState;
  }
}
