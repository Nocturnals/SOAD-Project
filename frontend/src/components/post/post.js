import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Img from "react-image";
import { ClipLoader } from "react-spinners";

import PostComments from "../helperCards/comments/postComments/comments";

import "./post.css";

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
    _isMounted = false;

    constructor(props) {
        super(props);

        this.post_details = this.props.post_details;
        this.index = this.props.index;

        const cmnt_img = require("../media/images/categories/animator.png");

        this.comments = [
            new Comment(
                "Anonymous",
                "Katelyn Tarver's 'You Don't Know' is a Pop song from her album",
                cmnt_img
            ),
            new Comment(
                "Anonymous",
                "Katelyn Tarver's 'You Don't Know' is a Pop song from her album",
                cmnt_img
            ),
            new Comment(
                "Anonymous",
                "Katelyn Tarver's 'You Don't Know' is a Pop song from her album",
                cmnt_img
            ),
            new Comment(
                "Anonymous",
                "Katelyn Tarver's 'You Don't Know' is a Pop song from her album",
                cmnt_img
            ),
            new Comment(
                "hello1",
                "Katelyn Tarver's 'You Don't Know' is a Pop song from her album",
                cmnt_img
            )
        ];

        this.initialState = {
            name: this.post_details.name,
            time: this.post_details.time,
            job: this.post_details.job,
            location: this.post_details.location,
            liked: this.post_details.liked,
            likes: 7000,
            showCmnts: false,
            moreOptionsDrop: false,
            comments: this.comments,
            newComment: "",
            newCommentHighlight: false,
            addCommentError: ""
        };
        this.state = { ...this.initialState };

        this.alterLike = this.alterLike.bind(this);
        this.toggleCommentsSection = this.toggleCommentsSection.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.dropDownEventListener = this.dropDownEventListener.bind(this);
        this.handleCommentInput = this.handleCommentInput.bind(this);
        this.addComment = this.addComment.bind(this);
    }
    componentDidMount() {
        this.dropDownEventListener(false);
        this._isMounted = true;
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
    alterLike = () => {
        this.setState({
            liked: !this.state.liked,
            likes: this.state.liked
                ? this.state.likes - 1
                : this.state.likes + 1
        });
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
            console.log("Asdasd");
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

    // Rendering...
    render() {
        const img = require("../media/images/v10-header4.svg");
        const userImg = require("../media/images/categories/photographer.png");

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
                                        (this.state.name.length <= 13
                                            ? " ft-s-1-2"
                                            : " ft-s-1")
                                    }
                                >
                                    <Link
                                        to={
                                            "/artist/" +
                                            this.state.name.replace(/\s/g, "")
                                        }
                                        className="userLink"
                                        style={{ textDecoration: "none" }}
                                    >
                                        {this.state.name}
                                    </Link>
                                </div>
                                <div className="time">
                                    <i
                                        className="fa fa-clock-o"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp;{this.state.time} ago
                                </div>
                            </div>
                            <div className="col-5 user-about column-2">
                                <div className="user-job">
                                    <i
                                        className="fa fa-bookmark"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp;&nbsp;{this.state.job}
                                </div>
                                <div className="user-loc">
                                    <i
                                        className="fa fa-location-arrow"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp;&nbsp;{this.state.location}
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
                        <div className="row post-descr">
                            <div className="col-12">
                                <p>
                                    'handleResponse' is defined but never used
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col post-image">
                                <Img
                                    src={img}
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
                    </div>
                </div>

                {/* Likes and Comments */}
                <div className="row post-impressions">
                    <div className="col">
                        <span
                            className={
                                "likes " + (this.state.liked ? "liked" : "")
                            }
                        >
                            <i
                                className={
                                    this.state.liked
                                        ? "fa fa-heart"
                                        : "fa fa-heart-o"
                                }
                                aria-hidden="true"
                                onClick={
                                    this.props.auth.isAuthed
                                        ? this.alterLike
                                        : null
                                }
                            ></i>
                            <button>{this.state.likes}</button>
                        </span>
                        <span className="comments">
                            <i
                                className="fa fa-comments"
                                aria-hidden="true"
                                onClick={this.toggleCommentsSection}
                            ></i>
                            <button onClick={this.toggleCommentsSection}>
                                400
                            </button>
                        </span>
                    </div>
                </div>
                <PostComments
                    auth={this.props.auth}
                    showCmnts={this.state.showCmnts}
                    comments={this.state.comments}
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
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PostComp);
