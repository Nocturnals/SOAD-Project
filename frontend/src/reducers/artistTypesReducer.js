import { artistTypesConst } from "../constants/index";

const initialState = {
    artistTypes: [],
    isLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case artistTypesConst.GET_TYPES_REQUEST:
            return {
                ...state,
                artistTypes: [],
                isLoading: true
            };
        case artistTypesConst.GET_TYPES_SUCCESS:
            return {
                ...state,
                artistTypes: action.payload,
                isLoading: false
            };
        case artistTypesConst.GET_TYPES_FAILURE:
        default:
            return { ...initialState };
    }
}
