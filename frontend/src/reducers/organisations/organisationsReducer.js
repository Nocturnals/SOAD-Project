import { orgConst } from "../../constants/index";

const initialState = {
    loggedUserOrganisations: null,
    currentOrganisation: null,
    newOrg: null,
    editOrgId: null,
    isLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case orgConst.GET_ORGANISATION_FAILURE:
            return {
                ...state,
                currentOrganisation: null,
                isLoading: false
            };
        case orgConst.GET_ORGANISATION_REQUEST:
            return {
                ...state,
                currentOrganisation: null,
                isLoading: true
            };
        case orgConst.GET_ORGANISATION_SUCCESS:
            return {
                ...state,
                currentOrganisation: action.organisation,
                isLoading: false
            };
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
        case orgConst.CREATE_NEW_REQUEST:
            return {
                ...state,
                newOrg: action.name,
                isLoading: true
            };
        case orgConst.CREATE_NEW_SUCCESS:
            return {
                ...state,
                newOrg: null,
                isLoading: false
            };
        case orgConst.EDIT_ORGANISATION_REQUEST:
            return {
                ...state,
                editOrgId: action.orgId,
                isLoading: true
            };
        case orgConst.EDIT_ORGANISATION_SUCCESS:
        case orgConst.EDIT_ORGANISATION_FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return { ...state };
    }
}
