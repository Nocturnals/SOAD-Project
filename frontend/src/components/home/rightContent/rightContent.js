import React, { Component } from "react";

import Competition from "../../competitions/competitionClass";

import CompetitionsList from "../../competitions/competitions";

import "./rightContent.css";

class RightContent extends Component {
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
            <div className="right-content">
                <CompetitionsList competitions={competitions} />
            </div>
        );
    }
}

export default RightContent;
