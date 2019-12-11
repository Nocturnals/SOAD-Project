import { combineReducers } from "redux";

import authentication from "./authReducer";
import alert from "./alertReducer";
import competitions from "./competitionsReducer";
import messaging from "./messages/messagingReducer";
import organizations from "./organisations/organisationsReducer";
import jobs from "./jobs/jobsReducer";

export default combineReducers({
    auth: authentication,
    alert: alert,
    competitions: competitions,
    messaging: messaging,
    organizations: organizations,
    jobs: jobs
});
