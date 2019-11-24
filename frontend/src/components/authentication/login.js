import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions";
import isValidEmail from "../../validation/emailValidation";

import { ClipLoader } from "react-spinners";

class LoginComp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
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
        if (email && isValidEmail(email) && password) {
            this.props.login(email, password);
        }
    }

    render() {
        const { isLoading } = this.props.auth;
        const { email, password, submitted } = this.state;

        return (
            <div className="login_main">
                <form
                    name="form"
                    onSubmit={this.handleSubmit}
                    className="form comp"
                >
                    <h2>LOG IN</h2>
                    <div
                        className={
                            "email" +
                            ((submitted && !email) ||
                            (email && !isValidEmail(email))
                                ? " has-error"
                                : "no-error")
                        }
                    >
                        {/* <label htmlFor="email">Email</label> */}
                        <input
                            type="email"
                            className=""
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            placeholder="Email..."
                            autoComplete="off"
                        />
                        {submitted && !email && (
                            <div className="help-block">Email is required</div>
                        )}
                    </div>
                    <div
                        className={
                            "password" +
                            (submitted && !password ? " has-error" : "")
                        }
                    >
                        {/* <label htmlFor="password">Password</label> */}
                        <input
                            type="password"
                            className=""
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            placeholder="Password..."
                        />
                        {submitted && !password && (
                            <div className="help-block">
                                Password is required
                            </div>
                        )}
                    </div>
                    <div className="form_group">
                        <button className="login_btn" disabled={isLoading}>
                            LOG IN
                        </button>
                        <ClipLoader
                            sizeUnit={"px"}
                            size={150}
                            color={"#123abc"}
                            loading={isLoading}
                        />
                    </div>
                    <div className="reg_btn">
                        Don't have an account?&nbsp;
                        <Link to="/auth/register" className="reg_link">
                            {" "}
                            Register
                        </Link>
                        &nbsp;now
                    </div>
                </form>
                <div className="image comp"></div>
            </div>
        );
    }
}

// specifiying the class to have these objects using propTypes
LoginComp.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    alert: state.alert
});

export default connect(mapStateToProps, { login })(LoginComp);
