import React, { Component } from "react";

import { employment_type } from "../constants";
import { Input, TextArea } from "../../helpers/inputs/styledInputs";
import "./postJobOffer.css";

class PostJobOffer extends Component {
    constructor(props) {
        super(props);

        // Initial Inputs..
        this.initialInputs = {
            title: "",
            workAt: "",
            workDuration: "",
            workTypes: Object.values(employment_type),
            salary: "",
            descriptionOfJob: "",
            qualifications: "",
            responsibilities: ""
        };
        // Initial State...
        this.initialState = {
            ...this.initialInputs,
            submitted: false
        };
        this.state = { ...this.initialState };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
    };

    //  Artist Type Options...
    artistTypeOptions = options => {
        let comps = [];

        for (let index = 0; index < options.length; index++) {
            const option = options[index];
            comps.push(<option value={option}>{option}</option>);
        }

        return comps;
    };

    render() {
        const {
            title,
            workAt,
            workDuration,
            workTypes,
            salary,
            descriptionOfJob,
            qualifications,
            responsibilities,
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
                        <select></select>
                    </div>
                </div>
                <div className="row inputs workAtInput">
                    <div className="col">
                        <Input
                            type="text"
                            placeholder="Location"
                            name="wokAt"
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
                        <select className="workTypes">
                            {this.artistTypeOptions(workTypes)}
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
                            value={descriptionOfJob}
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

export default PostJobOffer;
