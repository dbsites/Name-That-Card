import * as types from '../constants/actionTypes';

const initialState = {
  leaderboardDifficulty: 'ALL',
  sortCategory: 'sum',
  sortDirection: true,
  results: [],
  leaderboardLoadingContent: true,
};

export default function (previousState = initialState, action) {
  let stateCopy;

  switch (action.type) {
    case types.CHANGE_LEADERBOARD_DIFFICULTY: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.leaderboardDifficulty = action.payload;
      return stateCopy;
    }
    case types.CHANGE_LEADERBOARD_SORT_CATEGORY: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.sortCategory = action.payload;
      stateCopy.sortDirection = !stateCopy.sortDirection;
      return stateCopy;
    }
    case types.POPULATE_RESULTS_ARRAY: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.results = action.payload;
      stateCopy.leaderboardLoadingContent = false;
      return stateCopy;
    }
    case types.RESET_LEADERBOARD_LOADING_CONTENT: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.leaderboardLoadingContent = true;
      return stateCopy;
    }
    case types.RESET_LEADERBOARD_CONFIG: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.leaderboardDifficulty = 'ALL';
      stateCopy.sortCategory = 'sum';
      stateCopy.sortDirection = true;
      return stateCopy;
    }
    
    default:
      return previousState;
  }
}
