import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./comments.css";

class Comment {
    constructor(commentedUser, comment, image) {
        this.commentedUser = commentedUser;
        this.comment = comment;
        this.image = image;
    }
}

class PostComments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newComment: ""
        };
    }

    // Comments Section Component...
    commentsSection = comments => {
        let comments_section = [];
        for (let index = comments.length - 1; index >= 0; index--) {
            const comment = comments[index];

            comments_section.push(
                <div
                    className={
                        "row comment" +
                        (this.props.showCmnts
                            ? " show"
                            : this.props.auth.isAuthed
                            ? this.props.auth.user.name ===
                              comment.commentedUser
                                ? " show"
                                : ""
                            : "") +
                        (this.props.newCommentHighlight &&
                        index === comments.length - 1
                            ? " newCmntBack"
                            : "")
                    }
                    key={index}
                >
                    <div className="col-2 cmntImg align-self-start">
                        <div
                            className="cmnt_img"
                            style={{ backgroundImage: `url(${comment.image})` }}
                        ></div>
                    </div>
                    <div className="col commentContent">
                        <div className="row">
                            <h6>
                                <Link
                                    to={"artist/" + comment.commentedUser}
                                    className="commentedUser"
                                    style={{ textDecoration: "none" }}
                                >
                                    {this.props.auth.isAuthed
                                        ? this.props.auth.user.name ===
                                          comment.commentedUser
                                            ? "You"
                                            : comment.commentedUser
                                        : comment.commentedUser}
                                </Link>{" "}
                                <span className="commentedTime">
                                    <i className="fa fa-history"></i> 3 days ago
                                </span>
                            </h6>
                        </div>
                        <p className="commentText">{comment.comment}</p>
                        <div className="row">
                            <div className="likes-replies row">
                                <button>
                                    <i
                                        className="fa fa-heart-o"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp;500
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return comments_section;
    };

    render() {
        const cmnt_img = require("../../../media/images/categories/animator.png");

        return (
            <div className="row commentsSection">
                <div className="col column-1">
                    {this.commentsSection(this.props.comments)}
                    <div className="row addCmnt">
                        <div className="col-2">
                            <div
                                className="cmnt_img"
                                style={{
                                    backgroundImage: `url(${cmnt_img})`
                                }}
                            ></div>
                        </div>
                        <div className="col-8 newCmnt">
                            <textarea
                                type="text"
                                name="newComment"
                                className="inputCmnt"
                                rows="1"
                                placeholder="Add a comment here..."
                                onChange={this.props.handleCommentInput}
                                value={this.props.newComment}
                            />
                        </div>
                        <div className="col-2">
                            <button
                                type="submit"
                                onClick={() => {
                                    this.props.addComment(
                                        new Comment(
                                            this.props.auth.user.name,
                                            this.props.newComment,
                                            cmnt_img
                                        )
                                    );
                                }}
                            >
                                <i
                                    className="fa fa-paper-plane"
                                    aria-hidden="true"
                                ></i>
                            </button>
                        </div>
                    </div>
                    {this.props.addCommentError ? (
                        <div className="row addCommentError">
                            <div className="col">
                                <h6 className="error">
                                    {this.props.addCommentError}
                                </h6>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default PostComments;
