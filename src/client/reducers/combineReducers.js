import {combineReducers} from 'redux';
import userReducer from '../reducers/userReducer';
import adminReducer from '../reducers/adminReducer';
import mainReducer from '../reducers/mainReducer';
import headerReducer from '../reducers/headerReducer';
import gameListReducer from '../reducers/gameListReducer';
import gameMenuReducer from '../reducers/gameMenuReducer';
import gameReducer from '../reducers/gameReducer';
import footerReducer from '../reducers/footerReducer';
import * as types from '../constants/actionTypes.js';

const reducers = combineReducers({
  userReducer,
  adminReducer,
  mainReducer,
  headerReducer,
  gameListReducer,
  gameMenuReducer,
  gameReducer,
  footerReducer,
});

export default reducers;
