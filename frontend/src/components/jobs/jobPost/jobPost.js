import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import JobBrief from "./jobBrief";
import JobDetail from "./jobDetail";

import ClipLoader from "react-spinners";
import "./jobPost.css";

import { getJobById } from "../../../actions/index";

class JobPost extends Component {
    constructor(props) {
        super(props);

        this.job_id = this.props.match.params.job_id;
        this.state = {
            fetched: false
        };
    }
    componentDidUpdate() {
        document.body.scrollTo(0, 0);
    }

    render() {
        const { jobs, expanded } = this.props;
        const jobOffer = this.props.jobOffer
            ? this.props.jobOffer
            : jobs.currentJob;

        if (
            !this.props.jobOffer &&
            this.job_id &&
            (!this.state.fetched ||
                this.job_id !== this.props.match.params.job_id)
        ) {
            this.job_id = this.props.match.params.job_id;
            this.props.getJobById(this.job_id);
            this.setState({ fetched: true });
        }

        return (
            <React.Fragment>
                {expanded ? (
                    <Link to="/jobs/results/">Go back to all jobs</Link>
                ) : null}
                <div
                    className={
                        "row jobPost" + (!expanded ? " hover" : " expanded")
                    }
                >
                    <div className="col">
                        <div className="row header justify-content-between">
                            <h6 className="title">
                                {jobOffer ? jobOffer.title : ""}&nbsp;
                                <span className="category">
                                    ({jobOffer ? jobOffer.artistType : ""})
                                </span>
                            </h6>
                            <h6 className="copyJobLink">
                                <i className="fa fa-link"></i>
                            </h6>
                        </div>
                        <div className="row comLoc">
                            <h6 className="child company">
                                <i
                                    className="fa fa-building"
                                    aria-hidden="true"
                                ></i>{" "}
                                {jobOffer ? jobOffer.jobProvider.username : ""}
                            </h6>
                            <h6 className="child locations">
                                <i
                                    className="fa fa-map-marker"
                                    aria-hidden="true"
                                ></i>{" "}
                                {jobOffer ? jobOffer.workAt : ""}
                            </h6>
                            <h6 className="child locations">
                                <i
                                    className="fa fa-map-marker"
                                    aria-hidden="true"
                                ></i>{" "}
                                {jobOffer ? jobOffer.workType : ""}
                            </h6>
                        </div>
                        <div className="row body">
                            <div className="col">
                                <Route
                                    path="/jobs/results/:filters?"
                                    render={props =>
                                        !jobOffer ? (
                                            <ClipLoader
                                                sizeUnit={"px"}
                                                size={80}
                                                color={"#123abc"}
                                                loading={this.state.loading}
                                            />
                                        ) : (
                                            <JobBrief
                                                {...props}
                                                jobOffer={jobOffer}
                                            />
                                        )
                                    }
                                />
                                <Route
                                    path="/jobs/:job_id/results/"
                                    render={props => (
                                        <JobDetail
                                            {...props}
                                            jobOffer={jobOffer}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

JobPost.propTypes = {
    getJobById: PropTypes.func.isRequired,
    jobs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    jobs: state.jobs
});

export default connect(mapStateToProps, { getJobById })(JobPost);
