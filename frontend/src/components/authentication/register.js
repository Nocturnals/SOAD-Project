import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { register } from "../../actions";

class RegInputFieldProps {
    constructor(type, class_name, name, placeholder = "", pattern = "") {
        this.type = type;
        this.class_name = class_name;
        this.name = name;
        this.placeholder = placeholder;
        this.pattern = pattern;
    }
}

class RegisterComp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            username: "",
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
        const {
            email,
            password,
            re_password,
            username,
            dateOfBirth
        } = this.state;
        if (email && password && re_password && username && dateOfBirth) {
            this.props.register(email, username, dateOfBirth, password);
        }
    }

    regInputFields = (inputFieldProps, values) => {
        let inputFields = [];

        for (let index = 0; index < inputFieldProps.length; index++) {
            let iF = inputFieldProps[index];

            inputFields.push(
                iF.pattern ? (
                    <input
                        type={iF.type}
                        className={
                            iF.class_name +
                            (this.state.submitted && !values[index]
                                ? " has-error"
                                : " no-error")
                        }
                        name={iF.name}
                        value={values[index]}
                        placeholder={iF.placeholder}
                        onChange={this.handleChange}
                        pattern={iF.pattern}
                        autoComplete="off"
                    />
                ) : (
                    <input
                        type={iF.type}
                        className={iF.class_name}
                        name={iF.name}
                        value={values[index]}
                        placeholder={iF.placeholder}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                )
            );
        }

        return inputFields;
    };

    render() {
        const {
            email,
            username,
            dateOfBirth,
            password,
            re_password,
            submitted
        } = this.state;
        const inputValues = [
            email,
            username,
            dateOfBirth,
            password,
            re_password
        ];

        // if the user is logged in redirect to home page
        if (this.props.auth.isAuthed) {
            console.log(this.props.auth);
            return <Redirect to="/user/home" />;
        }

        const inputFields = [
            new RegInputFieldProps("email", "reg_email", "email", "Email..."),
            new RegInputFieldProps(
                "text",
                "username",
                "username",
                "Username..."
            ),
            new RegInputFieldProps(
                "text",
                "date",
                "dateOfBirth",
                "dd/mm/yyyy",
                "d{2}/d{2}/d{4}"
            ),
            new RegInputFieldProps(
                "password",
                "reg_password",
                "password",
                "Password"
            ),
            new RegInputFieldProps(
                "password",
                "reg_password",
                "re_password",
                "Re-enter Password"
            )
        ];
        const inputs = this.regInputFields(inputFields, inputValues);

        return (
            <div className="register_main">
                <div className="image comp"></div>
                <form
                    name="form"
                    onSubmit={this.handleSubmit}
                    className="form comp"
                >
                    <h2>REGISTER</h2>
                    <div className="reg_inputs container">
                        <div className="row">
                            <div
                                className={
                                    "col-12" +
                                    (submitted && !email
                                        ? " has-error"
                                        : " no-error")
                                }
                            >
                                {inputs[0]}
                            </div>
                        </div>
                        <div className="row">
                            <div
                                className={
                                    "col-7" +
                                    (submitted && !username
                                        ? " has-error"
                                        : " no-error")
                                }
                            >
                                {inputs[1]}
                            </div>
                            <div
                                className={
                                    "col-5" +
                                    (submitted && !dateOfBirth
                                        ? " has-error"
                                        : " no-error")
                                }
                            >
                                {inputs[2]}
                            </div>
                        </div>
                        <div className="row">
                            <div
                                className={
                                    "col-12" +
                                    (submitted && !password
                                        ? " has-error"
                                        : " no-error")
                                }
                            >
                                {inputs[3]}
                            </div>
                        </div>
                        <div className="row">
                            <div
                                className={
                                    "col-12" +
                                    (submitted && !re_password
                                        ? " has-error"
                                        : " no-error")
                                }
                            >
                                {inputs[4]}
                            </div>
                        </div>
                    </div>
                    <div className="reg_btns">
                        <button type="submit">REGISTER</button>
                    </div>
                    <div className="form_group login_btn">
                        Have an account already?&nbsp;
                        <Link to="/auth/login" className="login_link">
                            {" "}
                            LogIn
                        </Link>
                        &nbsp;now
                    </div>
                </form>
            </div>
        );
    }
}

// specifing the proptypes the registercomp should have
RegisterComp.propTypes = {
    auth: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired
};

// mapping the reducer states to register component as props
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { register })(RegisterComp);
