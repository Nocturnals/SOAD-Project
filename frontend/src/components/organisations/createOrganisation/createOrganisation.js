import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import NavBar from "../../nav bar/navBar";
import { Input, TextArea } from "../../helpers/inputs/styledInputs";

import Img from "react-image";

import "./createOrganisation.css";

import {
    createOrganisation,
    requestUsers,
    getOrganizationById,
    getUserMatches,
    editOrganisation
} from "../../../actions/index";

class User {
    constructor(name, profilePic, primaryInterest) {
        this.name = name;
        this.profilePic = profilePic;
        this.primaryInterest = primaryInterest;
    }
}

class CreateOrganisation extends Component {
    constructor(props) {
        super(props);

        this.postUserImage = require("../../media/images/categories/photographer.png");

        this.initialInputs = {
            title:
                this.props.organizations.currentOrganisation &&
                this.props.match.params.org_id
                    ? this.props.organizations.currentOrganisation.organisation
                          .name
                    : "",
            searchUser: "",
            description:
                this.props.organizations.currentOrganisation &&
                this.props.match.params.org_id
                    ? this.props.organizations.currentOrganisation.organisation
                          .description
                    : ""
        };

        this.state = {
            ...this.initialInputs,
            selectedUsers:
                this.props.organizations.currentOrganisation &&
                this.props.match.params.org_id
                    ? this.props.organizations.currentOrganisation.organisation
                          .Users
                    : [],
            showSearchResults: false,
            submitted: false,
            isLoading: false,
            createSuccessful: false,
            editSuccesful: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showSearchResultsDD = this.showSearchResultsDD.bind(this);
        this.addUserToList = this.addUserToList.bind(this);
        this.removeUserFromList = this.removeUserFromList.bind(this);
        this.dropDownEventListener = this.dropDownEventListener.bind(this);

        this.dropDownEventListener();
    }
    componentDidMount() {
        this.props.getOrganizationById(this.props.match.params.org_id);
    }

    // Handling Input Changes...
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (name === "searchUser") {
            this.props.getUserMatches(value);
        }
    };

