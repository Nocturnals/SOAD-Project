import axios from "axios";

import { userAuthConst } from "../constants";
import setAuthTokenHeader from "../setAuthTokenHeader";
import alertActions from "./alertActions";

// for logging into account
export function login(email, password) {
    return dispatch => {
        // change the loading state to true
        dispatch(requestAction({ email }));

        const user = {
            email: email,
            password: password
        };
        axios
            .post("http://localhost:4000/api/auth/login", user)
            .then(res => {
                console.log(res.data);
                const { authorization } = res.headers;
                console.log(authorization);

                localStorage.setItem("userToken", authorization);
                setAuthTokenHeader(authorization);
                dispatch(successAction(res.data));
            })
            .catch(err => {
                dispatch(failureAction(err));
                dispatch(alertActions.error(err.response.data));
            });
    };

    function requestAction(email) {
        return { type: userAuthConst.LOGIN_REQUEST };
    }
    function successAction(user) {
        return { type: userAuthConst.LOGIN_SUCCESS, user: user };
    }
    function failureAction(error) {
        return { type: userAuthConst.LOGIN_FAILURE };
    }
}

// for registering new user
export function register(email, username, dateofbirth, password) {
    return dispatch => {
        // change the loading state to true
        dispatch({
            type: userAuthConst.REGISTER_REQUEST
        });
    };
}

export function getUserWithToken(token) {
    return dispatch => {
        // set the token to headers
        setAuthTokenHeader(token);

        // request to get user data from backend
        axios.get("http://localhost:4000/api/auth/user").then(res => {
            // res.data.user
            dispatch({
                type: userAuthConst.LOAD_USER,
                user: res.data.user
            });
        });
    };
}

export function logout() {
    // remove authorization token from the storage
    localStorage.removeItem("userToken");

    // remove the token authorization header from the future requests
    setAuthTokenHeader(false);

    // return logout action to reducer
    return {
        type: userAuthConst.LOGOUT
    };
}

export function setCurrentUser(decoded) {
    return {
        type: userAuthConst.LOAD_USER,
        payload: decoded
    };
}
