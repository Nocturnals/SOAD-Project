import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./navBar.css";
import "./animations";
import { logout } from "../../actions/authActions";

class LinkClass {
    constructor(toLink, name, target = "") {
        this.toLink = toLink;
        this.name = name;
        this.target = target;
    }
}

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
    }

    // logout function
    logoutUser() {
        this.props.onLogout();
    }

    linkComp = links => {
        let linkComps = [];
        for (let index = 0; index < links.length; index++) {
            const link = links[index];
            linkComps.push(
                <li className="nav-item" key={index}>
                    <Link
                        to={link.toLink}
                        style={{
                            textDecoration: "none",
                            textTransform: "uppercase"
                        }}
                        target={link.target}
                    >
                        <button className="nav-link">{link.name}</button>
                    </Link>
                </li>
            );
        }
        return linkComps;
    };

    // Rednering...
    render() {
        const { isAuthed } = this.props.auth;

        const links = this.props.auth.isAuthed
            ? [
                  new LinkClass("/feed", "Home"),
                  new LinkClass("/search", "Search", "_blank")
              ]
            : [
                  new LinkClass("/", "Home"),
                  new LinkClass("/search", "Search", "_blank")
              ];

        return (
            <nav
                className={
                    "navbar sticky-top navbar-expand-lg" +
                    (this.props.auth.isAuthed
                        ? " bg-theme"
                        : " bg-black-06 nav-min-height")
                }
                id={!this.props.auth.isAuthed ? "nav-bar" : ""}
            >
                <Link to="/">
                    <button className="navbar-brand navTitle">
                        <span className="fname">Artist </span>
                        <span className="lname">Colab</span>
                    </button>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent-333"
                    aria-controls="navbarSupportedContent-333"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon">
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent-333"
                >
                    <ul className="navbar-nav ml-auto nav-flex-icons">
                        {this.linkComp(links)}

                        {/* Notiifcations */}
                        {this.props.auth.isAuthed ? (
                            <li className="nav-item dropdown notifications">
                                <button
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdownMenuLink-333"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="fa fa-bell"></i> Notifcations
                                </button>
                                <div
                                    className="dropdown-menu dropdown-menu-right dropdown-default"
                                    aria-labelledby="navbarDropdownMenuLink-333"
                                >
                                    <div className="dropdown-item view-all-notifications d-flex justify-content-between">
                                        <Link
                                            style={{ textDecoration: "none" }}
                                        >
                                            <button>View All</button>
                                        </Link>
                                    </div>
                                    <div className="dropdown-item notification">
                                        <div className="">Vishwanth</div>
                                    </div>
                                </div>
                            </li>
                        ) : null}

                        {/* User Profile and Logout */}
                        <li className="nav-item dropdown user">
                            <button
                                className="nav-link dropdown-toggle"
                                id="navbarDropdownMenuLink-333"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i className="fa fa-user"></i>{" "}
                                {this.props.auth.isAuthed
                                    ? " " + this.props.auth.user.name
                                    : null}
                            </button>
                            <div
                                className="dropdown-menu dropdown-menu-right dropdown-default"
                                aria-labelledby="navbarDropdownMenuLink-333"
                            >
                                <Link
                                    to={
                                        !isAuthed
                                            ? "/auth/login"
                                            : "/artist/" +
                                              this.props.auth.user.name
                                    }
                                    style={{
                                        textDecoration: "none",
                                        textTransform: "uppercase"
                                    }}
                                >
                                    <button className="dropdown-item">
                                        {!isAuthed ? "Login" : "Profile"}
                                    </button>
                                </Link>
                                {!isAuthed ? (
                                    <Link
                                        to="/auth/register"
                                        style={{
                                            textDecoration: "none",
                                            textTransform: "uppercase"
                                        }}
                                    >
                                        <button className="dropdown-item">
                                            {!isAuthed ? "Register" : "Logout"}
                                        </button>
                                    </Link>
                                ) : (
                                    <button
                                        className="dropdown-item"
                                        onClick={this.logoutUser}
                                    >
                                        {!isAuthed ? "Register" : "Logout"}
                                    </button>
                                )}
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

export default connect(mapStateToProps, { onLogout: logout })(NavBar);
