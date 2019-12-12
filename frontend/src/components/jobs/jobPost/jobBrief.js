import React, { Component } from "react";
import { Link } from "react-router-dom";

class JobBrief extends Component {
    render() {
        const { jobOffer } = this.props;

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                        <h6 className="header">Offered By:</h6>
                        <div className="row body qualifications">
                            {jobOffer.jobProvider.username}
                        </div>
                    </div>
                    <div className="col">
                        <h6 className="header">Salary:</h6>
                        <div className="row body qualifications">
                            {jobOffer.salary}
                        </div>
                    </div>
                    <div className="col">
                        <h6 className="header">Duration:</h6>
                        <div className="row body qualifications">
                            {jobOffer.workDuration}
                        </div>
                    </div>
                </div>
                <Link to={"/jobs/" + jobOffer._id + "/results/"}>
                    <button className="expandJob">Expand</button>
                </Link>
            </React.Fragment>
        );
    }
}

export default JobBrief;
