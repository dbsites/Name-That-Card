import * as types from '../constants/actionTypes';

const initialState = {
  isloggedIn: false,
  loggedInUser: '',
  signUpInputUsername: '',
  signUpInputPassword: '',
  signUpInputEmail: '',
  loginInputEmail: '',
  loginInputPassword: '',
  signUpError: false,
  signUpErrorMsg: '',
  loginError: false,
  loginErrorMsg: '',
};

export default function (previousState = initialState, action) {
  let stateCopy;
  switch (action.type) {
    case types.UPDATE_SIGNUP_USERNAME: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.signUpInputUsername = action.payload.target.value;
      console.log('register username ', stateCopy.signUpInputUsername)
      return stateCopy;
    }
    case types.UPDATE_SIGNUP_PASSWORD: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.signUpInputPassword = action.payload.target.value;
      console.log('register password ', stateCopy.signUpInputPassword)
      return stateCopy;
    }
    case types.UPDATE_SIGNUP_EMAIL: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.signUpEmail = action.payload.target.value;
      console.log('register email ', stateCopy.signUpInputEmail)
      return stateCopy;
    }
    case types.SUCCESSFUL_SIGNUP: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.loggedInUser = stateCopy.signUpInputUsername;     
      stateCopy.isloggedIn = true;
      stateCopy.signUpInputUsername = '';
      stateCopy.signUpInputPassword = '';
      stateCopy.signUpInputEmail = '';
      stateCopy.loginInputEmail = '';
      stateCopy.loginInputPassword = '';
      stateCopy.signUpError = false;
      return stateCopy;
    }
    case types.FAILED_SIGNUP: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.signUpInputUsername = '';
      stateCopy.signUpInputPassword = '';
      stateCopy.signUpInputEmail = '';
      stateCopy.loginInputEmail = '';
      stateCopy.loginInputPassword = '';
      stateCopy.signUpError = true;
      stateCopy.signUpErrorMsg = action.payload;
      return stateCopy;
    }
    case types.UPDATE_LOGIN_USERNAME: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.loginInputEmail = action.payload.target.value;
      console.log('login username ', stateCopy.loginInputUsername)
      return stateCopy;
    }
    case types.UPDATE_LOGIN_PASSWORD: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.loginInputPassword = action.payload.target.value;
      console.log('login password ', stateCopy.loginInputPassword)
      return stateCopy;
    }
    case types.SUCCESSFUL_LOGIN: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.loggedInUser = stateCopy.loginInputUsername;     
      stateCopy.isloggedIn = true;
      stateCopy.signUpInputUsername = '';
      stateCopy.signUpInputPassword = '';
      stateCopy.signUpInputEmail = '';
      stateCopy.loginInputEmail = '';
      stateCopy.loginInputPassword = '';
      stateCopy.loginError = false;
      return stateCopy;
    }
    case types.FAILED_LOGIN: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.signUpInputUsername = '';
      stateCopy.signUpInputPassword = '';
      stateCopy.signUpInputEmail = '';
      stateCopy.loginInputEmail = '';
      stateCopy.loginInputPassword = '';
      stateCopy.loginError = true;
      stateCopy.loginErrorMsg = action.payload;
      return stateCopy;
    }

    default:
      console.log('default ran')
      return previousState;
  }
}