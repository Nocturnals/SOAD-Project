import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CommentComp from "../helperCards/comments/comments";
import { Comment, Participant } from "./objectClasses";

import { ClipLoader } from "react-spinners";
import "./competition.css";

import { getCompetitionById } from "../../actions/index";

class Competition extends Component {
    constructor(props) {
        super(props);

        this.competitionImage = require("../media/images/categories/photographer.png");
        this.participants = [
            new Participant(
                "Vishwanth",
                "Red Hat Hacker",
                this.competitionImage
            ),
            new Participant(
                "Vishwanth",
                "Red Hat Hacker",
                this.competitionImage
            ),
            new Participant(
                "Vishwanth",
                "Red Hat Hacker",
                this.competitionImage
            ),
            new Participant(
                "Vishwanth",
                "Red Hat Hacker",
                this.competitionImage
            ),
            new Participant(
                "Vishwanth",
                "Red Hat Hacker",
                this.competitionImage
            ),
            new Participant(
                "Vishwanth",
                "Red Hat Hacker",
                this.competitionImage
            )
        ];

        this.state = {
            showParticipants: false,
            viewAllParticipants: false,
            searchParticipants: "",
            participantSearchList: this.participants,
            isLoading: true,
            requestCompetition: false
        };

        this.toggleParticipants = this.toggleParticipants.bind(this);
        this.toggleViewAllParticipants = this.toggleViewAllParticipants.bind(
            this
        );
        this.displaySearchedParicipants = this.displaySearchedParicipants.bind(
            this
        );
    }

    componentDidMount() {
        if (!this.state.requestCompetition) {
            this.props.getCompetitionById(this.props.match.params.comp_id);
            this.setState({ requestCompetition: true });
        }
        document.body.scrollTo(0, 0);
    }

