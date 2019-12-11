import { compConst, alertConstants } from "../constants";

export function createCompetition(competition) {
    return dispatch => {
        dispatch({
            type: compConst.CREATE_COMPETITION_REQUEST
        });
        // if (!competition) {
        //     dispatch({
        //         type: alertConstants.ERROR,
        //         message: "Invalid Competition Details"
        //     });
        //     dispatch({
        //         type: compConst.CREATE_COMPETITION_FAILURE,
        //         error: "Invalid Competition Details"
        //     });
        // }
        dispatch({
            type: compConst.CREATE_COMPETITION_SUCCESS,
            competition: competition
        });
    };
}
