import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, logout } from "../../actions";
import isValidEmail from "../../validation/emailValidation";

class LoginComp extends Component {
    constructor(props) {
        super(props);

        // TODO:: change the logout fuction to redirect to home page when user is logged in
        this.props.logout();

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
                        {isLoading && (
                            <img
                                alt="loading"
                                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                            />
                        )}
                    </div>
                    <div className="reg_btn">
                        Don't have an account?&nbsp;
                        <Link to="/user/register" className="reg_link">
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
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    alert: state.alert
});

export default connect(
    mapStateToProps,
    { login, logout }
)(LoginComp);
