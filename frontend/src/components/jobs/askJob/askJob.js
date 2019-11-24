import React, { Component } from "react";

import Dropzone from "react-dropzone";
import { Document, Page } from "react-pdf";

import { LocationSearchInput } from "../../googleMaps/googleMaps";

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

        this.state = {
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
            startDate: null,
            endDate: null,
            workedAddress: "",
            resume: null,
            resumeName: null,
            showResume: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getLocationInput = this.getLocationInput.bind(this);
        this.getSelectedFile = this.getSelectedFile.bind(this);
        this.showResume = this.showResume.bind(this);
        this.resumeDisplayEventListener = this.resumeDisplayEventListener.bind(
            this
        );

        this.resumeDisplayEventListener();
    }

    // Handling Input change of all inputs...
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
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
                this.setState({
                    resume: oFREvent.target.result,
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
        return (
            <React.Fragment>
                <div className="container askJob">
                    <div className="row header">
                        <div className="col">
                            <h4 className="text">Ask for a Job</h4>
                        </div>
                    </div>
                    <div className="row body">
                        <div className="col-6 column inputs">
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
                                    <input
                                        type="text"
                                        name="legalName"
                                        placeholder="Legal Name*"
                                        onChange={this.handleInputChange}
                                        value={this.state.legalName}
                                    />
                                </div>
                            </div>
                            <div className="row input email">
                                <div className="col">
                                    <input
                                        type="email"
                                        className="email"
                                        placeholder="Email*"
                                        name="email"
                                        onChange={this.handleInputChange}
                                        value={this.state.email}
                                    />
                                </div>
                            </div>
                            <div className="row input address">
                                <div className="col">
                                    <textarea
                                        wrap="off"
                                        className="address"
                                        placeholder="Your Address goes here*"
                                        name="address"
                                        onChange={this.handleInputChange}
                                        value={this.state.address}
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
                                        name="artistType"
                                        onChange={this.handleInputChange}
                                        value={this.state.artistType}
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
                                    <textarea
                                        wrap="on"
                                        className="description"
                                        placeholder="Description*"
                                        name="description"
                                        onChange={this.handleInputChange}
                                        value={this.state.description}
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
                                                    &nbsp;{this.state.location}
                                                </span>
                                            </div>
                                        </div>
                                    ) : null}
                                    <LocationSearchInput
                                        getLocationInput={this.getLocationInput.bind(
                                            this
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="row input availableTime">
                                <div className="col from">
                                    <input
                                        type="text"
                                        className="from"
                                        placeholder="Available From*"
                                        name="fromTime"
                                        onChange={this.handleInputChange}
                                        value={this.state.fromTime}
                                    />
                                </div>
                                <div className="col to">
                                    <input
                                        type="text"
                                        className="to"
                                        placeholder="Available Till*"
                                        name="toTime"
                                        onChange={this.handleInputChange}
                                        value={this.state.toTime}
                                    />
                                </div>
                            </div>
                            <div className="row input website">
                                <div className="col">
                                    <input
                                        type="text"
                                        placeholder="Website"
                                        name="website"
                                        onChange={this.handleInputChange}
                                        value={this.state.website}
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
                                    <input
                                        type="text"
                                        placeholder="Job Title*"
                                        name="prevJobTitle"
                                        onChange={this.handleInputChange}
                                        value={this.state.prevJobTitle}
                                    />
                                </div>
                            </div>
                            <div className="row input prevJobDescription">
                                <div className="col">
                                    <textarea
                                        wrap="on"
                                        placeholder="Description*"
                                        name="prevJobDescription"
                                        onChange={this.handleInputChange}
                                        value={this.state.prevJobDescription}
                                    />
                                </div>
                            </div>
                            <div className="row input workedTime">
                                <div className="col">
                                    <div className="row dateHead">
                                        <h6>Started Date*:</h6>
                                    </div>
                                    <input
                                        type="date"
                                        className="started"
                                        placeholder="Started*"
                                        name="startDate"
                                        onChange={this.handleInputChange}
                                        value={this.state.startDate}
                                    />
                                </div>
                                <div className="col">
                                    <div className="row dateHead">
                                        <h6>Ended Date:</h6>
                                    </div>
                                    <input
                                        type="date"
                                        className="ended"
                                        placeholder="End Date"
                                        name="endDate"
                                        onChange={this.handleInputChange}
                                        value={this.state.endDate}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h6 className="subscript">
                                            *If you don't give any end date,
                                            it'll be considered as you are still
                                            working.
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="row input workedAddress">
                                <div className="col">
                                    <textarea
                                        wrap="off"
                                        className="workedAddress"
                                        placeholder="Your Worked Address goes here*"
                                        name="workedAddress"
                                        onChange={this.handleInputChange}
                                        value={this.state.workedAddress}
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
                                {this.state.resumeName
                                    ? "Selected - " + this.state.resumeName
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
                                                accept="application/pdf"
                                                {...getInputProps()}
                                            />
                                            <p className="dropzone">
                                                <h6 className="text">
                                                    <i
                                                        className="fa fa-upload"
                                                        aria-hidden="true"
                                                    ></i>
                                                    <br></br>
                                                    {this.state.resume
                                                        ? "Click to change the Resume"
                                                        : "Drop Resume Here"}
                                                </h6>
                                            </p>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </div>
                    </div>
                    {/* Submission Buttons */}
                    <div className="row submissionButtons justify-content-center">
                        <div className="col-2">
                            <button className="submit">Submit</button>
                        </div>
                        <div className="col-2">
                            <button className="cancel">Cancel</button>
                        </div>
                    </div>
                </div>
                {this.state.showResume ? (
                    <div className="container-fluid resumeDisplay">
                        <div className="row">
                            <div className="col-6 resumeDoc">
                                <Document
                                    file={this.state.resume}
                                    id="resumeDoc"
                                >
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
