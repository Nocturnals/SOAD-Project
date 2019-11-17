import { combineReducers } from "redux";

import authentication from "./auth.reducer";
import alert from "./alert.reducer";
import docMatching from "./docMatchReducer";

export default combineReducers({
  auth: authentication,
  alert: alert,
  docMatch: docMatching
});
