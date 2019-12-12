import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { employment_type } from "../constants";
import { Input, TextArea } from "../../helpers/inputs/styledInputs";
import "./postJobOffer.css";

import { getAllArtistTypes, postJobOffer } from "../../../actions/index";

class PostJobOffer extends Component {
    constructor(props) {
        super(props);

        // Initial Inputs..
        this.initialInputs = {
            title: "",
            artistType: this.props.artistTypes
                ? this.props.artistTypes.artistTypes[0]
                : [],
            workAt: "",
            workDuration: "",
            workType: Object.values(employment_type)[0],
            salary: "",
            descriptionOfJob: "",
            qualifications: "",
            responsibilities: ""
        };
        // Initial State...
        this.initialState = {
            ...this.initialInputs,
            workTypes: Object.values(employment_type),
            submitted: false,
            postSuccessFul: false
        };
        this.state = { ...this.initialState };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    componentDidMount() {
        this.props.getAllArtistTypes();
    }

    // Handling Input Change...
    handleInputChange = e => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    };

    // Handling Form ubmission...
    handleFormSubmit = e => {
        e.preventDefault();
        this.setState({ submitted: true });
        if (
            this.state.title &&
            this.state.workAt &&
            this.state.workDuration &&
            this.state.salary &&
            this.state.descriptionOfJob &&
            this.state.qualifications &&
            this.state.responsibilities
        ) {
            const job = {
                title: this.state.title,
                artistType: this.state.artistType,
                workAt: this.state.workAt,
                workDuration: this.state.workDuration,
                workType: this.state.workType,
                salary: this.state.salary,
                descriptionOfJob: this.state.descriptionOfJob,
                qualifications: this.state.qualifications,
                responsibilities: this.state.responsibilities
            };

            this.props.postJobOffer(job);
            if (!this.props.alert.message) {
                this.setState({ postSuccessFul: true });
            }
        }
    };

    //  Artist Type Options...
    selectOptions = options => {
        let comps = [];

        for (let index = 0; index < options.length; index++) {
            const option = options[index];
            comps.push(
                <option value={option} key={index}>
                    {option}
                </option>
            );
        }

        return comps;
    };

    render() {
        const { artistTypes } = this.props;
        const {
            title,
            artistType,
            workAt,
            workDuration,
            workType,
            salary,
            descriptionOfJob,
            qualifications,
            responsibilities,
            workTypes,
            submitted
        } = this.state;

        return (
            <form
                className="container-fluid postJobOffer"
                onSubmit={this.handleFormSubmit}
            >
                <h6 className="header">Post a job offer</h6>
                <div className="row inputs titleInput">
                    <div className="col">
                        <Input
                            type="text"
                            placeholder="Title"
                            name="title"
                            handleInputChange={this.handleInputChange}
                            value={title}
                            error={submitted && !title ? true : false}
                        />
                    </div>
                </div>
                <div className="row inputs titleInput">
                    <div className="col">
                        <select
                            name="artistType"
                            value={artistType}
                            onChange={this.handleInputChange}
                        >
                            {artistTypes && artistTypes.artistTypes
                                ? this.selectOptions(artistTypes.artistTypes)
                                : null}
                        </select>
                    </div>
                </div>
                <div className="row inputs workAtInput">
                    <div className="col">
                        <Input
                            type="text"
                            placeholder="Location"
                            name="workAt"
                            handleInputChange={this.handleInputChange}
                            value={workAt}
                            error={submitted && !workAt ? true : false}
                        />
                    </div>
                </div>
                <div className="row inputs workDurationInput">
                    <div className="col">
                        <Input
                            type="text"
                            placeholder="Work Duration"
                            name="workDuration"
                            handleInputChange={this.handleInputChange}
                            value={workDuration}
                            error={submitted && !workDuration ? true : false}
                        />
                    </div>
                </div>
                <div className="row inputs combineInput">
                    <div className="col">
                        <select
                            className="workTypes"
                            name="workType"
                            onChange={this.handleInputChange}
                            value={workType}
                        >
                            {this.selectOptions(workTypes)}
                        </select>
                    </div>
                    <div className="col">
                        <Input
                            type="text"
                            placeholder="Salary"
                            name="salary"
                            handleInputChange={this.handleInputChange}
                            value={salary}
                            error={submitted && !salary ? true : false}
                        />
                    </div>
                </div>
                <div className="row inputs descriptionOfJobInput">
                    <div className="col">
                        <TextArea
                            placeholder="About the job..."
                            name="descriptionOfJob"
                            handleInputChange={this.handleInputChange}
                            value={descriptionOfJob}
                            error={
                                submitted && !descriptionOfJob ? true : false
                            }
                        />
                    </div>
                </div>
                <div className="row inputs qualificationInput">
                    <div className="col">
                        <TextArea
                            placeholder="Qualifications..."
                            name="qualifications"
                            handleInputChange={this.handleInputChange}
                            value={qualifications}
                            error={submitted && !qualifications ? true : false}
                        />
                    </div>
                </div>
                <div className="row inputs responsibilitiesInput">
                    <div className="col">
                        <TextArea
                            placeholder="Responsibilities..."
                            name="responsibilities"
                            handleInputChange={this.handleInputChange}
                            value={responsibilities}
                            error={
                                submitted && !responsibilities ? true : false
                            }
                        />
                    </div>
                </div>
                <div className="row submissionButtons">
                    <div className="col">
                        <button>Post</button>
                    </div>
                </div>
            </form>
        );
    }
}

PostJobOffer.propTypes = {
    getAllArtistTypes: PropTypes.func.isRequired,
    postJobOffer: PropTypes.func.isRequired,
    artistTypes: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    artistTypes: state.artistTypes,
    alert: state.alert
});

export default connect(mapStateToProps, { getAllArtistTypes, postJobOffer })(
    PostJobOffer
);
