import React, { Component } from "react";

import CommentComp from "../helperCards/comments/comments";

import "./competitions.css";

class Comment {
    constructor(user, time, comment, likes, replies = []) {
        this.user = user;
        this.time = time;
        this.likes = likes;
        this.comment = comment;
        this.replies = replies;
    }
}

class Competition extends Component {
    // constructor(props) {
    //     super(props);
    // }

    // Component of all Competitions...
    commentsComp = comments => {
        let commentsComps = [];
        for (let index = 0; index < comments.length; index++) {
            let cmnt = comments[index];

            commentsComps.push(<CommentComp comment={cmnt} />);
        }

        return commentsComps;
    };

    // Rednering...
    render() {
        const competitionImage = require("../../media/images/categories/photographer.png");

        const comments = [
            new Comment(
                "John Doe",
                "3min",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at libero elit. Mauris ultrices sed lorem nec efficitur.",
                900,
                [
                    new Comment(
                        "John Doe",
                        "3min",
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at libero elit. Mauris ultrices sed lorem nec efficitur.",
                        900,
                        []
                    )
                ]
            ),
            new Comment(
                "John Doe",
                "3min",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at libero elit. Mauris ultrices sed lorem nec efficitur.",
                900
            ),
            new Comment(
                "John Doe",
                "3min",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at libero elit. Mauris ultrices sed lorem nec efficitur.",
                900
            ),
            new Comment(
                "John Doe",
                "3min",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at libero elit. Mauris ultrices sed lorem nec efficitur.",
                900
            )
        ];

        return (
            <div className="competition row">
                <div className="competition-descr col-8">
                    <div className="row">
                        <div className="competition-image col">
                            <div
                                className="competitionImage"
                                style={{
                                    backgroundImage: `url(${competitionImage})`
                                }}
                            ></div>
                        </div>
                        <div className="competition-details col-10">
                            <div className="title row">
                                <div className="col">
                                    <h4>Cook Off</h4>
                                </div>
                            </div>
                            <div className="timeUploaded row">
                                <div className="col">
                                    <i
                                        className="fa fa-history"
                                        aria-hidden="true"
                                    ></i>
                                    &nbsp;&nbsp;3days ago
                                </div>
                            </div>
                            <div className="description row">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Suspendisse at libero elit.
                                Mauris ultrices sed lorem nec efficitur. Donec
                                sit amet facilisis lorem, quis facilisis tellus.
                                Nullam mollis dignissim nisi sit amet tempor.
                                Nullam sollicitudin neque a felis commodo
                                gravida at sed nunc. In justo nunc, sagittis sed
                                venenatis at, dictum vel erat. Curabitur at quam
                                ipsum. Quisque eget nibh aliquet, imperdiet diam
                                pharetra, dapibus lacus. Sed tincidunt sapien in
                                dui imperdiet eleifend. Ut ut sagittis purus,
                                non tristique elit. Quisque tincidunt metus eget
                                ligula sodales luctus. Donec convallis ex at dui
                                convallis malesuada. Orci varius natoque
                                penatibus et magnis dis parturient montes,
                                nascetur ridiculus mus. Ut pretium euismod
                                mollis. Pellentesque convallis gravida ante eu
                                pretium. Integer rutrum mi nec purus tincidunt,
                                nec rhoncus mauris porttitor. Donec id tellus at
                                leo gravida egestas. Suspendisse consequat mi
                                vel euismod efficitur. Donec sed elementum
                                libero.Etiam rutrum ut urna eu tempus. Curabitur
                                suscipit quis lorem vel dictum. Aliquam erat
                                volutpat. Pellentesque volutpat viverra
                                pulvinar. Mauris ac sapien ac metus tincidunt
                                volutpat eu eu purus. Suspendisse pharetra quis
                                quam id auctor. Pellentesque feugiat venenatis
                                urna, vitae suscipit enim volutpat vitae. Nunc
                                egestas tortor est, at sodales ligula auctor
                                efficitur.
                            </div>
                            <div className="competition-comments row">
                                <div className="col">
                                    <div className="header row">
                                        {comments.length} Comments
                                    </div>
                                    {this.commentsComp(comments)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
        );
    }
}

export default Competition;
