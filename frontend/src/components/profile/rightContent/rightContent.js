import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./rightContent.css";

class FriendSuggestion {
    constructor(image, username, job) {
        this.image = image;
        this.username = username;
        this.job = job;
    }
}

class RightContent extends Component {
    friendSuggestionsComp = suggestions => {
        let fSComps = [];
        for (let index = 0; index < suggestions.length; index++) {
            const fSComp = suggestions[index];
            fSComps.push(
                <div
                    className="suggestion col-11"
                    id={"friendSuggestion" + index}
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
                                    class="fa fa-bookmark"
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
                            <button>Ignore</button>
                        </div>
                    </div>
                </div>
            );
        }

        return fSComps;
    };

    render() {
        const image = require("../../media/images/categories/photographer.png");

        const friendSuggestions = [
            new FriendSuggestion(image, "Hrithik", "Assam"),
            new FriendSuggestion(image, "Nikihil", "Data Scientist"),
            new FriendSuggestion(image, "Hemanth", "Game Development"),
            new FriendSuggestion(image, "Vishwanth", "Red Hat Hacker")
        ];

        return (
            <div className="right-content row">
                <div className="col">
                    <div className="uploadPostBtn row">
                        <button onClick={this.props.togglePopUp}>
                            Post Update
                        </button>
                    </div>
                    <div className="friend-suggestions-cards row">
                        <div className="col">
                            <div className="suggestions-header row">
                                <h6>Suggestions</h6>
                            </div>
                            <div className="friend-suggestions row">
                                {this.friendSuggestionsComp(friendSuggestions)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RightContent;
