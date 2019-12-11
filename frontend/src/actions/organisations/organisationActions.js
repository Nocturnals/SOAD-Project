import axios from "axios";

import { orgConst, alertConstants } from "../../constants/index";

export function getAllOrganizations() {
    return dispatch => {
        dispatch(getAllRequest());

        axios
            .get("http://localhost:4000/api/organization/getall")
            .then(res => {
                const organisations = res.data.organisations;
                console.log(organisations);
                dispatch(getAllSuccess(organisations));
            })
            .catch(err => {
                console.log(err);
            });
    };

    function getAllRequest() {
        return { type: orgConst.GET_ALL_REQUEST };
    }
    function getAllSuccess(organisations) {
        return { type: orgConst.GET_ALL_SUCCESS, organisations: organisations };
    }
}

export function createOrganisation(organisation) {
    console.log(organisation);
    return dispatch => {
        dispatch(createNewRequest(organisation.name));
        axios
            .post("http://localhost:4000/api/organization/create", organisation)
            .then(res => {
                console.log(res);
                dispatch(createNewSuccess());
            })
            .catch(err => {
                console.log(err);
                dispatch(createNewFailure(err.response.data.message));
            });
    };

    function createNewRequest(name) {
        return { type: orgConst.CREATE_NEW_REQUEST, name: name };
    }
    function createNewSuccess() {
        return { type: orgConst.CREATE_NEW_SUCCESS };
    }
    function createNewFailure(errMsg) {
        return { type: alertConstants.ERROR, message: errMsg };
    }
}

export function requestUsers(users) {
    return dispatch => {
        console.log(users);
        axios
            .post("http://localhost:4000/api/organization/requestusers", users)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };
}

export function addUser(user) {
    return dispatch => {
        console.log(user);
        axios
            .post("http://localhost:4000/api/organization/adduser", user)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };
}
