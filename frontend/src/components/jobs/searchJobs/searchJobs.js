import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

import NavBar from "../../nav bar/navBar";
import JobPost from "../jobPost/jobPost";
import JobsFilters from "../jobsFilters";

import { jobStatusConst, employment_type } from "../constants";

import { ClipLoader } from "react-spinners";
import "./searchJobs.css";

import { getFilteredJobs } from "../../../actions/index";

const qs = require("query-string");

class SearchJobs extends Component {
    constructor(props) {
        super(props);

        this.formData = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        });

        // Sorting and Filtering
        this.myJobsSorts = ["Application Status", "Date Applied"];
        this.sortByApplStatTypes = ["doc", "dco", "odc", "ocd", "cod", "cdo"];
        this.jobTypes = [
            employment_type.PART_TIME,
            employment_type.FULL_TIME,
            employment_type.TEMPORARY,
            employment_type.INTERN
        ];
        this.initJobTypesChecked = {
            FULL_TIME: true,
            PART_TIME: true,
            TEMPORARY: true,
            INTERN: true
        };
        this.jobTypesChecked = this.formData.jobType
            ? {
                  FULL_TIME: this.formData.jobType.includes(
                      employment_type.FULL_TIME
                  )
                      ? true
                      : false,
                  PART_TIME: this.formData.jobType.includes(
                      employment_type.PART_TIME
                  )
                      ? true
                      : false,
                  TEMPORARY: this.formData.jobType.includes(
                      employment_type.TEMPORARY
                  )
                      ? true
                      : false,
                  INTERN: this.formData.jobType.includes(employment_type.INTERN)
                      ? true
                      : false
              }
            : this.initJobTypesChecked;

        // Default Filters...
        this.defaultFilters = {
            interest: this.formData.interest ? this.formData.interest : "",
            locationSearchInput: this.formData.locationSearchInput
                ? this.formData.locationSearchInput
                : "",
            jobType: this.formData.jobType
                ? typeof this.formData.jobType === "string"
                    ? [this.formData.jobType]
                    : this.formData.jobType
                : this.jobTypes,
            jobTypesChecked: this.jobTypesChecked
        };

        // Component State...
        this.state = {
            getFilteredJobsFetched: false,
            sortMyJobs: this.myJobsSorts[0],
            sortByApplStatType: 0,
            showMyJobsSortDD: false,
            ...this.defaultFilters,
            scrolledDown: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFiltersSubmit = this.handleFiltersSubmit.bind(this);
        this.toggleMyJobsSortDD = this.toggleMyJobsSortDD.bind(this);
        this.toggleCheckBox = this.toggleCheckBox.bind(this);
        this.resetFilterToDefault = this.resetFilterToDefault.bind(this);
    }
    componentDidMount() {
        // Fetch Interested Jobs if not fetched before...
        const options = {
            artistType: this.state.interest,
            workAt: this.state.locationSearchInput,
            workTypes: this.state.jobType
        };
        this.props.getFilteredJobs({ options });
        this.setState({ getFilteredJobsFetched: true });
    }

    // Handling Inputs Change...
    handleInputChange = e => {
        const { name, value } = e.target;
        if (name === "jobType") {
            this.toggleCheckBox(e);
            if (this.state.jobType.includes(value)) {
                this.setState({
                    [name]: this.state.jobType.filter(x => x !== value)
                });
            } else {
                this.setState({
                    [name]: [...this.state.jobType, value]
                });
            }
        } else {
            this.setState({ [name]: value });
        }

        if (name === "interest") {
            document.body.scrollTo(0, 0);
        }
        if (name === "sortMyJobs") {
            this.toggleMyJobsSortDD();
            if (value === "Application Status") {
                this.setState({
                    sortByApplStatType: (this.state.sortByApplStatType + 1) % 6
                });
            }
            document.getElementById("myJobs").scrollTo(0, 0);
        }
    };

    // Show My Jobs Sort Types Dropdown...
    toggleMyJobsSortDD = () => {
        this.setState({
            showMyJobsSortDD: !this.state.showMyJobsSortDD
        });
    };

    // Toggling CheckBoxes...
    toggleCheckBox = e => {
        this.setState({
            jobTypesChecked: {
                ...this.state.jobTypesChecked,
                [e.target.value]: !this.state.jobTypesChecked[e.target.value]
            }
        });
        setTimeout(() => {
            document.getElementsByTagName("form")[0].submit();
        }, 500);
    };

    // Reset Filters...
    resetFilterToDefault = e => {
        e.preventDefault();
        this.setState({
            ...this.state,
            ...this.initInputs,
            jobType: this.jobTypes,
            jobTypesChecked: this.initJobTypesChecked
        });

        setTimeout(() => {
            document.getElementsByTagName("form")[0].submit();
        }, 500);
    };
    handleFiltersSubmit = e => {
        e.preventDefault();

        setTimeout(() => {
            document.getElementsByTagName("form")[0].submit();
        }, 500);
    };

    // My Jobs Sort Types...
    sortTypesDropDown = () => {
        let comp = [];
        for (let index = 0; index < this.myJobsSorts.length; index++) {
            const sort = this.myJobsSorts[index];
            comp.push(
                <button
                    name="sortMyJobs"
                    value={sort}
                    onClick={this.handleInputChange}
                    key={index}
                >
                    {sort}
                </button>
            );
        }

        return comp;
    };

    // Displaying My Jobs...
    displayMyJobs = myJobs => {
        let jobsComps = [];
        const jobs = this.sortByApplStatus(myJobs);

        for (let index = 0; index < jobs.length; index++) {
            const job = jobs[index];
            let jobStatus = <i></i>;

            switch (job.status) {
                case jobStatusConst.DONE:
                    jobStatus = <i className="fa fa-check"></i>;
                    break;
                case jobStatusConst.WORKING:
                case jobStatusConst.PENDING:
                    jobStatus = <i className="fa fa-spinner fa-spin"></i>;
                    break;
                case jobStatusConst.CANCELLED:
                    jobStatus = <i className="fa fa-times"></i>;
                    break;
                default:
                    jobStatus = <i></i>;
                    break;
            }

            jobsComps.push(
                <React.Fragment key={index}>
                    <Link
                        to={"/jobs/" + job._id + "/results"}
                        style={{ textDecoration: "none" }}
                    >
                        <div className="row job">
                            <div className="col jobHeader">
                                <div className="row heading justify-content-between">
                                    <h6 className="title">
                                        {jobStatus} &nbsp;
                                        {job.title} ({job.artistType})
                                    </h6>
                                </div>
                            </div>
                            <div className="col-12 descr">
                                <div className="row">
                                    <h6 className="details">
                                        Offered By:
                                        <span className="sub">
                                            {job.jobProvider.username}
                                        </span>
                                    </h6>
                                </div>
                                <div className="row">
                                    <h6 className="details">
                                        Salary:
                                        <span className="sub">
                                            {job.salary
                                                ? job.salary + " Rs"
                                                : "Unpaid"}
                                        </span>
                                    </h6>
                                </div>
                                <div className="row">
                                    <h6 className="details">
                                        Status:
                                        <span className="sub">
                                            {job.status}
                                        </span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </Link>
                </React.Fragment>
            );
        }

        return jobsComps;
    };
    sortByApplStatus = myJobs => {
        let jobsDone = [];
        let jobsCancelled = [];
        let jobsWorking = [];
        let jobsPending = [];

        for (let index = 0; index < myJobs.length; index++) {
            const job = myJobs[index];
            switch (job.status) {
                case jobStatusConst.DONE:
                    jobsDone.push(job);
                    break;
                case jobStatusConst.WORKING:
                    jobsWorking.push(job);
                    break;
                case jobStatusConst.CANCELLED:
                    jobsCancelled.push(job);
                    break;
                case jobStatusConst.PENDING:
                    jobsPending.push(job);
                default:
                    break;
            }
        }

        switch (this.sortByApplStatTypes[this.state.sortByApplStatType]) {
            case "odc":
                return jobsPending.concat(jobsWorking, jobsDone, jobsCancelled);
            case "ocd":
                return jobsPending.concat(jobsWorking, jobsCancelled, jobsDone);
            case "doc":
                return jobsPending.concat(jobsDone, jobsWorking, jobsCancelled);
            case "dco":
                return jobsPending.concat(jobsDone, jobsCancelled, jobsWorking);
            case "cod":
                return jobsPending.concat(jobsCancelled, jobsWorking, jobsDone);
            case "cdo":
                return jobsPending.concat(jobsCancelled, jobsDone, jobsWorking);
            default:
                break;
        }
    };

    // Displaying Job Offers related to user...
    displayRelatedJobOffers = (jobOffers, props) => {
        let comps = [];

        for (let index = 0; index < jobOffers.length; index++) {
            const job = jobOffers[index];

            comps.push(<JobPost {...props} jobOffer={job} key={index} />);
        }

        return comps;
    };

    render() {
        const { auth, jobs } = this.props;

        // State Variables...
        const {
            sortMyJobs,
            showMyJobsSortDD,
            interest,
            locationSearchInput,
            jobTypesChecked
        } = this.state;

        // Return Statement...
        return (
            <React.Fragment>
                <NavBar contract={true} />
                <div className="container-fluid">
                    <div className="row jobsSearch">
                        {/* Jobs User Connected To */}
                        {auth.isAuthed ? (
                            <div className="myJobs">
                                <div className="jobs" id="myJobs">
                                    <div className="row searchYourJobs">
                                        <div className="col">
                                            <div className="row sortInput">
                                                <h6>Sort By:</h6>
                                                <input
                                                    readOnly="readonly"
                                                    value={sortMyJobs}
                                                    onClick={
                                                        this.toggleMyJobsSortDD
                                                    }
                                                />
                                            </div>
                                            <div
                                                className={
                                                    "sorts" +
                                                    (!showMyJobsSortDD
                                                        ? " hide"
                                                        : "")
                                                }
                                            >
                                                <div className="sortsDropDown">
                                                    {this.sortTypesDropDown()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row jobStat jobsDone">
                                        <div className="col">
                                            <h6 className="header">
                                                Jobs you applied:
                                            </h6>
                                            {!auth.user ? (
                                                <ClipLoader />
                                            ) : (
                                                this.displayMyJobs(
                                                    auth.user.jobsApplied
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div className="row jobStat jobsDone">
                                        <div className="col">
                                            <h6 className="header">
                                                Jobs you offered:
                                            </h6>
                                            {!auth.user ? (
                                                <ClipLoader />
                                            ) : (
                                                this.displayMyJobs(
                                                    auth.user.jobsOffered
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {/* All Jobs Available Right Now */}
                        <div className="col otherJobs">
                            <div className="row">
                                <Route
                                    path="/jobs/results/:filters?"
                                    render={props => (
                                        <JobsFilters
                                            {...props}
                                            interest={interest}
                                            locationSearchInput={
                                                locationSearchInput
                                            }
                                            jobTypesChecked={jobTypesChecked}
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            handleFiltersSubmit={
                                                this.handleFiltersSubmit
                                            }
                                            resetFilterToDefault={
                                                this.resetFilterToDefault
                                            }
                                        />
                                    )}
                                />
                                {/* Job Posts */}
                                <div className="col">
                                    <div className="row filteredPosts">
                                        <div className="col">
                                            <div className="row body">
                                                <div className="col">
                                                    <div className="posts">
                                                        <Route
                                                            path="/jobs/results/:filters?"
                                                            render={props =>
                                                                jobs.isLoading &&
                                                                jobs.filteredJobs ? (
                                                                    <ClipLoader
                                                                        sizeUnit={
                                                                            "px"
                                                                        }
                                                                        size={
                                                                            80
                                                                        }
                                                                        color={
                                                                            "#123abc"
                                                                        }
                                                                        loading={
                                                                            this
                                                                                .state
                                                                                .loading
                                                                        }
                                                                    />
                                                                ) : (
                                                                    this.displayRelatedJobOffers(
                                                                        jobs.filteredJobs,
                                                                        props
                                                                    )
                                                                )
                                                            }
                                                        />
                                                        <Route
                                                            path="/jobs/:job_id/results/"
                                                            render={props => (
                                                                <JobPost
                                                                    {...props}
                                                                    expanded={
                                                                        true
                                                                    }
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

SearchJobs.propTypes = {
    getFilteredJobs: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    jobs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    jobs: state.jobs
});

export default connect(mapStateToProps, { getFilteredJobs })(SearchJobs);
