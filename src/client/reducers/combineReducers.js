import { combineReducers } from 'redux';
import leaderboardReducer from '../reducers/leaderboardReducer';
import adminReducer from '../reducers/adminReducer';
import gameListReducer from '../reducers/gameListReducer';
import gameMenuReducer from '../reducers/gameMenuReducer';
import gameReducer from '../reducers/gameReducer';
import userReducer from '../reducers/userReducer';

const reducers = combineReducers({
  leaderboardReducer,
  adminReducer,
  gameListReducer,
  gameMenuReducer,
  gameReducer,
  userReducer,
});

export default reducers;
