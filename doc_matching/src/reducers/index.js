import { combineReducers } from "redux";

import docMatching from "./docMatchReducer";

export default combineReducers({
  docMatch: docMatching
});
