import * as types from '../constants/actionTypes';

const initialState = {
  isLoggedIn: false,
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
      return stateCopy;
    }
    case types.UPDATE_SIGNUP_PASSWORD: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.signUpInputPassword = action.payload.target.value;
      return stateCopy;
    }
    case types.UPDATE_SIGNUP_EMAIL: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.signUpInputEmail = action.payload.target.value;
      return stateCopy;
    }
    case types.SUCCESSFUL_SIGNUP: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.loggedInUser = stateCopy.signUpInputUsername;     
      stateCopy.isLoggedIn = true;
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
    case types.UPDATE_LOGIN_EMAIL: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.loginInputEmail = action.payload.target.value;
      return stateCopy;
    }
    case types.UPDATE_LOGIN_PASSWORD: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.loginInputPassword = action.payload.target.value;
      return stateCopy;
    }
    case types.SUCCESSFUL_LOGIN: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.loggedInUser = action.payload;    
      stateCopy.isLoggedIn = true;
      stateCopy.signUpInputUsername = '';
      stateCopy.signUpInputPassword = '';
      stateCopy.signUpInputEmail = '';
      stateCopy.loginInputEmail = '';
      stateCopy.loginInputPassword = '';
      stateCopy.loginError = false;
      let inputs = document.getElementsByClassName('form__input');
      console.log(inputs)
      return stateCopy;
    }
    case types.FAILED_LOGIN: {
      stateCopy = Object.assign({}, previousState);
      // stateCopy.signUpInputUsername = '';
      // stateCopy.signUpInputPassword = '';
      // stateCopy.signUpInputEmail = '';
      stateCopy.loginInputEmail = '';
      stateCopy.loginInputPassword = '';
      stateCopy.loginError = true;
      stateCopy.loginErrorMsg = action.payload;
      return stateCopy;
    }

    case types.RESET_LOGIN_INFO: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.isLoggedIn = false;
      stateCopy.loggedInUser = '';
      stateCopy.loginInputEmail = '';
      stateCopy.loginInputPassword = '';
      stateCopy.loginError = false;
      stateCopy.loginErrorMsg = '';
      return stateCopy;
    }
    case types.RESET_SIGNUP_INFO: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.signUpInputUsername = '';
      stateCopy.signUpInputPassword = '';
      stateCopy.signUpInputEmail = '';
      stateCopy.signUpError = false;
      stateCopy.signUpErrorMsg = '';
      return stateCopy;
    }
    case types.LOGOUT_USER: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.loggedInUser = '';
      stateCopy.isLoggedIn = false;
      return stateCopy;
    }
    case types.SUCCESSFUL_AUTH_VERIFICATION: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.loggedInUser = action.payload.username;
      stateCopy.isLoggedIn = true;
      return stateCopy;
    }
    case types.FAILED_AUTH_VERIFICATION: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.loggedInUser = '';
      stateCopy.isLoggedIn = false;
      return stateCopy;
    }

    default:
      return previousState;
  }
}
