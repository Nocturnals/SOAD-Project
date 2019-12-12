import axios from "axios";

import { jobsConstants, alertConstants } from "../../constants/index";

export function postJobOffer(job) {
    return dispatch => {
        dispatch(requestAction(job));

        axios
            .post("http://localhost:4000/api/colab/jobOffer", job)
            .then(res => {
                dispatch(successAction());
                console.log(res);
            })
            .catch(err => {
                dispatch(failureAction());
                dispatch(alertAction("Failed to post job offer"));
                console.log(err);
            });
    };

    function requestAction(job) {
        return { type: jobsConstants.POST_JOB_OFFER_REQUEST, job: job };
    }
    function successAction() {
        return {
            type: jobsConstants.POST_JOB_OFFER_SUCCESS
        };
    }
    function failureAction() {
        return {
            type: jobsConstants.POST_JOB_OFFER_FAILURE
        };
    }
    function alertAction(message) {
        return { type: "ALERT_ERROR", message: message };
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
