import * as types from '../constants/actionTypes';

const initialState = {
  leaderboardDifficulty: 'ALL',
  sortCategory: 'TOTAL',
};

export default function (previousState = initialState, action) {
  let stateCopy;

  switch (action.type) {
    case types.CHANGE_LEADERBOARD_DIFFICULTY: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.leaderboardDifficulty = action.payload;
      return stateCopy;
    }

    default:
      return previousState;
  }
}
