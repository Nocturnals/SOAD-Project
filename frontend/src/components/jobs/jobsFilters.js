import React, { Component } from "react";

class JobsFilters extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.props.handleInputChange;
        this.handleFiltersSubmit = this.props.handleFiltersSubmit;
        this.resetFilterToDefault = this.props.resetFilterToDefault;
    }

    render() {
        const {
            otherJobsSearchInput,
            locationSearchInput,
            qualificationSearchInput,
            jobTypesChecked
        } = this.props;

        return (
            <div className="filters">
                <div className="filtersFix">
                    <h6 className="header">
                        <i className="fa fa-sliders" aria-hidden="true"></i>
                        &nbsp; Filters
                        <button
                            name="resetAllFilters"
                            onClick={this.resetFilterToDefault}
                        >
                            Reset All
                        </button>
                    </h6>
                    <form
                        className="row body"
                        id="filtersForm"
                        onSubmit={this.handleFiltersSubmit}
                    >
                        <div className="col">
                            <div className="row filter searchInterestInput">
                                <div className="col">
                                    <h6>Your Interest?</h6>
                                    <input
                                        className="input"
                                        name="otherJobsSearchInput"
                                        onChange={this.handleInputChange}
                                        value={otherJobsSearchInput}
                                        placeholder="Photography, Painting"
                                    />
                                </div>
                            </div>
                            <div className="row filter searchLocationInput">
                                <div className="col">
                                    <h6>Locations</h6>
                                    <input
                                        className="input"
                                        name="locationSearchInput"
                                        onChange={this.handleInputChange}
                                        value={locationSearchInput}
                                        placeholder="India, USA, Canada"
                                    />
                                </div>
                            </div>
                            <div className="row filter qualificationsInput">
                                <div className="col">
                                    <h6>Qualifications</h6>
                                    <textarea
                                        className="input"
                                        name="qualificationSearchInput"
                                        onChange={this.handleInputChange}
                                        value={qualificationSearchInput}
                                        placeholder="Wildlife Photography, etc"
                                    />
                                </div>
                            </div>
                            <div className="row filter jobType">
                                <div className="col">
                                    <h6>Job Types</h6>
                                    <div className="row">
                                        <div className="col type">
                                            <input
                                                type="checkbox"
                                                value="FULL_TIME"
                                                id="FULL_TIME"
                                                name="jobType"
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                checked={
                                                    jobTypesChecked.FULL_TIME
                                                }
                                            ></input>
                                            <label htmlFor="FULL_TIME">
                                                Full-time
                                            </label>
                                        </div>
                                        <div className="col type">
                                            <input
                                                type="checkbox"
                                                value="PART_TIME"
                                                id="PART_TIME"
                                                name="jobType"
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                checked={
                                                    jobTypesChecked.PART_TIME
                                                }
                                            ></input>
                                            <label htmlFor="PART_TIME">
                                                Part-time
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col type">
                                            <input
                                                type="checkbox"
                                                value="TEMPORAY"
                                                id="TEMPORAY"
                                                name="jobType"
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                checked={
                                                    jobTypesChecked.TEMPORAY
                                                }
                                            ></input>
                                            <label htmlFor="TEMPORAY">
                                                Temporary
                                            </label>
                                        </div>
                                        <div className="col type">
                                            <input
                                                type="checkbox"
                                                value="INTERN"
                                                id="INTERN"
                                                name="jobType"
                                                onChange={
                                                    this.handleInputChange
                                                }
                                                checked={jobTypesChecked.INTERN}
                                            ></input>
                                            <label htmlFor="INTERN">
                                                Intern
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default JobsFilters;
