import axios from "axios";

import { otherUsersConst } from "../constants/index";

export function getUserByName(username) {
    return dispatch => {
        dispatch({ type: otherUsersConst.GET_OTHER_USER_REQUEST });

        axios
            .get(`http://localhost:4000/api/auth/userProfile/${username}`)
            .then(res => {
                console.log(res);
                dispatch({
                    type: otherUsersConst.GET_OTHER_USER_SUCCESS,
                    profile: res.data
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: otherUsersConst.GET_OTHER_USER_FAILURE });
            });
    };
}
