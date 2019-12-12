import { postsConstants } from "../../constants/index";

const initialState = {
    newPost: null,
    userPosts: null,
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

        case postsConstants.GET_USER_POSTS_REQUEST:
            return {
                ...state,
                userPosts: null,
                isLoading: true
            };
        case postsConstants.GET_USER_POSTS_SUCCESS:
            return {
                ...state,
                userPosts: action.posts,
                isLoading: false
            };
        case postsConstants.GET_USER_POSTS_FAILURE:
            return {
                ...state,
                userPosts: null,
                isLoading: false
            };
        default:
            return { ...state };
    }
}
