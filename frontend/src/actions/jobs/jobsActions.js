import axios from "axios";

import { jobsConstants, alertConstants } from "../../constants/index";

export function getInterestedJobs(interest) {
    return dispatch => {
        dispatch(requestAction());

        if (!interest) {
            interest = "Photographer";
        }

        axios
            .get(`http://localhost:4000/api/colab/jobOffers/${interest}`)
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

export function getJobById(job_id) {
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
