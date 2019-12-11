import { userAuthConst } from "../constants";

const initialState = {
    user: null,
    isAuthed: false,
    isLoading: true
};

export default function(state = initialState, action) {
    switch (action.type) {
        case userAuthConst.LOAD_USER_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case userAuthConst.LOAD_USER:
            return {
                ...state,
                user: action.user,
                isAuthed: true,
                isLoading: false
            };
        case userAuthConst.LOGIN_REQUEST:
        case userAuthConst.REGISTER_REQUEST:
            return {
                ...state,
                isAuthed: false,
                isLoading: true
            };
        case userAuthConst.LOGIN_SUCCESS:
        case userAuthConst.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.user,
                isAuthed: true,
                isLoading: false
            };
        case userAuthConst.LOGIN_FAILURE:
        case userAuthConst.REGISTER_FAILURE:
        case userAuthConst.LOGOUT:
            localStorage.removeItem("userToken");
            return {
                ...initialState,
                user: action.email
            };

        default:
            return state;
    }
}
