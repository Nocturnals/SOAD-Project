import React, { Component } from "react";

import ResultCard from "./reslutCards/resultCard";

import "./search.css";

class SearchComp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchType: "Users",
            searchInput: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    // Profile Cards...
    profileCardsComp = cards => {
        let pCards = [];
        for (let index = 0; index < cards.length; index++) {
            pCards.push(<ResultCard userDetails="" />);
        }

        return pCards;
    };

    render() {
        return (
            <div className="search row">
                <div className="col">
                    <div className="searchInputDiv row">
                        <div className="SID col">
                            <div className="header row">
                                <div className="col">
                                    <h3>Search with all convenience...</h3>
                                </div>
                            </div>
                            <div className="inputsRow row justify-content-center">
                                <div className="inputs col-6">
                                    <div className="row">
                                        <div className="searchType col-3">
                                            <select
                                                name="searchType"
                                                onChange={this.handleChange}
                                            >
                                                {/* <option disabled selected value>
                                                    Search In
                                                </option> */}
                                                <option className="option">
                                                    Users
                                                </option>
                                                <option className="option">
                                                    Organisations
                                                </option>
                                                <option className="option">
                                                    Competitions
                                                </option>
                                            </select>
                                        </div>
                                        <div className="searchInput col-9">
                                            <input
                                                type="text"
                                                name="searchInput"
                                                onChange={this.handleChange}
                                                value={this.state.searchInput}
                                                placeholder="Search Here"
                                                autoFocus="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="results row">
                        <div className="resultsDiv col">
                            <div className="row">
                                <div className="header col">
                                    <h4>{this.state.searchType}</h4>
                                </div>
                            </div>
                            <div className="row resultBlocks">
                                {/* <h5>
                                    {this.state.searchText
                                        ? 'No search results found for "' +
                                          this.state.searchText +
                                          '" in ' +
                                          this.state.searchType
                                        : null}
                                </h5> */}
                                <ResultCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchComp;
