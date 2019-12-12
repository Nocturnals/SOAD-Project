import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Img from "react-image";

import NavBar from "../nav bar/navBar";
import "./organisations.css";

class Organisations extends Component {
    constructor(props) {
        super(props);

        this.orgImage = require("../media/images/categories/photographer.png");

        this.initialState = {
            search: ""
        };
        this.state = {
            ...this.initialState
        };

        this.handleInputChange = this.handleInputChange.bind(this);
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

    render() {
        const { auth } = this.props;
        const { search } = this.state;

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
                                    {auth.isAuthed &&
                                    auth.user.organizations.length
                                        ? this.displayOrgMembers(
                                              auth.user.organizations[0].Users
                                          )
                                        : null}
                                </div>
                            </div>
                        </div>
                        <div className="col feed"></div>
                        <div className="col orgRightContent">
                            <div className="row editOrganisation">
                                <div className="col">
                                    <button>Edit Organization</button>
                                </div>
                            </div>
                            <div className="row adminUsers">
                                <div className="col admin-users">
                                    <h6 className="adminMemHeader">
                                        Admin Users:
                                    </h6>
                                    <div className="row adminMemBody">
                                        <div className="col">
                                            {auth.isAuthed &&
                                            auth.user.organizations.length
                                                ? this.displayOrgMembers(
                                                      auth.user.organizations[0]
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
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Organisations);
