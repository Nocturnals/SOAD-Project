import { combineReducers } from "redux";

import authentication from "./authReducer";
import alert from "./alertReducer";

import competitions from "./competitionsReducer";

export default combineReducers({
    auth: authentication,
    alert: alert,
    competitions: competitions
});
