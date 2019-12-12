import { compConst } from "../constants";

const initialState = {
    competition: null,
    isLoading: false,
    error: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case compConst.CREATE_COMPETITION_REQUEST:
        case compConst.LOAD_COMPETITION_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case compConst.CREATE_COMPETITION_SUCCESS:
        case compConst.LOAD_COMPETITION_SUCCESS:
            return {
                ...state,
                competition: action.competition,
                isLoading: false
            };
        case compConst.CREATE_COMPETITION_FAILURE:
        case compConst.LOAD_COMPETITION_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoading: false
            };

        default:
            return state;
    }
}
