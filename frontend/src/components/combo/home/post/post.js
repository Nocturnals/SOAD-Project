import React, { Component } from "react";

import "./post.css";

class Comment {
    constructor(comment, image) {
        this.comment = comment;
        this.image = image;
    }
}

class PostComp extends Component {
    constructor(props) {
        super(props);

        this.post_details = this.props.post_details;
        this.index = this.props.index;

        this.state = {
            name: this.post_details.name,
            time: this.post_details.time,
            job: this.post_details.job,
            location: this.post_details.location,
            liked: this.post_details.liked,
            likes: 7000,
            showCmnts: false,
            moreOptionsDrop: false
        };

        this.alterLike = this.alterLike.bind(this);
        this.toggleCommentsSection = this.toggleCommentsSection.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.dropDownEventListener = this.dropDownEventListener.bind(this);

        this.dropDownEventListener();
    }

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
    dropDownEventListener = e => {
        document.addEventListener("click", event => {
            console.log(event.target);

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
        });
    };

    // Comments Section Component...
    commentsSection = comments => {
        let comments_section = [];
        for (let index = 0; index < comments.length; index++) {
            const comment = comments[index];
            comments_section.push(
                <div className="row">
                    <div className="col-2">
                        <div
                            className="cmnt_img"
                            style={{ backgroundImage: `url(${comment.image})` }}
                        ></div>
                    </div>
                    <div className="col-9">
                        <p>{comment.comment}</p>
                    </div>
                </div>
            );
        }

        return comments_section;
    };

    // Rendering...
    render() {
        const img = require("../../../media/images/v10-header4.svg");
        const userImg = require("../../../media/images/categories/photographer.png");
        const cmnt_img = require("../../../media/images/categories/animator.png");

        const comments = [
            new Comment("'handleResponse' is defined but never used", cmnt_img),
            new Comment("'handleResponse' is defined but never used", cmnt_img),
            new Comment("'handleResponse' is defined but never used", cmnt_img),
            new Comment("'handleResponse' is defined but never used", cmnt_img),
            new Comment("'handleResponse' is defined but never used", cmnt_img)
        ];

        return (
            <div
                className="post container"
                id={"post-" + this.index}
                key={this.index}
            >
                <div className="post-header row">
                    <div className="col-3">
                        <div
                            className="user-photo"
                            style={{ backgroundImage: `url(${userImg})` }}
                        ></div>
                    </div>
                    <div className="col user-details">
                        <div className="row">
                            <div className="col-5">
                                <div className="user-name">
                                    {this.state.name}
                                </div>
                                <div className="time">
                                    <i
                                        className="fa fa-clock-o"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp;{this.state.time} ago
                                </div>
                            </div>
                            <div className="user-about col-5">
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
                            <div className="more-options col-2">
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
                <div className="post-content row">
                    <div className="col">
                        <div className="post-descr row">
                            <div className="col-12">
                                <p>
                                    'handleResponse' is defined but never used
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div
                                className="post-image col"
                                style={{
                                    backgroundImage: `url(${img})`
                                }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Likes and Comments */}
                <div className="post-impressions row">
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
                                onClick={this.alterLike}
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
                <div
                    className={
                        "commentsSection row " +
                        (this.state.showCmnts ? "show" : "")
                    }
                >
                    <div className="col">
                        {this.commentsSection(comments)}
                        <div className="row addCmnt">
                            <div className="col-2">
                                <div
                                    className="cmnt_img"
                                    style={{
                                        backgroundImage: `url(${cmnt_img})`
                                    }}
                                ></div>
                            </div>
                            <div className="col-7">
                                <textarea
                                    type="text"
                                    className="inputCmnt"
                                    rows="1"
                                    placeholder="Add a comment here..."
                                />
                            </div>
                            <div className="col-2">
                                <button>
                                    <i
                                        className="fa fa-paper-plane"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostComp;
