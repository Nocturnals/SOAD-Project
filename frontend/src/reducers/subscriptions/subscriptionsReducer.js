import { subscriptionsConstants } from "../../constants/index";

const initialState = {
    plans: null,
    categorys: null,
    posts: null,
    isLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case subscriptionsConstants.GET_PLANS_REQUEST:
        case subscriptionsConstants.GET_CATEGORIES_REQUEST:
        case subscriptionsConstants.GET_POSTSINCATEGORY_REQUEST:
        case subscriptionsConstants.POST_ADDUSERTOPLAN_REQUEST:
        case subscriptionsConstants.POST_POSTTOPLAN_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case subscriptionsConstants.GET_PLANS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                plans: action.payload
            };
        case subscriptionsConstants.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categorys: action.payload
            };
        case subscriptionsConstants.GET_POSTSINCATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                posts: action.payload
            };
        case subscriptionsConstants.POST_ADDUSERTOPLAN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                plans: action.payload
            };
        case subscriptionsConstants.POST_POSTTOPLAN_SUCCESS:
            return {
                ...state,
                isLoading: false
            };
        case subscriptionsConstants.GET_PLANS_FAILURE:
        case subscriptionsConstants.GET_CATEGORIES_FAILURE:
        case subscriptionsConstants.GET_POSTSINCATEGORY_FAILURE:
        case subscriptionsConstants.POST_ADDUSERTOPLAN_FAILURE:
        case subscriptionsConstants.POST_POSTTOPLAN_FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return {
                ...state
            };
    }
}
