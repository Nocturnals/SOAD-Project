import { jobsConstants } from "../../constants/index";

const initialState = {
    interestedJobs: [],
    currentJob: [],
    isLoading: true
};

export default function(state = initialState, action) {
    switch (action.type) {
        case jobsConstants.GET_INTERESTED_JOBS_REQUEST:
            return {
                ...state,
                interestedJobs: [],
                isLoading: true
            };
        case jobsConstants.GET_INTERESTED_JOBS_SUCCESS:
            return {
                ...state,
                interestedJobs: action.interestedJobs,
                isLoading: false
            };
        case jobsConstants.GET_JOB_REQUEST:
            return {
                ...state,
                currentJob: [],
                isLoading: true
            };
        case jobsConstants.GET_JOB_SUCCESS:
            return {
                ...state,
                currentJob: action.job,
                isLoading: false
            };
        default:
            return { ...initialState };
    }
}
