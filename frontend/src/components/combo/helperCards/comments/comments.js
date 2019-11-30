import React, { Component } from "react";

import "./comments.css";

class CommentComp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showReplies: false
        };

        this.alterReplies = this.alterReplies.bind(this);
    }

    alterReplies = () => {
        this.setState({
            showReplies: !this.state.showReplies
        });
    };

    // Component of replies to a comment...
    commentRepliesComp = replies => {
        let replyComps = [];
        for (let index = 0; index < replies.length; index++) {
            let reply = replies[index];
            replyComps.push(
                <div className="reply row">
                    <div className="col">
                        <div className="user row">
                            <div className="name">{reply.user}</div>
                            <div className="time">
                                <i
                                    className="fa fa-history"
                                    aria-hidden="true"
                                ></i>
                                &nbsp;&nbsp;{reply.time} ago
                            </div>
                        </div>
                        <div className="commentText cmntReply row">
                            <div className="col">{reply.comment}</div>
                        </div>
                    </div>
                </div>
            );
        }

        return replyComps;
    };

    render() {
        const cmnt = this.props.comment;

        return (
            <div className="comment row">
                <div className="commentUser col">
                    <div className="user row">
                        <div className="name">{cmnt.user}</div>
                        <div className="time">
                            <i className="fa fa-history" aria-hidden="true"></i>
                            &nbsp;&nbsp;{cmnt.time} ago
                        </div>
                    </div>
                    <div className="commentText row">{cmnt.comment}</div>
                    <div className="likes-replies row">
                        <button>
                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                            &nbsp;{cmnt.likes}
                        </button>
                        <button onClick={this.alterReplies}>
                            <i className="fa fa-reply" aria-hidden="true"></i>
                            &nbsp;{this.state.showReplies
                                ? "Hide"
                                : "View"}{" "}
                            {cmnt.replies.length} replies
                        </button>
                    </div>
                    <div
                        className={
                            "comment-replies row" +
                            (this.state.showReplies ? " showReplies" : "")
                        }
                    >
                        <div className="col">
                            {this.commentRepliesComp(cmnt.replies)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentComp;
