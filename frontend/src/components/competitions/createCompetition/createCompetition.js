import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**
 * Actions...
 */
import { createCompetition } from "../../../actions";

import Img from "react-image";
import Loader from "react-loader";

import NavBar from "../../nav bar/navBar";
import { Input, TextArea } from "../../helpers/inputs/styledInputs";
import LoadingComp from "../../helpers/loader/loader";

import "./createCompetition.css";

class CreateCompetition extends Component {
    constructor(props) {
        super(props);

        this.categories = [
            "Photography",
            "Paint",
            "VFX Art",
            "Story Writing",
            "Singing",
            "Dancing",
            "Comedy"
        ];
        this.poster = require("../../media/images/categories/photographer.png");

        this.inputs = {
            category: this.categories[0],
            title: "",
            awards: "",
            startTime: "",
            endTime: "",
            bDescription: "",
            dDescription: "",
            rules: ""
        };
        this.state = {
            inputs: this.inputs,
            submitted: false,
            showPreview: false,
            enableSubmission: false,
            confirmSubmission: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.enableSubmission = this.enableSubmission.bind(this);
        this.goBackToEdit = this.goBackToEdit.bind(this);
    }

    // Enabling Submission...
    enableSubmission = () => {
        this.setState({
            showPreview: false,
            enableSubmission: true
        });
    };
    // Go back to edit content...
    goBackToEdit = () => {
        this.setState({
            showPreview: false
        });
    };

    // Counting Empty Input Fields...
    countEmptyFields = () => {
        let count = 0;
        for (const input of Object.values(this.state.inputs)) {
            if (!input) {
                count += 1;
            }
        }

        return count;
    };

    // Handling Input change of all inputs...
    handleInputChange = e => {
        const { name, value } = e.target;
        this.inputs = { ...this.inputs, [name]: value };
        this.setState({ inputs: this.inputs });
    };

    // Handling Default Submission...
    handleSubmit = e => {
        e.preventDefault();

        this.setState({
            submitted: true
        });
        const {
            category,
            title,
            awards,
            startTime,
            endTime,
            bDescription,
            dDescription,
            rules
        } = this.state.inputs;

        if (
            category &&
            title &&
            awards &&
            startTime &&
            endTime &&
            bDescription.length >= 50 &&
            dDescription.length >= 500 &&
            rules.length >= 250
        ) {
            if (this.state.enableSubmission) {
                this.setState({
                    confirmSubmission: true
                });
                this.props.createCompetition({
                    ...this.state.inputs
                });
            } else {
                this.setState({
                    showPreview: true
                });
            }
        }
        document.body.scrollTo(0, 0);
    };

    // Creating Category Type Options...
    categoryTypeOptions = () => {
        let options = [];
        for (let index = 0; index < this.categories.length; index++) {
            const category = this.categories[index];

            options.push(
                <option value={category} key={index}>
                    {category}
                </option>
            );
        }

        return options;
    };

    render() {
        const {
            category,
            title,
            awards,
            startTime,
            endTime,
            bDescription,
            dDescription,
            rules
        } = this.state.inputs;

        const {
            submitted,
            showPreview,
            enableSubmission,
            confirmSubmission
        } = this.state;

        if (!this.props.competitions.isLoading && confirmSubmission) {
            return <Redirect to={"/competitions/" + title} />;
        }

        return (
            <React.Fragment>
                {this.props.competitions.isLoading ? <LoadingComp /> : null}
                <NavBar />
                <form onSubmit={this.handleSubmit}>
                    <div className="container-fluid createCompetition">
                        <div className="row row-1">
                            <div className="col">
                                <h3 className="mainHeader">
                                    Create Competition
                                </h3>
                            </div>
                        </div>
                        <div className="row row-2">
                            <div className="col poster"></div>
                            <div className="col inputs">
                                <div className="row input category">
                                    <div className="col">
                                        <select
                                            className="custom-select"
                                            name="category"
                                            onChange={this.handleInputChange}
                                            value={category}
                                        >
                                            <option disabled="disabled">
                                                Category*
                                            </option>
                                            {this.categoryTypeOptions()}
                                        </select>
                                    </div>
                                </div>
                                <div className="row input title">
                                    <div className="col">
                                        <Input
                                            type="text"
                                            error={
                                                submitted && !title
                                                    ? true
                                                    : false
                                            }
                                            placeholder="Competition Title*"
                                            name="title"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={title}
                                        />
                                    </div>
                                </div>
                                <div className="row input shortDescription">
                                    <div className="col">
                                        <TextArea
                                            error={
                                                submitted &&
                                                bDescription.length <= 50
                                                    ? true
                                                    : false
                                            }
                                            placeholder="Brief Description*"
                                            name="bDescription"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={bDescription}
                                        />
                                    </div>
                                </div>
                                <div className="row input prizes">
                                    <div className="col prize">
                                        <TextArea
                                            error={
                                                submitted && !awards
                                                    ? true
                                                    : false
                                            }
                                            placeholder="Awards*"
                                            name="awards"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={awards}
                                        />
                                    </div>
                                </div>
                                <div className="row input startTime justify-content-center">
                                    <div className="col-3">
                                        <h6 className="header">Start Time*</h6>
                                    </div>
                                    <div className="col-6">
                                        <Input
                                            type="datetime-local"
                                            error={
                                                submitted && !startTime
                                                    ? true
                                                    : false
                                            }
                                            name="startTime"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={startTime}
                                        />
                                    </div>
                                </div>
                                <div className="row input endTime justify-content-center">
                                    <div className="col-3">
                                        <h6 className="header">End Time*</h6>
                                    </div>
                                    <div className="col-6">
                                        <Input
                                            type="datetime-local"
                                            error={
                                                submitted && !endTime
                                                    ? true
                                                    : false
                                            }
                                            name="endTime"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={endTime}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row description">
                            <div className="col">
                                <TextArea
                                    placeholder="Detailed Description*"
                                    className="largeTextArea"
                                    error={
                                        submitted && dDescription.length <= 500
                                            ? true
                                            : false
                                    }
                                    name="dDescription"
                                    handleInputChange={this.handleInputChange}
                                    value={dDescription}
                                />
                            </div>
                        </div>
                        <div className="row description">
                            <div className="col">
                                <TextArea
                                    placeholder="Rules and Regulations*"
                                    className="largeTextArea"
                                    error={
                                        submitted && rules.length <= 200
                                            ? true
                                            : false
                                    }
                                    name="rules"
                                    handleInputChange={this.handleInputChange}
                                    value={rules}
                                />
                            </div>
                        </div>
                        <div className="row submissionButton">
                            <div className="col">
                                <button type="submit">
                                    Create Competition
                                </button>
                                {enableSubmission ? (
                                    <h6>
                                        Click above button to finally host the
                                        Competition
                                    </h6>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </form>
                {/* Preview */}
                <div
                    className={
                        "previewCompetitionForm" +
                        (!showPreview ? " hidePreview" : "")
                    }
                >
                    <div className="container-fluid form">
                        <div className="row title">
                            <div className="col">
                                <h4>{title}</h4>
                                <h6>({category})</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h6 className="bDescription">{bDescription}</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Img src={this.poster} className="poster" />
                            </div>
                            <div className="col timeBound">
                                <div className="row">
                                    <div className="col-5 time">
                                        <h6>Start Time :- </h6>
                                    </div>
                                    <div className="col-6 time">
                                        <h6>
                                            {" "}
                                            {startTime.split("T")[0] +
                                                " | " +
                                                startTime.split("T")[1]}
                                        </h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-5 time">
                                        <h6>End Time :- </h6>
                                    </div>
                                    <div className="col-6 time">
                                        <h6>
                                            {" "}
                                            {endTime.split("T")[0] +
                                                " | " +
                                                endTime.split("T")[1]}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h6 className="header">
                                    Detailed Description:
                                </h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col dDescription">
                                {dDescription}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h6 className="header">Rules:</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col rules">{rules}</div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h6 className="header">Awards:</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col awards">{awards}</div>
                        </div>
                        <div className="row confirmation">
                            <div className="col">
                                <h6>Evertything looks good?</h6>
                                <button
                                    className="ok"
                                    onClick={this.enableSubmission}
                                >
                                    Yes, Proceed furthur
                                </button>
                                <button
                                    className="no"
                                    onClick={this.goBackToEdit}
                                >
                                    No, Changes needed
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

CreateCompetition.propTypes = {
    createCompetition: PropTypes.func.isRequired,
    competitions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    competitions: state.competitions
});

export default connect(mapStateToProps, { createCompetition })(
    CreateCompetition
);
