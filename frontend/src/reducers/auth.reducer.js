import { userAuthConst } from "../constants";
import isEmpty from "../validation/is-empty";

// let userToken = JSON.parse(localStorage.getItem('userToken'));
const initialState = {
    user: {},
    isAuthed: false,
    isLoading: false
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case "SET_CURRENT_USER":
            return {
                ...state,
                isAuthed: !isEmpty(action.payload),
                user: action.payload
            };
        case userAuthConst.LOGIN_REQUEST:
            return {
                user: action.user,
                isAuthed: false,
                isLoading: true
            };
        case userAuthConst.LOGIN_SUCCESS:
            return {
                user: action.user,
                isAuthed: true,
                isLoading: false
            };
        case userAuthConst.LOGIN_FAILURE:
        case userAuthConst.LOGOUT:
            return initialState;

        default:
            return state;
    }
}
