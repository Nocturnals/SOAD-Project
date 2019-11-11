import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./navBarN.css";
import "./animationsN";
import { toggleNavBar } from "./animationsN";

class LinkClass {
    constructor(toLink, name) {
        this.toLink = toLink;
        this.name = name;
    }
}

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    linkComp = links => {
        let linkComps = [];
        for (let index = 0; index < links.length; index++) {
            const link = links[index];
            linkComps.push(
                <li class="nav-item">
                    <Link
                        to={link.toLink}
                        style={{
                            textDecoration: "none",
                            textTransform: "uppercase"
                        }}
                    >
                        <button class="nav-link">{link.name}</button>
                    </Link>
                </li>
            );
        }
        return linkComps;
    };

    // Rednering...
    render() {
        const { isAuthed } = this.props.auth;

        const links = [
            new LinkClass("/", "Home"),
            new LinkClass("/", "Features"),
            new LinkClass("/", "About Us")
        ];

        return (
            <nav class="navbar sticky-top navbar-expand-lg" id="nav-bar">
                <Link to="/">
                    <button className="navbar-brand navTitle">
                        <span className="fname">Artist </span>
                        <span className="lname">Colab</span>
                    </button>
                </Link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent-333"
                    aria-controls="navbarSupportedContent-333"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={toggleNavBar()}
                >
                    <span class="navbar-toggler-icon">
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent-333"
                >
                    <ul class="navbar-nav ml-auto nav-flex-icons">
                        {this.linkComp(links)}
                        <li class="nav-item dropdown">
                            <button
                                class="nav-link dropdown-toggle"
                                id="navbarDropdownMenuLink-333"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i class="fa fa-user"></i>
                            </button>
                            <div
                                class="dropdown-menu dropdown-menu-right dropdown-default"
                                id="dropdown-menu"
                                aria-labelledby="navbarDropdownMenuLink-333"
                            >
                                <Link
                                    to={!isAuthed ? "/user/login" : "/profile"}
                                    style={{
                                        textDecoration: "none",
                                        textTransform: "uppercase"
                                    }}
                                >
                                    <button class="dropdown-item">
                                        {!isAuthed ? "Login" : "Profile"}
                                    </button>
                                </Link>
                                <Link
                                    to={
                                        !isAuthed ? "/user/register" : "/logout"
                                    }
                                    style={{
                                        textDecoration: "none",
                                        textTransform: "uppercase"
                                    }}
                                >
                                    <button class="dropdown-item">
                                        {!isAuthed ? "Register" : "Logout"}
                                    </button>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

NavBar.propTypes = {
    auth: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    alert: state.alert
});

export default connect(mapStateToProps)(NavBar);
