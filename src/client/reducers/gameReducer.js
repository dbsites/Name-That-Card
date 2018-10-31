import * as types from '../constants/actionTypes';

const initialState = {
  score: 0,
  questionNumber: 1,
  cards: [],
  wrongAnswers: [],
  
};

export default function (previousState = initialState, action) {
  let stateCopy;

  switch (action.type) {
    case types._______: {
      stateCopy = Object.assign({}, previousState);

      return stateCopy;
    }
    
    default:
      return previousState;
  }
}