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
                        <div className="userImage">
                            <Img src={this.orgImage} className="image" />
                        </div>
                        <div className="col user">
                            <h6 className="details">
                                {member.username} &nbsp; (Photographer)
                            </h6>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        return comps;
    };

    render() {
        const { auth } = this.props;

        return (
            <React.Fragment>
                <NavBar contract={true} />
                <div className="container-fluid organisations">
                    <div className="userOrganisations">
                        <input
                            type="text"
                            name="search"
                            onChange={this.handleInputChange}
                            value={this.state.search}
                            className="search"
                            placeholder="Your Organisations..."
                        />
                        {this.userOrganisationsComp(auth.user.organizations)}
                    </div>
                    <div className="row body">
                        <div className="col members">
                            <h6 className="orgMemHeader">Members:</h6>
                            <div className="row blocks">
                                <div className="col">
                                    {this.displayOrgMembers(
                                        auth.user.organizations.Users
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col feed"></div>
                        <div className="col"></div>
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
