import {combineReducers} from 'redux';
import leaderboardReducer from '../reducers/leaderboardReducer';
import adminReducer from '../reducers/adminReducer';
import mainReducer from '../reducers/mainReducer';
import headerReducer from '../reducers/headerReducer';
import gameListReducer from '../reducers/gameListReducer';
import gameMenuReducer from '../reducers/gameMenuReducer';
import gameReducer from '../reducers/gameReducer';
import userReducer from '../reducers/userReducer';

const reducers = combineReducers({
  leaderboardReducer,
  adminReducer,
  mainReducer,
  headerReducer,
  gameListReducer,
  gameMenuReducer,
  gameReducer,
  userReducer,
});

export default reducers;
