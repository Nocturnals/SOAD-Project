import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import JobBrief from "./jobBrief";
import JobDetail from "./jobDetail";

import "./jobPost.css";

class JobPost extends Component {
    render() {
        const { expanded } = this.props;

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
                            <h6 className="title">Job Title</h6>
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
                                Google
                            </h6>
                            <h6 className="child locations">
                                <i
                                    className="fa fa-map-marker"
                                    aria-hidden="true"
                                ></i>{" "}
                                San Fransisco, Canada, France
                            </h6>
                        </div>
                        <div className="row body">
                            <div className="col">
                                <Route
                                    path="/jobs/results/:filters?"
                                    render={props => <JobBrief {...props} />}
                                />
                                <Route
                                    path="/jobs/:job_id/results/"
                                    render={props => <JobDetail {...props} />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default JobPost;
