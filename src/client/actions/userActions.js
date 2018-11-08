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

export const failedSignUp = message => ({
  type: types.FAILED_SIGNUP,
  payload: message,
});

export const submitSignUp = (signUpInfoObj) => {
  console.log('signup info in actions', signUpInfoObj);
  return (dispatch) => {
    return fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(signUpInfoObj),
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.signUpSuccess) {
          dispatch(successfulSignUp());
        } else {
          dispatch(failedSignUp(data.msg));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateLoginEmail = event => ({
  type: types.UPDATE_LOGIN_EMAIL,
  payload: event,
});

export const updateLoginPassword = event => ({
  type: types.UPDATE_LOGIN_PASSWORD,
  payload: event,
});

export const successfulLogin = username => ({
  type: types.SUCCESSFUL_LOGIN,
  payload: username,
});

export const failedLogin = message => ({
  type: types.FAILED_LOGIN,
  payload: message,
});

export const logoutUser = () => ({
  type: types.LOGOUT_USER,
});

export const submitLogin = (loginInfoObj) => {
  console.log('loginInfoObj in actions', loginInfoObj);
  return (dispatch) => {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(loginInfoObj),
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.loginSuccess) {
          dispatch(successfulLogin(data.username));
        } else {
          dispatch(failedLogin(data.msg));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
