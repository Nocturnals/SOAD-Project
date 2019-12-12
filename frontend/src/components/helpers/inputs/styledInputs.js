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
            autoComplete,
            className,
            id,
            name,
            value,
            disabled,
            handleInputChange,
            onClick,
            error
        } = this.props;

        return (
            <input
                type={type}
                className={
                    "styledInput " + className + (error ? " errorInput" : "")
                }
                id={id}
                autoComplete={autoComplete}
                placeholder={placeholder}
                name={name}
                onChange={handleInputChange}
                onClick={onClick}
                value={value}
                disabled={disabled}
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
