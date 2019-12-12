import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import NavBar from "../nav bar/navBar";
import PostComp, { Post } from "../post/post";
import LeftContent from "./leftContent/leftContent";
import RightContent from "./rightContent/rightContent";
import CreatePostComp from "../post/createPost/createPost";

import "./home.css";

import { getHomeFeed } from "../../actions/index";

// Home Page Component...
class HomePage extends Component {
    constructor(props) {
        super(props);

        // Defining Elements
        this.postUserImage = require("../media/images/categories/photographer.png");

        this.state = {
            showUploadPostPopUP: false,
            requestUserPosts: false
        };

        this.toggleUploadPostPopUp = this.toggleUploadPostPopUp.bind(this);
    }

    // After Mounting the Component...
    componentDidMount() {
        if (!this.state.requestUserPosts) {
            this.props.getHomeFeed();
        }
        document.body.scrollTo(0, 0);
    }

    // Toggling Upload Post PopUp
    toggleUploadPostPopUp = () => {
        this.setState({
            showUploadPostPopUP: !this.state.showUploadPostPopUP
        });
    };

    // Generates Cards of Posts...
    postCards = posts => {
        let postCards = [];
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            postCards.push(<PostComp post_details={post} key={i} />);
        }

        return postCards;
    };

    // Rendering...
    render() {
        const postUserImage = require("../media/images/categories/photographer.png");

        const { auth, posts } = this.props;

        return (
            <React.Fragment>
                <NavBar blur={this.state.showUploadPostPopUP ? true : false} />
                <div
                    className={
                        "home-content row" +
                        (this.state.showUploadPostPopUP ? " blur" : "")
                    }
                >
                    <div className="personal-content col-3">
                        <LeftContent />
                    </div>
                    <div className="posts col-6">
                        <div className="uploadPost row">
                            <div className="col">
                                <div className="row justify-content-between">
                                    <div className="col-4">
                                        <div
                                            className="post-user-image"
                                            style={{
                                                backgroundImage: `url(${postUserImage})`
                                            }}
                                        ></div>
                                    </div>
                                    <div className="col-4 align-self-center">
                                        <div className="post-button">
                                            <button
                                                onClick={
                                                    this.toggleUploadPostPopUp
                                                }
                                            >
                                                Post Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {posts.homeFeed && !posts.isLoading
                            ? this.postCards(posts.homeFeed)
                            : null}
                    </div>
                    <div className="rightContent col-3">
                        {auth.user ? (
                            <RightContent
                                competitions={
                                    auth.user.competitionsparticipating
                                }
                            />
                        ) : null}
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

HomePage.propTypes = {
    getHomeFeed: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    posts: state.posts
});

export default connect(mapStateToProps, { getHomeFeed })(HomePage);
