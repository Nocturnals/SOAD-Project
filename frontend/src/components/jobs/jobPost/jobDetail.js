import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { applyForJob } from "../../../actions/index";

class JobDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayConfirmForm: false,
            applied: false
        };

        this.toggleConfirmDisplay = this.toggleConfirmDisplay.bind(this);
    }

    handleFormSubmit = e => {
        e.preventDefault();

        if (!this.state.applied) {
            this.props.applyForJob(this.props.jobs.currentJob._id);
        }
        this.setState({ displayConfirmForm: false });
    };

    // toggle display Cofirmation Form...
    toggleConfirmDisplay = () => {
        this.setState({ displayConfirmForm: !this.state.displayConfirmForm });
    };

    render() {
        const { jobOffer, jobs, auth } = this.props;

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
                    <button
                        className={
                            "applyButton" +
                            (this.state.displayConfirmForm ? " hide" : "")
                        }
                        onClick={this.toggleConfirmDisplay}
                    >
                        Apply
                    </button>
                    <h6>{jobs.message}</h6>
                    <div
                        className={
                            "row" +
                            (this.state.displayConfirmForm ? "" : " hide")
                        }
                    >
                        <form onSubmit={this.handleFormSubmit}>
                            <button className="applyButton">Confirm</button>
                        </form>
                        <button
                            className="applyButton"
                            onClick={this.toggleConfirmDisplay}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

JobDetail.propTypes = {
    applyForJob: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    jobs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    jobs: state.jobs
});

export default connect(mapStateToProps, { applyForJob })(JobDetail);
