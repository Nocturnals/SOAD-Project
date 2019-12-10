import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import NavBar from "../nav bar/navBar";
import PostComp, { Post } from "../post/post";
import LeftContent from "./leftContent/leftContent";
import RightContent from "./rightContent/rightContent";
import CreatePostComp from "../post/createPost/createPost";
import MainLoader from "../helpers/mainLoader/mainLoader";

import "./home.css";

// Home Page Component...
class HomePage extends Component {
    constructor(props) {
        super(props);

        // Defining Elements
        this.postUserImage = require("../media/images/categories/photographer.png");
        this.posts = [
            new Post("Shiva Ram Dubey", "3 min", "Epic Coder", "India", false),
            new Post("Hemanth", "10 min", "Epic Coder", "India", true),
            new Post("Vishwanth", "20 min", "Epic Coder", "India", false),
            new Post("Nikhil", "59 min", "Epic Coder", "India", true)
        ];

        this.state = {
            showUploadPostPopUP: false,
            isLoading: true
        };

        this.toggleUploadPostPopUp = this.toggleUploadPostPopUp.bind(this);
    }

    // After Mounting the Component...
    componentDidMount() {
        document.body.scrollTo(0, 0);

        setTimeout(() => {
            this.setState({
                isLoading: false
            });
        }, 1000);
    }

    // Toggling Upload Post PopUp
    toggleUploadPostPopUp = () => {
        this.setState({
            showUploadPostPopUP: !this.state.showUploadPostPopUP
        });
    };

    // Generates Cards of Posts...
    postCards = () => {
        let postCards = [];
        for (let i = 0; i < this.posts.length; i++) {
            const post = this.posts[i];
            const post_details = {
                name: post.name,
                time: post.time,
                job: post.job,
                liked: post.liked,
                location: post.location
            };
            postCards.push(<PostComp post_details={post_details} key={i} />);
        }

        return postCards;
    };

    // Rendering...
    render() {
        const postUserImage = require("../media/images/categories/photographer.png");

        return (
            <React.Fragment className="home">
                {this.state.isLoading ? <MainLoader /> : null}
                <NavBar blur={this.state.showUploadPostPopUP ? true : false} />
                <div
                    className={
                        "home-content row" +
                        (this.state.showUploadPostPopUP ? " blur" : "")
                    }
                >
                    <div className="personal-content col-3">
                        <LeftContent email={this.props.auth.email} />
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
                        {this.postCards()}
                    </div>
                    <div className="rightContent col-3">
                        <RightContent />
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
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(HomePage);
