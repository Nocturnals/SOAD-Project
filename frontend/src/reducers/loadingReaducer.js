import { loadingConstants } from "../constants/loadingConstants";

const initialState = {
    isLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case loadingConstants.LOADING:
            return {
                isLoading: true
            };
        case loadingConstants.LOADED:
            return {
                isLoading: false
            };
        default:
            break;
    }
}
