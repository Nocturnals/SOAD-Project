import axios from "axios";

import { history } from "../helpers";

import { userAuthConst } from "../constants";
import setAuthTokenHeader from "../setAuthTokenHeader";
import alertActions from "./alertActions";

// for logging into account
export function login(email, password) {
    return dispatch => {
        // change the loading state to true
        dispatch(requestAction());

        const user = {
            email: email,
            password: password
        };
        axios
            .post("http://localhost:4000/api/auth/login", user)
            .then(res => {
                const { authorization } = res.headers;

                localStorage.setItem("userToken", authorization);
                setAuthTokenHeader(authorization);
                dispatch(successAction(res.data));

                history.goBack();
            })
            .catch(err => {
                try {
                    const err_msg = err.response.data.message;
                    dispatch(failureAction({ email }));
                    dispatch(alertActions.error(err_msg));
                } catch (error) {
                    dispatch(failureAction({ email }));
                    dispatch(
                        alertActions.error("BackEnd sever didn't respond")
                    );
                }
            });
    };

    function requestAction() {
        return { type: userAuthConst.LOGIN_REQUEST };
    }
    function successAction(user) {
        return { type: userAuthConst.LOGIN_SUCCESS, user: user };
    }
    function failureAction(email) {
        return { type: userAuthConst.LOGIN_FAILURE, email };
    }
}

// for registering new user
export function register(email, username, dateofbirth, password) {
    return dispatch => {
        // change the loading state to true
        dispatch({
            type: userAuthConst.REGISTER_REQUEST
        });

        // try to register the new user
        axios
            .post("http://localhost:4000/api/auth/register", {
                email,
                name: username,
                dateofbirth,
                password
            })
            .then(res => {
                const { authorization } = res.headers;

                localStorage.setItem("userToken", authorization);
                setAuthTokenHeader(authorization);

                dispatch({
                    type: userAuthConst.REGISTER_SUCCESS,
                    user: res.data
                });

                history.goBack();
            })
            .catch(err => {
                try {
                    dispatch({ type: userAuthConst.REGISTER_FAILURE });
                    dispatch(alertActions.error(err.response.data));
                } catch (error) {
                    console.log(error);
                    dispatch(
                        alertActions.error("Backend Server didn't respond")
                    );
                }
            });
    };
}

export function getUserWithToken(token) {
    return dispatch => {
        // set the token to headers
        setAuthTokenHeader(token);

        // request to get user data from backend
        axios
            .get("http://localhost:4000/api/auth/user")
            .then(res => {
                // res.data.user
                dispatch({
                    type: userAuthConst.LOAD_USER,
                    user: res.data.user
                });
            })
            .catch(err => {
                dispatch({
                    type: userAuthConst.LOGIN_FAILURE
                });
                dispatch(alertActions.error(err.response.data));
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
