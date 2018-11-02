import * as types from '../constants/actionTypes';

export const updateSignUpUsername = event => ({
  type: types.UPDATE_SIGNUP_USERNAME,
  payload: event,
});

export const updateSignUpPassword = event => ({
  type: types.UPDATE_SIGNUP_PASSWORD,
  payload: event,
});

export const updateSignUpEmail = event => ({
  type: types.UPDATE_SIGNUP_EMAIL,
  payload: event,
});

export const successfulSignUp = () => ({
  type: types.SUCCESSFUL_SIGNUP,
});

export const failedSignUp = () => ({
  type: types.FAILED_SIGNUP,
});

export const submitSignUp = (signUpInfo) => {
  return (dispatch) => {
    return fetch('/signup', {
      method: 'POST',
      headers: {"Content-Type": "application/json; charset=utf-8"},
      body: signUpInfo,
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if(data.signUpSuccess) {
        dispatch(successfulSignUp());
      } else {
        dispatch(failedSignUp());
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

export const updateLoginUsername = event => ({
  type: types.UPDATE_LOGIN_USERNAME,
  payload: event,
});

export const updateLoginPassword = event => ({
  type: types.UPDATE_LOGIN_PASSWORD,
  payload: event,
});

export const submitLogin = event => ({
  type: types.SUBMIT_LOGIN,
  payload: event,
});
