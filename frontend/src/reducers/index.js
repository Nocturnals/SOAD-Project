import { combineReducers } from "redux";

import authentication from "./authReducer";
import alert from "./alertReducer";
import competitions from "./competitionsReducer";
import messaging from "./messages/messagingReducer";
import organizations from "./organisations/organisationsReducer";
import jobs from "./jobs/jobsReducer";
import artistTypes from "./artistTypesReducer";
import search from "./searchReducer";
import postsReducer from "./posts/postsReducer";
import otherUsersReducer from "./otherUsersReducer";

export default combineReducers({
    auth: authentication,
    otherUsers: otherUsersReducer,
    alert: alert,
    competitions: competitions,
    messaging: messaging,
    organizations: organizations,
    jobs: jobs,
    artistTypes: artistTypes,
    search: search,
    posts: postsReducer
});
