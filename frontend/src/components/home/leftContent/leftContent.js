import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import "./leftContent.css";

class ServiceLink extends Component {
    render() {
        return (
            <button>
                <Link
                    to={this.props.link}
                    style={{ textDecoration: "none" }}
                    className="serviceLink"
                >
                    {this.props.name}
                </Link>
            </button>
        );
    }
}

class LeftContent extends Component {
    constructor(props) {
        super(props);

        this.email = this.props.email;
    }

    render() {
        const userImg = require("../../media/images/categories/photographer.png");

        const { auth } = this.props;

        return (
            <div>
                <div className="left-content row">
                    <div className="col user">
                        <div className="row">
                            <div className="col">
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
                                <div className="userDetails row">
                                    <div className="col-12">
                                        <h4>
                                            {auth.user ? auth.user.name : ""}
                                        </h4>
                                        <h6>
                                            {auth.user
                                                ? auth.user.primaryInterest
                                                : "No Primary Interest"}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="following row">
                            <div className="title">
                                <h4>Following</h4>
                                <h6>
                                    {auth.user && auth.user.following
                                        ? auth.user.following.length
                                        : 0}
                                </h6>
                            </div>
                        </div>
                        <div className="followers row">
                            <div className="title">
                                <h4>Followers</h4>
                                <h6>
                                    {auth.user && auth.user.followers
                                        ? auth.user.followers.length
                                        : 0}
                                </h6>
                            </div>
                        </div>
                        <div className="visit-profile row">
                            <Link
                                to={"/artist/" + (auth.user && auth.user.name)}
                                className="link"
                                style={{ textDecoration: "none" }}
                            >
                                View Profile
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="left-content row footer">
                    <div className="col">
                        <div className="services row">
                            <p>
                                <ServiceLink link="/" name="Help Center" />

                                <ServiceLink link="/" name="About" />

                                <ServiceLink link="/" name="Privacy Policy" />

                                <ServiceLink
                                    link="/"
                                    name="Community Guidelines"
                                />

                                <ServiceLink link="/" name="Cookies Policy" />

                                <ServiceLink link="/" name="Career" />

                                <ServiceLink link="/" name="Languages" />

                                <ServiceLink link="/" name="Copyright Policy" />
                            </p>
                        </div>
                        <div className="copyrights row">
                            <div className="col">
                                <Link to="/" style={{ textDecoration: "none" }}>
                                    <h6 className="appName">
                                        <span className="fname">Artist</span>
                                        <span className="lname"> Colab</span>
                                    </h6>
                                </Link>
                            </div>
                            <div className="col copyright">
                                <h6>
                                    <i
                                        className="fa fa-copyright"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp;Copyright 2019
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LeftContent.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(LeftContent);
