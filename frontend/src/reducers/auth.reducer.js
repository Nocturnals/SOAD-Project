import { userAuthConst } from "../constants";

let userToken = localStorage.getItem("userToken");

const initialState = {
    user: {},
    isAuthed: false,
    isLoading: false
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        // case "SET_CURRENT_USER":
        //     return {
        //         ...state,
        //         user: action.user,
        //         isAuthed: true
        //     };
        case userAuthConst.LOGIN_REQUEST:
            return {
                user: action.user,
                isAuthed: false,
                isLoading: true
            };
        case userAuthConst.LOGIN_SUCCESS:
            console.log(action.user);

            return {
                ...state,
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
