import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Img from "react-image";
import { Document, Page } from "react-pdf";
import ReactAudioPlayer from "react-audio-player";
import { Player } from "video-react";

import { ClipLoader } from "react-spinners";

import categoryProperties from "./categoryProps";

import "./createPost.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "video-react/dist/video-react.css";

import { createPost, getAllArtistTypes } from "../../../actions/index";

class CreatePostComp extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            isPrivate: false,
            title: "",
            categories: [],
            category: "",
            categoryInput: "",
            rawCategoryInputFile: null,
            categoryInputFiles: [],
            content: "",
            description: "",
            wrongCategoryInput: false,
            submitted: false,
            requestSent: false,
            fetchedArtistTypes: false,
            requestArtistTypes: false
        };

        this.state = this.initialState;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleCheckBox = this.toggleCheckBox.bind(this);
        this.categoryInputs = this.categoryInputs.bind(this);
        this.clearAndToggle = this.clearAndToggle.bind(this);
        this.previewFiles = this.previewFiles.bind(this);
        this.cancelSelection = this.cancelSelection.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    componentDidMount() {
        if (!this.state.requestArtistTypes) {
            this.props.getAllArtistTypes();
            this.setState({ requestArtistTypes: true });
        }
    }

    handleInputChange = e => {
        const { name, value } = e.target;

        this.setState({ [name]: value });

        switch (name) {
            case "category":
                this.setState({
                    categoryInput: "",
                    rawCategoryInputFile: null,
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
    toggleCheckBox = e => {
        const { name } = e.target;
        this.setState({ [name]: !this.state[name] });
    };

    // Handling deafault form Submission...
    handleFormSubmit = e => {
        e.preventDefault();
        this.setState({ submitted: true });

        const {
            isPrivate,
            title,
            category,
            content,
            description,
            rawCategoryInputFile,
            categoryInputFiles
        } = this.state;

        if (title && content && description) {
            let formData = new FormData();
            formData.append("isPrivate", isPrivate);
            formData.append("title", title);
            formData.append("category", category);
            formData.append("content", content);
            formData.append("description", description);
            if (rawCategoryInputFile) {
                formData.append("file", rawCategoryInputFile);
            }
            this.props.createPost(formData);
            this.setState({ requestSent: true });
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
        this.setState({ rawCategoryInputFile: inputFiles[0] });

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
                categoryInput: "",
                rawCategoryInputFile: null
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
        for (let index = 0; index < this.state.categories.length; index++) {
            const category = this.state.categories[index];

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
                        <div className="col-6" key={index}>
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
        const { auth, artistTypes, posts } = this.props;
        if (this.state.requestSent && !posts.isLoading && auth.user) {
            return <Redirect to={"/artist/" + auth.user.name} />;
        }
        if (!this.state.fetchedArtistTypes && artistTypes.artistTypes) {
            this.setState({
                categories: artistTypes.artistTypes,
                category: artistTypes.artistTypes[0],
                fetchedArtistTypes: true
            });
        }
        const {
            isPrivate,
            title,
            category,
            content,
            description,
            submitted,
            requestSent
        } = this.state;

        return (
            <div
                className={
                    "uploadPostPopUP" +
                    (this.props.showPopUp ? " showUploadPostPopUP" : "")
                }
            >
                <form
                    className="row createPostRow justify-content-center"
                    onSubmit={this.handleFormSubmit}
                >
                    <div className="col-6 createPost">
                        <div className="row header justify-content-end">
                            <div className="col">
                                <h6>Post An Update</h6>
                            </div>
                        </div>
                        {requestSent && posts.isLoading ? (
                            <ClipLoader
                                sizeUnit={"rem"}
                                size={10}
                                color={"#123abc"}
                                loading={posts.isLoading}
                                className="loader"
                            />
                        ) : (
                            <React.Fragment>
                                <div className="row body">
                                    <div className="col">
                                        <div className="row isPrivate">
                                            <div className="col is-private">
                                                <input
                                                    className="isPrivateCheck"
                                                    name="isPrivate"
                                                    type="checkbox"
                                                    id="isPrivate"
                                                    checked={isPrivate}
                                                    onChange={
                                                        this.toggleCheckBox
                                                    }
                                                ></input>{" "}
                                                &nbsp;
                                                <label htmlFor="isPrivate">
                                                    <h6>Private</h6>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row title bodyRow">
                                            <div className="col">
                                                <input
                                                    className={
                                                        submitted && !title
                                                            ? "error"
                                                            : ""
                                                    }
                                                    type="text"
                                                    name="title"
                                                    placeholder="Title"
                                                    value={title}
                                                    onChange={
                                                        this.handleInputChange
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="row category bodyRow">
                                            <div className="col">
                                                <select
                                                    className="custom-select"
                                                    name="category"
                                                    value={category}
                                                    onChange={
                                                        this.handleInputChange
                                                    }
                                                >
                                                    <option disabled="disabled">
                                                        --Select Category--
                                                    </option>
                                                    {this.categoryOptions()}
                                                </select>
                                            </div>
                                        </div>
                                        {category &&
                                        category
                                            .replace(/\s/g, "")
                                            .toLowerCase() !== "storywriter" ? (
                                            <div className="row category-inputs bodyRow">
                                                <div className="col">
                                                    {this.categoryInputs()}
                                                </div>
                                            </div>
                                        ) : null}
                                        <div className="row content bodyRow">
                                            <div className="col">
                                                <textarea
                                                    className={
                                                        submitted && !content
                                                            ? " error"
                                                            : ""
                                                    }
                                                    name="content"
                                                    value={content}
                                                    onChange={
                                                        this.handleInputChange
                                                    }
                                                    placeholder="Post Content..."
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="row description bodyRow">
                                            <div className="col">
                                                <textarea
                                                    className={
                                                        submitted &&
                                                        !description
                                                            ? " error"
                                                            : ""
                                                    }
                                                    name="description"
                                                    value={description}
                                                    onChange={
                                                        this.handleInputChange
                                                    }
                                                    placeholder="Description"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row buttons justify-content-center">
                                    <div className="col-4">
                                        <button type="submit">Submit</button>
                                    </div>
                                    <div className="col-4">
                                        <button
                                            type="button"
                                            onClick={this.clearAndToggle}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </form>
            </div>
        );
    }
}

CreatePostComp.propTypes = {
    getAllArtistTypes: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    artistTypes: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    artistTypes: state.artistTypes,
    posts: state.posts
});

export default connect(mapStateToProps, { createPost, getAllArtistTypes })(
    CreatePostComp
);
