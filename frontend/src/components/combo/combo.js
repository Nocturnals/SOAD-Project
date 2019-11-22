import React, { Component } from "react";
import { Link, Route, Redirect } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import NavBar from "../nav bar/navBar";
import HomePage from "./home/home";
import SearchComp from "./search/search";
import Profile from "./profile/profile";

import "./combo.css";

// Navigator Element Class...
class Navigator {
    constructor(link, iconClass, title) {
        this.link = link;
        this.iconClass = iconClass;
        this.title = title;
    }
}

// Combination of (Home, Organisations, Chats, Profile, etc)...
class Combo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropNavigator: true
        };

        this.toggleNavigator = this.toggleNavigator.bind(this);
        this.bodyScrollEventListener = this.bodyScrollEventListener.bind(this);

        this.bodyScrollEventListener();
    }

    // After Mounring the Component...
    componentDidMount() {
        document.body.scrollTo(0, 0);
    }

    // Window Scroll Event Listener...
    bodyScrollEventListener = () => {
        document.body.addEventListener("scroll", () => {
            var scrollHeight = document.body.scrollTop;
            console.log(scrollHeight);

            if (scrollHeight == 0) {
                this.setState({
                    dropNavigator: true
                });
            }
        });
    };

    // Generates Navigation Blocks...
    navigators = navBlocks => {
        const { type } = this.props.match.params;

        let navigators = [];
        for (let index = 0; index < navBlocks.length; index++) {
            const nav = navBlocks[index];
            navigators.push(
                <div
                    className={
                        "col " +
                        (index % 2 ? "even" : "odd") +
                        (type === nav.title.toLowerCase() ? " active" : "")
                    }
                    key={index}
                >
                    <Link to={nav.link} className="btn">
                        <i className={nav.iconClass} aria-hidden="true"></i>
                        <h6>{nav.title}</h6>
                    </Link>
                </div>
            );
        }

        return navigators;
    };

    // Drop Navigator Bar...
    toggleNavigator = () => {
        this.setState({
            dropNavigator: !this.state.dropNavigator
        });
    };

    // Rendering Combo Cmponent...
    render() {
        // Defining Navigation Elements
        const navigators = [
            new Navigator(
                this.props.auth.isAuthed ? "/user/home/feed" : "/",
                "fa fa-home",
                "HOME"
            ),
            new Navigator("/user/home/feed", "fa fa-home", "ORGANISATIONS"),
            new Navigator(
                "/user/competitions/all",
                "fa fa-trophy",
                "COMPETITIONS"
            ),
            new Navigator("/user/search/all", "fa fa-search", "SEARCH"),
            new Navigator(
                "/user/profile/" + this.props.auth.user.name,
                "fa fa-user",
                "PROFILE"
            )
        ];

        return (
            <div>
                <NavBar />
                <div className="combo container-fluid">
                    {/* <div
                    className={
                        "navigators row " +
                        (!this.state.dropNavigator ? "dropNavigator" : "")
                    }
                >
                    <div
                        className={
                            "nav-toggler " +
                            (!this.state.dropNavigator ? "navBtnDwn" : "")
                        }
                        id="nav-toggler"
                    >
                        <button onClick={this.toggleNavigator}>
                            <i
                                className={
                                    this.state.dropNavigator
                                        ? "fa fa-chevron-down"
                                        : "fa fa-chevron-up"
                                }
                                aria-hidden="true"
                            ></i>
                        </button>
                    </div>
                    {this.navigators(navigators)}
                </div> */}
                    <Route exact path="/user/home/feed" component={HomePage} />
                    <Route
                        exact
                        path="/user/organisations/all"
                        component={HomePage}
                    />
                    <Route
                        exact
                        path="/user/search/all"
                        component={SearchComp}
                    />
                    <Route
                        exact
                        path="/user/profile/:type"
                        component={Profile}
                    />
                </div>
            </div>
        );
    }
}

Combo.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Combo);
