import { postsConstants } from "../../constants/index";

const initialState = {
    newPost: null,
    isLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case postsConstants.CREATE_POST_REQUEST:
            return {
                ...state,
                newPost: action.post,
                isLoading: true
            };
        case postsConstants.CREATE_POST_SUCCESS:
        case postsConstants.CREATE_POST_FAILURE:
            return {
                ...state,
                newPost: null,
                isLoading: false
            };
        default:
            return { ...state };
    }
}
