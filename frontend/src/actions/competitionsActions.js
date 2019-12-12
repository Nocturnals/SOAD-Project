import axios from "axios";

import { compConst, alertConstants } from "../constants";

export function createCompetition(competition) {
    return dispatch => {
        dispatch({
            type: compConst.CREATE_COMPETITION_REQUEST
        });
        console.log(competition);

        axios
            .post(
                "http://localhost:4000/api/competition/createcompetition",
                competition
            )
            .then(res => {
                dispatch({
                    type: compConst.CREATE_COMPETITION_SUCCESS,
                    competition: competition
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: compConst.CREATE_COMPETITION_FAILURE,
                    error: err.response.data.message
                });
            });
    };
}
