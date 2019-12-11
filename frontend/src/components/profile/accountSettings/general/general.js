import React, { Component } from "react";

import Img from "react-image";
import { ClipLoader } from "react-spinners";

import "./general.css";

class GeneralSettings extends Component {
    constructor(props) {
        super(props);

        this.postUserImage = require("../../../media/images/categories/photographer.png");
        this.initialState = {
            coverImage: this.postUserImage,
            profileImage: this.postUserImage,
            firstName: "Vishwanth",
            lastName: "Setty",
            emailId: "venkatvishwanth.s17@iiits.in"
        };

        this.state = {
            ...this.initialState,
            edited: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.revertAllChanges = this.revertAllChanges.bind(this);
        this.previewImage = this.previewImage.bind(this);
    }

    // Handling Inputs...
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            edited: true
        });
        switch (name) {
            case "coverImage":
            case "profileImage":
                this.previewImage(name);
                break;

            default:
                this.setState({ [name]: value });
                break;
        }
    };

    // Revert Back all changes...
    revertAllChanges = () => {
        this.setState({
            ...this.initialState,
            edited: false
        });
    };

    // Previewing Images...
    previewImage = name => {
        const inputImage = document.getElementById(name + "Input").files[0];
        var oFReader = new FileReader();
        oFReader.readAsDataURL(inputImage);

        oFReader.onload = oFREvent => {
            this.setState({ [name]: oFREvent.target.result });
        };
    };

    render() {
        return (
            <React.Fragment>
                <div className="row generalSettings">
                    <div className="column-1">
                        {/*
                         **Cover Image
                         */}
                        <div className="row rows">
                            <div
                                className="col coverImage"
                                style={{
                                    backgroundImage: `url(${this.state.coverImage})`
                                }}
                            >
                                <div className="editCoverImage">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="coverImage"
                                        id="coverImageInput"
                                        className="filesInput coverImageInput"
                                        onChange={this.handleInputChange}
                                    />
                                    <label
                                        htmlFor="coverImageInput"
                                        className="coverImageInputLabel"
                                    >
                                        <i
                                            className="fa fa-upload"
                                            aria-hidden="true"
                                        ></i>{" "}
                                        Change Cover Image
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/*
                         **Profile Image
                         */}
                        <div className="row rows justify-content-center">
                            <div className="col-3 profileImage">
                                <div className="imageDiv">
                                    <Img
                                        src={this.state.profileImage}
                                        loader={
                                            <ClipLoader
                                                sizeUnit={"px"}
                                                size={80}
                                                color={"#123abc"}
                                            />
                                        }
                                        className="image"
                                    />
                                </div>
                                <div className="editProfileImage">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="profileImage"
                                        id="profileImageInput"
                                        className="filesInput profileImageInput"
                                        onChange={this.handleInputChange}
                                    />
                                    <label
                                        htmlFor="profileImageInput"
                                        className="profileImageInputLabel"
                                    >
                                        <i
                                            className="fa fa-camera"
                                            aria-hidden="true"
                                        ></i>
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/*
                         *** User Details
                         */}
                        <div className="row userDetails">
                            <div className="col">
                                <div className="row detail userName justify-content-around">
                                    <div className="col-3 header">
                                        <h6>User Name:</h6>
                                    </div>
                                    <div className="col-6">
                                        <input disabled value="Vishwanth" />
                                    </div>
                                </div>
                                <div className="row detail userName justify-content-around">
                                    <div className="col-3 header">
                                        <h6>Full Name:</h6>
                                    </div>
                                    <div className="col-6">
                                        <input
                                            name="firstName"
                                            autoComplete="off"
                                            onChange={this.handleInputChange}
                                            value={this.state.firstName}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 column-2 buttons">
                        <div className="row justify-content-center">
                            <div className="col-2">
                                <button
                                    className={
                                        "save" +
                                        (this.state.edited
                                            ? " button"
                                            : " disabled")
                                    }
                                >
                                    Save Changes
                                </button>
                            </div>
                            <div className="col-2">
                                <button
                                    className="cancel button"
                                    onClick={this.revertAllChanges}
                                >
                                    Cancel Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default GeneralSettings;
