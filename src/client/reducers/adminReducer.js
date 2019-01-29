import * as types from '../constants/actionTypes';

const initialState = {
  adminIsLoggedIn: false,
  adminUsername: '',
  adminPassword: '',
  newMediumRule: '',
  newHardRule: '',
  mediumRules: [],
  hardRules: [],
  primaryFont: '',
  secondaryFont: '',
  gameIcon: '',
  gameSkin: '',
  gameName: '',
  csvData: '',
  gameSaveStatusMsg: '',
};

export default function (previousState = initialState, action) {
  let stateCopy;

  switch (action.type) {
    case types.UPDATE_ADMIN_LOGIN_USERNAME: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.adminUsername = action.payload.target.value;
      return stateCopy;
    }
    case types.UPDATE_ADMIN_LOGIN_PASSWORD: {
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
    case types.UPDATE_PRIMARY_FONT: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.primaryFont = action.payload.target.value;
      return stateCopy;
    }
    case types.UPDATE_SECONDARY_FONT: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.secondaryFont = action.payload.target.value;
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
      newMediumRules.push(stateCopy.newMediumRule);
      stateCopy.mediumRules = newMediumRules;
      stateCopy.newMediumRule = '';
      return stateCopy;
    }
    case types.ADD_HARD_RULE_CATEGORY: {
      stateCopy = Object.assign({}, previousState);
      const newHardRules = stateCopy.hardRules.slice();
      newHardRules.push(stateCopy.newHardRule);
      stateCopy.hardRules = newHardRules;
      stateCopy.newHardRule = '';
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
    case types.SUBMIT_ADMIN_LOGIN: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.adminIsLoggedIn = true;
      return stateCopy;
    }
    case types.REMOVE_RULE_FROM_CATEGORY: {
      stateCopy = Object.assign({}, previousState);
      if (action.payload.difficulty === 'medium') {
        const newRules = stateCopy.mediumRules.slice();
        newRules.splice(newRules.indexOf(action.payload.category), 1);
        stateCopy.mediumRules = newRules;
      } else if (action.payload.difficulty === 'hard') {
        const newRules = stateCopy.hardRules.slice();
        newRules.splice(newRules.indexOf(action.payload.category), 1);
        stateCopy.hardRules = newRules;
      }
      return stateCopy;
    }
    case types.UPDATE_ICON_NAME: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.gameIcon = action.payload.target.value;
      return stateCopy;
    }
    case types.UPDATE_SKIN_NAME: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.gameSkin = action.payload.target.value;
      return stateCopy;
    }
    case types.UPDATE_GAME_NAME: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.gameName = action.payload.target.value;
      return stateCopy;
    }
    case types.HANDLE_CSV_UPLOAD: {
      stateCopy = Object.assign({}, previousState);
      // const reader = new FileReader();
      stateCopy.csvData = action.payload.target.value;
      return stateCopy;
    }
    case types.SUCCESSFUL_GAME_SAVE: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.adminIsLoggedIn = true;
      stateCopy.adminUsername = '';
      stateCopy.adminPassword = '';
      stateCopy.newMediumRule = '';
      stateCopy.newHardRule = '';
      stateCopy.mediumRules = [];
      stateCopy.hardRules = [];
      stateCopy.primaryFont = '';
      stateCopy.secondaryFont = '';
      stateCopy.gameIcon = '';
      stateCopy.gameSkin = '';
      stateCopy.gameName = '';
      stateCopy.csvData = '';
      stateCopy.gameSaveStatusMsg = 'The new game info was successfully saved to the database'
      return stateCopy;
    }
    case types.RESET_ADMIN_FORM: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.adminIsLoggedIn = true;
      stateCopy.adminUsername = '';
      stateCopy.adminPassword = '';
      stateCopy.newMediumRule = '';
      stateCopy.newHardRule = '';
      stateCopy.mediumRules = [];
      stateCopy.hardRules = [];
      stateCopy.primaryFont = '';
      stateCopy.secondaryFont = '';
      stateCopy.gameIcon = '';
      stateCopy.gameSkin = '';
      stateCopy.gameName = '';
      stateCopy.csvData = '';
      stateCopy.gameSaveStatusMsg = '';
      return stateCopy;
    }
    default:
      return previousState;
  }
}
