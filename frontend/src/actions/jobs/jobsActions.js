import axios from "axios";

import { jobsConstants, alertConstants } from "../../constants/index";

export function getFilteredJobs(options) {
    return dispatch => {
        dispatch(requestAction());

        console.log(options);

        axios
            .post("http://localhost:4000/api/colab/jobOffers", options)
            .then(res => {
                console.log(res);
                dispatch(successAction(res.data));
            })
            .catch(err => {
                console.log(err);
            });
    };

    function requestAction() {
        return { type: jobsConstants.GET_FILTERED_JOBS_REQUEST };
    }
    function successAction(jobs) {
        return {
            type: jobsConstants.GET_FILTERED_JOBS_SUCCESS,
            flteredJobs: jobs
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
}
