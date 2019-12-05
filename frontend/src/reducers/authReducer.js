import { userAuthConst } from "../constants";

const initialState = {
    user: {
        name: null,
        _id: null,
        email: null
    },
    isAuthed: false,
    isLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case userAuthConst.LOAD_USER:
            return {
                ...state,
                user: action.user,
                isAuthed: true
            };
        case userAuthConst.LOGIN_REQUEST:
        case userAuthConst.REGISTER_REQUEST:
            return {
                user: null,
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
