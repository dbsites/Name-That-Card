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
  passwordErrorMsg: '',
  usernameErrorMsg: '',
  emailErrorMsg: '',
  forgotInputEmail: '',
  emailStatusMsg: '',
  emailSuccess: false,
  firstNewPassword: '',
  secondNewPassword: '',
  newPasswordStatusMsg: '',
  passwordReset: false,
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
      // stateCopy.signUpInputUsername = '';
      // stateCopy.signUpInputPassword = '';
      // stateCopy.signUpInputEmail = '';
      stateCopy.signUpError = true;
      stateCopy.signUpErrorMsg = action.payload;
      stateCopy.passwordErrorMsg = '';
      stateCopy.usernameErrorMsg = '';
      stateCopy.emailErrorMsg = '';
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
      stateCopy.passwordReset = false;
      return stateCopy;
    }
    case types.FAILED_LOGIN: {
      stateCopy = Object.assign({}, previousState);
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
      stateCopy.passwordErrorMsg = '';
      stateCopy.usernameErrorMsg = '';
      stateCopy.emailErrorMsg = '';
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
    case types.SET_SIGNUP_CREDENTIAL_ERRORS: {
      stateCopy = Object.assign({}, previousState);
      if (stateCopy.signUpInputUsername === '') {
        stateCopy.usernameErrorMsg = 'Username must not be empty';
      } else {
        stateCopy.usernameErrorMsg = '';
      }
      if (stateCopy.signUpInputPassword.length < 5) {
        stateCopy.passwordErrorMsg = 'Password must be atleast five characters long';
      } else {
        stateCopy.passwordErrorMsg = '';
      }
      if (!stateCopy.signUpInputEmail.split('').includes('@') || !stateCopy.signUpInputEmail.split('').includes('.')) {
        stateCopy.emailErrorMsg = 'Please enter a valid email address';
      } else {
        stateCopy.emailErrorMsg = '';
      }
      return stateCopy;
    }
    case types.UPDATE_FORGOT_INPUT_EMAIL: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.forgotInputEmail = action.payload.target.value;
      return stateCopy;
    }
    case types.EMAIL_SUCCESSFULLY_SENT: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.emailStatusMsg = action.payload.msg;
      stateCopy.emailSuccess = action.payload.emailSuccess;
      return stateCopy;
    }
    case types.EMAIL_FAILED_TO_SEND: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.emailStatusMsg = action.payload.msg;
      stateCopy.emailSuccess = action.payload.emailSuccess;
      return stateCopy;
    }
    case types.UPDATE_FIRST_NEW_PASSWORD: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.firstNewPassword = action.payload.target.value;
      return stateCopy;
    }
    case types.UPDATE_SECOND_NEW_PASSWORD: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.secondNewPassword = action.payload.target.value;
      return stateCopy;
    }
    case types.SET_NEW_PASSWORD_ERRORS: {
      stateCopy = Object.assign({}, previousState);
      if (stateCopy.firstNewPassword !== stateCopy.secondNewPassword) {
        stateCopy.newPasswordStatusMsg = 'Passwords must match'
      } else if (stateCopy.firstNewPassword.length < 5 || stateCopy.secondNewPassword.length < 5) {
        stateCopy.newPasswordStatusMsg = 'Password must be atleast five characters long'
      }
      return stateCopy;
    }
    case types.RESET_NEW_PASSWORD_EMAIL_INPUTS: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.forgotInputEmail = '';
      stateCopy.emailStatusMsg = '';
      stateCopy.emailSuccess = false;
      return stateCopy;
    }
    case types.RESET_NEW_PASSWORD_INPUTS: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.firstNewPassword = '';
      stateCopy.secondNewPassword = '';
      stateCopy.newPasswordStatusMsg = '';
      stateCopy.passwordReset = false;
      return stateCopy;
    }
    case types.PASSWORD_SUCCESSFULLY_RESET: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.passwordReset = true;
      return stateCopy;
    }
    case types.FAILED_PASSWORD_RESET: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.passwordReset = false;
      stateCopy.newPasswordStatusMsg = action.payload;
      return stateCopy;
    }
    default:
      return previousState;
  }
}
