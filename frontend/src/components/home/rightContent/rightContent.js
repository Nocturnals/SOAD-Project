import React, { Component } from "react";

import Competition from "../../competitions/competitionClass";

import CompetitionsList from "../../competitions/competitions";

import "./rightContent.css";

class RightContent extends Component {
    render() {
        return (
            <div className="right-content">
                <CompetitionsList competitions={this.props.competitions} />
            </div>
        );
    }
}

export default RightContent;