    // Handling Submission...
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { title, selectedUsers, description } = this.state;
        if (title && description) {
            let formData = { name: title, description: description };
            if (!this.props.match.params.org_id) {
                this.props.createOrganisation(formData);
                if (selectedUsers.length) {
                    formData = {
                        ...formData,
                        organizationId: this.props.organizations
                            .currentOrganisation.organisation._id,
                        users: selectedUsers
                    };
                    this.props.editOrganisation(formData);
                }
                if (!this.props.alert.message) {
                    this.setState({ isLoading: true, createSuccessful: true });
                }
            } else {
                formData = {
                    ...formData,
                    organizationId: this.props.organizations.currentOrganisation
                        .organisation._id,
                    users: selectedUsers
                };
                this.props.editOrganisation(formData);
                this.setState({ editSuccesful: true });
            }
        }
    };

    // Show SearchResults...
    showSearchResultsDD = () => {
        this.setState({ showSearchResults: true });
    };

    // DoropDown Event Listener...
    dropDownEventListener = () => {
        document.addEventListener("click", event => {
            if (!event.target.matches("#searchUser")) {
                this.setState({
                    showSearchResults: false
                });
            }
        });
    };

    // Add User...
    addUserToList = user => {
        if (!this.state.selectedUsers.includes(user)) {
            this.setState({
                searchUser: "",
                selectedUsers: [...this.state.selectedUsers, user]
            });
        }
    };
    removeUserFromList = user => {
        if (this.state.selectedUsers.includes(user)) {
            this.setState({
                selectedUsers: this.state.selectedUsers.filter(x => x !== user)
            });
        }
    };

    // Search Results...
    searchResults = users => {
        let searchResults = [];
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            searchResults.push(
                <React.Fragment key={index}>
                    <div
                        className="row result"
                        onClick={() => {
                            this.addUserToList(user);
                        }}
                    >
                        <div className="col-1">
                            <Img
                                src={this.postUserImage}
                                className="searchUserPic"
                            />
                        </div>
                        <div className="col">
                            <h6 className="searchUserDeatils">
                                <span className="username">{user.name}</span>{" "}
                                &nbsp;
                                <span className="primaryInterest">
                                    (
                                    {user.primaryInterest
                                        ? user.primaryInterest
                                        : "No Primary Interest"}
                                    )
                                </span>
                            </h6>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        return searchResults;
    };

    // Display Selected Users...
    displaySelectedUsers = () => {
        let selectedUsers = [];
        for (let index = 0; index < this.state.selectedUsers.length; index++) {
            const user = this.state.selectedUsers[index];
            selectedUsers.push(
                <React.Fragment key={index}>
                    <div className="row slectedUser">
                        <div className="col-2">
                            <Img
                                src={this.postUserImage}
                                className="selectedUserPic"
                            />
                        </div>
                        <div className="col">
                            <h6 className="selectedUserDeatils">
                                <span className="username">{user.name}</span>{" "}
                                &nbsp;
                                <span className="primaryInterest">
                                    (
                                    {user.primaryInterest
                                        ? user.primaryInterest
                                        : "No Primary Interest"}
                                    )
                                </span>
                            </h6>
                        </div>
                        <div className="col-1 remove-user">
                            <h6
                                className="removeUser"
                                onClick={() => {
                                    this.removeUserFromList(user);
                                }}
                            >
                                Remove
                            </h6>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        return selectedUsers;
    };

    render() {
        const { auth, organizations, search } = this.props;
        if (this.state.createSuccessful && !organizations.isLoading) {
            return (
                <Redirect
                    to={
                        "/artists/" +
                        auth.user.organizations[
                            auth.user.organizations.length - 1
                        ].name +
                        "/feed"
                    }
                />
            );
        }
        if (
            this.state.editSuccesful &&
            organizations.currentOrganisation &&
            !organizations.isLoading
        ) {
            return (
                <Redirect
                    to={
                        "/artists/" +
                        organizations.currentOrganisation.organisation.name +
                        "/feed"
                    }
                />
            );
        }

        const { org_id } = this.props.match.params;
        const {
            title,
            searchUser,
            description,
            selectedUsers,
            showSearchResults,
            submitted
        } = this.state;

        return (
            <React.Fragment>
                <NavBar />
                <form
                    className="container create-organisation"
                    onSubmit={this.handleSubmit}
                >
                    <h6 className="header">Create Organisation</h6>
                    <div className="row body">
                        <div className="col">
                            <div className="row inputs">
                                <div className="col">
                                    <Input
                                        placeholder="Organisation Title"
                                        autoComplete="off"
                                        error={
                                            submitted && !title ? true : false
                                        }
                                        name="title"
                                        handleInputChange={
                                            this.handleInputChange
                                        }
                                        value={title}
                                        disabled={
                                            organizations.currentOrganisation &&
                                            org_id
                                                ? true
                                                : false
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row inputs searchInput">
                                <div className="col">
                                    <Input
                                        className="noHover"
                                        id="searchUser"
                                        placeholder="Search User"
                                        autoComplete="off"
                                        name="searchUser"
                                        handleInputChange={
                                            this.handleInputChange
                                        }
                                        onClick={this.showSearchResultsDD}
                                        value={searchUser}
                                    />
                                    <div
                                        className={
                                            "row searchInputResults" +
                                            (searchUser && showSearchResults
                                                ? ""
                                                : " hide")
                                        }
                                    >
                                        <div className="col">
                                            {this.searchResults(
                                                search.usersList
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={
                                    "row inputs selectedUsers" +
                                    (selectedUsers.length ? "" : " hide")
                                }
                            >
                                <div className="col">
                                    {this.displaySelectedUsers()}
                                </div>
                            </div>
                            <div className="row inputs description">
                                <div className="col">
                                    <TextArea
                                        className="mh-sm"
                                        placeholder="Type some description..."
                                        error={
                                            submitted && !description
                                                ? true
                                                : false
                                        }
                                        name="description"
                                        handleInputChange={
                                            this.handleInputChange
                                        }
                                        value={description}
                                    />
                                </div>
                            </div>
                            <div className="row submit">
                                <div className="col">
                                    <button type="submit">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

CreateOrganisation.propTypes = {
    createOrganisation: PropTypes.func.isRequired,
    editOrganisation: PropTypes.func.isRequired,
    requestUsers: PropTypes.func.isRequired,
    getOrganizationById: PropTypes.func.isRequired,
    getUserMatches: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired,
    organizations: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    alert: state.alert,
    organizations: state.organizations,
    search: state.search
});

export default connect(mapStateToProps, {
    createOrganisation,
    editOrganisation,
    requestUsers,
    getOrganizationById,
    getUserMatches
})(CreateOrganisation);
