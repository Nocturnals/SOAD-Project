import path from "path";

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
import CreateCompetition from "./components/competitions/createCompetition/createCompetition";
import HomePage from "./components/home/home";
import SearchComp from "./components/search/search";
import ProfilePage from "./components/profile/profile";
import AccountSettingsComp from "./components/profile/accountSettings/accountSettings";
import ChatPage from "./components/chats/chatPage";
import Jobs from "./components/jobs/jobs";
import SearchJobs from "./components/jobs/searchJobs/searchJobs";
import Organisations from "./components/organisations/organisations";
import CreateOrganisation from "./components/organisations/createOrganisation/createOrganisation";
import MainLoader from "./components/helpers/mainLoader/mainLoader";

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const googleApiKey = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`;

class MainAppComponents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

    // After Mounting the Component...
    componentDidMount() {
        document.body.scrollTo(0, 0);

        setTimeout(() => {
            this.setState({
                isLoading: false
            });
        }, 1000);
    }

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

        console.log(this.props.auth);

        return (
            <Router>
                <Switch>
                    <React.Fragment>
                        {this.props.auth.isLoading ? (
                            <MainLoader />
                        ) : (
                            <React.Fragment>
                                {/* Displaying Error Messages */}
                                {this.props.alert.message ? (
                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >
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
                                <AuthenticatedRoute
                                    path="/feed"
                                    component={HomePage}
                                />

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
                                {/* Chat Page */}
                                <AuthenticatedRoute
                                    path="/colab/messages"
                                    component={ChatPage}
                                />

                                {/* Jobs */}
                                <Route
                                    exact
                                    path="/jobs/:job_id?/results/:filters?"
                                    component={SearchJobs}
                                />
                                <AuthenticatedRoute
                                    path="/job/:jobType"
                                    component={Jobs}
                                />

                                {/* Specific Competition Page */}
                                <Route
                                    exact
                                    path="/competitions/:comp_id"
                                    component={Competition}
                                />
                                <AuthenticatedRoute
                                    path="/create-competition"
                                    component={CreateCompetition}
                                />

                                {/* Organisations Page */}
                                <Route
                                    exact
                                    path="/artists/:organisationName?/:content"
                                    component={Organisations}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path="/create/organisation"
                                    component={CreateOrganisation}
                                />
                                <AuthenticatedRoute
                                    exact
                                    path="/edit/organisation/:org_id"
                                    component={CreateOrganisation}
                                />

                                {/* Search Page */}
                                <Route
                                    exact
                                    path="/search"
                                    component={SearchComp}
                                />

                                {/* Password Reset Page */}
                                <AuthenticatedRoute
                                    path="/password-reset/:passwordResetToken"
                                    component={PasswordResetComp}
                                />
                            </React.Fragment>
                        )}
                        <script src={googleApiKey}></script>
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
