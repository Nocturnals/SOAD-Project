import React, { Component } from "react";

import "./createPost.css";

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

        this.state = {
            category: ""
        };

        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    handleCategoryChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    // Creating Category Options...
    categoryOptions = () => {
        let options = [];
        for (let index = 0; index < this.categories.length; index++) {
            const category = this.categories[index];

            options.push(<option value={category}>{category}</option>);
        }

        return options;
    };

    // Creating Inputs for selected Category...
    categoryInputs = () => {
        let inputs = [];
        switch (this.state.category.replace(/\s/g, "").toLowerCase()) {
            case "photographer":
            case "painter":
                inputs.push(
                    <input
                        type="file"
                        accept="image/*"
                        name={this.state.category.toLowerCase()}
                        required
                    />
                );
                break;

            case "singer":
                inputs.push(
                    <input
                        type="file"
                        accept="audio/*"
                        name={this.state.category.toLowerCase()}
                        required
                    />
                );
                break;

            case "vfxartist":
            case "dancer":
            case "comedian":
                inputs.push(
                    <input
                        type="file"
                        accept="video/*"
                        name={this.state.category.toLowerCase()}
                        required
                    />
                );
                break;

            case "storywriter":
                inputs.push(
                    <textarea
                        name="story"
                        placeholder="Your Story goes here"
                        required
                    ></textarea>
                );
                break;

            default:
                break;
        }
        return inputs;
    };

    render() {
        return (
            <div className="row createPostRow justify-content-center">
                <div className="col-6 createPost">
                    <div className="row header">
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
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row category bodyRow">
                                <div className="col">
                                    <select
                                        class="custom-select"
                                        name="category"
                                        onChange={this.handleCategoryChange}
                                    >
                                        <option no value>
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
                                <div class="col">
                                    <textarea placeholder="Description"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row buttons justify-content-center">
                        <div className="col-4">
                            <button>Submit</button>
                        </div>
                        <div className="col-4">
                            <button>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePostComp;
