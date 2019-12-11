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
    requestUsers
} from "../../../actions/organisations/organisationActions";

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
        this.users = [
            new User("Shiva Ram Dubey", this.postUserImage, "Photographer"),
            new User("Nikhil", this.postUserImage, "Painter"),
            new User("James Harden", this.postUserImage, "Dance Choreographer"),
            new User("Varun Aditya", this.postUserImage, "Photographer"),
            new User("Vishwanth", this.postUserImage, "Epic Coder")
        ];

        this.initialInputs = {
            title: "",
            searchUser: "",
            description: ""
        };

        this.state = {
            ...this.initialInputs,
            selectedUsers: [],
            showSearchResults: false,
            submitted: false,
            isLoading: false,
            createSuccessful: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showSearchResultsDD = this.showSearchResultsDD.bind(this);
        this.addUserToList = this.addUserToList.bind(this);
        this.removeUserFromList = this.removeUserFromList.bind(this);
        this.dropDownEventListener = this.dropDownEventListener.bind(this);

        this.dropDownEventListener();
    }

    // Handling Input Changes...
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    // Handling Submission...
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { title, selectedUsers, description } = this.state;
        if (title && description) {
            const formData = { name: title, description: description };
            this.props.createOrganisation(formData);
            if (selectedUsers.length) {
                this.props.requestUsers(selectedUsers);
            }
            if (!this.props.alert.message) {
                this.setState({ isLoading: true, createSuccessful: true });
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
    searchResults = () => {
        let searchResults = [];
        const user = this.users[0];
        searchResults.push(
            <React.Fragment key={1}>
                <div
                    className="row result"
                    onClick={() => {
                        this.addUserToList(user);
                    }}
                >
                    <div className="col-1">
                        <Img src={user.profilePic} className="searchUserPic" />
                    </div>
                    <div className="col">
                        <h6 className="searchUserDeatils">
                            <span className="username">{user.name}</span> &nbsp;
                            <span className="primaryInterest">
                                ({user.primaryInterest})
                            </span>
                        </h6>
                    </div>
                </div>
            </React.Fragment>
        );

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
                                src={user.profilePic}
                                className="selectedUserPic"
                            />
                        </div>
                        <div className="col">
                            <h6 className="selectedUserDeatils">
                                <span className="username">{user.name}</span>{" "}
                                &nbsp;
                                <span className="primaryInterest">
                                    ({user.primaryInterest})
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
        const { auth, organizations } = this.props;
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
                                            {this.searchResults()}
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
    requestUsers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired,
    organizations: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    alert: state.alert,
    organizations: state.organizations
});

export default connect(mapStateToProps, {
    createOrganisation,
    requestUsers
})(CreateOrganisation);
