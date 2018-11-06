import * as types from '../constants/actionTypes';

export const selectAnswer = event => ({
  type: types.SELECT_ANSWER,
  payload: event,
});

export const goToNext = () => ({
  type: types.GO_TO_NEXT,
});

// export const setNextClicked = () => ({
//   type: types.SET_NEXT_CLICKED,
// });
