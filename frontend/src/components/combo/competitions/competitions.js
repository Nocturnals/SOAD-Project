import React, { Component } from "react";

import CommentComp from "../helperCards/comments/comments";
import { Comment, Participant } from "./objectClasses";

import "./competitions.css";

class Competition extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showParticipants: false
        };

        this.toggleParticipants = this.toggleParticipants.bind(this);
    }

    componentDidMount() {
        document.body.scrollTo(0, 0);
    }

    // Toggle display of Participants...
    toggleParticipants = () => {
        this.setState({
            showParticipants: !this.state.showParticipants
        });
    };

    // Component of all Competitions...
    commentsComp = comments => {
        let commentsComps = [];
        for (let index = 0; index < comments.length; index++) {
            let cmnt = comments[index];

            commentsComps.push(<CommentComp comment={cmnt} />);
        }

        return commentsComps;
    };

    // Component of Participants...
    participantsComp = participants => {
        let prComps = [];

        for (let index = 0; index < participants.length; index++) {
            const participant = participants[index];
            prComps.push(
                <div className="participant row">
                    <div className="col-3">
                        <div
                            className="prImage"
                            style={{
                                backgroundImage: `url(${participant.image})`
                            }}
                        ></div>
                    </div>
                    <div className="col-6">
                        <div className="prName row">{participant.name}</div>
                        <div className="prJob row">{participant.job}</div>
                    </div>
                    <div className="submission-doc col-3">
                        <button>
                            <i class="fa fa-file" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            );
        }

        return prComps;
    };

    // Displaying Category name on side...
    categoryComp = category => {
        let catComps = [];
        for (let index = 0; index < category.length; index++) {
            const cat = category[index].toUpperCase();
            catComps.push(
                <div className="categorySideDisplay">
                    <h2>{cat}</h2>
                </div>
            );
        }

        return catComps;
    };

    // View all participants...
    viewAllParticipantsComp = participants => {
        let comps = [];
        for (let index = 0; index < participants.length; index++) {
            const participant = participants[index];

            comps.push(
                <div className="col-3">
                    {this.participantsComp(participant)}
                </div>
            );
        }

        return comps;
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

        const participants = [
            new Participant("Vishwanth", "Red Hat Hacker", competitionImage),
            new Participant("Vishwanth", "Red Hat Hacker", competitionImage),
            new Participant("Vishwanth", "Red Hat Hacker", competitionImage),
            new Participant("Vishwanth", "Red Hat Hacker", competitionImage),
            new Participant("Vishwanth", "Red Hat Hacker", competitionImage),
            new Participant("Vishwanth", "Red Hat Hacker", competitionImage)
        ];

        const competitions = ["Cook Off"];

        const { type } = this.props.match.params;

        return competitions.includes(type) ? (
            <div>
                <div className="container">
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
                                    {this.categoryComp("photography")}
                                </div>
                                <div className="competition-details col-10">
                                    <div className="row">
                                        <div className="competition-header col">
                                            <div className="title row">
                                                <div className="col">
                                                    <h4>{type}</h4>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="timeUploaded col-4">
                                                    <i
                                                        className="fa fa-history"
                                                        aria-hidden="true"
                                                    ></i>
                                                    &nbsp;&nbsp;Posted 3days ago
                                                </div>
                                                <div className="hosts col">
                                                    Hosted By:{" "}
                                                    <span>
                                                        Vishwanth, Hemanth
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="startEndTime row justify-content-start">
                                        <div className="startTime col-4">
                                            <div className="header row">
                                                <div className="col">
                                                    <h5>Start Time</h5>
                                                </div>
                                            </div>
                                            <div className="time row">
                                                <div className="col">
                                                    15/12/2019 | 5:00pm
                                                </div>
                                            </div>
                                        </div>
                                        <div className="endTime col-4">
                                            <div className="header row">
                                                <div className="col">
                                                    <h5>End Time</h5>
                                                </div>
                                            </div>
                                            <div className="time row">
                                                <div className="col">
                                                    20/12/2019 | 12:00pm
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="description row">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Suspendisse at libero
                                        elit. Mauris ultrices sed lorem nec
                                        efficitur. Donec sit amet facilisis
                                        lorem, quis facilisis tellus. Nullam
                                        mollis dignissim nisi sit amet tempor.
                                        Nullam sollicitudin neque a felis
                                        commodo gravida at sed nunc. In justo
                                        nunc, sagittis sed venenatis at, dictum
                                        vel erat. Curabitur at quam ipsum.
                                        Quisque eget nibh aliquet, imperdiet
                                        diam pharetra, dapibus lacus. Sed
                                        tincidunt sapien in dui imperdiet
                                        eleifend. Ut ut sagittis purus, non
                                        tristique elit. Quisque tincidunt metus
                                        eget ligula sodales luctus. Donec
                                        convallis ex at dui convallis malesuada.
                                        Orci varius natoque penatibus et magnis
                                        dis parturient montes, nascetur
                                        ridiculus mus. Ut pretium euismod
                                        mollis. Pellentesque convallis gravida
                                        ante eu pretium. Integer rutrum mi nec
                                        purus tincidunt, nec rhoncus mauris
                                        porttitor. Donec id tellus at leo
                                        gravida egestas. Suspendisse consequat
                                        mi vel euismod efficitur. Donec sed
                                        elementum libero.Etiam rutrum ut urna eu
                                        tempus. Curabitur suscipit quis lorem
                                        vel dictum. Aliquam erat volutpat.
                                        Pellentesque volutpat viverra pulvinar.
                                        Mauris ac sapien ac metus tincidunt
                                        volutpat eu eu purus. Suspendisse
                                        pharetra quis quam id auctor.
                                        Pellentesque feugiat venenatis urna,
                                        vitae suscipit enim volutpat vitae. Nunc
                                        egestas tortor est, at sodales ligula
                                        auctor efficitur.
                                    </div>
                                    <div className="competition-prizes row">
                                        <div className="col">
                                            <div className="header row">
                                                <div className="col">
                                                    <h4>Awards</h4>
                                                </div>
                                            </div>
                                            <div className="prizes row justify-content-center">
                                                <div className="prize">
                                                    <div className="type">
                                                        Cash Prize
                                                    </div>
                                                    <div className="object">
                                                        1000/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                        <div className="competition-involved col-4">
                            <div className="competitionStatus competitionStatusAnimation row makeSticky">
                                <div className="competition-status col">
                                    <div className="header row">
                                        <div className="col">
                                            <h6>Starts In:</h6>
                                        </div>
                                    </div>
                                    <div className="status row">
                                        <div className="col">
                                            <h5>
                                                1d : 20hrs : 32mins : 50secs
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="participants row">
                                <div className="col">
                                    <div className="header row">
                                        <button
                                            onClick={this.toggleParticipants}
                                        >
                                            {!this.state.showParticipants
                                                ? "View"
                                                : "Hide"}{" "}
                                            Participants&nbsp;
                                            <i
                                                className={
                                                    !this.state.showParticipants
                                                        ? "fa fa-chevron-down"
                                                        : "fa fa-chevron-up"
                                                }
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                    </div>
                                    <div
                                        className={
                                            "participantsBlocks row " +
                                            (this.state.showParticipants
                                                ? "showParticipants"
                                                : "")
                                        }
                                    >
                                        <div className="col">
                                            <div className="count row">
                                                <div className="col">
                                                    <h6>
                                                        {participants.length >
                                                        5 ? (
                                                            <button>
                                                                View all
                                                            </button>
                                                        ) : null}
                                                        {" " +
                                                            participants.length +
                                                            " participants"}
                                                    </h6>
                                                </div>
                                            </div>
                                            {this.participantsComp(
                                                participants.slice(0, 5)
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* View All Participants */}
                <div className="container-fluid viewAllParticipants">
                    <div className="header row">
                        <div className="col">
                            <h3>All Participants</h3>
                        </div>
                    </div>
                    <div className="participants-row row">
                        {this.viewAllParticipantsComp(participants)}
                    </div>
                </div>
            </div>
        ) : (
            <h2>No Competition Named {type}</h2>
        );
    }
}

export default Competition;
