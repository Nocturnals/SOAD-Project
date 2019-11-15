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
                isAuthed: action.user === undefined ? false : true
            };
        case userAuthConst.LOGIN_REQUEST:
            return {
                user: action.user,
                isAuthed: false,
                isLoading: true
            };
        case userAuthConst.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthed: true,
                isLoading: false
            };
        case userAuthConst.LOGIN_FAILURE:
        case userAuthConst.LOGOUT:
            localStorage.removeItem("userToken");
            return initialState;

        default:
            return state;
    }
}
