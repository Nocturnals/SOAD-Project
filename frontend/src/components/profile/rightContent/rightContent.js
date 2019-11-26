import React, { Component } from "react";

import Competition from "../../competitions/competitionClass";

import CompetitionsList from "../../competitions/competitions";

import "./rightContent.css";

class FriendSuggestion {
    constructor(image, username, job) {
        this.image = image;
        this.username = username;
        this.job = job;
    }
}

class RightContent extends Component {
    constructor(props) {
        super(props);

        this.image = require("../../media/images/categories/photographer.png");
        this.friendSuggestions = [
            new FriendSuggestion(this.image, "Hrithik", "Git Forker"),
            new FriendSuggestion(this.image, "Nikihil", "Data Scientist"),
            new FriendSuggestion(this.image, "Hemanth", "Game Development"),
            new FriendSuggestion(this.image, "Vishwanth", "Red Hat Hacker")
        ];

        this.state = {
            friendSuggestions: this.friendSuggestions
        };

        this.ignoreSuggestion = this.ignoreSuggestion.bind(this);
    }

    // Ignore Suggestion...
    ignoreSuggestion = () => {
        this.setState({
            friendSuggestions: this.friendSuggestions.pop()
        });
    };

    // Friend Suggestions Component...
    friendSuggestionsComp = suggestions => {
        let fSComps = [];
        for (let index = 0; index < suggestions.length; index++) {
            const fSComp = suggestions[index];
            fSComps.push(
                <div
                    className={
                        "suggestion col" +
                        (index === suggestions.length - 1 ? " show" : "")
                    }
                    id={"friendSuggestion" + index}
                    key={index}
                >
                    <div className="user-image row justify-content-center">
                        <div className="col">
                            <div className="image-div">
                                <div
                                    className="userImage"
                                    style={{
                                        backgroundImage: `url(${fSComp.image})`
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="userDetails row">
                        <div className="col">
                            <h5>{fSComp.username}</h5>
                            <h6>
                                <i
                                    className="fa fa-bookmark"
                                    aria-hidden="true"
                                ></i>
                                &nbsp;&nbsp;{fSComp.job}
                            </h6>
                        </div>
                    </div>
                    <div className="folIgn row">
                        <div className="follow col-6">
                            <button>Follow</button>
                        </div>
                        <div className="ignore col-6">
                            <button onClick={this.ignoreSuggestion}>
                                Ignore
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return fSComps;
    };

    render() {
        const competitions = [
            new Competition(
                "Cook Off",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            ),
            new Competition(
                "Cook Off",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            ),
            new Competition(
                "Cook Off",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            ),
            new Competition(
                "Cook Off",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            ),
            new Competition(
                "Cook Off",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            )
        ];

        return (
            <div className="row right-content">
                <div className="col rightContentCol">
                    {this.props.authedUser ? (
                        <div className="uploadPostBtn row">
                            <button onClick={this.props.togglePopUp}>
                                Post Update
                            </button>
                        </div>
                    ) : null}
                    {this.props.authedUser && this.friendSuggestions.length ? (
                        <div className="friend-suggestions-cards row">
                            <div className="col">
                                <div className="suggestions-header row">
                                    <h6>Suggestions</h6>
                                </div>
                                <div className="friend-suggestions row">
                                    {this.friendSuggestionsComp(
                                        this.friendSuggestions
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : null}
                    <CompetitionsList competitions={competitions} />
                </div>
            </div>
        );
    }
}

export default RightContent;
