import { jobsConstants } from "../../constants/index";

const initialState = {
    filteredJobs: [],
    currentJob: null,
    isLoading: true
};

export default function(state = initialState, action) {
    switch (action.type) {
        case jobsConstants.GET_FILTERED_JOBS_REQUEST:
            return {
                ...state,
                filteredJobs: [],
                isLoading: true
            };
        case jobsConstants.GET_FILTERED_JOBS_SUCCESS:
            return {
                ...state,
                filteredJobs: action.interestedJobs,
                isLoading: false
            };
        case jobsConstants.GET_FILTERED_JOBS_FAILURE:
            return {
                ...state,
                filteredJobs: [],
                isLoading: false
            };
        case jobsConstants.GET_JOB_REQUEST:
            return {
                ...state,
                currentJob: null,
                isLoading: true
            };
        case jobsConstants.GET_JOB_SUCCESS:
            return {
                ...state,
                currentJob: action.job,
                isLoading: false
            };
        case jobsConstants.GET_JOB_FAILURE:
            return {
                ...state,
                currentJob: [],
                isLoading: false
            };
        default:
            return { ...initialState };
    }
}
