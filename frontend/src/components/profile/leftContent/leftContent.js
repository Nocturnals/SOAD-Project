import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./leftContent.css";

import axios from "axios";

class Organisation {
    constructor(image, title, descr) {
        this.image = image;
        this.title = title;
        this.descr = descr;
    }
}

class OrganisationsLink extends Component {
    render() {
        return (
            <Link
                to={this.props.link}
                style={{ textDecoration: "none" }}
                className="btn orgsLink"
            >
                {this.props.name}
            </Link>
        );
    }
}

class LeftContent extends Component {
    // Organisations Components...
    organisationComp = organisations => {
        const userImg = require("../../media/images/categories/photographer.png");
        let orgs = [];
        for (let index = 0; index < organisations.length; index++) {
            const org = organisations[index];
            orgs.push(
                <div className="organisation row" key={index}>
                    <div className="col-3">
                        <div
                            className="orgImage"
                            style={{
                                backgroundImage: `url(${userImg})`
                            }}
                        ></div>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-8">
                                <div className="orgTitle row">{org.name}</div>
                                <div className="orgDescr row">
                                    {org.description}
                                </div>
                            </div>
                            <div className="col-4">
                                <Link to={"/artists/" + org.name + "/feed"}>
                                    <button className="orgBtn">
                                        <i
                                            className="fa fa-chevron-right"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return orgs;
    };

    onFollow = id => {
        axios.post("http://localhost:4000/api/manageProfile/addFollowing", {
            otherUserId: id
        });
    };

    // Check Liked?
    checkFollow = otherUser => {
        for (
            let index = 0;
            index < this.props.auth.user.following.length;
            index++
        ) {
            if (this.props.auth.user.following[index]._id === otherUser._id) {
                // this.setState({ liked: true });
                return true;
            }
        }
        // this.setState({ liked: false });
        return false;
    };

    render() {
        const { userProfile } = this.props;

        const userImg = require("../../media/images/categories/photographer.png");

        const { auth } = this.props;

        return !this.props.auth.isLoading ? (
            <React.Fragment>
                <div className="left-content row">
                    <div className="col user">
                        <div className="userImage row justify-content-center">
                            <div className="col">
                                <div className="image-div">
                                    <div
                                        className="user-image"
                                        style={{
                                            backgroundImage: `url(${userImg})`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="following row">
                            <div className="title col-6">
                                <h4>Following</h4>
                                <h6>{userProfile.following.length}</h6>
                            </div>
                            <div className="title col-6">
                                <h4>Followers</h4>
                                <h6>{userProfile.followers.length}</h6>
                            </div>
                        </div>
                        {auth.user && userProfile._id !== auth.user._id ? (
                            <div className="row">
                                <div className="col">
                                    <button
                                        className="followButton"
                                        onClick={
                                            !this.checkFollow(userProfile)
                                                ? () => {
                                                      this.onFollow(
                                                          userProfile._id
                                                      );
                                                  }
                                                : () => {}
                                        }
                                    >
                                        {this.checkFollow(userProfile)
                                            ? "Unfollow"
                                            : "Follow"}
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="left-content row organisations">
                    <div className="col">
                        <div className="header row">
                            <div className="col-12">
                                <h6>Organisations</h6>
                            </div>
                        </div>
                        {this.organisationComp(userProfile.organizations)}
                        <div className="view-more row">
                            <div className="col-12">
                                <OrganisationsLink
                                    link="/user/home"
                                    name="View More"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        ) : null;
    }
}

LeftContent.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(LeftContent);
