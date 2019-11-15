import axios from "axios";

import { userAuthConst, alertConstants } from "../constants";
import { history } from "../helpers";
import setAuthTokenHeader from "../setAuthTokenHeader";
import alertActions from "./alertActions";

export function login(email, password) {
    return dispatch => {
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

    function handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    logout();
                    // location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
    }

    function requestAction(email) {
        return { type: userAuthConst.LOGIN_REQUEST, user: email };
    }
    function successAction(user) {
        return { type: userAuthConst.LOGIN_SUCCESS, user: user };
    }
    function failureAction(error) {
        return { type: userAuthConst.LOGIN_FAILURE };
    }
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