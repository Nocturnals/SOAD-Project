import React, { Component } from "react";

/**
 * Importing Styles for inputs
 */
import "./styledInputs.css";

export class Input extends Component {
    render() {
        const {
            type,
            placeholder,
            className,
            name,
            value,
            handleInputChange,
            error
        } = this.props;

        return (
            <input
                type={type}
                className={
                    "styledInput " + className + (error ? " errorInput" : "")
                }
                placeholder={placeholder}
                name={name}
                onChange={handleInputChange}
                value={value}
            />
        );
    }
}

export class TextArea extends Component {
    render() {
        const {
            wrap,
            placeholder,
            className,
            name,
            value,
            handleInputChange,
            error
        } = this.props;

        return (
            <textarea
                wrap={wrap}
                className={
                    "styledTextArea " + className + (error ? " errorInput" : "")
                }
                placeholder={placeholder}
                name={name}
                onChange={handleInputChange}
                value={value}
            />
        );
    }
}
