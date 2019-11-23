import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import "./authentication.css";
import LoginComp from "./login";
import RegisterComp from "./register";

class AuthenticationPage extends Component {
    // After Mounring the Component...
    componentDidMount() {
        document.body.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="auth_page">
                <div className="background"></div>
                <div className="homeLink">
                    <Link to="/">
                        <button className="navTitle">
                            <span className="fname">Artist </span>
                            <span className="lname"> Colab</span>
                        </button>
                    </Link>
                </div>
                <Route exact path="/auth/login" component={LoginComp} />
                <Route exact path="/auth/register" component={RegisterComp} />
            </div>
        );
    }
}

AuthenticationPage.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AuthenticationPage);
