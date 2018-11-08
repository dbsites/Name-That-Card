import * as types from '../constants/actionTypes';

export const updateAdminLoginUsername = event => ({
  type: types.UPDATE_ADMIN_LOGIN_USERNAME,
  payload: event,
});

export const updateAdminLoginPassword = event => ({
  type: types.UPDATE_ADMIN_LOGIN_PASSWORD,
  payload: event,
});

export const successfulAdminLogin = () => ({
  type: types.SUCCESSFUL_ADMIN_LOGIN,
});

export const failedAdminLogin = () => ({
  type: types.FAILED_ADMIN_LOGIN,
});

export const submitAdminLogin = (adminInfo) => {
  return (dispatch) => {
    return fetch('http://localhost:3000/adminLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(adminInfo),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.loginSuccess) {
          dispatch(successfulAdminLogin());
        } else {
          dispatch(failedAdminLogin());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
