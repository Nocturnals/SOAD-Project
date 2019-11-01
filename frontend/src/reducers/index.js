import { combineReducers } from 'redux';

import authentication from './auth.reducer';
import alert from './alert.reducer';

export default combineReducers({
  auth: authentication,
  alert: alert
});
