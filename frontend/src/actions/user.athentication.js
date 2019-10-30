import { userAuthConst } from '../constants'
import { userService } from '../services'
import { history } from '../helpers'
import setAuthToken from '../setAuthToken'

export function login(email, password) {
    return dispatch => {
        dispatch(requestAction({ email }))

        const user = {
            email: email,
            password: password
        };


        userService.login(user)
            .then(
                user => {
                    dispatch(successAction(user))
                    history.push('/')
                },
                error => {
                    dispatch(failureAction(error.toString()))
                }
            )
    }

    function requestAction(email) {
        return { type: userAuthConst.LOGIN_REQUEST, user: email }
    }
    function successAction(user) {
        return { type: userAuthConst.LOGIN_SUCCESS, user: user }
    }
    function failureAction(error) {
        return { type: userAuthConst.LOGIN_FAILURE, error: error }
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('userToken');
        setAuthToken(false);
        dispatch(setCurrentUser({}));
        history.push('/login');
    }
}

export function setCurrentUser(decoded) {
    return {
        type: 'SET_CURRENT_USER',
        payload: decoded
    }
}
