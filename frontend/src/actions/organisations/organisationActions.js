import axios from "axios";

import { orgConst, alertConstants, userAuthConst } from "../../constants/index";

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

export function getOrganizationByName(name) {
    return dispatch => {
        dispatch(requestAction());
        axios
            .post("http://localhost:4000/api/organization/getByName", {
                orgName: name
            })
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
        return {
            type: orgConst.GET_ORGANISATION_REQUEST
        };
    }
    function successAction(organisation) {
        return {
            type: orgConst.GET_ORGANISATION_SUCCESS,
            organisation: organisation
        };
    }
    function failureAction() {
        return {
            type: orgConst.GET_ORGANISATION_FAILURE
        };
    }
}

export function getOrganizationById(orgId) {
    return dispatch => {
        dispatch({ type: orgConst.GET_ORGANISATION_REQUEST });
        axios
            .post("http://localhost:4000/api/organization/getById", {
                orgId: orgId
            })
            .then(res => {
                dispatch({
                    type: orgConst.GET_ORGANISATION_SUCCESS,
                    organisation: res.data
                });
                console.log(res);
            })
            .catch(err => {
                dispatch({ type: orgConst.GET_ORGANISATION_FAILURE });
                console.log(err);
            });
    };
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
                dispatch({ type: userAuthConst.LOAD_USER, user: res.data.doc });
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

export function editOrganisation(formData) {
    return dispatch => {
        dispatch({
            type: orgConst.EDIT_ORGANISATION_REQUEST,
            orgId: formData.organizationId
        });
        axios
            .post("http://localhost:4000/api/organization/edit", formData)
            .then(res => {
                console.log(res);
                dispatch({ type: orgConst.EDIT_ORGANISATION_SUCCESS });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: orgConst.GET_ORGANISATION_FAILURE });
            });
    };
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
