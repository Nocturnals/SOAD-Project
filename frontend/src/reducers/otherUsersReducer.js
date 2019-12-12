import { otherUsersConst } from "../constants/index";

const initialState = {
    userProfile: null,
    userPosts: null,
    isLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case otherUsersConst.GET_OTHER_USER_REQUEST:
            return {
                ...state,
                userProfile: null,
                isLoading: true
            };
        case otherUsersConst.GET_OTHER_USER_SUCCESS:
            return {
                ...state,
                userProfile: action.profile,
                isLoading: false
            };
        case otherUsersConst.GET_OTHER_USER_FAILURE:
            return {
                ...state,
                isLoading: false
            };

        default:
            return { ...state };
    }
}
