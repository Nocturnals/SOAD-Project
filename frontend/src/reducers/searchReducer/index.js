import { searchConst } from "../../constants";

const initialState = {
    usersList: [],
    organisationsList: [],
    competitionsList: [],
    reqTime: 0,
    isLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case searchConst.GET_USER_REQUEST:
        case searchConst.GET_COMPETITIONS_REQUEST:
        case searchConst.GET_ORGANISATION_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case searchConst.GET_USER_SUCCESS:
            if (state.reqTime < action.payload.reqTime)
                return {
                    ...state,
                    isLoading: false,
                    usersList: action.payload.usersList,
                    reqTime: action.payload.reqTime
                };
            else
                return {
                    ...state,
                    isLoading: false
                };

        case searchConst.GET_COMPETITIONS_SUCCESS:
            if (state.reqTime < action.payload.reqTime)
                return {
                    ...state,
                    isLoading: false,
                    competitionsList: action.payload.competitionsList,
                    reqTime: action.payload.reqTime
                };
            else
                return {
                    ...state,
                    isLoading: false
                };

        case searchConst.GET_ORGANISATION_SUCCESS:
            if (state.reqTime < action.payload.reqTime)
                return {
                    ...state,
                    isLoading: false,
                    organisationsList: action.payload.organisationsList,
                    reqTime: action.payload.reqTime
                };
            else
                return {
                    ...state,
                    isLoading: false
                };

        case searchConst.GET_COMPETITIONS_FAILURE:
        case searchConst.GET_ORGANISATION_FAILURE:
        case searchConst.GET_USER_FAILURE:
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
