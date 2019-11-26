import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PostComp from "../post/post";
import LeftContent from "./leftContent/leftContent";
import RightContent from "./rightContent/rightContent";
import NavBar from "../nav bar/navBar";
import CreatePostComp from "../post/createPost/createPost";

import "./profile.css";

// Post Element Class...
class Post {
    constructor(name, time, job, location, liked) {
        this.name = name;
        this.time = time;
        this.job = job;
        this.location = location;
        this.liked = liked;
    }
}

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.authedUser = false;
        this.state = {
            nav: "nav1",
            showUploadPostPopUP: false
        };

        this.handleNavigation = this.handleNavigation.bind(this);
        this.toggleUploadPostPopUp = this.toggleUploadPostPopUp.bind(this);
    }

    componentDidMount() {
        document.body.scrollTo(0, 0);
    }

    // Sub Navigator...
    handleNavigation = nav => {
        this.setState({ nav: nav });
    };

    // Toggle Create Post PopUp
    toggleUploadPostPopUp = () => {
        this.setState({
            showUploadPostPopUP: !this.state.showUploadPostPopUP
        });
    };

    // Generates Cards of Posts...
    postCards = postDetails => {
        let postCards = [];
        for (let i = 0; i < postDetails.length; i++) {
            const post = postDetails[i];
            const post_details = {
                name: post.name,
                time: post.time,
                job: post.job,
                liked: post.liked,
                location: post.location
            };
            postCards.push(
                <PostComp post_details={post_details} index={i} key={i} />
            );
        }

        return postCards;
    };

    render() {
        const postUserImage = require("../media/images/categories/photographer.png");
        const coverimage = require("../media/images/profile/cover.jpg");

        const username = this.props.match.params.username;
        // Defining Elements
        const posts = [
            new Post(username, "3 min", "Epic Coder", "India", false),
            new Post(username, "10 min", "Epic Coder", "India", true),
            new Post(username, "20 min", "Epic Coder", "India", false),
            new Post(username, "59 min", "Epic Coder", "India", true)
        ];

        this.authedUser =
            this.props.auth.user.name === this.props.match.params.username
                ? true
                : false;

        return (
            <React.Fragment>
                <NavBar contract={true} />
                <div className="profile row">
                    <div className="col">
                        <div
                            className="coverImage row justify-content-end"
                            style={{ backgroundImage: `url(${coverimage})` }}
                        >
                            {this.props.auth.isAuthed ? (
                                this.props.auth.user.name ===
                                this.props.match.params.username ? (
                                    <React.Fragment>
                                        <div className="overLay"></div>
                                        <div className="col-1 account-settings">
                                            <Link
                                                to="/user-account-settings/general"
                                                style={{
                                                    textDecoration: "none"
                                                }}
                                            >
                                                <button className="accountSettingsButton">
                                                    <i
                                                        className="fa fa-cog"
                                                        aria-hidden="true"
                                                    ></i>
                                                </button>
                                            </Link>
                                        </div>
                                    </React.Fragment>
                                ) : null
                            ) : null}
                        </div>
                        <div className="profile-content row">
                            <div className="col-3">
                                <LeftContent email="mail.mail.com" />
                            </div>
                            <div className="col-6">
                                <div className="userContent row">
                                    <div className="col">
                                        <div className="row">
                                            <div className="userName col">
                                                <h3>{username}</h3>
                                            </div>
                                            <div className="userMail col align-self-center">
                                                <h6>
                                                    <i
                                                        className="fa fa-envelope"
                                                        aria-hidden="true"
                                                    ></i>
                                                    &nbsp;&nbsp;&nbsp;venkatvishwanth.s17@iiits.in
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="userJob col">
                                                <h4>
                                                    Professional Red Hat Hacker
                                                </h4>
                                            </div>
                                            <div className="userLocation col">
                                                <h4>
                                                    <i
                                                        className="fa fa-map-marker"
                                                        aria-hidden="true"
                                                    ></i>
                                                    &nbsp;&nbsp;India
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="nav row">
                                            <div className="col-2">
                                                <button
                                                    name="nav1"
                                                    onClick={() => {
                                                        this.handleNavigation(
                                                            "nav1"
                                                        );
                                                    }}
                                                    className={
                                                        this.state.nav ===
                                                        "nav1"
                                                            ? "active"
                                                            : ""
                                                    }
                                                >
                                                    <i
                                                        className={
                                                            "fa fa-newspaper-o" +
                                                            (this.state.nav ===
                                                            "nav1"
                                                                ? " active"
                                                                : "")
                                                        }
                                                        aria-hidden="true"
                                                    ></i>
                                                    <h6>Feed</h6>
                                                </button>
                                            </div>
                                            <div className="col-2">
                                                <button
                                                    name="nav2"
                                                    onClick={() => {
                                                        this.handleNavigation(
                                                            "nav2"
                                                        );
                                                    }}
                                                    className={
                                                        this.state.nav ===
                                                        "nav2"
                                                            ? "active"
                                                            : ""
                                                    }
                                                >
                                                    <i
                                                        className={
                                                            "fa fa-info" +
                                                            (this.state.nav ===
                                                            "nav2"
                                                                ? " active"
                                                                : "")
                                                        }
                                                        aria-hidden="true"
                                                    ></i>
                                                    <h6>Info</h6>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.postCards(posts)}
                            </div>
                            <div className="col-3">
                                <RightContent
                                    togglePopUp={this.toggleUploadPostPopUp.bind(
                                        this
                                    )}
                                    authedUser={this.authedUser}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <CreatePostComp
                    togglePopUp={this.toggleUploadPostPopUp.bind(this)}
                    showPopUp={this.state.showUploadPostPopUP}
                />
            </React.Fragment>
        );
    }
}

ProfilePage.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ProfilePage);
