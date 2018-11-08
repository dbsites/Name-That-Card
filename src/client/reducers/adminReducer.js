import * as types from '../constants/actionTypes';

const initialState = {
  adminIsLoggedIn: false,
  adminUsername: '',
  adminPassword: '',
};

export default function (previousState = initialState, action) {
  let stateCopy;

  switch (action.type) {
    case types.UPDATE_ADMIN_LOGIN_USERNAME: {
      console.log('updated username')
      stateCopy = Object.assign({}, previousState);
      stateCopy.adminUsername = action.payload.target.value;
      return stateCopy;
    }
    case types.UPDATE_ADMIN_LOGIN_PASSWORD: {
      console.log('updated password')
      stateCopy = Object.assign({}, previousState);
      stateCopy.adminPassword = action.payload.target.value;
      return stateCopy;
    }
    case types.SUCCESSFUL_ADMIN_LOGIN: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.adminIsLoggedIn = true;
      stateCopy.adminUsername = '';
      stateCopy.adminPassword = '';
      return stateCopy;
    }
    case types.FAILED_ADMIN_LOGIN: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.adminIsLoggedIn = false;
      stateCopy.adminUsername = '';
      stateCopy.adminPassword = '';
      return stateCopy;
    }
    default:
      console.log('reducer ran')
      return previousState;
  }
}
