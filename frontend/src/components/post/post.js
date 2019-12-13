import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Img from "react-image";
import { ClipLoader } from "react-spinners";

import PostComments from "../helperCards/comments/postComments/comments";

import "./post.css";

import { alterLike } from "../../actions/index";

export class Post {
    constructor(name, time, job, location, liked) {
        this.name = name;
        this.time = time;
        this.job = job;
        this.location = location;
        this.liked = liked;
    }
}

class Comment {
    constructor(commentedUser, comment, image) {
        this.commentedUser = commentedUser;
        this.comment = comment;
        this.image = image;
    }
}

class PostComp extends Component {
    constructor(props) {
        super(props);

        this.post_details = this.props.post_details;
        console.log(this.post_details);

        this.index = this.props.index;

        const cmnt_img = require("../media/images/categories/animator.png");

        this.comments = this.post_details.comments;

        this.initialState = {
            // liked: false,
            showCmnts: false,
            moreOptionsDrop: false,
            comments: this.comments,
            newComment: "",
            newCommentHighlight: false,
            addCommentError: ""
        };
        this.state = { ...this.initialState };

        this.alterLike = this.alterLike.bind(this);
        this.checkLiked = this.checkLiked.bind(this);
        this.toggleCommentsSection = this.toggleCommentsSection.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.dropDownEventListener = this.dropDownEventListener.bind(this);
        this.handleCommentInput = this.handleCommentInput.bind(this);
        this.addComment = this.addComment.bind(this);
    }
    componentDidMount() {
        this.dropDownEventListener(false);
    }
    componentWillUnmount() {
        this.setState({ ...this.initialState });
        this._isMounted = false;
        this.dropDownEventListener(true);
    }

    // Handling new comment input change...
    handleCommentInput = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    // Add a new comment...
    addComment = comment => {
        if (this.props.auth.isAuthed) {
            if (comment.comment.length) {
                this.comments.push(comment);
                this.setState({
                    newComment: "",
                    comments: this.comments,
                    addCommentError: "",
                    showCmnts: true,
                    newCommentHighlight: true
                });
            } else {
                this.setState({
                    addCommentError:
                        "Please type something to add a new comment"
                });
            }
        } else {
            this.setState({
                addCommentError: "Please login to add a new comment"
            });
        }
        setTimeout(() => {
            this.setState({
                addCommentError: "",
                newCommentHighlight: false
            });
        }, 5000);
    };

    // Like Function...
    alterLike = id => {
        this.setState({
            liked: !this.state.liked,
            likes: this.state.liked
                ? this.state.likes - 1
                : this.state.likes + 1
        });
        this.props.alterLike(id);
    };

    // Toggle More Options DropDown...
    toggleDropDown = () => {
        this.setState({
            moreOptionsDrop: !this.state.moreOptionsDrop
        });
    };

    // Toggle Comments Section...
    toggleCommentsSection = () => {
        this.setState({ showCmnts: !this.state.showCmnts });
    };

    // DoropDown Event Listener...
    dropDownEventListener = remove => {
        if (remove) {
            document.removeEventListener("click", event => {
                this.eventListener(event);
            });
        } else {
            document.addEventListener("click", event => {
                this.eventListener(event);
            });
        }
    };
    eventListener = event => {
        if (
            !event.target.matches("#post-more-" + this.index) &&
            !event.target.matches("#post-more-button-" + this.index)
        ) {
            this.setState({
                moreOptionsDrop: this.moreOptionsDrop
                    ? false
                    : this.moreOptionsDrop
            });
        }
    };

    // Check Liked?
    checkLiked = likedBy => {
        for (let index = 0; index < likedBy.length; index++) {
            if (this.props.auth.user._id === likedBy[index]._id) {
                // this.setState({ liked: true });
                return true;
            }
        }
        // this.setState({ liked: false });
        return false;
    };

