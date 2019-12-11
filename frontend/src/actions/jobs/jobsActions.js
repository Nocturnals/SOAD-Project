import axios from "axios";

import { jobsConstants, alertConstants } from "../../constants/index";

export function getInterestedJobs(interest) {
    return dispatch => {
        dispatch(requestAction());

        axios
            .get(`http://localhost:4000/api/colab/getJobOffers/${interest}`)
            .then(res => {
                console.log(res);
                dispatch(successAction(res.data));
            })
            .catch(err => {
                console.log(err);
            });
    };

    function requestAction() {
        return { type: jobsConstants.GET_INTERESTED_JOBS_REQUEST };
    }
    function successAction(jobs) {
        return {
            type: jobsConstants.GET_INTERESTED_JOBS_SUCCESS,
            interestedJobs: jobs
        };
    }
}

export function getJob(job_id) {
    return dispatch => {
        dispatch(requestAction());

        axios
            .get(`http://localhost:4000/api/colab/getJob/${job_id}`)
            .then(res => {
                console.log(res);
                dispatch(successAction(res.data));
            })
            .catch(err => {
                console.log(err);
            });
    };

    function requestAction() {
        return { type: jobsConstants.GET_JOB_REQUEST };
    }
    function successAction(job) {
        return { type: jobsConstants.GET_JOB_SUCCESS, job: job };
    }
}
