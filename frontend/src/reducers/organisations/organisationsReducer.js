import { orgConst } from "../../constants/index";

const initialState = {
    loggedUserOrganisations: null,
    isLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case orgConst.GET_ALL_REQUEST:
            return {
                ...state,
                loggedUserOrganisations: [],
                isLoading: true
            };
        case orgConst.GET_ALL_SUCCESS:
            return {
                ...state,
                loggedUserOrganisations: action.organisations,
                isLoading: false
            };
        default:
            return { ...initialState };
    }
}