    // Rendering...
    render() {
        const img = require("../media/images/v10-header4.svg");
        const userImg = require("../media/images/categories/photographer.png");

        const { auth, post_details } = this.props;

        return (
            <div
                className="post container"
                id={"post-" + this.index}
                key={this.index}
            >
                <div className="row post-header">
                    <div className="col-3">
                        <div
                            className="user-photo"
                            style={{ backgroundImage: `url(${userImg})` }}
                        ></div>
                    </div>
                    <div className="col user-details">
                        <div className="row">
                            <div className="col-5 column-1">
                                <div
                                    className={
                                        "user-name" +
                                        (post_details.owner[0].username <= 13
                                            ? " ft-s-1-2"
                                            : " ft-s-1")
                                    }
                                >
                                    <Link
                                        to={
                                            "/artist/" +
                                            post_details.owner[0].username
                                        }
                                        className="userLink"
                                        style={{ textDecoration: "none" }}
                                    >
                                        {post_details.owner[0].username}
                                    </Link>
                                </div>
                                <div className="time">
                                    <i
                                        className="fa fa-clock-o"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp;{post_details.date.split("T")[0]}
                                </div>
                            </div>
                            <div className="col-5 user-about column-2">
                                <div className="user-job">
                                    <i
                                        className="fa fa-bookmark"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp;&nbsp;{post_details.category}
                                </div>
                                <div className="user-loc">
                                    <i
                                        className="fa fa-location-arrow"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp;&nbsp;India
                                </div>
                            </div>
                            <div className="col-2 more-options column-3">
                                <button
                                    onClick={this.toggleDropDown}
                                    id={"post-more-button-" + this.index}
                                >
                                    <i
                                        className={
                                            "fa fa-ellipsis-v " +
                                            (this.state.moreOptionsDrop
                                                ? "moColor"
                                                : "")
                                        }
                                        id={"post-more-" + this.index}
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                            <div
                                className={
                                    "moreOptions " +
                                    (this.state.moreOptionsDrop ? "show" : "")
                                }
                            >
                                <div className="dropDown">
                                    <button>Not Interested</button>
                                    <button>Not</button>
                                    <button>Not Interested</button>
                                    <button>Not Interested</button>
                                    <button>Not Interested</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Post Content */}
                <div className="row post-content">
                    <div className="col">
                        {post_details.imageurls.length ? (
                            <div className="row">
                                <div className="col post-image">
                                    <Img
                                        src={post_details.imageurls[0].url}
                                        loader={
                                            <ClipLoader
                                                sizeUnit={"px"}
                                                size={80}
                                                color={"#123abc"}
                                                loading={this.state.loading}
                                                className="loader"
                                            />
                                        }
                                    />
                                </div>
                            </div>
                        ) : null}
                        <div className="row post-descr">
                            <div className="col-12">
                                <p>{post_details.title}</p>
                            </div>
                        </div>
                        <div className="row post-descr">
                            <div className="col-12">
                                <p>{post_details.content}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Likes and Comments */}
                {auth.isAuthed ? (
                    <div className="row post-impressions">
                        <div className="col">
                            <span
                                className={
                                    "likes " +
                                    (this.checkLiked(post_details.likedBy)
                                        ? "liked"
                                        : "")
                                }
                            >
                                <i
                                    className={
                                        this.state.liked
                                            ? "fa fa-heart"
                                            : "fa fa-heart-o"
                                    }
                                    aria-hidden="true"
                                    onClick={() => {
                                        this.alterLike(post_details._id);
                                    }}
                                ></i>
                                <button>{post_details.likes}</button>
                            </span>
                            <span className="comments">
                                <i
                                    className="fa fa-comments"
                                    aria-hidden="true"
                                    onClick={this.toggleCommentsSection}
                                ></i>
                                <button onClick={this.toggleCommentsSection}>
                                    {post_details.comments.length}
                                </button>
                            </span>
                        </div>
                    </div>
                ) : null}
                <PostComments
                    auth={this.props.auth}
                    showCmnts={this.state.showCmnts}
                    comments={post_details.comments}
                    newCommentHighlight={this.state.newCommentHighlight}
                    addCommentError={this.state.addCommentError}
                    handleCommentInput={this.handleCommentInput.bind(this)}
                    newComment={this.state.newComment}
                    addComment={this.addComment.bind(this)}
                />
            </div>
        );
    }
}

// specifiying the class to have these objects using propTypes
PostComp.propTypes = {
    alterLike: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { alterLike })(PostComp);
