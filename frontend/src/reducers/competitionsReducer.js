import { compConst } from "../constants";

const initialState = {
    competitions: [],
    isLoading: false,
    error: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        // case compConst.LOAD_COMPETITION:
        //     return {
        //         ...state,
        //         competition: [action.competition]
        //     };
        case compConst.CREATE_COMPETITION_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case compConst.CREATE_COMPETITION_SUCCESS:
            return {
                ...state,
                competitions: [action.competition],
                isLoading: false
            };
        case compConst.CREATE_COMPETITION_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoading: false
            };

        default:
            return state;
    }
}
