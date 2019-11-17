import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LandingPage from "./components/landing page/landing_page";
import AuthenticationPage from "./components/authentication/authentication";
import Combo from "./components/combo/combo";
import PasswordResetComp from "./components/authentication/passwordReset/passwordReset";

class MainAppComponents extends Component {
    render() {
        console.log(this.props.alert.message);

        return (
            <Router>
                <Switch>
                    <div>
                        {this.props.alert.message ? (
                            <div class="alert alert-danger" role="alert">
                                {this.props.alert.message}
                            </div>
                        ) : null}
                        <Route exact path="/" component={LandingPage} />
                        <Route
                            exact
                            path="/user/:type/:catType"
                            component={Combo}
                        />
                        <Route
                            exact
                            path="/auth/:type"
                            component={AuthenticationPage}
                        />
                        <Route
                            exact
                            path="/password-reset/:passwordResetToken"
                            component={PasswordResetComp}
                        />
                    </div>
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
