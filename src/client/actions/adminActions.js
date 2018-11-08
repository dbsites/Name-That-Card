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

// admin form actions

export const addMediumRuleCategory = category => ({
  type: types.ADD_MEDIUM_RULE_CATEGORY,
  payload: category,
});

export const addHardRuleCategory = category => ({
  type: types.ADD_HARD_RULE_CATEGORY,
  payload: category,
});

export const updateNewMediumRule = event => ({
  type: types.UPDATE_NEW_MEDIUM_RULE,
  payload: event,
});

export const updateNewHardRule = event => ({
  type: types.UPDATE_NEW_HARD_RULE,
  payload: event,
});
