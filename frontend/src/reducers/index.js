import { combineReducers } from "redux";

import authentication from "./authReducer";
import alert from "./alertReducer";

export default combineReducers({
  auth: authentication,
  alert: alert
});
