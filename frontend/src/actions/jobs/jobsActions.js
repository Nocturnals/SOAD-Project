import axios from "axios";

import {
    jobsConstants,
    alertConstants,
    artistTypesConst
} from "../../constants/index";

export function getAllArtistTypes() {
    return dispatch => {
        // make isloading true
        dispatch(requestAction());

        axios.get("http://localhost:4000/api/colab/allTypes").then(res => {
            dispatch(successAction(res.data));
        });
    };

    function requestAction() {
        return { type: artistTypesConst.GET_TYPES_REQUEST };
    }

    function successAction(payload) {
        return {
            type: artistTypesConst.GET_TYPES_SUCCESS,
            payload: payload
        };
    }
}

export function getFilteredJobs(options) {
    return dispatch => {
        dispatch(requestAction());

        axios
            .post("http://localhost:4000/api/colab/jobOffers", options)
            .then(res => {
                console.log(res);
                dispatch(successAction(res.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(failureAction());
            });
    };

    function requestAction() {
        return { type: jobsConstants.GET_FILTERED_JOBS_REQUEST };
    }
    function successAction(jobs) {
        return {
            type: jobsConstants.GET_FILTERED_JOBS_SUCCESS,
            filteredJobs: jobs
        };
    }
    function failureAction() {
        return {
            type: jobsConstants.GET_FILTERED_JOBS_FAILURE
        };
    }
}

export function getJobById(job_id) {
    return dispatch => {
        dispatch(requestAction());

        axios
            .get(`http://localhost:4000/api/colab/jobOffer/${job_id}`)
            .then(res => {
                console.log(res);
                dispatch(successAction(res.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(failureAction());
                dispatch({
                    type: alertConstants.ERROR,
                    message: err.response.data.message
                });
            });
    };

    function requestAction() {
        return { type: jobsConstants.GET_JOB_REQUEST };
    }
    function successAction(job) {
        return { type: jobsConstants.GET_JOB_SUCCESS, job: job };
    }
    function failureAction() {
        return {
            type: jobsConstants.GET_JOB_FAILURE
        };
    }
}
