import React, { Component } from "react";

import Img from "react-image";
import { Document, Page } from "react-pdf";
import ReactAudioPlayer from "react-audio-player";
import { Player } from "video-react";

import { ClipLoader } from "react-spinners";

import categoryProperties from "./categoryProps";

import "./createPost.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "video-react/dist/video-react.css";

class CreatePostComp extends Component {
    constructor(props) {
        super(props);

        this.categories = [
            "Photographer",
            "Painter",
            "VFX Artist",
            "Story Writer",
            "Singer",
            "Dancer",
            "Comedian"
        ];

        this.initialState = {
            title: "",
            category: this.categories[0],
            categoryInput: "",
            categoryInputFiles: [],
            wrongCategoryInput: false,
            description: ""
        };

        this.state = this.initialState;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.categoryInputs = this.categoryInputs.bind(this);
        this.clearAndToggle = this.clearAndToggle.bind(this);
        this.previewFiles = this.previewFiles.bind(this);
        this.cancelSelection = this.cancelSelection.bind(this);
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });

        switch (name) {
            case "category":
                this.setState({
                    categoryInput: "",
                    categoryInputFiles: []
                });
                break;
            case "categoryInput":
                this.previewFiles();
                break;
            default:
                break;
        }
    };

    /**
     *
     *  Functions to preview files submitted
     *
     */
    /** Preview Image */
    previewFiles = () => {
        const inputFiles = document.getElementById("categoryInput").files;
        let inputFilesList = [];
        for (let index = 0; index < inputFiles.length; index++) {
            if (
                inputFiles[index].type.split("/")[0] ===
                categoryProperties(this.state.category).fileType
            ) {
                var oFReader = new FileReader();
                oFReader.readAsDataURL(inputFiles[index]);

                oFReader.onload = oFREvent => {
                    inputFilesList.push(oFREvent.target.result);
                    this.setState({
                        categoryInputFiles: inputFilesList
                    });
                    this.setState({
                        wrongCategoryInput: false
                    });
                };
            } else {
                this.setState({
                    wrongCategoryInput: true
                });
                setTimeout(() => {
                    this.setState({
                        wrongCategoryInput: false
                    });
                }, 5000);
            }
        }
    };
    cancelSelection = index => {
        const selectedFiles = this.state.categoryInputFiles;
        let modifiedFiles = [];
        for (let i = 0; i < selectedFiles.length; i++) {
            if (i !== index) {
                modifiedFiles.push(selectedFiles[i]);
            }
        }
        if (modifiedFiles.length === 0) {
            this.setState({
                categoryInput: ""
            });
        }
        this.setState({
            categoryInputFiles: modifiedFiles
        });
    };

    /**
     *
     *
     */

    // Clear all input fields before closing popup
    clearAndToggle = () => {
        this.setState(this.initialState);
        this.props.togglePopUp();
    };

    // Creating Category Options...
    categoryOptions = () => {
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

    // Creating Inputs for selected Category...
    categoryInputs = () => {
        let filePreview = [];
        switch (this.state.category.replace(/\s/g, "").toLowerCase()) {
            case "photographer":
            case "painter":
                for (
                    let index = 0;
                    index < this.state.categoryInputFiles.length;
                    index++
                ) {
                    filePreview.push(
                        <div className="imageSelected col" key={index}>
                            <Img
                                src={this.state.categoryInputFiles[index]}
                                loader={
                                    <ClipLoader
                                        sizeUnit={"px"}
                                        size={80}
                                        color={"#123abc"}
                                        loading={this.state.loading}
                                    />
                                }
                                className="selectedImage"
                            />
                            <button
                                className="cancelSelection"
                                onClick={() => {
                                    this.cancelSelection(index);
                                }}
                            >
                                <i
                                    className="fa fa-times"
                                    aria-hidden="true"
                                ></i>
                            </button>
                        </div>
                    );
                }
                break;

            case "singer":
                for (
                    let index = 0;
                    index < this.state.categoryInputFiles.length;
                    index++
                ) {
                    filePreview.push(
                        <ReactAudioPlayer
                            src={this.state.categoryInputFiles[index]}
                            controls
                            className="audio"
                        />
                    );
                }
                break;

            case "vfxartist":
            case "dancer":
            case "comedian":
                for (
                    let index = 0;
                    index < this.state.categoryInputFiles.length;
                    index++
                ) {
                    filePreview.push(
                        <div className="col-6">
                            <Player playsInline controls className="video">
                                <source
                                    src={this.state.categoryInputFiles[index]}
                                ></source>
                            </Player>
                        </div>
                    );
                }
                break;

            case "storywriter":
                const pageNumber = 1;
                for (
                    let index = 0;
                    index < this.state.categoryInputFiles.length;
                    index++
                ) {
                    console.log(this.state.categoryInputFiles[index]);

                    filePreview.push(
                        <div className="col" key={index}>
                            <Document
                                file={this.state.categoryInputFiles[index]}
                                className="document"
                            >
                                <Page
                                    wrap
                                    pageNumber={pageNumber}
                                    size="B1"
                                    className="document-page"
                                />
                            </Document>
                        </div>
                    );
                }
                break;

            default:
                break;
        }

        const categoryProps = categoryProperties(this.state.category);

        return (
            <React.Fragment>
                <input
                    type="file"
                    id="categoryInput"
                    accept={
                        categoryProps.fileType + "/" + categoryProps.fileTypeExt
                    }
                    name="categoryInput"
                    value={this.state.categoryInput}
                    onChange={this.handleInputChange}
                    multiple
                    required
                />
                <label htmlFor="categoryInput" className="categoryInputLabel">
                    <i className="fa fa-upload" aria-hidden="true"></i>{" "}
                    {this.state.categoryInputFiles.length !== 0
                        ? " (Click to change the " +
                          categoryProps.fileName +
                          ")"
                        : " Upload " + categoryProps.fileName}
                </label>
                {this.state.wrongCategoryInput ? (
                    <h6 className="fileInputError">
                        Tried to choose wrong type of file
                    </h6>
                ) : null}
                {this.state.categoryInputFiles.length ? (
                    <div className="inputFiles row justify-content-center">
                        {filePreview}
                    </div>
                ) : null}
            </React.Fragment>
        );
    };

    // Rednering
    render() {
        return (
            <div
                className={
                    "uploadPostPopUP" +
                    (this.props.showPopUp ? " showUploadPostPopUP" : "")
                }
            >
                <div className="row createPostRow justify-content-center">
                    <div className="col-6 createPost">
                        <div className="row header justify-content-end">
                            <div className="col">
                                <h6>Post An Update</h6>
                            </div>
                        </div>
                        <div className="row body">
                            <div className="col">
                                <div className="row isPrivate">
                                    <div className="col">
                                        <label htmlFor="isPrivate">
                                            <h6>Private</h6>
                                        </label>
                                        <input
                                            className="isPrivateCheck"
                                            type="checkbox"
                                            id="isPrivate"
                                        ></input>
                                    </div>
                                </div>
                                <div className="row title bodyRow">
                                    <div className="col">
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Title"
                                            value={this.state.title}
                                            onChange={this.handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row category bodyRow">
                                    <div className="col">
                                        <select
                                            className="custom-select"
                                            name="category"
                                            value={this.state.category}
                                            onChange={this.handleInputChange}
                                        >
                                            <option disabled="disabled">
                                                --Select Category--
                                            </option>
                                            {this.categoryOptions()}
                                        </select>
                                    </div>
                                </div>
                                <div className="row category-inputs bodyRow">
                                    <div className="col">
                                        {this.categoryInputs()}
                                    </div>
                                </div>
                                <div className="row description bodyRow">
                                    <div className="col">
                                        <textarea
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.handleInputChange}
                                            placeholder="Description"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row buttons justify-content-center">
                            <div className="col-4">
                                <button>Submit</button>
                            </div>
                            <div className="col-4">
                                <button onClick={this.clearAndToggle}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePostComp;
