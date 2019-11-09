import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class RegInputFieldProps {
    constructor(type, class_name, name, placeholder = "") {
        this.type = type;
        this.class_name = class_name;
        this.name = name;
        this.placeholder = placeholder;
    }
}

class RegisterComp extends Component {
    constructor(props) {
        super(props);

        // this.props.logout();

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            dateOfBirth: "",
            password: "",
            re_password: "",
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
        }
    }

    regInputFields = (inputFieldProps, values) => {
        let inputFields = [];

        for (let index = 0; index < inputFieldProps.length; index++) {
            let iF = inputFieldProps[index];

            inputFields.push(
                <div className={iF.class_name}>
                    <input
                        type={iF.type}
                        name={iF.name}
                        value={values[index]}
                        placeholder={iF.placeholder}
                        onChange={this.handleChange}
                    />
                </div>
            );
        }

        return inputFields;
    };

    render() {
        const {
            firstName,
            lastName,
            email,
            dateOfBirth,
            password,
            re_password
        } = this.state;
        const inputValues = [
            firstName,
            lastName,
            email,
            dateOfBirth,
            password,
            re_password
        ];

        const inputFields = [
            new RegInputFieldProps(
                "text",
                "username",
                "username",
                "Username..."
            ),
            // new RegInputFieldProps('text', 'name first', 'firstName', 'First Name...'),
            // new RegInputFieldProps('text', 'name last', 'lastName', 'Last Name...'),
            new RegInputFieldProps(
                "email",
                "ed reg_email",
                "email",
                "Email..."
            ),
            // new RegInputFieldProps('text', 'ed date', 'dateOfBirth', 'dd/mm/yyyy'),
            new RegInputFieldProps(
                "password",
                "reg_password",
                "password",
                "Password"
            )
            // new RegInputFieldProps('password', 'password', 're_password', 'Re-enter Password'),
        ];

        return (
            <div className="register_main">
                <div className="image comp"></div>
                <form
                    name="form"
                    onSubmit={this.handleSubmit}
                    className="form comp"
                >
                    <h2>REGISTER</h2>
                    <div className="reg_inputs">
                        {this.regInputFields(inputFields, inputValues)}
                    </div>
                    <div className="reg_btns"></div>
                </form>
            </div>
        );
    }
}

export default RegisterComp;
