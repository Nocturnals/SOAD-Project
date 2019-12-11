import React, { Component } from "react";

class JobDetail extends Component {
    render() {
        const { jobOffer } = this.props;
        console.log(jobOffer);

        return (
            <React.Fragment>
                <div className="jobDetail">
                    <div className="row detail qualifications">
                        <div className="col">
                            <h6 className="header">Qualifications:</h6>
                            <div className="row body qualifications">
                                {jobOffer ? jobOffer.qualifications : ""}
                            </div>
                        </div>
                    </div>
                    <div className="row detail aboutJob">
                        <div className="col">
                            <h6 className="header">About the job:</h6>
                            <div className="row body aboutJob">
                                {jobOffer ? jobOffer.descriptionOfJob : ""}
                            </div>
                        </div>
                    </div>
                    <div className="row detail responsibilities">
                        <div className="col">
                            <h6 className="header">Responsibilities:</h6>
                            <div className="row body responsibilities">
                                {jobOffer ? jobOffer.responsibilities : ""}
                            </div>
                        </div>
                    </div>
                    <button className="applyButton">Apply</button>
                </div>
            </React.Fragment>
        );
    }
}

export default JobDetail;
