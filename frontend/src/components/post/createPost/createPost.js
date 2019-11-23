import React, { Component } from "react";
import { Document, Page } from "react-pdf";
import Img from "react-image";
import { ClipLoader } from "react-spinners";

import "./createPost.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

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
            categoryReset: false,
            categoryInput: "",
            categoryInputFiles: [],
            description: ""
        };

        this.state = this.initialState;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearAndToggle = this.clearAndToggle.bind(this);
        this.previewImage = this.previewImage.bind(this);
        this.cancelSelection = this.cancelSelection.bind(this);
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        switch (name) {
            case "category":
                this.setState({
                    categoryInput: "",
                    categoryInputFiles: []
                });
                break;
            case "categoryInput":
                this.previewImage();
            default:
                break;
        }
        this.setState({ [name]: value });
    };

    /**
     *
     *  Functions to preview files submitted
     *
     */
    /** Preview Image */
    previewImage = () => {
        const inputFiles = document.getElementById("categoryInput").files;
        let inputFilesList = [];
        for (let index = 0; index < inputFiles.length; index++) {
            var oFReader = new FileReader();
            oFReader.readAsDataURL(inputFiles[index]);

            oFReader.onload = oFREvent => {
                inputFilesList.push(oFREvent.target.result);
                this.setState({
                    categoryInputFiles: inputFilesList
                });
            };
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
        this.setState({
            categoryInputFiles: modifiedFiles
        });
    };

    /**
     *
     *
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
        let fileType = null;
        let fileName = null;
        let filePreview = [];
        switch (this.state.category.replace(/\s/g, "").toLowerCase()) {
            case "photographer":
            case "painter":
                fileType = "image/*";
                fileName = "Images";
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
                                        size={150}
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
                fileType = "audio/*";
                fileName = "Audios";
                break;

            case "vfxartist":
            case "dancer":
            case "comedian":
                fileType = "video/*";
                fileName = "Videos";
                break;

            case "storywriter":
                fileType = ".pdf, .doc, .docx";
                fileName = "Documents(" + fileType + ")";
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
        return (
            <React.Fragment>
                <input
                    type="file"
                    id="categoryInput"
                    accept={fileType}
                    name="categoryInput"
                    value={this.state.categoryInput}
                    onChange={this.handleInputChange}
                    multiple
                    required
                />
                <label htmlFor="categoryInput" className="categoryInputLabel">
                    <i className="fa fa-upload" aria-hidden="true"></i>{" "}
                    {this.state.categoryInputFiles.length !== 0
                        ? " (Click to change the " + fileName + ")"
                        : " Upload " + fileName}
                </label>
                <div className="inputFiles row justify-content-center">
                    {filePreview}
                </div>
            </React.Fragment>
        );
    };

    render() {
        return (
            <div
                className={
                    "uploadPostPopUP" +
                    (this.props.showPopUp ? " showUploadPostPopUP" : "")
                }
            >
                <div className="row createPostRow justify-content-center">
                    <div className="col createPost">
                        <div className="row header justify-content-end">
                            <div className="col">
                                <h6>Post An Update</h6>
                            </div>
                        </div>
                        <div className="row body">
                            <div className="col">
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
