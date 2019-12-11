import React, { Component } from "react";

import { Input, TextArea } from "../../helpers/inputs/styledInputs";

import Dropzone from "react-dropzone";
import { Document, Page } from "react-pdf";

import { LocationSearchInput } from "../../googleMaps/googleMaps";

import isValidEmail from "../../../validation/emailValidation";
import "./askJob.css";

class AskJob extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    constructor(props) {
        super(props);

        this.artistTypes = [
            "Photographer",
            "Painter",
            "VFX Artist",
            "Story Writer",
            "Singer",
            "Dancer",
            "Comedian"
        ];

        this.inputs = {
            legalName: "",
            address: "",
            email: "venkatvishwanth.s17@iiits.in",
            artistType: this.artistTypes[0],
            description: "",
            location: "",
            fromTime: "",
            toTime: "",
            website: "",
            prevJobDescription: "",
            prevJobTitle: "",
            startDate: "",
            endDate: "",
            workedAddress: "",
            resume: ""
        };

        this.state = {
            inputs: this.inputs,
            resumeName: null,
            showResume: false,
            submitted: false,
            noOfEmptyFields: 15
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getLocationInput = this.getLocationInput.bind(this);
        this.getSelectedFile = this.getSelectedFile.bind(this);
        this.showResume = this.showResume.bind(this);
        this.resumeDisplayEventListener = this.resumeDisplayEventListener.bind(
            this
        );

        this.resumeDisplayEventListener();
    }

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
            submitted: true,
            noOfEmptyFields: this.countEmptyFields()
        });
        document.body.scrollTo(0, 0);
    };

    // getting Location Input...
    getLocationInput = location => {
        this.setState({
            location: location
        });
    };

    // Handle Dropped File...
    getSelectedFile = acceptedFiles => {
        if (acceptedFiles[0].type.split("/")[1] === "pdf") {
            var oFReader = new FileReader();
            oFReader.readAsDataURL(acceptedFiles[0]);

            oFReader.onload = oFREvent => {
                this.inputs = {
                    ...this.inputs,
                    resume: oFREvent.target.result
                };
                this.setState({
                    inputs: this.inputs,
                    resumeName: acceptedFiles[0].name,
                    showResume: true
                });
            };
        }
    };

    // Show Selected Resume...
    showResume = () => {
        this.setState({
            showResume: true
        });
    };

    // Resume Display Listener...
    resumeDisplayEventListener = () => {
        document.addEventListener("click", event => {
            if (
                !event.target.matches("#resumeDoc") &&
                !event.target.matches("#resumeName")
            ) {
                this.setState({
                    showResume: false
                });
            }
        });
    };

    // Creating Artist Type Options...
    artistTypeOptions = () => {
        let options = [];
        for (let index = 0; index < this.artistTypes.length; index++) {
            const artist = this.artistTypes[index];

            options.push(
                <option value={artist} key={index}>
                    {artist}
                </option>
            );
        }

        return options;
    };

    render() {
        const {
            legalName,
            address,
            email,
            artistType,
            description,
            location,
            fromTime,
            toTime,
            website,
            prevJobTitle,
            prevJobDescription,
            startDate,
            endDate,
            workedAddress,
            resume
        } = this.state.inputs;

        const {
            resumeName,
            showResume,
            submitted,
            noOfEmptyFields
        } = this.state;

        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <div className="container askJob">
                        <div className="row header">
                            <div className="col">
                                <h4 className="text">Ask for a Job</h4>
                            </div>
                        </div>
                        <div className="row body">
                            <div className="col-6 column inputs">
                                {submitted && noOfEmptyFields ? (
                                    <h6 className="mainErrorMsg">
                                        Missing responses for {noOfEmptyFields}{" "}
                                        fields
                                    </h6>
                                ) : null}
                                {/*
                                 *
                                 ******** Contact Details
                                 *
                                 */}
                                <div className="row section">
                                    <h6>Contact Details:</h6>
                                </div>
                                <div className="row input legalName">
                                    <div className="col">
                                        <Input
                                            type="text"
                                            error={
                                                submitted && !legalName
                                                    ? true
                                                    : false
                                            }
                                            name="legalName"
                                            placeholder="Legal Name*"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={legalName}
                                        />
                                    </div>
                                </div>
                                <div className="row input email">
                                    <div className="col">
                                        <Input
                                            type="email"
                                            error={
                                                submitted &&
                                                (!email || !isValidEmail(email))
                                                    ? true
                                                    : false
                                            }
                                            placeholder="Email*"
                                            name="email"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={email}
                                        />
                                    </div>
                                </div>
                                <div className="row input address">
                                    <div className="col">
                                        <TextArea
                                            wrap="off"
                                            error={
                                                submitted && !address
                                                    ? true
                                                    : false
                                            }
                                            placeholder="Your Address goes here*"
                                            name="address"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={address}
                                        />
                                    </div>
                                </div>
                                {/*
                                 *
                                 ******** Job Details
                                 *
                                 */}
                                <div className="row section">
                                    <h6>Job Details:</h6>
                                </div>
                                <div className="row input selectArtistType">
                                    <div className="col">
                                        <select
                                            className="custom-select"
                                            // required
                                            name="artistType"
                                            onChange={this.handleInputChange}
                                            value={artistType}
                                        >
                                            <option disabled="disabled">
                                                --Select Artist Type--
                                            </option>
                                            {this.artistTypeOptions()}
                                        </select>
                                    </div>
                                </div>
                                <div className="row input jobDescription">
                                    <div className="col">
                                        <TextArea
                                            wrap="on"
                                            error={
                                                submitted && !description
                                                    ? true
                                                    : false
                                            }
                                            placeholder="Description*"
                                            name="description"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={description}
                                        />
                                    </div>
                                </div>
                                <div className="row input availableArea">
                                    <div className="col locationSearch">
                                        {this.state.location ? (
                                            <div className="row">
                                                <div className="col locationSelected">
                                                    <i className="fa fa-map-marker"></i>{" "}
                                                    <span>
                                                        &nbsp;
                                                        {location}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : null}
                                        <LocationSearchInput
                                            getLocationInput={this.getLocationInput.bind(
                                                this
                                            )}
                                            submitted={submitted}
                                            location={location}
                                        />
                                    </div>
                                </div>
                                <div className="row input availableTime">
                                    <div className="col from">
                                        <Input
                                            type="text"
                                            error={
                                                submitted && !fromTime
                                                    ? true
                                                    : false
                                            }
                                            placeholder="Available From*"
                                            name="fromTime"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={fromTime}
                                        />
                                    </div>
                                    <div className="col to">
                                        <Input
                                            type="text"
                                            error={
                                                submitted && !toTime
                                                    ? true
                                                    : false
                                            }
                                            placeholder="Available Till*"
                                            name="toTime"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={toTime}
                                        />
                                    </div>
                                </div>
                                <div className="row input website">
                                    <div className="col">
                                        <Input
                                            type="text"
                                            placeholder="Website"
                                            name="website"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={website}
                                        />
                                        <div className="col">
                                            <h6 className="subscript">
                                                *Websites showing your skills
                                                related to the job.
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                {/*
                                 *
                                 ******** Work Experience
                                 *
                                 */}
                                <div className="row section">
                                    <h6>Work Experience:</h6>
                                </div>
                                <div className="row input jobTitle">
                                    <div className="col">
                                        <Input
                                            type="text"
                                            error={
                                                submitted && !prevJobTitle
                                                    ? true
                                                    : false
                                            }
                                            placeholder="Job Title*"
                                            name="prevJobTitle"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={prevJobTitle}
                                        />
                                    </div>
                                </div>
                                <div className="row input prevJobDescription">
                                    <div className="col">
                                        <TextArea
                                            wrap="on"
                                            error={
                                                submitted && !prevJobDescription
                                                    ? true
                                                    : false
                                            }
                                            placeholder="Description*"
                                            name="prevJobDescription"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={prevJobDescription}
                                        />
                                    </div>
                                </div>
                                <div className="row input workedTime">
                                    <div className="col">
                                        <div className="row dateHead">
                                            <h6>Started Date*:</h6>
                                        </div>
                                        <Input
                                            type="date"
                                            error={
                                                submitted && !startDate
                                                    ? true
                                                    : false
                                            }
                                            placeholder="Started*"
                                            name="startDate"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={startDate}
                                        />
                                    </div>
                                    <div className="col">
                                        <div className="row dateHead">
                                            <h6>Ended Date:</h6>
                                        </div>
                                        <Input
                                            type="date"
                                            placeholder="End Date"
                                            name="endDate"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={endDate}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="subscript">
                                                *If you don't give any end date,
                                                it'll be considered as you are
                                                still working.
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="row input workedAddress">
                                    <div className="col">
                                        <TextArea
                                            wrap="off"
                                            error={
                                                submitted && !workedAddress
                                                    ? true
                                                    : false
                                            }
                                            placeholder="Your Worked Address goes here*"
                                            name="workedAddress"
                                            handleInputChange={
                                                this.handleInputChange
                                            }
                                            value={workedAddress}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/*
                             *
                             ******** Resume
                             *
                             */}
                            <div className="col-6 column inputs resume">
                                <div className="row section">
                                    <h6>Resume*</h6>
                                </div>
                                <h6
                                    className="resumeName"
                                    id="resumeName"
                                    onClick={this.showResume}
                                >
                                    {resumeName
                                        ? "Selected - " + resumeName
                                        : null}
                                </h6>
                                <Dropzone
                                    onDrop={acceptedFiles =>
                                        this.getSelectedFile(acceptedFiles)
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input
                                                    {...getInputProps()}
                                                    accept="application/pdf"
                                                    // required
                                                />
                                                <p className="dropzone">
                                                    <span className="text">
                                                        <i
                                                            className="fa fa-upload"
                                                            aria-hidden="true"
                                                        ></i>
                                                        <br></br>
                                                        {this.state.resume
                                                            ? "Click to change the Resume"
                                                            : "Drop Resume Here"}
                                                    </span>
                                                </p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </div>
                        </div>
                        {/* Submission Buttons */}
                        <div className="row submissionButtons justify-content-center">
                            <div className="col-3">
                                <button type="submit" className="submit">
                                    Submit
                                </button>
                            </div>
                            {/* <div className="col-2">
                                <button className="cancel">Cancel</button>
                            </div> */}
                        </div>
                    </div>
                </form>
                {showResume ? (
                    <div className="container-fluid resumeDisplay">
                        <div className="row">
                            <div className="col-6 resumeDoc">
                                <Document file={resume} id="resumeDoc">
                                    <Page wrap pageNumber={1} />
                                </Document>
                            </div>
                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        );
    }
}

export default AskJob;
