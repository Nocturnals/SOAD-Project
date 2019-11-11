import { Redirect } from "react-router-dom";

import axios from "axios";
import { userAuthConst } from "../constants";
import { history } from "../helpers";
import setAuthToken from "../setAuthToken";

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
                setAuthToken(authorization);
                dispatch(successAction(res.data));
            })
            .catch(err => {
                console.log(err);

                dispatch(failureAction(err));
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
        return { type: userAuthConst.LOGIN_FAILURE, error: error };
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem("userToken");
        setAuthToken(false);
        dispatch(setCurrentUser({}));
        history.push("/login");
    };
}

export function setCurrentUser(decoded) {
    return {
        type: "SET_CURRENT_USER",
        payload: decoded
    };
}
