import Axios from "axios";

import { subscriptionsConstants } from "../../constants";

export function getPlans() {
    return dispatch => {
        dispatch({
            type: subscriptionsConstants.GET_PLANS_REQUEST
        });
    };
}
