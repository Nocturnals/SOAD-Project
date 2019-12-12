import React, { Component } from "react";

import { Input } from "../../helpers/inputs/styledInputs";
import "./postJobOffer.css";

class PostJobOffer extends Component {
    constructor(props) {
        super(props);

        this.initialInputs = {
            title: ""
        };
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
    artistTypeOptions = () => {};

    render() {
        const { title, submitted } = this.state;

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
            </form>
        );
    }
}

export default PostJobOffer;
