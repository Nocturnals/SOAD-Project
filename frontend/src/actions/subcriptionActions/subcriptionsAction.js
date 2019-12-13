import Axios from "axios";

import { subscriptionsConstants, alertConstants } from "../../constants";

export function getPlans() {
    return dispatch => {
        dispatch({
            type: subscriptionsConstants.GET_PLANS_REQUEST
        });

        Axios.get("http://localhost:4000/api/subscriptions/showallplans")
            .then(res => {
                dispatch({
                    type: subscriptionsConstants.GET_PLANS_SUCCESS,
                    payload: res.data
                });
            })
            .catch(err => {
                dispatch({
                    type: alertConstants.ERROR,
                    message: err.response.data.message
                });
                dispatch({ type: subscriptionsConstants.GET_PLANS_FAILURE });
            });
    };
}

export function getcategories(planId) {
    return dispatch => {
        dispatch({
            type: subscriptionsConstants.GET_CATEGORIES_REQUEST
        });

        Axios.post(
            `http://localhost:4000/api/subscriptions/showcategories/${planId}`
        )
            .then(res => {
                dispatch({
                    type: subscriptionsConstants.GET_CATEGORIES_SUCCESS,
                    payload: res.data
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: subscriptionsConstants.GET_CATEGORIES_FAILURE
                });
                dispatch({
                    type: alertConstants.ERROR,
                    message: err.response.data.message
                });
            });
    };
}
