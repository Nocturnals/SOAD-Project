import { artistTypesConst } from "../constants/index";

const initialState = {
    artitsTypes: [],
    isLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case artistTypesConst.GET_TYPES_REQUEST:
            return {
                ...state,
                artitsTypes: [],
                isLoading: true
            };
        case artistTypesConst.GET_TYPES_SUCCESS:
            return {
                ...state,
                artitsTypes: action.payload,
                isLoading: false
            };
        case artistTypesConst.GET_TYPES_FAILURE:
        default:
            return { ...initialState };
    }
}
