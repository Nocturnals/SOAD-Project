import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ResultCard from "./reslutCards/resultCard";

import {
    getUserMatches,
    getCompetitionMatches,
    getOrganisationMatches
} from "../../actions/searchActions/searchActions";

import "./search.css";
import { tsImportEqualsDeclaration } from "@babel/types";

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

        if (name === "searchType") {
            switch (value) {
                case "Users":
                    this.props.getUserMatches(this.state.searchInput);
                    break;
                case "Organisations":
                    this.props.getOrganisationMatches(this.state.searchInput);
                    break;
                case "Competitions":
                    this.props.getCompetitionMatches(this.state.searchInput);
                    break;
                default:
                    break;
            }
        } else {
            switch (this.state.searchType) {
                case "Users":
                    this.props.getUserMatches(value);
                    break;
                case "Organisations":
                    this.props.getOrganisationMatches(value);
                    break;
                case "Competitions":
                    this.props.getCompetitionMatches(value);
                    break;
                default:
                    break;
            }
        }
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

SearchComp.propTypes = {
    getUserMatches: PropTypes.func.isRequired,
    getCompetitionMatches: PropTypes.func.isRequired,
    getOrganisationMatches: PropTypes.func.isRequired,
    searchState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    searchState: state.search
});

export default connect(mapStateToProps, {
    getUserMatches,
    getCompetitionMatches,
    getOrganisationMatches
})(SearchComp);
