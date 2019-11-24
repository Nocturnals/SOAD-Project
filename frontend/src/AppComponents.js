import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LandingPage from "./components/landing page/landing_page";
import AuthenticationPage from "./components/authentication/authentication";
import PasswordResetComp from "./components/authentication/passwordReset/passwordReset";
import Competition from "./components/competitions/competition";
import HomePage from "./components/home/home";
import SearchComp from "./components/search/search";
import ProfilePage from "./components/profile/profile";
import AccountSettingsComp from "./components/profile/accountSettings/accountSettings";
import Jobs from "./components/jobs/jobs";

class MainAppComponents extends Component {
    render() {
        const AuthenticatedRoute = ({ component: Component, ...rest }) => (
            <Route
                exact
                {...rest}
                render={props =>
                    localStorage.getItem("userToken") ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/auth/login",
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        );
        const NotAuthenticatedRoute = ({ component: Component, ...rest }) => (
            <Route
                exact
                {...rest}
                render={props =>
                    !localStorage.getItem("userToken") ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/feed",
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        );

        return (
            <Router>
                <Switch>
                    <React.Fragment>
                        {/* Displaying Error Messages */}
                        {this.props.alert.message ? (
                            <div class="alert alert-danger" role="alert">
                                {this.props.alert.message}
                            </div>
                        ) : null}

                        {/* Landing Page */}
                        <NotAuthenticatedRoute
                            path="/"
                            component={LandingPage}
                        />

                        {/* Login and Register Pages */}
                        <NotAuthenticatedRoute
                            path="/auth/:type"
                            component={AuthenticationPage}
                        />

                        {/* Home Page (After Login) */}
                        <AuthenticatedRoute path="/feed" component={HomePage} />

                        {/* Profile Page */}
                        <Route
                            exact
                            path="/artist/:username"
                            component={ProfilePage}
                        />
                        {/* Account Settings */}
                        <AuthenticatedRoute
                            path="/user-account-settings/:settingsType"
                            component={AccountSettingsComp}
                        />

                        {/* Jobs */}
                        <AuthenticatedRoute
                            path="/jobs/:jobType"
                            component={Jobs}
                        />

                        {/* Specific Competition Page */}
                        <Route
                            exact
                            path="/competitions/:type"
                            component={Competition}
                        />

                        {/* Search Page */}
                        <Route exact path="/search" component={SearchComp} />

                        {/* Password Reset Page */}
                        <AuthenticatedRoute
                            path="/password-reset/:passwordResetToken"
                            component={PasswordResetComp}
                        />
                    </React.Fragment>
                </Switch>
            </Router>
        );
    }
}

MainAppComponents.propTypes = {
    auth: PropTypes.object.isRequired,
    alert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    alert: state.alert
});

export default connect(mapStateToProps)(MainAppComponents);
