import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./resultCard.css";

class ResultCard extends Component {
    friendSuggestionsComp = suggestions => {
        let resultsComps = [];
        for (let index = 0; index < suggestions.length; index++) {
            const rsComp = suggestions[index];

            resultsComps.push(
                <div className="result col" key={index}>
                    <div className="result-image row justify-content-center">
                        <div className="col">
                            <div className="image-div">
                                <div
                                    className="resultImage"
                                    style={{
                                        backgroundImage: `url(${rsComp.image})`
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="resultDetails row">
                        <div className="col">
                            <h5>{rsComp.name}</h5>
                            <h6>
                                <i
                                    className="fa fa-bookmark"
                                    aria-hidden="true"
                                ></i>
                                &nbsp;&nbsp;{rsComp.descr}
                            </h6>
                        </div>
                    </div>
                    <div className="viewDetails row">
                        <div className="col">
                            <button>View Details</button>
                        </div>
                    </div>
                </div>
            );
        }

        return resultsComps;
    };

    render() {
        const { result, searchIn } = this.props;

        const resultImage = require("../../media/images/categories/photographer.png");

        console.log(result);

        return (
            <div className="result col-2">
                <div className="result-image row justify-content-center">
                    <div className="col">
                        <div className="image-div">
                            <div
                                className="resultImage"
                                style={{
                                    backgroundImage: `url(${resultImage})`
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="resultDetails row">
                    <div className="col">
                        <h5>{result.name}</h5>
                        {/* <h5>Vishwanth</h5> */}
                        <h6>
                            <i
                                className="fa fa-newspaper-o"
                                aria-hidden="true"
                            ></i>
                            &nbsp;&nbsp;
                            {result.descr}
                            {/* Red Hat Hacker */}
                        </h6>
                    </div>
                </div>
                <div className="viewDetails row">
                    <div className="col">
                        <Link
                            to={
                                searchIn === "Users"
                                    ? "/artist/" + result.name
                                    : searchIn === "Organisations"
                                    ? "/artists/" + result.name
                                    : searchIn === "Competitions"
                                    ? "/competitions/" + result.name
                                    : null
                            }
                        >
                            <button>View Details</button>
                        </Link>
                        {/* <Link to={"/artist/Vishwanth"}>
                            <button>View Details</button>
                        </Link> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default ResultCard;
