import * as types from '../constants/actionTypes';

const initialState = {
  adminIsLoggedIn: true,
  adminUsername: '',
  adminPassword: '',
  mediumRules: [],
  hardRules: [],
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
    case types.UPDATE_NEW_MEDIUM_RULE: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.newMediumRule = action.payload.target.value;
      return stateCopy;
    }
    case types.UPDATE_NEW_HARD_RULE: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.newHardRule = action.payload.target.value;
      return stateCopy;
    }
    case types.ADD_MEDIUM_RULE_CATEGORY: {
      stateCopy = Object.assign({}, previousState);
      const newMediumRules = stateCopy.mediumRules.slice();
      newMediumRules.push(action.payload);
      console.log('med ', action.payload)
      stateCopy.mediumRules = newMediumRules;
      return stateCopy;
    }
    case types.ADD_HARD_RULE_CATEGORY: {
      stateCopy = Object.assign({}, previousState);
      const newHardRules = stateCopy.hardRules.slice();
      newHardRules.push(action.payload);
      stateCopy.hardRules = newHardRules;
      return stateCopy;
    }
    case types.REMOVE_MEDIUM_RULE_CATEGORY: {
      stateCopy = Object.assign({}, previousState);
      const newMediumRules = stateCopy.mediumRules.slice();
      newMediumRules.splice(newMediumRules.indexOf(action.payload), 1);
      stateCopy.mediumRules = newMediumRules;
      return stateCopy;
    }
    case types.REMOVE_HARD_RULE_CATEGORY: {
      stateCopy = Object.assign({}, previousState);
      const newHardRules = stateCopy.hardRules.slice();
      newHardRules.splice(newHardRules.indexOf(action.payload), 1);
      stateCopy.hardRules = newHardRules;
      return stateCopy;
    }
    default:
      console.log('reducer ran')
      return previousState;
  }
}
