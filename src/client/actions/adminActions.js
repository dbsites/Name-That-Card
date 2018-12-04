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
    return fetch('/admin/login', {
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

export const successfulGameSave = () => ({
  type: types.SUCCESSFUL_GAME_SAVE,
});

export const resetAdminForm = () => ({
  type: types.RESET_ADMIN_FORM,
});

export const submitAdminForm = (formInfo) => {
  return (dispatch) => {
    return fetch('/admin/submitForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(formInfo),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.saveSuccess) {
          dispatch(successfulGameSave());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

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

export const removeRuleFromCategory = info => ({
  type: types.REMOVE_RULE_FROM_CATEGORY,
  payload: info,
});

export const handleIconUpload = event => ({
  type: types.HANDLE_ICON_UPLOAD,
  payload: event,
});

export const handleSkinUpload = event => ({
  type: types.HANDLE_SKIN_UPLOAD,
  payload: event,
});

export const updateGameName = event => ({
  type: types.UPDATE_GAME_NAME,
  payload: event,
});

export const updatePrimaryFont = event => ({
  type: types.UPDATE_PRIMARY_FONT,
  payload: event,
});

export const updateSecondaryFont = event => ({
  type: types.UPDATE_SECONDARY_FONT,
  payload: event,
});

export const handleCsvUpload = event => ({
  type: types.HANDLE_CSV_UPLOAD,
  payload: event,
});