// import config from 'config'
import axios from "axios";
import { logout } from "../actions/user.athentication";
import setAuthToken from "../setAuthToken";
import { setCurrentUser } from "../actions/user.athentication";

export const userService = {
    login,
    logout
};

// function login(email, password) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//     };

//     return fetch(`${config.apiUrl}/api/login`, requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             const userToken = 'Lasfu98hwefuf'
//             localStorage.setItem('userToken', JSON.stringify(userToken));

//             return user;
//         });
// }
function login(user) {
    return dispatch => {
        axios
            .post("/api/users/login", user)
            .then(handleResponse)
            .then(res => {
                const { authorization } = res.header;
                console.log(authorization);

                localStorage.setItem("userToken", authorization);
                setAuthToken(authorization);
                dispatch(setCurrentUser(authorization));
            })
            .catch(err => {
                dispatch({
                    type: "LOGIN_FAILURE",
                    message: err.response.data
                });
            });
    };
}

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
