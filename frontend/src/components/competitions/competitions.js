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
                                    to={"/competitions/" + competition.title}
                                    target="_blank"
                                    style={{ textDecoration: "none" }}
                                >
                                    {competition.title}
                                </Link>
                            </span>
                            <span className="col-4">21:10:50</span>
                        </div>
                        <div className="descr row">
                            <div className="col">{competition.descr}</div>
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
