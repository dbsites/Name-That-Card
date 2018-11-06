import * as types from '../constants/actionTypes';

const initialState = {

};

export default function (previousState = initialState, action) {
  let stateCopy;

  switch (action.type) {
    case types.CHANGE_APPLOCATION: {
      stateCopy = Object.assign({}, previousState);
      return stateCopy;
    }
    default:
      return previousState;
  }
}
