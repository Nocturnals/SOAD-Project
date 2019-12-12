import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Img from "react-image";

import NavBar from "../nav bar/navBar";
import "./organisations.css";

import {
    getOrganizationByName,
    getOrganizationById
} from "../../actions/index";

class Organisations extends Component {
    constructor(props) {
        super(props);

        this.orgImage = require("../media/images/categories/photographer.png");

        this.organisationName = this.props.match.params;
        this.initialState = {
            search: ""
        };
        this.state = {
            ...this.initialState,
            fethced: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount() {
        const { organizations } = this.props;
        if (!organizations.isLoading) {
            this.props.getOrganizationByName(
                this.props.match.params.organisationName
            );
        }
    }

    // Handling input Change
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    // Displaying User organisations Component
    userOrganisationsComp = organisations => {
        let comps = [];
        for (let index = 0; index < organisations.length; index++) {
            const comp = organisations[index];
            comps.push(
                <Link to={"/artists/" + comp.name + "/feed"} key={index}>
                    <div className="organisation">
                        <Img src={this.orgImage} className="image" />
                        <h6 className="name">{comp.name}</h6>
                    </div>
                </Link>
            );
        }

        return comps;
    };
    // Display Organization Members...
    displayOrgMembers = members => {
        let comps = [];
        for (let index = 0; index < members.length; index++) {
            const member = members[index];

            comps.push(
                <React.Fragment key={index}>
                    <div className="row member">
                        <div className="col userImage">
                            <Img src={this.orgImage} className="image" />
                        </div>
                        <div className="col user">
                            <h6 className="details">{member.username}</h6>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        return comps;
    };

    // Admin Check...
    adminCheck = users => {
        console.log(this.props.auth);

        for (let index = 0; index < users.length; index++) {
            if (users[index]._id === this.props.auth.user._id) {
                return true;
            }
        }
        return false;
    };

    render() {
        const { auth, organizations } = this.props;
        const { search } = this.state;

        if (
            this.organisationName &&
            (!this.state.fetched ||
                this.organisationName !==
                    this.props.match.params.organisationName)
        ) {
            this.organisationName = this.props.match.params.organisationName;
            this.props.getOrganizationByName(
                this.props.match.params.organisationName
            );
            this.setState({ fetched: true });
        }

        return (
            <React.Fragment>
                <NavBar contract={true} />
                <div className="container-fluid organisations">
                    <div className="userOrganisations">
                        <input
                            type="text"
                            name="search"
                            onChange={this.handleInputChange}
                            value={search}
                            className="search"
                            placeholder="Your Organisations..."
                            autoComplete="off"
                        />
                        {auth.user
                            ? this.userOrganisationsComp(
                                  auth.user.organizations.filter(org =>
                                      org.name
                                          .replace(/\s/g, "")
                                          .toLowerCase()
                                          .includes(
                                              search
                                                  .replace(/\s/g, "")
                                                  .toLowerCase()
                                          )
                                  )
                              )
                            : null}
                    </div>
                    <div className="row body">
                        <div className="col members">
                            <h6 className="orgMemHeader">Members:</h6>
                            <div className="row orgMemBody">
                                <div className="col">
                                    {organizations.currentOrganisation &&
                                    organizations.currentOrganisation
                                        .organisation
                                        ? this.displayOrgMembers(
                                              organizations.currentOrganisation
                                                  .organisation.Users
                                          )
                                        : null}
                                    {organizations.currentOrganisation &&
                                    organizations.currentOrganisation
                                        .organisation &&
                                    auth.user &&
                                    this.adminCheck(
                                        organizations.currentOrganisation
                                            .organisation.adminUsers
                                    ) ? (
                                        <React.Fragment>
                                            {this.displayOrgMembers(
                                                organizations
                                                    .currentOrganisation
                                                    .organisation.PendingUsers
                                            )}
                                            {/* <button className="addUsers">
                                                Add Users
                                            </button> */}
                                        </React.Fragment>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="col feed"></div>
                        <div className="col orgRightContent">
                            <div className="row editOrganisation">
                                <div className="col">
                                    {organizations.currentOrganisation &&
                                    organizations.currentOrganisation
                                        .organisation &&
                                    auth.user &&
                                    this.adminCheck(
                                        organizations.currentOrganisation
                                            .organisation.adminUsers
                                    ) ? (
                                        <Link
                                            to={
                                                "/edit/organisation/" +
                                                organizations
                                                    .currentOrganisation
                                                    .organisation._id
                                            }
                                        >
                                            <button>Edit Organization</button>
                                        </Link>
                                    ) : null}
                                </div>
                            </div>
                            <div className="row adminUsers">
                                <div className="col admin-users">
                                    <h6 className="adminMemHeader">
                                        Admin Users:
                                    </h6>
                                    <div className="row adminMemBody">
                                        <div className="col">
                                            {organizations.currentOrganisation &&
                                            organizations.currentOrganisation
                                                .organisation
                                                ? this.displayOrgMembers(
                                                      organizations
                                                          .currentOrganisation
                                                          .organisation
                                                          .adminUsers
                                                  )
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Organisations.propTypes = {
    getOrganizationByName: PropTypes.func.isRequired,
    getOrganizationById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    organizations: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    organizations: state.organizations
});

export default connect(mapStateToProps, {
    getOrganizationByName,
    getOrganizationById
})(Organisations);