    // Display Searched Participants...
    displaySearchedParicipants = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });

        let searchedParticipants = [];

        for (let index = 0; index < this.participants.length; index++) {
            const participant = this.participants[index];

            if (
                participant.name
                    .replace(/\s/g, "")
                    .toLowerCase()
                    .includes(value.replace(/\s/g, "").toLowerCase()) ||
                participant.job
                    .replace(/\s/g, "")
                    .toLowerCase()
                    .includes(value.replace(/\s/g, "").toLowerCase())
            ) {
                searchedParticipants.push(participant);
            }
        }
        this.setState({
            participantSearchList: searchedParticipants
        });
    };

    // Toggle displaying all participants...
    toggleViewAllParticipants = () => {
        this.setState({
            searchParticipants: "",
            participantSearchList: this.participants,
            viewAllParticipants: !this.state.viewAllParticipants
        });
    };

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
                <div className="participant row" key={index}>
                    <div className="col-3">
                        <div
                            className="prImage"
                            style={{
                                backgroundImage: `url(${participant.image})`
                            }}
                        ></div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <Link
                                className="prName"
                                to={"/artist/" + participant.username}
                                style={{ textDecoration: "none" }}
                            >
                                {participant.username}
                            </Link>
                        </div>
                        <div className="prJob row">
                            {participant.primaryInterest}
                        </div>
                    </div>
                    <div className="submission-doc col-3">
                        <button>
                            <i className="fa fa-file" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            );
        }

        return prComps;
    };

    // View all participants...
    viewAllParticipantsComp = participants => {
        let comps = [];
        for (let index = 0; index < participants.length; index++) {
            const participant = participants[index];

            comps.push(
                <div className="block col-3" key={index}>
                    {this.participantsComp([participant])}
                </div>
            );
        }

        return comps;
    };

    // Displaying Category name on side...
    categoryComp = category => {
        let catComps = [];
        for (let index = 0; index < category.length; index++) {
            const cat = category[index].toUpperCase();
            catComps.push(
                <div className="categorySideDisplay" key={index}>
                    <h2>{cat}</h2>
                </div>
            );
        }

        return catComps;
    };

    // Hosts...
    hostsComp = hosts => {
        let comps = [];
        for (let index = 0; index < hosts.length; index++) {
            comps.push(hosts[index].username + ", ");
        }

        return comps;
    };

    // Check Date...
    onGoingComp = dates => {
        var date = new Date();
    };

    // Rednering...
    render() {
        const competitionImage = require("../media/images/categories/photographer.png");

        const participants = this.participants;

        const { competition } = this.props.competitions;
        const { alert } = this.props;
        console.log(alert);

        return !alert.message ? (
            <div className="competitionPage">
                <div className="container">
                    <div className="competition row">
                        <div className="competition-descr col-8">
                            <div className="row">
                                <div className="competition-image col">
                                    {competition ? (
                                        <div
                                            className="competitionImage"
                                            style={{
                                                backgroundImage: `url(${competitionImage})`
                                            }}
                                        ></div>
                                    ) : (
                                        <ClipLoader />
                                    )}
                                    {competition
                                        ? this.categoryComp(
                                              competition.category
                                          )
                                        : ""}
                                </div>
                                <div className="competition-details col-10">
                                    <div className="row">
                                        <div className="competition-header col">
                                            <div className="title row">
                                                <div className="col">
                                                    <h4>
                                                        {competition
                                                            ? competition.title
                                                            : ""}
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="row">
                                                {/* <div className="timeUploaded col-4">
                                                    <i
                                                        className="fa fa-history"
                                                        aria-hidden="true"
                                                    ></i>
                                                    &nbsp;&nbsp;Posted on
                                                    <br></br>
                                                    {competition
                                                        ? competition.createdOn
                                                        : ""}
                                                </div> */}
                                                <div className="hosts col">
                                                    Hosted By:{" "}
                                                    <span>
                                                        {competition
                                                            ? this.hostsComp(
                                                                  competition.hosts
                                                              )
                                                            : ""}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col submitButton">
                                            <button>Upload Files</button>
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
                                                    {competition &&
                                                    competition.starttime
                                                        ? competition.starttime.split(
                                                              "T"
                                                          )[0] +
                                                          " | " +
                                                          competition.starttime.split(
                                                              "T"
                                                          )[1]
                                                        : ""}{" "}
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
                                                    {competition &&
                                                    competition.endtime
                                                        ? competition.endtime.split(
                                                              "T"
                                                          )[0] +
                                                          " | " +
                                                          competition.endtime.split(
                                                              "T"
                                                          )[1]
                                                        : ""}{" "}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row description">
                                        <div className="col">
                                            <h6 className="header">
                                                About Competition:
                                            </h6>
                                            {competition
                                                ? competition.fulldescription
                                                : ""}
                                        </div>
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
                                                    {/* <div className="type">
                                                    Cash Prize
                                                </div>
                                                <div className="object">
                                                    1000/-
                                                </div> */}
                                                    {competition
                                                        ? competition.prize
                                                        : ""}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row rules">
                                        <div className="col">
                                            <h6 className="header">
                                                Rules & Regulations:
                                            </h6>
                                            {competition
                                                ? competition.rules
                                                : ""}
                                        </div>
                                    </div>
                                    {/* <div className="competition-comments row">
                                    <div className="col">
                                        <div className="header row">
                                            {competition
                                                ? competition.comments
                                                      .length
                                                : 0}{" "}
                                            Comments
                                        </div>
                                        {this.commentsComp(
                                            competition.comments
                                        )}
                                    </div>
                                </div> */}
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
                                            {competition
                                                ? this.participantsComp(
                                                      competition.participants.slice(
                                                          0,
                                                          5
                                                      )
                                                  )
                                                : null}
                                            <div className="count row">
                                                <div className="col">
                                                    <h6>
                                                        {competition &&
                                                        competition.participants
                                                            .length > 5 ? (
                                                            <button
                                                                onClick={
                                                                    this
                                                                        .toggleViewAllParticipants
                                                                }
                                                            >
                                                                View all
                                                            </button>
                                                        ) : null}
                                                        {competition
                                                            ? " " +
                                                              competition
                                                                  .participants
                                                                  .length +
                                                              " participants"
                                                            : ""}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* View All Participants */}
                <div
                    className={
                        "container-fluid viewAllParticipants " +
                        (this.state.viewAllParticipants ? "show" : "")
                    }
                >
                    <div className="header row justify-content-end">
                        <div className="col-6">
                            <h3>All Participants</h3>
                        </div>
                        <div className="closeButton col-3">
                            <i
                                className="fa fa-times"
                                aria-hidden="true"
                                onClick={this.toggleViewAllParticipants}
                            ></i>
                        </div>
                    </div>
                    <div className="row search justify-content-center">
                        <div className="col-6">
                            <input
                                type="text"
                                name="searchParticipants"
                                value={this.state.searchParticipants}
                                onChange={this.displaySearchedParicipants}
                                className="searchInput"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    <div className="participants-row row">
                        {competition
                            ? this.viewAllParticipantsComp(
                                  competition.participants
                              )
                            : null}
                    </div>
                </div>
            </div>
        ) : null;
    }
}

Competition.propTypes = {
    getCompetitionById: PropTypes.func.isRequired,
    competitions: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    alert: state.alert,
    competitions: state.competitions
});

export default connect(mapStateToProps, { getCompetitionById })(Competition);
