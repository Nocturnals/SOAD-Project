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

        this.state = {
            newNotifications: 10
        };

        this.logoutUser = this.logoutUser.bind(this);
    }

    // Clear Notifications badge...
    clearNotificationsBadge = () => {
        this.setState({
            newNotifications: 0
        });
    };

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
        const { auth } = this.props;

        const links = auth.isAuthed
            ? [
                  new LinkClass("/feed", "Home"),
                  new LinkClass("/search", "Search", "_blank"),
                  new LinkClass(
                      "/artists/" +
                          (auth.user && auth.user.organizations.length
                              ? auth.user.organizations[0].name + "/"
                              : "") +
                          "feed",
                      "Organisations"
                  ),
                  new LinkClass("/jobs/results/", "Jobs"),
                  new LinkClass("/colab/messages", "Messages")
              ]
            : [
                  new LinkClass("/", "Home"),
                  new LinkClass("/search", "Search", "_blank"),
                  new LinkClass("/artists/feed", "Organisations"),
                  new LinkClass("/jobs", "Jobs")
              ];

        return (
            <nav
                className={
                    "navbar sticky-top navbar-expand-lg" +
                    (auth.isAuthed
                        ? " bg-theme"
                        : this.props.contract
                        ? " bg-theme"
                        : " bg-black-06 nav-min-height") +
                    (this.props.blur ? " blur" : "")
                }
                id={auth.isAuthed ? "" : this.props.contract ? "" : "nav-bar"}
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
                    <span className="navBarToggler navbar-toggler-icon">
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
                        {auth.isAuthed ? (
                            <React.Fragment>
                                <li className="nav-item dropdown notifications">
                                    <button
                                        className="nav-link dropdown-toggle"
                                        id="navbarDropdownMenuLink-333"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        onClick={this.clearNotificationsBadge}
                                    >
                                        Notifcations{" "}
                                        {this.state.newNotifications ? (
                                            <span className="badge badge-info">
                                                10
                                            </span>
                                        ) : null}
                                    </button>
                                    <div
                                        className="dropdown-menu dropdown-menu-right dropdown-default"
                                        aria-labelledby="navbarDropdownMenuLink-333"
                                    >
                                        <div className="dropdown-item view-all-notifications d-flex justify-content-between">
                                            <Link
                                                to="/"
                                                style={{
                                                    textDecoration: "none"
                                                }}
                                            >
                                                <button>View All</button>
                                            </Link>
                                        </div>
                                        <div className="dropdown-item notification">
                                            <div className="">Vishwanth</div>
                                        </div>
                                    </div>
                                </li>
                                {/* Create New Things */}
                                <li className="nav-item dropdown user">
                                    <button
                                        className="nav-link dropdown-toggle"
                                        id="navbarDropdownMenuLink-333"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i className="fa fa-plus"></i>{" "}
                                    </button>
                                    <div
                                        className="dropdown-menu dropdown-menu-right dropdown-default"
                                        aria-labelledby="navbarDropdownMenuLink-333"
                                    >
                                        <Link
                                            to="/create/artists"
                                            style={{
                                                textDecoration: "none",
                                                textTransform: "uppercase"
                                            }}
                                        >
                                            <button className="dropdown-item">
                                                Create Organisation
                                            </button>
                                        </Link>
                                        <Link
                                            to="/create-competition"
                                            style={{
                                                textDecoration: "none",
                                                textTransform: "uppercase"
                                            }}
                                        >
                                            <button className="dropdown-item">
                                                Create Competition
                                            </button>
                                        </Link>
                                        <Link
                                            to="/job/ask"
                                            style={{
                                                textDecoration: "none",
                                                textTransform: "uppercase"
                                            }}
                                        >
                                            <button className="dropdown-item">
                                                Ask for a Job
                                            </button>
                                        </Link>
                                        <Link
                                            to="/job/offer"
                                            style={{
                                                textDecoration: "none",
                                                textTransform: "uppercase"
                                            }}
                                        >
                                            <button className="dropdown-item">
                                                Post a job offer
                                            </button>
                                        </Link>
                                    </div>
                                </li>
                            </React.Fragment>
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
                                {auth.isAuthed ? " " + auth.user.name : null}
                            </button>
                            <div
                                className="dropdown-menu dropdown-menu-right dropdown-default"
                                aria-labelledby="navbarDropdownMenuLink-333"
                            >
                                <Link
                                    to={
                                        !auth.isAuthed
                                            ? "/auth/login"
                                            : "/artist/" + auth.user.name
                                    }
                                    style={{
                                        textDecoration: "none",
                                        textTransform: "uppercase"
                                    }}
                                >
                                    <button className="dropdown-item">
                                        {!auth.isAuthed ? "Login" : "Profile"}
                                    </button>
                                </Link>
                                {!auth.isAuthed ? (
                                    <Link
                                        to="/auth/register"
                                        style={{
                                            textDecoration: "none",
                                            textTransform: "uppercase"
                                        }}
                                    >
                                        <button className="dropdown-item">
                                            {!auth.isAuthed
                                                ? "Register"
                                                : "Logout"}
                                        </button>
                                    </Link>
                                ) : (
                                    <button
                                        className="dropdown-item"
                                        onClick={this.logoutUser}
                                    >
                                        {!auth.isAuthed ? "Register" : "Logout"}
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
