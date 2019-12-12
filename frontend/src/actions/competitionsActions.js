import axios from "axios";

import { compConst, alertConstants } from "../constants";

export function createCompetition(competition) {
    return dispatch => {
        dispatch({
            type: compConst.CREATE_COMPETITION_REQUEST
        });
        console.log(competition);
        const newCompetition = {
            title: competition.title,
            shortdescription: competition.bDescription,
            fulldescription: competition.dDescription,
            starttime: competition.startTime,
            endtime: competition.endTime,
            prize: competition.awards,
            rules: competition.rules,
            category: competition.category
        };

        axios
            .post(
                "http://localhost:4000/api/competition/createcompetition",
                newCompetition
            )
            .then(res => {
                dispatch({
                    type: compConst.CREATE_COMPETITION_SUCCESS,
                    competition: res.data
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: compConst.CREATE_COMPETITION_FAILURE,
                    error: err.response.data.message
                });
                dispatch({
                    type: alertConstants.ERROR,
                    message: err.response.data.message
                });
            });
    };
}

export function getCompetitionById(competitionId) {
    return dispatch => {
        // set loading to true
        dispatch(loadrequest());

        axios
            .get(`http://localhost:4000/api/competition/${competitionId}`)
            .then(res => {
                dispatch({
                    type: compConst.LOAD_COMPETITION_SUCCESS,
                    competition: res.data
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: compConst.LOAD_COMPETITION_FAILURE,
                    error: err.response.data.message
                });
                dispatch({
                    type: alertConstants.ERROR,
                    message: err.response.data.message
                });
            });
    };

    function loadrequest() {
        return {
            type: compConst.LOAD_COMPETITION_REQUEST
        };
    }
}
