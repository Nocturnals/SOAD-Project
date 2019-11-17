import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./rightContent.css";

class Competition {
    constructor(title, descr) {
        this.title = title;
        this.descr = descr;
    }
}

class RightContent extends Component {
    competitionBlocks = competitions => {
        let competitionBlocks = [];
        for (let index = 0; index < competitions.length; index++) {
            const competition = competitions[index];
            competitionBlocks.push(
                <div
                    className="competitionBlock row"
                    id={"competition" + index}
                >
                    <div className="col">
                        <div className="row">
                            <span className="col-8">
                                <Link
                                    to={
                                        "/user/competitions/" +
                                        competition.title
                                    }
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
                <div className="competitionsSection row">
                    <div className="col">
                        <div className="header row justify-content-between">
                            <div className="col-4">
                                <h6>Competitions</h6>
                            </div>
                            <div className="col-2">
                                <button>
                                    <i
                                        className="fa fa-ellipsis-v"
                                        aria-hidden="true"
                                    ></i>
                                </button>
                            </div>
                        </div>
                        <div className="competitions row">
                            <div className="col">
                                {this.competitionBlocks(competitions)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RightContent;
