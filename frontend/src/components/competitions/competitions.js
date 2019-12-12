import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./competitions.css";

class CompetitionsList extends Component {
    competitionBlocks = competitions => {
        let competitionBlocks = [];
        for (let index = 0; index < competitions.length; index++) {
            const competition = competitions[index];
            competitionBlocks.push(
                <div
                    className="competitionBlock row"
                    id={"competition" + index}
                    key={index}
                >
                    <div className="col">
                        <div className="row">
                            <span className="col-8">
                                <Link
                                    to={"/competitions/" + competition.name}
                                    target="_blank"
                                    style={{ textDecoration: "none" }}
                                >
                                    {competition.name}
                                </Link>
                            </span>
                            <span className="col-4">
                                {competition.starttime
                                    ? competition.starttime.split("T")[0]
                                    : "Start Time"}
                            </span>
                        </div>
                        <div className="descr row">
                            <div className="col">
                                {competition.shortdescription}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return competitionBlocks;
    };

    render() {
        return (
            <div className="competitionsSection row">
                <div className="competitionsList col-12">
                    <div className="header row justify-content-between">
                        <div className="col-4">
                            <h6>Competitions</h6>
                        </div>
                    </div>
                    <div className="competitions row">
                        <div className="col">
                            {this.competitionBlocks(this.props.competitions)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompetitionsList;
